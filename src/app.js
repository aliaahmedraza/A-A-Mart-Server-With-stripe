// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import dbConfig from "./db/config.js";
// import allRouters from "./routers/allRouter/index.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config();
// const app = express();

// const allowedOrigins = [
//   process.env.CLIENT_URL || "https://a-a-mart-client-w-ith-stripe.vercel.app",
//   "http://localhost:3000"
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));

// app.use(express.static('public'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(allRouters);
// // Place this below all routers
// app.use((err, req, res, next) => {
//   console.error("Global error handler:", err.message);
//   res.status(500).json({ error: err.message || "Internal Server Error" });
// });
// dbConfig;

// app.listen(process.env.PORT, () => console.log("Server is running"));
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./db/config.js";
import allRouters from "./routers/allRouter/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://a-a-mart-client-w-ith-stripe.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Blocked CORS origin:", origin);
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
}));

// ✅ Handle preflight requests (just in case)
app.options("*", cors());
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(allRouters);
app.use((err, req, res, next) => {
  console.error("Error handler:", err);
  res.status(500).json({ error: err.message });
});

dbConfig;

app.listen(process.env.PORT, () => console.log("Server is running"));
