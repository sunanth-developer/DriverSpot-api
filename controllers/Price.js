import { MongoClient, ObjectId } from 'mongodb';
import mongoose from 'mongoose'
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"



export const getPricing = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Fetching pricing data with params:");
    
    const database = client.db("Pricing");
    const collection = database.collection("Price list");
    
    // Build query based on provided parameters
    const query = {};
    
    
    // Fetch pricing data
    const pricingData = await collection.find(query).toArray();
    
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



export const getbusinessPricing = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Fetching business pricing data with params:", req.body);
    
    const database = client.db("Pricing");
    const collection = database.collection("Business pricelist ");
    
    // Log database and collection names for verification
    console.log(`Using database: ${database.databaseName}`);
    console.log(`Using collection: ${collection.collectionName}`);
    
    // List all collections in the database to verify it exists
    const collections = await database.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    // Build query based on provided parameters
    const query = {};
    
    // Add filters if provided
    if (req.body.vehicleType) query.vehicleType = req.body.vehicleType;
    if (req.body.serviceType) query.serviceType = req.body.serviceType;
    if (req.body.city) query.city = req.body.city;
    
    console.log("Query:", query);
    
    // Fetch pricing data with explicit options
    const pricingData = await collection.find(query, { 
      noCursorTimeout: false,
      maxTimeMS: 30000
    }).toArray();
    
    console.log("Retrieved business pricing data:", pricingData);
    
    if (pricingData.length === 0) {
      // If no data found, check if collection is empty
      const count = await collection.countDocuments({});
      console.log(`Total documents in collection: ${count}`);
      
      return res.status(404).json({
        success: false,
        message: "No business pricing data found for the given criteria",
        collectionExists: collections.some(c => c.name === "Business pricelist"),
        totalDocuments: count
      });
    }
    
    return res.status(200).json({
      success: true,
      data: pricingData[0],
      count: pricingData.length
    });
    
  } catch (error) {
    console.error("Error fetching business pricing data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      stack: error.stack
    });
  } finally {
    await client.close();
  }
};

/**
 * Calculates price for a specific ride
 * @route POST /api/calculatePrice
 */
export const calculatePrice = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    
    const { 
      vehicleType, 
      serviceType, 
      city, 
      distance, // in kilometers
      duration, // in minutes
      timeOfDay, // "day" or "night"
      isWeekend // boolean
    } = req.body;
    
    // Validate required parameters
    if (!vehicleType || !serviceType || !distance) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters"
      });
    }
    
    // Get base pricing
    const database = client.db("users");
    const collection = database.collection("pricing");
    
    const query = {
      vehicleType,
      serviceType
    };
    
    if (city) query.city = city;
    
    const pricingData = await collection.findOne(query);
    
    if (!pricingData) {
      return res.status(404).json({
        success: false,
        message: "No pricing data found for the given criteria"
      });
    }
    
    // Calculate price
    let totalPrice = 0;
    
    // Base fare
    totalPrice += pricingData.baseFare || 0;
    
    // Distance fare
    totalPrice += (pricingData.perKmRate || 0) * distance;
    
    // Time fare if applicable
    if (duration && pricingData.perMinuteRate) {
      totalPrice += pricingData.perMinuteRate * duration;
    }
    
    // Night charges if applicable (typically 1.5x)
    if (timeOfDay === "night" && pricingData.nightChargeMultiplier) {
      totalPrice *= pricingData.nightChargeMultiplier;
    }
    
    // Weekend surge if applicable
    if (isWeekend && pricingData.weekendSurgeMultiplier) {
      totalPrice *= pricingData.weekendSurgeMultiplier;
    }
    
    // Apply any additional charges
    if (pricingData.additionalCharges) {
      totalPrice += pricingData.additionalCharges;
    }
    
    // Round to 2 decimal places
    totalPrice = Math.round(totalPrice * 100) / 100;
    
    return res.status(200).json({
      success: true,
      price: totalPrice,
      breakdown: {
        baseFare: pricingData.baseFare || 0,
        distanceFare: (pricingData.perKmRate || 0) * distance,
        timeFare: duration ? (pricingData.perMinuteRate || 0) * duration : 0,
        additionalCharges: pricingData.additionalCharges || 0
      },
      currency: pricingData.currency || "INR"
    });
    
  } catch (error) {
    console.error("Error calculating price:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  } finally {
    await client.close();
  }
};

/**
 * Updates pricing data
 * @route POST /api/updatePricing
 */
export const updatePricing = async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    
    const { priceId, ...updateData } = req.body;
    
    if (!priceId) {
      return res.status(400).json({
        success: false,
        message: "Price ID is required"
      });
    }
    
    const database = client.db("users");
    const collection = database.collection("pricing");
    
    const result = await collection.updateOne(
      { _id: new ObjectId(priceId) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Pricing data not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Pricing updated successfully",
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error("Error updating pricing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  } finally {
    await client.close();
  }
};


