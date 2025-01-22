
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Partnerlogin = async (req, res) => {
   
  try {
  const client = new MongoClient(uri);
   await client.connect();
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

export const Partnerregister = async (req, res) => {

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
            
        fullName: req.body.fullName,
        licenseno: req.body.licenseNumber,
        password: hashedPassword,
        phone: req.body.phone,
        email: req.body.email,
        companyName: req.body.companyName,
        businessType: req.body.businessType,
       };
   
       const result = await collection.insertOne(newDriver);
       console.log("User added:", result);
       return res.status(200).json(result.acknowledged);
       }
       
   
     } catch (err) {
       console.error("Error adding driver:", err);
     } 
     
}
export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
  console.log("cjqhcqjc jhq")
};






