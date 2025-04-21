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

app.use((req, res, next) => {
  const origin = req.headers.origin;
  // only echo back origins you trust:
  const allowed = [
    process.env.CLIENT_URL,             // your front‑end URL
    "http://localhost:3000"
  ].filter(Boolean);

  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }

  // short‑circuit preflights
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(allRouters);
app.use(express.json());

dbConfig;

app.listen(process.env.PORT, () => console.log("Server is running"));

