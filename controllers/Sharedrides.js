
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Getsharedrides = async (req, res) => {
  try {
    const sharedRides = await Booking.find({
      sharedwith: req.body.mobile
    });

    if (!sharedRides || sharedRides.length === 0) {
      return res.status(404).json({ error: "No shared rides found" });
    }

    return res.status(200).json(sharedRides);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getbookingdetails = async (req, res) => {
  try {
    const bookingDetails = await Booking.findOne({
      username: req.body.mobile,
      booking_status: 'started'
    });

    if (!bookingDetails) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json(bookingDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}; // Import SharedRide model

export const Shareride = async (req, res) => {
  try {
    const newSharedRide = new SharedRide({
      b_id: req.body.b_id,
      d_id: req.body.d_id,
      usermobile: req.body.mobile,
      userlocation: req.body.userlocation,
      driverlocation: req.body.driverlocation,
      sharedwith: req.body.sharedwith,
      pickuppoint: req.body.pickuppoint,
      destination: req.body.destination,
      drivername: req.body.drivername,
      drivermobile: req.body.drivermobile,
      registrationno: req.body.vehicleregistration,
      cartype: req.body.vehicletype,
      carname: req.body.vehiclename,
      geartype: req.body.geartype,
      driverimage: req.body.driverimg
    });

    const savedSharedRide = await newSharedRide.save();
    return res.status(200).json(savedSharedRide);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Updateuserlocation = async (req, res) => {
  try {
    const updatedRide = await SharedRide.updateOne(
      { usermobile: req.body.mobile },
      { $set: { userlocation: req.body.userlocation } }
    );

    if (updatedRide.nModified === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }

    return res.status(200).json({ message: "User location updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Updatedriverlocation = async (req, res) => {
  try {
    const updatedRide = await SharedRide.updateOne(
      { d_id: req.body.driverid },
      { $set: { driverlocation: req.body.driverlocation } }
    );

    if (updatedRide.nModified === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }

    return res.status(200).json({ message: "Driver location updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

