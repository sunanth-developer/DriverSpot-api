import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from 'mongodb';
import twilio from "twilio";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_VERIFY_SID'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

// Use environment variables for sensitive data
const uri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Initialize Twilio client with environment variables
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Verify service ID from environment variable
const TWILIO_VERIFY_SID = process.env.TWILIO_VERIFY_SID;

// Initialize MongoDB client
const client = new MongoClient(uri);

export const phonelogin = async (req, res) => {
  try {
    console.log("hello234");

    // Check if the user already exists
    await client.connect();
    const database = client.db("users");
    const collection = database.collection("usersdata");
    const existingUser = await collection.findOne({ mobileno: req.body.mobile });

    if (existingUser) {
      return res.status(200).json(existingUser); // Return the existing user
    }

    console.log(req.body);

    // If user does not exist, create a new user
    const newUser = { mobileno: req.body.mobile };
    const savedUser = await collection.insertOne(newUser);

    return res.status(200).json(savedUser); // Return the new user
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const driverregister = async (req, res) => {
  //CHECK EXISTING USER
  
    //Hash the password and create a user
   
     const hashedPassword = bcrypt.hashSync(req.body.password, 10);
 try {
    // Create a new driver
    console.log(req.body)
    await client.connect();
  const database = client.db("users");
    const collection = database.collection("drivers");

    const driverExists = await collection.findOne({ mobile: req.body.mobile });
    console.log("jdhfhfgf",driverExists)

    if (driverExists) {
      return res.status(200).json( "User already exists" );
    } else {
      const newDriver = {
      
      gender: req.body.gender,
      drivingLicense: req.body.drivingLicense,
      password: hashedPassword,
      mobile: req.body.mobile,
      adhar: req.body.adhar,
      name: req.body.name,
      terms: req.body.terms,
      dob: req.body.dob,
      pancard: req.body.pancard,
      telugu: req.body.telugu,
      hindi: req.body.hindi,
      english: req.body.english,
      experience: req.body.experience,
      
    };

    const result = await collection.insertOne(newDriver);
    console.log("User added:", result);
    return res.status(200).json(result.acknowledged);
    }
    

  } catch (err) {
    console.error("Error adding driver:", err);
  } 
  
};

export const driverlogin = async (req, res) => {
  const pas=bcrypt.hashSync(req.body.password, 10)
  console.log(pas)
  //CHECK USER
  console.log("wfqfqef",bcrypt.hashSync(req.body.password, 10))
  try {
  const client = new MongoClient(uri);
   await client.connect();
   console.log("connected to mongodb")
   const database = client.db("users");
    const collection = database.collection("drivers");
    const driver = await collection.findOne({mobile:req.body.mobile});
    console.log("driver",driver)
    console.log("req.body.password",req.body.password)
    console.log("driver.password",driver.password)
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, driver.password);
      
      console.log("Password Match:", isPasswordCorrect);
      if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    // Generate JWT Token
    const token = jwt.sign({ id: driver._id }, "jwtkey", { expiresIn: "1h" });

    // Send response with token in a cookie
    const { password, ...other } = driver; // Exclude password from response
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json("Internal Server Error");
  }

 
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
  console.log("cjqhcqjc jhq")
};

// Send OTP to user's phone
export const sendOTP = async (req, res) => {
  const phone = req.body.phoneNumber;
  
  if (!phone) {
    return res.status(400).json({ 
      success: false, 
      message: "Phone number is required" 
    });
  }
  
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await client.connect();
    const database = client.db("users");
    const otpCollection = database.collection("otps");
    
    await otpCollection.updateOne(
      { phone },
      { 
        $set: {
          otp,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        }
      },
      { upsert: true }
    );
    
    // Send OTP via Twilio Verify service
    await twilioClient.verify.v2.services(TWILIO_VERIFY_SID)
      .verifications
      .create({
        to: phone,
        channel: "sms"
      });
    
    await client.close();
    console.log("OTP sent successfully");
    res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully"
    });
    
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP",
      error: error.message 
    });
  }
};

// Verify OTP and login user
export const verifyOTPAndLogin = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  
  if (!phoneNumber || !otp) {
    return res.status(400).json({ 
      success: false, 
      message: "Phone number and OTP are required" 
    });
  }
  
  try {
    // Verify OTP with Twilio Verify service
    const verification_check = await twilioClient.verify.v2.services(
      "VAf9e73159fcc77603b2a232b4ca643a83"
    )
      .verificationChecks
      .create({
        to: phoneNumber,
        code: otp
      });
    console.log("verification_check",verification_check)
    if (verification_check.status !== "approved") {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired OTP" 
      });
    }
    
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const usersCollection = database.collection("usersdata");
    
    // Check if user exists
    let user = await usersCollection.findOne({ mobile: phoneNumber });
    let isNewUser = false;
    
    // If user doesn't exist, create a new account
    if (!user) {
      isNewUser = true;
      const newUser = {
        mobile: phoneNumber,
        createdAt: new Date(),
        lastLogin: new Date(),
        isNewUser: true
      };
      
      const result = await usersCollection.insertOne(newUser);
      user = {
        _id: result.insertedId,
        ...newUser
      };
    } else {
      // Update last login time
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { lastLogin: new Date() } }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.mobile },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    await client.close();
    
    // Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "none",
      secure: process.env.NODE_ENV === "production"
    });
    
    // Return different responses based on whether user is new or existing
    if (isNewUser) {
      return res.status(201).json({ 
        success: true, 
        message: "New user registered successfully",
        isNewUser: true,
        user: {
          id: user._id,
          phone: user.mobile,
          createdAt: user.createdAt
        },
        token: token // Include token in response for mobile clients
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: "Login successful",
        isNewUser: false,
        user: user,
        token: token // Include token in response for mobile clients
      });
    }
    
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to verify OTP",
      error: error.message 
    });
  }
};

// Logout user
export const userLogout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};

// Middleware to verify user authentication
export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token",req.cookies)
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    // Get user ID from J
    
    // Get profile data from request body
    const { username, phoneNumber, preferredLanguages } = req.body;
    
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required"
      });
    }
    
    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("users");
    const usersCollection = database.collection("usersdata");
    
    // Update user profile
    const updateResult = await usersCollection.updateOne(
      { mobile: phoneNumber },
      { 
        $set: { 
          name: username,
          mobile: phoneNumber,
          preferredLanguages,
          isNewUser: false,
          updatedAt: new Date()
        } 
      }
    );
    
    if (updateResult.matchedCount === 0) {
      await client.close();
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Get updated user data
    const updatedUser = await usersCollection.findOne({ mobile: phoneNumber });
    console.log("updatedUser",updatedUser)
    await client.close();
    
    // Return success response with updated user data
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
    
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message
    });
  }
};






