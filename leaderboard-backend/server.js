import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
app.get("/", (req, res) => {
  res.send("API is working ✅");
});


app.use("/users", userRoutes);

export default app;
