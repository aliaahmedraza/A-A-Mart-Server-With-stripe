import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./db/config.js";
import allRouters from "./routers/allRouter/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// === CORS Setup ===
const allowedOrigins = [
  process.env.CLIENT_URL || "https://a-a-mart-client-w-ith-stripe.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(allRouters);

dbConfig;

app.listen(process.env.PORT, () => console.log("Server is running"));
