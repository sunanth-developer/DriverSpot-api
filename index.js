import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { createServer } from "http";
 // Import createServer from http module
import { Server } from "socket.io"; // Import Server from socket.io
import { Addcar, Deletecar, Editcar, Getcar } from "./controllers/Addusercar.js";
import { driverdashboard, editdriveraccount, getdriverbyaccount, getdriverbymobile, getdrivers, getdriverslocation, searchDrivers } from "./controllers/getdrivers.js";
import { driverlogin, driverregister,  logout, phonelogin,  } from "./controllers/auth.js";
import { Adduseraddress, Deleteuseraddress, Edituseraddress, Getuseraddress } from "./controllers/Adduseraddress.js";
import { createBulkBooking, Editresponce, Getfilterrequests, Getrequests, Getrequestsdriver, Requestdriver } from "./controllers/Requestdriver.js";
import { driverbookings, Driverdata, Driverstatus, getallbookings, getbulkbookings, getDriverDetails, ongoingride, startedride, updatebookingstatus, updateotpstatus, updateRideStatus } from "./controllers/Driverdates.js";
import { getTotalActiveDrivers,getTotalBookings,getTotalPartners,getTotalUsers,getTotalRevenue } from "./controllers/AdminDashboard.js";
import { UploadRideImages } from "./controllers/Ride.js";
import { getDriverDetailsAdmin,editDriverDetails,updateDriverChecklist } from "./controllers/Driverspage.js";
import { Editprofile, Getprofile, Getusers, getalluserbookings } from "./controllers/Userprofilr.js";
import { Getbookingdetails, Getsharedrides, Shareride, Updateuserlocation } from "./controllers/Sharedrides.js";
import { MongoClient, ObjectId } from 'mongodb';
import { getPendingBookings,getAvailableDrivers,acceptBooking,rejectBooking} from "./controllers/BtoBbookings.js"
import { Partnerlogin, Partnerregister,updateAccountStatus,getAllPartners,getPartnerChecklist,getPartnerbyStatus,updatePartnerChecklist } from "./controllers/Partner.js";
import { pickupanddropbooking,  logisticsbooking, valetbooking, partnerbookings } from "./controllers/Partners_booking.js";
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
app.post("/getdriverbookings", driverbookings);
app.post("/acceptrides", Driverstatus);
app.post("/driverdata", Driverdata);
app.post("/uploadcarimages", UploadRideImages);
app.post("/phonelogin", phonelogin);
app.post("/editprofile", Editprofile);
app.post("/getprofile", Getprofile);
app.post("/getfilterrequests", Getfilterrequests);
app.post("/getusers", Getusers);
app.post("/getsharedrides", Getsharedrides);
app.post("/shareride", Shareride);
app.post("/updateuserlocation", Updateuserlocation);
app.post("/getbookingdetails", Getbookingdetails);
app.post("/getdriverbymobile", getdriverbymobile);
app.post("/getdriverbyaccount", getdriverbyaccount);
app.post("/editdriveraccount", editdriveraccount);
app.post("/startedride", startedride);
app.post("/getallbookings", getallbookings);
app.post("/driverdashboard", driverdashboard);
app.post("/ongoingride", ongoingride);
app.post("/createbulkbooking", createBulkBooking);
app.post("/getbulkbookings", getbulkbookings);
app.post("/partnerlogin", Partnerlogin);
app.post("/partnerregister", Partnerregister);
app.post("/getdriverdetails", getDriverDetails);
app.post("/updateRideStatus", updateRideStatus);
app.post("/getalluserbookings", getalluserbookings);
app.post("/updatebookingstatus", updatebookingstatus);
app.post("/updateotpstatus", updateotpstatus);
app.post("/pickupanddropbooking", pickupanddropbooking);
app.post("/logisticsbooking", logisticsbooking);
app.post("/valetbooking", valetbooking);
app.post("/partnerbookings", partnerbookings);
app.post("/uploadimage", UploadRideImages);
//new api endpoints for admin dashboard
app.post("/getTotalBookings",getTotalBookings);
app.post("/getTotalPartners",getTotalPartners);
app.post("/getTotalUsers",getTotalUsers);
app.post("/getTotalRevenue",getTotalRevenue);
app.post("/getTotalActiveDrivers",getTotalActiveDrivers);
app.post("/getDriverDetailsAdmin",getDriverDetailsAdmin);
app.post("/editDriverDetails",editDriverDetails);
app.post("/updateDriverChecklist",updateDriverChecklist);
app.post("/updateAccountStatus",updateAccountStatus);
app.post("/getAllPartners",getAllPartners);
app.post("/getPartnerChecklist",getPartnerChecklist);
app.post("/getPartnerbyStatus",getPartnerbyStatus);
app.post("/updatePartnerChecklist",updatePartnerChecklist);
app.post("/getPendingBookings",getPendingBookings);
app.post("/getAvailableDrivers",getAvailableDrivers);
app.post("/acceptBooking",acceptBooking);
app.post("/rejectBooking",rejectBooking);


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



