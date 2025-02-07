

import { MongoClient, ObjectId } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

// Import your Mongoose UserAddress model

export const Adduseraddress = async (req, res) => {
  try {
    console.log("qfqfq33q",req.body);
    await client.connect();
    const database = client.db("users");
      const collection = database.collection("user address");
    // Create a new address document
    const newAddress = {
      addresstitle: req.body.newAddress.addresstitle,
      address: req.body.newAddress.address,
      uid: req.body.newAddress.uid, // Assuming `uid` is a reference to a user
    }

    // Save the address to the database
    const savedAddress = await collection.insertOne(newAddress);

    return res.status(200).json(savedAddress);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getuseraddress = async (req, res) => {
  try {
    console.log(req.body);
    await client.connect();
    const database = client.db("users");
      const collection = database.collection("user address");
    // Find addresses by user ID
    const addresses = await collection.find({ uid: req.body.uid }).toArray();

    console.log(addresses);

    return res.status(200).json(addresses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Edituseraddress = async (req, res) => {
  try {
    console.log(req.body);

    const { id, updates } = req.body;
    await client.connect();
    const database = client.db("users");
      const collection = database.collection("user address");
    // Update the address with the given ID
    const updatedAddress = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (!updatedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.status(200).json(updatedAddress);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Deleteuseraddress = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("user address");
    
    const query = { _id: new ObjectId(req.body.id) };
    
    const deletedCar = await collection.deleteOne(query);
    
    if (deletedCar.deletedCount === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.status(200).json({ 
      success: true,
      message: "Address deleted successfully" 
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  } 
};
