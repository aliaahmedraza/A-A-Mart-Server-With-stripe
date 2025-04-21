import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'https://a-a-mart-client-w-ith-stripe.vercel.app';

const stripePostController = async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      console.log("❌ stripePostController: `products` must be a non-empty array");
      return res
        .status(400)
        .json({ error: "`products` must be a non-empty array" });
    }

    const lineItems = products.map(product => {
      // Check for a valid HTTP/HTTPS URL
      const isValidUrl = typeof product.image === "string" &&
        /^https?:\/\/.+/.test(product.image);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            // Conditionally include images array
            ...(isValidUrl && { images: [product.image] }),
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // was "payment_method_type"
      line_items: lineItems,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.json({ client_secret: session.client_secret, id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
};

export default stripePostController;
