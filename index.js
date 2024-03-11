import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from 'cors'
import { db } from "./db.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"*"
}))

app.use("/api/auth", authRoutes);

app.listen(4003, () => {
  console.log("Connected!");
});
