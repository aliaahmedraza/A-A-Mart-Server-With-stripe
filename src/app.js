import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./db/config.js";
import allRouters from "./routers/allRouter/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL
  || "https://a-a-mart-stripe.vercel.app";

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true, { message: "Your Frontend url is not identified" });
    if (origin === CLIENT_URL) return callback(null, true);
    callback(new Error(`CORS policy: origin ${origin} not allowed ${Error}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(allRouters);
app.use(express.json());

dbConfig;

app.listen(process.env.PORT, () => console.log("Server is running"));
