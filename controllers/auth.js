
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

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






