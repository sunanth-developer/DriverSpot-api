import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri); 
//for driver's module [viewdetials,onboarding]
export const getDriverDetails = async (req, res) => {
    try {
      await client.connect();
      const database = client.db("users");
      const collection = database.collection("drivers");
  
      const { mobile, accountStatus } = req.query;
  
      let query = {};
  
      if (mobile) {
        query.mobile = mobile;
      }
  
      if (accountStatus) {
        query.accountStatus = accountStatus;
      }
  
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
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    } finally {
      await client.close();
    }
  };
 
 
   
  export const editDriverDetails = async (req, res) => {
      try {
           const client = new MongoClient(uri);
          await client.connect();
          const db = client.db("users");
          const driversCollection = db.collection("drivers");
  
          const { driverId } = req.params;
          const { vehicles, gearTypes, drivercategory, accountStatus } = req.body;
  
          //validation for allowed values
          const allowedVehicles = ["sedan", "suv", "luxury", "hatchback"];
          const allowedGearTypes = ["automatic", "manual"];
          const allowedAccountStatuses = ["active", "inactive", "suspended"];
          const allowedDriverCategories = ["c1", "c2", "b", "c", "gold", "f"];
  
          let updateFields = {};
  
           if (vehicles) {
              if (!Array.isArray(vehicles) || vehicles.some(v => !allowedVehicles.includes(v))) {
                  await client.close();
                  return res.status(400).json({ error: "Invalid vehicle values." });
              }
  
              updateFields.sedantype = vehicles.includes("sedan") ? true : null;
              updateFields.suvtype = vehicles.includes("suv") ? true : null;
              updateFields.luxurytype = vehicles.includes("luxury") ? true : null;
              updateFields.hatchbacktype = vehicles.includes("hatchback") ? true : null;
          }
  
           if (gearTypes) {
              if (!Array.isArray(gearTypes) || gearTypes.some(g => !allowedGearTypes.includes(g))) {
                  await client.close();
                  return res.status(400).json({ error: "Invalid gearTypes values." });
              }
              updateFields.geartype = gearTypes;  
          }
  
           if (drivercategory) {
              if (!allowedDriverCategories.includes(drivercategory)) {
                  await client.close();
                  return res.status(400).json({ error: "Invalid driver category value." });
              }
              updateFields.drivercategory = drivercategory;
          }
  
           if (accountStatus) {
              if (!allowedAccountStatuses.includes(accountStatus)) {
                  await client.close();
                  return res.status(400).json({ error: "Invalid accountStatus value." });
              }
              updateFields.accountStatus = accountStatus;
          }
  
          if (Object.keys(updateFields).length === 0) {
              await client.close();
              return res.status(400).json({ error: "No valid fields to update." });
          }
  
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

        const { driverId } = req.params;

        const driver = await driversCollection.findOne(
            { _id: new ObjectId(driverId) },
            { projection: { _id: 0, AadharNumber: 1, PancardNumber: 1, Agreement: 1, Terms: 1, DateOfBirth: 1, Experience: 1, Languages: 1 } }
        );

        if (!driver) {
            await client.close();
            return res.status(404).json({ error: "Driver not found." });
        }

        
        const checklist = {
            AadharNumber: driver.AadharNumber ?? false,
            PancardNumber: driver.PancardNumber ?? false,
            Agreement: driver.Agreement ?? false,
            Terms: driver.Terms ?? false,
            DateOfBirth: driver.DateOfBirth ?? false,
            Experience: driver.Experience ?? false,
            Languages: driver.Languages ?? false
        };

        await client.close();
        res.json({ success: true, checklist });

    } catch (error) {
        console.error("Error fetching driver checklist:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateDriverChecklist = async (req, res) => {
  try {
      await client.connect();
      const db = client.db("users");
      const driversCollection = db.collection("drivers");

      const { driverId } = req.params;
      const updates = req.body; 

      const allowedFields = [
          "AadharNumber", "PancardNumber", "Agreement",
          "Terms", "DateOfBirth", "Experience", "Languages"
      ];

      let updateFields = {};

      
      for (const field of allowedFields) {
          if (updates.hasOwnProperty(field)) {
              if (typeof updates[field] !== "boolean") {
                  await client.close();
                  return res.status(400).json({ error: `${field} must be true or false.` });
              }
              updateFields[field] = updates[field];
          }
      }

      if (Object.keys(updateFields).length === 0) {
          await client.close();
          return res.status(400).json({ error: "No valid fields to update." });
      }

      const result = await driversCollection.updateOne(
          { _id: new ObjectId(driverId) },
          { $set: updateFields },
          { upsert: true } 
      );

      await client.close();

      if (result.modifiedCount === 0 && result.upsertedCount === 0) {
          return res.status(404).json({ error: "Driver not found or no changes made." });
      }

      res.json({ message: "Driver checklist updated successfully!" });
  } catch (error) {
      console.error("Error updating driver checklist:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


