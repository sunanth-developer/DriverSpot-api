import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose'
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"


export const Driverdata = async (req, res)=>{
  console.log("req.body.mobile",req.body.mobile)
 console.log("jdbdwbkqwbduqbwquw")
  try {
  const client = new MongoClient(uri);
   const database = client.db("users");
    const collection = database.collection("drivers");
    const data = await collection.findOne({mobile:req.body.mobile});
    console.log("data",data)
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


export const ongoingride = async(req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    // Build query dynamically based on provided parameters
    const query = {
      // Use $in operator to match either status
      booking_status: { $in: ["ACCEPTED", "DRIVER_ARRIVED","ONGOING"] }
    };

    // Add driver ID to query if provided
    if (req.body.driverid) {
      query.d_id = req.body.driverid;
    }

    // Add user ID to query if provided
    if (req.body.userid) {
      query.b_id = req.body.userid;
    }

    console.log("Query:", query);  // Debug log

    // Query the collection
    const database = client.db("users");
    const collection = database.collection("bookings");
    const data = await collection.find(query).toArray();
    
    console.log("Ongoing rides data:", data);
    return res.status(200).json(data);

  } catch (err) {
    console.error("Error fetching ongoing rides:", err);
    return res.status(500).json({ error: "Internal server error" });
  } 
};

 
export const getallbookings = async(req, res)=>{
  
  const query = {// Match bookingtype
    d_id:{ $regex: `\\b${req.body.id}\\b` }, // Match any value in d_id array
  };
  console.log("wewedswerdf",query)
  const client = new MongoClient(uri);
  const database = client.db("users");
  const collection = database.collection("bookings");

  const data = await collection.find(query).toArray();
  return res.status(200).json(data);

}



export const getbulkbookings = async(req, res) => {
    const client = new MongoClient(uri);
    
    const database = client.db("users");
    const collection = database.collection("bulkBookings");
    
    // Fetch all documents from the collection
    const bulkBookings = await collection.find({}).toArray();
    
    return res.status(200).json(bulkBookings);
    
  
};

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

export const updatebookingstatus = async (req, res) => {
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
          booking_status:req.body.status  // Update booking status
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


export const updateotpstatus = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const collection = database.collection("bookings");

    // Update the document
    console.log("req.body.bookingid",req.body.bookingid)
    const result = await collection.updateOne(
      { _id: new ObjectId(req.body.bookingid) }, // Find by booking ID
      { 
        $set: {
          otp_status:req.body.otpverified  // Update booking status
        }
      }
    );
    console.log("result",result,req.body.bookingId,req.body.otpverified)
    if (result.acknowledged === false) {
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

export const getDriverDetails = async(req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const collection = database.collection("drivers");

    // Find driver by ID
    console.log("driverid",req.body)
    const driverDetails = await collection.findOne(
      { _id: new ObjectId(req.body.driverId) },
      {
        projection: {
          name: 1,
          rating: 1,
          ridescompleted: 1,
          mobile: 1, // Including vehicle details if needed
        }
      }
    );

    if (!driverDetails) {
      return res.status(404).json({ 
        success: false,
        message: "Driver not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: driverDetails
    });

  } catch (err) {
    console.error("Error fetching driver details:", err);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  } 
};

export const updateDriverLocation = async (req, res) => {

console.log("driverid",req.body)
try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const collection = database.collection("drivers");
    // Update driver's location
    const result = await collection.updateOne(
      
      { _id: new ObjectId(req.body.driverId) },
      { 
        $set: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            lastUpdated: new Date()  // Optional: track when location was last updated
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: "Driver not found" 
      });
    }

   

    return res.status(200).json({
      success: true,
      message: "Location updated successfully"
    });

  } catch (err) {
    console.error("Error updating driver location:", err);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
  
};

export const updateRideStatus = async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const collection = database.collection("bookings");

    // Update driver's ride status
    const result = await collection.updateOne(
      { _id: new ObjectId(req.body.bookingid) },
      { 
        $set: {
          ride_status: req.body.status, // "waiting", "ongoing", "completed"
          lastStatusUpdate: new Date()
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: "Driver not found" 
      });
    }

    // Emit status update through socket if needed
   

    return res.status(200).json({
      success: true,
      message: "Ride status updated successfully",
      status: req.body.status
    });

  } catch (err) {
    console.error("Error updating ride status:", err);
    return res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  } 
};


