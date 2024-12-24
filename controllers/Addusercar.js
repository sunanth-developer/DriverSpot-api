
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Addcar = async (req, res) => {
  try {
    const newCar = new UserCar({
      cartype: req.body.cartype,
      carname: req.body.vehicle,
      uid: req.body.uid,
      geartype: req.body.geartype,
      registrationno: req.body.registrationno,
    });

    // Save the new car to the database
    const savedCar = await newCar.save();
    return res.status(200).json(savedCar);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const Getcar = async (req, res) => {
  try {
    console.log(req.body);

    // Find all cars by user ID
    const cars = await UserCar.find({ uid: req.body.uid });

    console.log(cars);
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
    const updatedCar = await UserCar.findByIdAndUpdate(
      id,            // ID of the car to update
      updates,       // Fields to update
      { new: true }  // Return the updated document
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
  try {
    console.log(req.body);

    // Delete the car by its ID
    const deletedCar = await UserCar.findByIdAndDelete(req.body.id);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
