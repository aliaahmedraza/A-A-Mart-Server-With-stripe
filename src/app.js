// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import dbConfig from "./db/config.js";
// import allRouters from "./routers/allRouter/index.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();
// const CLIENT_URL = process.env.CLIENT_URL
//   || "https://a-a-mart-stripe.vercel.app";

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   // only echo back origins you trust:
//   const allowed = [
//     process.env.CLIENT_URL,             // your front‑end URL
//     "http://localhost:3000"
//   ].filter(Boolean);

//   if (allowed.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET,POST,PUT,DELETE,OPTIONS"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//   }

//   // short‑circuit preflights
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }

//   next();
// });

// app.use(express.static('public'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(allRouters);
// app.use(express.json());

// dbConfig;

// app.listen(process.env.PORT, () => console.log("Server is running"));
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConfig from "./db/config.js";
import allRouters from "./routers/allRouter/index.js";

dotenv.config();
const app = express();

// ——————————————————
// 1) Manual CORS for trusted origins
// ——————————————————
const allowedOrigins = [
  process.env.CLIENT_URL || "https://a-a-mart-stripe.vercel.app",
  "http://localhost:3000"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
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

  // handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ——————————————————
// 2) Middleware
// ——————————————————
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// ——————————————————
// 3) Routes
// ——————————————————
app.use(allRouters);

// ——————————————————
// 4) DB init & server start
// ——————————————————
dbConfig();  // actually invoke your DB setup

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
