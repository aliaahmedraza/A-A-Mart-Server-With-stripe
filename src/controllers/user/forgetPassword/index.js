import nodemailer from "nodemailer";
import dotenv from "dotenv";
import userModel from "../../../models/user/index.js";
import jwt from "jsonwebtoken";

dotenv.config();

const forgetPasswordController = async (req, res) => {
  try {
    const { recipient } = req.body;
    if (!recipient) {
      return res
        .status(400)
        .json({ message: "Please provide a recipient email." });
    }
    const user = await userModel.findOne({ email: recipient });
    if (!user) {
      return res.status(404).json({ message: "This email is not registered." });
    }
    const token = jwt.sign({ recipient }, process.env.JWT_SECRET_KEY, {
      expiresIn: 5 * 60,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"A&A Mart" <no-reply@weatherapp.com>',
      to: user.email,
      subject: "Link to Reset Password",
      html: `
        <p>To click the below link to update your password and this link will expire after five minutes.:</p>
        <p><a href="http://localhost:3001/updatepassword/${token}">Update Password</a></p>
      `,
    });

    res.status(200).json({
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error inserting data into User model:", error);
    res.status(500).json({ error: "Internal Server Error" });
    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to send email",
        error: error.message,
      });
    }
  }
};

export default forgetPasswordController;
