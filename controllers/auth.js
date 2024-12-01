import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'
import Driver from "../Schemas/Driverschema.js";
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);
export const register = (req, res) => {
  
  //CHECK EXISTING USER
  const q = "SELECT * FROM Users WHERE email = '"+req.body.email+"'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
console.log(req.body)
    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body)
    const q = "INSERT INTO Users (name,email,password,mobileno,gender) VALUES ('"+req.body.name+"','"+req.body.email+"','"+hash+"','"+req.body.mobile+"','"+req.body.gender+"')";
    

    db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const phonelogin = (req, res) => {
  //CHECK EXISTING USER
  console.log("hello234")
  const q = "SELECT * FROM Users WHERE mobileno = '"+req.body.mobile+"'";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data);
console.log(req.body)
    const q = "INSERT INTO Users (mobileno) VALUES ('"+req.body.mobile+"')";
    db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json(data);
    });
  });
};

export const driverregister = async (req, res) => {
  //CHECK EXISTING USER
  
    //Hash the password and create a user
   
     const hashedPassword = bcrypt.hashSync("securePassword123", 10);
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

export const driverregister2 = (req, res) => {

   const { email,sedantype,suvtype,hatchbacktype,luxurytype } = req.body;

  // Convert sedanType array to a comma-separated string (e.g., "manual,auto")
  const sedanTypeStr = sedantype.join(',');
  const suvTypeStr = suvtype.join(',');
  const hatchbackTypeStr = hatchbacktype.join(',');
  const luxuryTypeStr = luxurytype.join(',');  // E.g., ['manual', 'auto'] becomes 'manual,auto'
  const q = "UPDATE Drivers SET sedantype='"+sedanTypeStr+"',suvtype='"+suvTypeStr+"',hatchbacktype='"+hatchbackTypeStr+"',luxurytype='"+luxuryTypeStr+"' WHERE email = '"+req.body.email+"'"
   db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json("User has been created.");
    });
console.log(q)
};

export const login = (req, res) => {
  //CHECK USER
console.log(req.body)
  const q = "SELECT * FROM Users WHERE email = '"+req.body.email+"'";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};



export const driverlogin = async (req, res) => {
  //CHECK USER
  try {
  const client = new MongoClient(uri);
   await client.connect();
   console.log("connected to mongodb")
   const database = client.db("users");
    const collection = database.collection("drivers");
    const driver = await collection.findOne({email:req.body.email});
 
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






