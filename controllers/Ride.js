
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const AcceptRide = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.body.bookingid,
      { 
        d_id: req.body.driverid,
        booking_status: 'accepted'
      },
      { new: true } // Return the updated booking document
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json(updatedBooking);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}; // Import RideImage model

export const UploadRideImages = async (req, res) => {
  try {
    const newRideImage = new RideImage({
      selfie: req.body.selfieimg,
      carfront: req.body.carfrontimg,
      carback: req.body.carbackimg,
      carleft: req.body.carleftimg,
      carright: req.body.carrightimg,
      driverid: req.body.driverid,
      userid: req.body.userid,
      bookingid: req.body.bookingid,
    });

    const savedImage = await newRideImage.save();
    return res.status(200).json(savedImage);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getimages = async (req, res) => {
  try {
    const rideImages = await RideImage.findOne({ bookingid: req.body.bookingid }); // Assuming bookingid is passed in request body

    if (!rideImages) {
      return res.status(404).json({ error: "No images found for this booking" });
    }

    return res.status(200).json(rideImages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
