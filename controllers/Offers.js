import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose'
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"



export const getOffers = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Fetching pricing data with params:");
    
    const database = client.db("Offers");
    const collection = database.collection("discounts");
    
    // Build query based on provided parameters
    const query = {};
    
    
    // Fetch pricing data
    const pricingData = await collection.find(query).toArray();
    console.log(pricingData);
    if (pricingData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pricing data found for the given criteria"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: pricingData
    });
    
  } catch (error) {
    console.error("Error fetching pricing data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  } finally {
    await client.close();
  }
};



