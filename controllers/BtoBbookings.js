import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users";
const client = new MongoClient(uri);
 
//get Requested Bookings List
export const getPendingBookings = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const bookingsCollection = db.collection("bookings");

        const pendingBookings = await bookingsCollection.find({ booking_status: "pending" }).sort({ bookingType: 1 }).toArray();

        res.status(200).json({ success: true, data: pendingBookings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    } finally {
        await client.close();
    }
};

//accept Booking & Assign Driver also POC
export const acceptBooking = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const bookingsCollection = db.collection("bookings");
        const driversCollection = db.collection("drivers");

        const { booking_id, d_id, POC } = req.body;

        
        const availableDrivers = await driversCollection.find({ _id: { $in: d_id.map(id => new ObjectId(id)) }, ridestatus: "true" }).toArray();
        if (availableDrivers.length !== d_id.length) {
            return res.status(400).json({ success: false, message: "One or more drivers are not available" });
        }

        
        const updatedBooking = await bookingsCollection.findOneAndUpdate(
            { _id: new ObjectId(booking_id) },
            { $set: { d_id, POC, booking_status: "accepted" } },
            { returnDocument: "after" }
        );

        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    } finally {
        await client.close();
    }
};

//reject Booking & Store Rejection Reason
export const rejectBooking = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const bookingsCollection = db.collection("bookings");

        const { booking_id, reason } = req.body;

        const updatedBooking = await bookingsCollection.findOneAndUpdate(
            { _id: new ObjectId(booking_id) },
            { $set: { rejection_reason: reason, booking_status: "completed" } },
            { returnDocument: "after" }
        );

        res.status(200).json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    } finally {
        await client.close();
    }
};

//fetching Available Drivers
export const getAvailableDrivers = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const driversCollection = db.collection("drivers");

        const availableDrivers = await driversCollection.find({ ridestatus: "true" }).toArray();

        res.status(200).json({ success: true, data: availableDrivers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    } finally {
        await client.close();
    }
};