// Store active sessions
const userSockets = new Map();
const driverSockets = new Map();
const rideSessions = new Map();

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Existing connection handlers
  socket.on('userConnected', (userId) => {
    userSockets.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  socket.on('driverConnected', (driverId) => {
    driverSockets.set(driverId, socket.id);
    console.log(`Driver ${driverId} connected with socket ID: ${socket.id}`);
  });

  // Existing booking request handler
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
      const pickup = JSON.parse(bookingData.pickup)
      const destination=JSON.parse(bookingData.destinationp)
      const newBooking = {
        u_id: bookingData.uid,
        d_id: driverIds,
        booking_status: bookingData.bookingstatus,
        startlocation: pickup,
        destination: destination,
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
        requestedat: bookingData.requestedAt,
        booking_id: bookingData.bookingid
      };

      console.log("Processed booking data:", newBooking);

      // Send booking to each driver
      driverIds.forEach(driverId => {
        if (driverSockets.get(driverId)) {
          io.to(driverSockets.get(driverId)).emit('newBooking', newBooking);
          console.log("sent data ",newBooking)
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

  // Existing driver response handler
  socket.on('driverResponse', (response) => {
    try {
      console.log('Received driver response:', response);

      const userSocketId = userSockets.get(response.userId);
      console.log('User socket ID:', userSocketId);
      console.log('All user sockets:', userSockets);

      if (userSocketId) {
        // Emit to specific user
        io.to(userSocketId).emit('driverResponseToUser', {
          status: response.status,
          driverName: response.driverName,
          accepted: response.accepted,
          userId: response.userId,
          booking_id: response.bookingid,
          driverid: response.driverId,
          // Add any other necessary data
        });

        // Verify emission
        const userSocket = io.sockets.sockets.get(userSocketId);
        console.log('Is user socket connected?', userSocket?.connected);
      } else {
        console.warn('User socket not found for ID:', response.userId);
      }
    } catch (error) {
      console.error('Error sending driver response:', error);
    }
  });

  // New ride tracking handlers
  socket.on('joinRideRoom', (data) => {
    try {
      const { bookingId, userId, driverId } = data;
      console.log('Joining ride room:', { bookingId, userId, driverId });

      socket.join(`ride_${bookingId}`);
      rideSessions.set(bookingId, {
        userId,
        driverId,
        socketId: socket.id,
        status: 'WAITING'
      });
    } catch (error) {
      console.error('Error joining ride room:', error);
    }
  });

  socket.on('updateDriverLocation', (data) => {
    try {
      const { bookingId, latitude, longitude } = data;
      io.to(`ride_${bookingId}`).emit('driverLocationUpdate', {
        latitude,
        longitude,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating driver location:', error);
    }
  });

  socket.on('driverReachedPickup', (data) => {
    try {
      
      const { bookingId } = data;
      io.to(`ride_${bookingId}`).emit('driverReachedPickup', {
        bookingId,
        status: 'DRIVER_ARRIVED',
        timestamp: new Date().toISOString()
      });
      console.log("driverReachedPickup",bookingId)
    } catch (error) {
      console.error('Error handling driver arrival:', error);
    }
  });

  socket.on('startRide', async (data) => {
    try {
        const { bookingId, driverId, latitude, longitude } = data;
        const client = new MongoClient(uri);
        await client.connect();
        
        console.log("Received startRide event:", data);

        // Ensure the driver joins the correct ride room
        socket.join(`booking_${bookingId}`);
        console.log(`Driver joined room: booking_${bookingId}`);

        // Update booking status in MongoDB
        const updateResult = await client.db("users").collection("bookings").updateOne(
            { _id: new ObjectId(bookingId) },
            { $set: { 
                ride_status: "ONGOING",
                driverlatitude: latitude,
                driverlongitude: longitude,
                started_at: new Date()
            } }
        );


        // Emit the event to the ride room so the user gets notified
        io.to(`ride_${bookingId}`).emit('rideStarted', {
            bookingId,
            driverId,
            location: { latitude, longitude },
            timestamp: new Date().toISOString()
        });

        console.log(`Emitted rideStarted event to booking_${bookingId}`);

        await client.close();
    } catch (error) {
        console.error('Error starting ride:', error);
    }
});
  socket.on('completeRide', async (data) => {
    try {
      const { bookingId } = data;
      const client = new MongoClient(uri);
      await client.connect();
      
      
      // Update booking status and final location
      await client.db("users").collection("bookings").updateOne(
        { _id: new ObjectId(bookingId) },
        { 
          $set: { 
            booking_status: "completed",
            ride_status: "completed",
            final_location: {
              latitude: data.latitude,
              longitude: data.longitude
            },
            trip_summary: data.tripSummary,
            completed_at: new Date()
          } 
        }
      );

      // Update driver status
      await client.db("users").collection("drivers").updateOne(
        { _id: new ObjectId(data.driverId) },
        { 
          $set: { 
            ridestatus: "waiting",
            latitude: String(data.latitude),
            longitude: String(data.longitude),
            lastLocationUpdate: new Date()
          } 
        }
      );

      io.to(`ride_${bookingId}`).emit('rideCompleted', {
        bookingId,
        timestamp: new Date().toISOString()
      });

      rideSessions.delete(bookingId);
      await client.close();
    } catch (error) {
      console.error('Error completing ride:', error);
    }
  });

  socket.on('endRide', async (data) => {
    try {
      const { bookingId, driverId, finalLocation, tripSummary } = data;
      console.log('Ending ride:', { bookingId, driverId, finalLocation });


      // Emit ride completion to the room
      io.to(`ride_${bookingId}`).emit('rideCompleted', {
        bookingId,
        driverId,
        finalLocation,
        tripSummary,
        timestamp: new Date().toISOString()
      });

      // Clean up ride session
      rideSessions.delete(bookingId);

      await client.close();
      console.log(`Ride ${bookingId} completed successfully`);

    } catch (error) {
      console.error('Error ending ride:', error);
    }
  });

  // Enhanced disconnect handler
  socket.on('disconnect', () => {
    try {
      console.log('Client disconnected:', socket.id);

      // Clean up user sockets
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
        }
      }

      // Clean up driver sockets
      for (const [driverId, socketId] of driverSockets.entries()) {
        if (socketId === socket.id) {
          driverSockets.delete(driverId);
        }
      }

      // Clean up ride sessions
      for (const [bookingId, session] of rideSessions.entries()) {
        if (session.socketId === socket.id) {
          rideSessions.delete(bookingId);
        }
      }
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  });
});

export default app;