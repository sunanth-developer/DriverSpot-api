
import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const UploadRideImages = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const collection = database.collection("bookings");

    // Update the document
    const result = await collection.updateOne(
      { _id: new ObjectId(req.body.bookingid) }, // Find by booking ID
      { 
        $set: {
          selfie: req.body.selfieimg,
          carfront: req.body.carfrontimg,
          carback: req.body.carbackimg,
          carleft: req.body.carleftimg,
          carright: req.body.carrightimg,
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json({
      success: true,
      message: "images uploaded successfully"
    });

  } catch (err) {
    console.error("Error uploading images:", err);
    return res.status(500).json({ error: "Internal server error" });
  } 
}; // Import RideImage model



export const startedride = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const collection = database.collection("bookings");

    // Update the document
    const result = await collection.updateOne(
      { _id: new ObjectId(req.body.bookingId) }, // Find by booking ID
      { 
        $set: {
          d_id: req.body.driverId, // Replace array with single driver ID
          booking_status: "ACCEPTED",
          ride_status:"ACCEPTED" // Update booking status
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Ride started successfully"
    });

  } catch (err) {
    console.error("Error starting ride:", err);
    return res.status(500).json({ error: "Internal server error" });
  } 
};





// Single image upload endpoint



