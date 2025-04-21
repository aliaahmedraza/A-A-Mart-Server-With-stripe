import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./db/config.js";
import allRouters from "./routers/allRouter/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const corsOptions = {
  origin: 'https://aa-mart-one.vercel.app', // or process.env.CLIENT_URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// handle preflight for all routes
app.options('*', cors(corsOptions));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(allRouters);
app.use(express.json());

dbConfig;

app.listen(process.env.PORT, () => console.log("Server is running"));
