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
//   || "https://a-a-mart-stripe.vercel.app"
//   || "http://localhost:3000";

// const corsOptions = {
//   origin(origin, callback) {
//     // allow non‑browser tools (Postman, cURL)
//     if (!origin) return callback(null, true);
//     if (origin === CLIENT_URL) return callback(null, true);
//     callback(new Error(`CORS policy: origin ${origin} not allowed`));
//   },
//   credentials: true,     // if you use cookies/auth
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Accept"]
// };

// // 1) enable CORS on all routes
// app.use(cors(corsOptions));

// // 2) explicitly handle preflight OPTIONS
// app.options("*", cors(corsOptions));
// app.use(express.static('public'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(allRouters);
// app.use(express.json());

// dbConfig;

// app.listen(process.env.PORT, () => console.log("Server is running"));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dbConfig from "./db/config.js";
import allRouters from "./routers/allRouter/index.js";

dotenv.config();
const app = express();

// ——————————————————
// 1) CORS setup
// ——————————————————
const CLIENT_URL = process.env.CLIENT_URL || "https://a-a-mart-stripe.vercel.app";

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (origin === CLIENT_URL) return cb(null, true);
    cb(new Error(`CORS policy blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));    // enable preflight

// ——————————————————
// 2) Standard middleware
// ——————————————————
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

// ——————————————————
// 3) Your routes
// ——————————————————
app.use(allRouters);

// ——————————————————
// 4) Initialize DB & start server
// ——————————————————
dbConfig();                           // ← don’t forget the ()
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
