import { MongoClient, ObjectId } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Addcar = async (req, res) => {
  await client.connect();
  const database = client.db("users");
    const collection = database.collection("user cars");
  try {
    const newCar= {
      cartype: req.body.newCar.cartype,
      carname: req.body.newCar.carname,
      uid: req.body.newCar.uid,
      geartype: req.body.newCar.geartype,
      registrationno: req.body.newCar.registrationno,
    };

    const result = await collection.insertOne(newCar);
    return res.status(200).json(result.acknowledged);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getcar = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("user cars");
    
    // Convert cursor to array before sending response
    const cars = await collection.find({ uid: req.body.uid }).toArray();
    
    return res.status(200).json(cars);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  } 
};

export const Editcar = async (req, res) => {
  try {
    const { id, updates } = req.body;

    // Update the car details by its ID
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("user cars");
    const updatedCar = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.status(200).json(updatedCar);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Deletecar = async (req, res) => {

  console.log("qfqfq33q",req.body)
  try {
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("user cars");
    
    const query = { _id: new ObjectId(req.body.id) };
    
    const deletedCar = await collection.deleteOne(query);
    
    if (deletedCar.deletedCount === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.status(200).json({ 
      success: true,
      message: "Car deleted successfully" 
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  } 
};
