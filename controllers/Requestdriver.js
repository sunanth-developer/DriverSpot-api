
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model




export const createBulkBooking = async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("users");
    const bulkBookingsCollection = database.collection("bulkBookings");

    // Get the bulk booking data from request body
    const bulkBookingData = {
      bookingDate: req.body.bookingDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      driverDetails: {
        baseDrivers: req.body.driverDetails.baseDrivers,
        proDrivers: req.body.driverDetails.proDrivers,
        luxuryDrivers: req.body.driverDetails.luxuryDrivers,
      },
      vehicleDetails: {
        totalVehicles: req.body.vehicleDetails.totalVehicles,
        suv: req.body.vehicleDetails.suv,
        hatchback: req.body.vehicleDetails.hatchback,
        sedan: req.body.vehicleDetails.sedan,
        luxuryCars: req.body.vehicleDetails.luxuryCars
      },
      userDetails: {
        userId: req.body.userDetails.userId,
        mobile: req.body.userDetails.mobile
      },
      bookingType: req.body.bookingType,
      requestedAt: req.body.requestedAt,
      status: 'pending', // Adding initial status
      createdAt: new Date().toISOString()
    };

    // Insert the booking into MongoDB
    const result = await bulkBookingsCollection.insertOne(bulkBookingData);

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Bulk booking created successfully",
      bookingId: result.insertedId,
      booking: bulkBookingData
    });

  } catch (error) {
    console.error('Bulk Booking Error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to create bulk booking",
      error: error.message
    });
  } finally {
    // Close the connection
    await client.close();
  }
};


export const Requestdriver = async (req, res) => {
  try {
    console.log(req.body)
    const newBooking ={
      b_id: req.body.uid,
      d_id: req.body.driverids,
      booking_status: req.body.bookingstatus,
      startlocation: req.body.pickup,
      destination: req.body.destinationp,
      price: req.body.price,
      car: req.body.carname,
      cartype: req.body.cartype,
      transmission: req.body.transmission, // Added transmission
      registrationNo: req.body.registrationNo ,
      triptype: req.body.triptype,
      username: req.body.mobileno,
      bookingtype: req.body.bookingtype,
      ride_distance: req.body.distance,
      Expected_time: req.body.time,
      booking_time: req.body.bookingtime,
      booking_date: req.body.bookingdate,
      requestedat: req.body.requestedAt,
      selected_hours: req.body.selectedHours,
      OTP: req.body.OTP,
      otp_status: req.body.otpverified,
      chauffeur_type: req.body.chauffeurType,
    };
    await client.connect();
    const database = client.db("users");
      const collection = database.collection("bookings");
    const savedBooking = await collection.insertOne(newBooking);
    console.log(savedBooking)
    return res.status(200).json(savedBooking);
   
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getrequests = async (req, res) => {
  try {
    const bookings = await Booking.find({ b_id: req.body.bid });
    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getfilterrequests = async (req, res) => {
  try {
    const bookings = await Booking.find({
      b_id: req.body.bid,
      bookingtype: req.body.val,
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getrequestsdriver = async (req, res) => {
  try {
    const bookings = await Booking.find({
      d_id: { $elemMatch: { $eq: req.body.driverid } }, // Match driver ID in the array
    });

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Editresponce = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.body.id,
      { booking_status: req.body.responce },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json(updatedBooking);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Deleterequest = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.body.id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
