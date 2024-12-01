import { json } from "express";
import { db } from "../db.js";
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
export const startedride = (req, res)=>{
  console.log("hello")
  console.log(req.body.bookingtype)
    db.query("SELECT * FROM Bookings WHERE booking_status='started' AND JSON_CONTAINS(d_id, '"+req.body.d_id+"', '$') ;", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}

export const Driverstatus = (req, res)=>{
  
    db.query("UPDATE Drivers SET Driverstatus = '"+req.body.status+"' WHERE (id = '"+req.body.d_id+"')", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}

