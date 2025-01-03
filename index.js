import express from "express";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { createServer } from "http"; // Import createServer from http module
import { Server } from "socket.io"; // Import Server from socket.io
import { Addcar, Deletecar, Editcar, Getcar } from "./controllers/Addusercar.js";
import { editdriveraccount, getdriverbyaccount, getdriverbymobile, getdrivers, getdriverslocation, searchDrivers } from "./controllers/getdrivers.js";
import { driverlogin, driverregister, driverregister2, logout, phonelogin,  } from "./controllers/auth.js";
import { Adduseraddress, Deleteuseraddress, Edituseraddress, Getuseraddress } from "./controllers/Adduseraddress.js";
import { Editresponce, Getfilterrequests, Getrequests, Getrequestsdriver, Requestdriver } from "./controllers/Requestdriver.js";
import { driverbookings, Driverdata, Driverstatus, startedride } from "./controllers/Driverdates.js";
import { Getbookingstatus } from "./controllers/Getbookingstatus.js";
import { AcceptRide, Getimages, UploadRideImages } from "./controllers/Ride.js";
import { Editprofile, Getprofile, Getusers } from "./controllers/Userprofilr.js";
import { Getbookingdetails, Getsharedrides, Shareride, Updatedriverlocation, Updateuserlocation } from "./controllers/Sharedrides.js";
import { Allmessage, Message, Responce } from "./controllers/Customersupport.js";
import { MongoClient } from 'mongodb';
const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Update with your client URL
    methods: ["GET", "POST"]
  }
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
const client = new MongoClient(uri);
async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log("Connected to MongoDB!");
    const hashedPassword = bcrypt.hashSync("Sunanth@12345", 10);
    console.log(hashedPassword)
    httpServer.listen(4003, () => {
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


export default app;