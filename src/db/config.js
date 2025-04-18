import mongoose from "mongoose";
const dbURI = "mongodb+srv://aliaahmedraza:ritadanto@aa.kspzz.mongodb.net/";

const dbConfig=mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

export default dbConfig;
