import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { db } from "./db.js";
import { createServer } from "http"; // Import createServer from http module
import { Server } from "socket.io"; // Import Server from socket.io
import { editdriveraccount, getdriverbyaccount, getdriverbymobile, getdrivers, getdriverslocation, searchDrivers } from "./controllers/getdrivers.js";
import { driverbookings, Driverdata, Driverstatus, Editdriverdates, startedride } from "./controllers/Driverdates.js";
import { Allmessage, Message, Responce } from "./controllers/Customersupport.js";
import { driverlogin, driverregister, driverregister2, login, logout, phonelogin, register } from "./controllers/auth.js";
import { Addcar, Deletecar, Editcar, Getcar } from "./controllers/Addusercar.js";
import { Adduseraddress, Deleteuseraddress, Edituseraddress, Getuseraddress } from "./controllers/Adduseraddress.js";
import { Editresponce, Getfilterrequests, Getrequests, Getrequestsdriver, Requestdriver } from "./controllers/Requestdriver.js";
import { Getbookingstatus } from "./controllers/Getbookingstatus.js";
import { AcceptRide, Getimages, UploadRideImages } from "./controllers/Ride.js";
import { Editprofile, Getprofile, Getusers } from "./controllers/Userprofilr.js";
import { Getbookingdetails, Getsharedrides, Shareride, Updatedriverlocation, Updateuserlocation } from "./controllers/Sharedrides.js";

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

app.get("/api/auth", authRoutes);
app.get("/",(req,res)=>{
  res.send("hello welcome12345774")
})
app.get("/hello",(req,res)=>{
  res.send("hello welcome234")
})
app.get("/getdriverslocation",getdriverslocation);
app.get("/register", register);
app.get("/driverregister", driverregister);
app.get("/driverregister2", driverregister2);
app.get("/login", login);
app.get("/driverlogin", driverlogin);
app.get("/logout", logout);
app.get("/getdrivers", getdrivers);
app.get("/searchdrivers", searchDrivers);
app.get("/addusercar", Addcar);
app.get("/getusercar", Getcar);
app.get("/editusercar", Editcar);
app.get("/deletecar", Deletecar);
app.get("/adduseraddress", Adduseraddress);
app.get("/getuseraddress", Getuseraddress);
app.get("/edituseraddress", Edituseraddress);
app.get("/deleteuseraddress", Deleteuseraddress);
app.get("/requestdriver", Requestdriver);
app.get("/getrequests", Getrequests);
app.get("/getrequestsdriver", Getrequestsdriver);
app.get("/editrequestresponce", Editresponce);
app.get("/editdriverdates", Editdriverdates);
app.get("/getbookingstatus", Getbookingstatus);
app.get("/getdriverbookings", driverbookings);
app.get("/acceptrides", Driverstatus);
app.get("/driverdata", Driverdata);
app.get("/acceptride", AcceptRide);
app.get("/uploadcarimages", UploadRideImages);
app.get("/getimages", Getimages);
app.get("/phonelogin", phonelogin);
app.get("/editprofile", Editprofile);
app.get("/getprofile", Getprofile);
app.get("/getfilterrequests", Getfilterrequests);
app.get("/getusers", Getusers);
app.get("/getsharedrides", Getsharedrides);
app.get("/shareride", Shareride);
app.get("/updateuserlocation", Updateuserlocation);
app.get("/updatedriverlocation", Updatedriverlocation);
app.get("/getbookingdetails", Getbookingdetails);
app.get("/sendmessage", Message);
app.get("/sendresponce", Responce);
app.get("/allmessages", Allmessage);
app.get("/getdriverbymobile", getdriverbymobile);
app.get("/getdriverbyaccount", getdriverbyaccount);
app.get("/editdriveraccount", editdriveraccount);
app.get("/startedride", startedride);
httpServer.listen(4003, () => {
  console.log("Connected!");
});

export default app;