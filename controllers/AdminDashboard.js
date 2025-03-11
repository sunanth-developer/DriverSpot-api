import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users";
const client = new MongoClient(uri);

 
export const getTotalActiveDrivers = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const driversCollection = db.collection("drivers");

        const count = await driversCollection.countDocuments({ accountStatus: "active" });

        res.json({ totalActiveDrivers: count });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch active drivers count" });
    }
};

 
export const getTotalUsers = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const usersCollection = db.collection("usersdata");

        const count = await usersCollection.countDocuments();

        res.json({ totalUsers: count });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users count" });
    }
};

 
export const getTotalPartners = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Partners");
        const partnersCollection = db.collection("profile");

        const count = await partnersCollection.countDocuments();

        res.json({ totalPartners: count });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch partners count" });
    }
};

 
export const getTotalBookings = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("Partners");
        const bookingsCollection = db.collection("bookings");

        const count = await bookingsCollection.countDocuments();

        res.json({ totalBookings: count });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bookings count" });
    }
};

 
export const getTotalRevenue = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const bookingsCollection = db.collection("bookings");

        const result = await bookingsCollection.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
        ]).toArray();

        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

        res.json({ totalRevenue });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch total revenue" });
    }
};
