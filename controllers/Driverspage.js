import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users";
const client = new MongoClient(uri);

export const getDriverDetailsAdmin = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("users");
        const collection = database.collection("drivers");

        const { mobile, accountStatus } = req.body; 

        let query = {};
        if (mobile) query.mobile = mobile;
        if (accountStatus) query.accountStatus = accountStatus;

        const drivers = await collection.find(query, { projection: { password: 0 } }).toArray();
        if (drivers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No drivers found matching the criteria.",
            });
        }

        res.status(200).json({
            success: true,
            data: drivers,
        });
    } catch (error) {
        console.error("Error fetching driver details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        await client.close();
    }
};

export const editDriverDetails = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const driversCollection = db.collection("drivers");

        const { driverId, ...updateFields } = req.body;

        const result = await driversCollection.updateOne(
            { _id: new ObjectId(driverId) },
            { $set: updateFields }
        );

        await client.close();

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Driver not found or no changes made." });
        }

        res.json({ message: "Driver details updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDriverChecklist = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const driversCollection = db.collection("drivers");

        const { driverId, mobile } = req.body;  

        const query = driverId ? { _id: new ObjectId(driverId) } : { mobile };

        const driver = await driversCollection.findOne(
            query,
            { projection: { _id: 0, AadharNumber: 1, PancardNumber: 1, Agreement: 1, Terms: 1, DateOfBirth: 1, Experience: 1, Languages: 1 } }
        );

        await client.close();

        if (!driver) {
            return res.status(404).json({ error: "Driver not found." });
        }

        res.json({ success: true, checklist: driver });
    } catch (error) {
        console.error("Error fetching driver checklist:", error);
        await client.close();
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateDriverChecklist = async (req, res) => {
    try {
        await client.connect();
        const db = client.db("users");
        const driversCollection = db.collection("drivers");

        const { driverId, mobile, updates } = req.body;  

        const query = driverId ? { _id: new ObjectId(driverId) } : { mobile };

        const allowedFields = new Set(["AadharNumber", "PancardNumber", "Agreement", "Terms", "DateOfBirth", "Experience", "Languages"]);

        const updateFields = Object.keys(updates).reduce((acc, key) => {
            if (allowedFields.has(key)) acc[key] = updates[key];
            return acc;
        }, {});

        if (Object.keys(updateFields).length === 0) {
            await client.close();
            return res.status(400).json({ error: "No valid fields to update." });
        }

        const result = await driversCollection.updateOne(
            query,
            { $set: updateFields }
        );

        await client.close();

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Driver not found." });
        }

        res.json({ message: "Driver checklist updated successfully!" });
    } catch (error) {
        console.error("Error updating driver checklist:", error);
        await client.close();
        res.status(500).json({ error: "Internal Server Error" });
    }
};
