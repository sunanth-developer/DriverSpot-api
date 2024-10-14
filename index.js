import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { db } from "./db.js";
import { createServer } from "http"; // Import createServer from http module
import { Server } from "socket.io"; // Import Server from socket.io

const app = express();
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Update with your client URL
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/",(req,res)=>{
  res.send("hello welcome")
})
app.use("/hello",(req,res)=>{
  res.send("hello welcome234")
})

httpServer.listen(4003, () => {
  console.log("Connected!");
});

module.exports=app;