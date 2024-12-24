
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Getbookingstatus = async (req, res) => {
  try {
    // Fetch the booking status by booking ID
    const booking = await Booking.findById(req.body.bookingid, 'booking_status'); // Select only the booking_status field

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json({ booking_status: booking.booking_status });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
