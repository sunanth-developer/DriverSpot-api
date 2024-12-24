
import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose'
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"


export const Driverdata = async (req, res)=>{
  
  try {
 console.log("jdbdwbkqwbduqbwquw")
  const client = new MongoClient(uri);
   const database = client.db("users");
    const collection = database.collection("drivers");
    const data = await collection.findOne({email:req.body.d_id});
 await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
     return res.status(200).json(data);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json("Internal Server Error");
  }
}

export const driverbookings = async(req, res)=>{
 console.log("shdjdjfjf",req.body.id)

    const client = new MongoClient(uri);
  
  const id = [req.body.id]
    // Build the query
    const query = {
      bookingtype: req.body.bookingtype, // Match bookingtype
      d_id:{ $regex: `\\b${req.body.id}\\b` }, // Match any value in d_id array
    };

    // Query the collection
    const database = client.db("users");
    const collection = database.collection("bookings");
    await client.connect();
    const data = await collection.find(query).toArray();

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
     return res.status(200).json(data);
}

export const startedride = async (req, res) => {
  try {
    console.log("hello");
    console.log(req.body.bookingtype);

    // Fetch bookings where booking_status is 'started' and d_id matches
    const bookings = await Booking.find({
      booking_status: "started",
      d_id: { $in: [req.body.d_id] }, // Assumes d_id is stored as an array
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Import the Driver model

export const Driverstatus = async (req, res) => {
  try {
    // Update the driver's status
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.body.d_id,                 // Driver's ID
      { Driverstatus: req.body.status }, // Update Driverstatus field
      { new: true }                  // Return the updated document
    );

    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    return res.status(200).json(updatedDriver);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


