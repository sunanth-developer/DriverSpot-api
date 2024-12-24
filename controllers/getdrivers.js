import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const getdrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({
      _id: { $in: req.body.driversid }, // Match IDs from the input array
    });

    return res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getdriverslocation = async (req, res) => {
  console.log("sdfg", req.body);
  try {
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("drivers");
    const drivers = await collection.find({
      accountStatus: "active",
      Driverstatus: "active",
      ridestatus: "waiting",
    }).toArray(); // Convert cursor to array
    
    return res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    // Close the connection to prevent memory leaks
    await client.close();
  }
};
export const searchDrivers = async (req, res) => {
  try {
    const query = req.body.query; // Example: { Driverstatus: "active" }
    const drivers = await Driver.find(query); // Execute the dynamic query

    return res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getdriverbymobile = async (req, res) => {
  try {
    const driver = await Driver.findOne({ mobile: req.body.mobile });

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    return res.status(200).json(driver);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getdriverbyaccount = async (req, res) => {
  try {
    const drivers = await Driver.find({ accountStatus: req.body.accountStatus });

    return res.status(200).json(drivers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const editdriveraccount = async (req, res) => {
  try {
    const { editdata, id } = req.body;

    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { $set: editdata }, // Update the fields specified in `editdata`
      { new: true }       // Return the updated document
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
