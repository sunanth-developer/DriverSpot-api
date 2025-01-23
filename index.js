import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { createServer } from "http";
 // Import createServer from http module
import { Server } from "socket.io"; // Import Server from socket.io
import { Addcar, Deletecar, Editcar, Getcar } from "./controllers/Addusercar.js";
import { driverdashboard, editdriveraccount, getdriverbyaccount, getdriverbymobile, getdrivers, getdriverslocation, searchDrivers } from "./controllers/getdrivers.js";
import { driverlogin, driverregister, driverregister2, logout, phonelogin,  } from "./controllers/auth.js";
import { Adduseraddress, Deleteuseraddress, Edituseraddress, Getuseraddress } from "./controllers/Adduseraddress.js";
import { createBulkBooking, Editresponce, Getfilterrequests, Getrequests, Getrequestsdriver, Requestdriver } from "./controllers/Requestdriver.js";
import { driverbookings, Driverdata, Driverstatus, getallbookings, getbulkbookings, startedride } from "./controllers/Driverdates.js";
import { Getbookingstatus } from "./controllers/Getbookingstatus.js";
import { AcceptRide, Getimages, UploadRideImages } from "./controllers/Ride.js";
import { Editprofile, Getprofile, Getusers } from "./controllers/Userprofilr.js";
import { Getbookingdetails, Getsharedrides, Shareride, Updatedriverlocation, Updateuserlocation } from "./controllers/Sharedrides.js";
import { Allmessage, Message, Responce } from "./controllers/Customersupport.js";
import { MongoClient } from 'mongodb';
import { Partnerlogin, Partnerregister } from "./controllers/Partner.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to your frontend's origin for production
    methods: ["GET", "POST"],
  },
});
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("hello welcome")
})
app.post("/getusercar",Getcar);
app.post("/getdriverslocation", getdriverslocation);
app.post("/driverregister", driverregister);
app.post("/driverregister2", driverregister2);
app.post("/login", phonelogin);
app.post("/driverlogin", driverlogin);
app.post("/logout", logout);
app.post("/getdrivers", getdrivers);
app.post("/searchdrivers", searchDrivers);
app.post("/addusercar", Addcar);
app.post("/getusercar", Getcar);
app.post("/editusercar", Editcar);
app.post("/deletecar", Deletecar);
app.post("/adduseraddress", Adduseraddress);
app.post("/getuseraddress", Getuseraddress);
app.post("/edituseraddress", Edituseraddress);
app.post("/deleteuseraddress", Deleteuseraddress);
app.post("/requestdriver", Requestdriver);
app.post("/getrequests", Getrequests);
app.post("/getrequestsdriver", Getrequestsdriver);
app.post("/editrequestresponce", Editresponce);
app.post("/getdriverslocation", getdriverslocation);
app.post("/getbookingstatus", Getbookingstatus);
app.post("/getdriverbookings", driverbookings);
app.post("/acceptrides", Driverstatus);
app.post("/driverdata", Driverdata);
app.post("/acceptride", AcceptRide);
app.post("/uploadcarimages", UploadRideImages);
app.post("/getimages", Getimages);
app.post("/phonelogin", phonelogin);
app.post("/editprofile", Editprofile);
app.post("/getprofile", Getprofile);
app.post("/getfilterrequests", Getfilterrequests);
app.post("/getusers", Getusers);
app.post("/getsharedrides", Getsharedrides);
app.post("/shareride", Shareride);
app.post("/updateuserlocation", Updateuserlocation);
app.post("/updatedriverlocation", Updatedriverlocation);
app.post("/getbookingdetails", Getbookingdetails);
app.post("/sendmessage", Message);
app.post("/sendresponce", Responce);
app.post("/allmessages", Allmessage);
app.post("/getdriverbymobile", getdriverbymobile);
app.post("/getdriverbyaccount", getdriverbyaccount);
app.post("/editdriveraccount", editdriveraccount);
app.post("/startedride", startedride);
app.post("/getallbookings", getallbookings);
app.post("/driverdashboard", driverdashboard);

app.post("/createbulkbooking", createBulkBooking);
app.post("/getbulkbookings", getbulkbookings);
app.post("/partnerlogin", Partnerlogin);
app.post("/partnerregister", Partnerregister);
const client = new MongoClient(uri);
async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log("Connected to MongoDB!");
    server.listen(4003, () => {
  console.log("Connected!");
});
    // Perform operations (example: list databases)
    const database = client.db("users");
    const collection = database.collection("user cars");

  
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Ensure the client will close when you finish
    await client.close();
  }
}
connectToMongoDB();
const driverSockets = {};  // Store driver socket connections
const userSockets = {};    // Store user socket connections
io.on('connection', (socket) => {
  console.log('A user/driver connected:', socket.id);

  socket.on('userConnected', (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });
  socket.on('driverConnected', (driverId) => {
    driverSockets[driverId] = socket.id;
    console.log(`Driver ${driverId} connected with socket ID: ${socket.id}`);
  });

  socket.on('bookingRequest', (bookingData) => {
    try {
      console.log("Booking request received:", bookingData);

      // First check if bookingData exists
      if (!bookingData) {
        console.error("No booking data received");
        return;
      }

      // Safely parse driver IDs with error handling
      let driverIds = [];
      try {
        driverIds = bookingData.driverids ? JSON.parse(bookingData.driverids) : [];
        console.log("Parsed driver IDs:", driverIds);
      } catch (parseError) {
        console.error("Error parsing driver IDs:", parseError);
        return;
      }

      // Validate driver IDs array
      if (!Array.isArray(driverIds) || driverIds.length === 0) {
        console.error("Invalid or empty driver IDs array");
        return;
      }

      const newBooking = {
        u_id: bookingData.uid,
        d_id: driverIds,
        booking_status: bookingData.bookingstatus,
        startlocation: bookingData.pickup,
        destination: bookingData.destination,
        price: bookingData.price,
        car: bookingData.carname,
        cartype: bookingData.cartype,
        transmission: bookingData.transmission,
        registrationNo: bookingData.registrationNo,
        triptype: bookingData.triptype,
        username: bookingData.mobileno,
        bookingtype: bookingData.bookingtype,
        ride_distance: bookingData.distance,
        Expected_time: bookingData.time,
        booking_time: bookingData.bookingtime,
        booking_date: bookingData.bookingdate,
        requestedat: bookingData.requestedAt
      };

      console.log("Processed booking data:", newBooking);

      // Send booking to each driver
      driverIds.forEach(driverId => {
        if (driverSockets[driverId]) {
          io.to(driverSockets[driverId]).emit('newBooking', newBooking);
          console.log(`Sent booking to driver ${driverId}`);
        } else {
          console.warn(`Driver ${driverId} not connected`);
        }
      });

    } catch (error) {
      console.error("Error processing booking request:", error.message);
      console.error("Error stack:", error.stack);
    }
  });

  socket.on('driverResponse', (response) => {
    console.log('Received driver response:', response);

    const userSocketId = userSockets[response.userId];
    if (userSocketId) {
      io.to(userSocketId).emit('driverResponseToUser', response);
      console.log('Response sent to user',response.userId);
    }
  });

  socket.on('disconnect', () => {
    console.log('User/Driver disconnected:', socket.id);

    for (const key in userSockets) {
      if (userSockets[key] === socket.id) {
        delete userSockets[key];
      }
    }
    for (const key in driverSockets) {
      if (driverSockets[key] === socket.id) {
        delete driverSockets[key];
      }
    }
  });
});


export default app;