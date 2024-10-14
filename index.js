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
const connectedUsers = new Map(); // To store connected users
const connectedDrivers = new Map();

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  // Handle driver joining their room
 socket.on("joinDriver", (driverId) => {
    socket.join(driverId);
    connectedDrivers.set(driverId, socket.id);
    console.log(`Driver with ID ${driverId} joined, socket ID: ${socket.id}`);
  });
   socket.on("joinUser", (userId) => {
    socket.join(userId);
    connectedUsers.set(userId, socket.id);
    console.log(`User with ID ${userId} joined, socket ID: ${socket.id}`);
  });
  // Listen for booking request from user
  socket.on("bookingRequest", (data) => {
    console.log("Booking request received:", data);

    // Broadcast booking request to multiple drivers
    data.driverIds.forEach(driverId => {
      io.to(driverId).emit("newBooking", data);
    });
  });
  socket.on("acceptRequest", ({ userId, driverDetails }) => {
   
      io.to(userId).emit("rideAccepted", driverDetails);
      console.log(`Sent driver details to user ${userId}`);
    
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//dkjhbnskdij






httpServer.listen(4003, () => {
  console.log("Connected!");
});

module.exports=app;