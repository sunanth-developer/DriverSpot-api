import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Partnerlogin = async (req, res) => {
   console.log("req.body",req.body)
  try {
  const client = new MongoClient(uri);
   await client.connect();
   const database = client.db("Partners");
    const collection = database.collection("profile");
    const driver = await collection.findOne({mobile:req.body.mobile});
    console.log(driver)
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
  console.log("req.body",req.body.formData)
  try {
    // First validate that password exists
    if (!req.body.formData.password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    // Log the request body for debugging
    console.log("Registration request body:", req.body);

    const hashedPassword = bcrypt.hashSync(req.body.formData.password, 10);
    
    // Create a new partner object
    const newPartner = {
      fullName: req.body.formData.fullName,
      password: hashedPassword,
      mobile: req.body.formData.phone,
      email: req.body.formData.email,
      companyName: req.body.formData.companyName,
      businessType: req.body.formData.businessType,
    };

    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db("Partners");
    const collection = database.collection("profile");

    // Check if partner already exists
    const partnerExists = await collection.findOne({ mobile: req.body.formData.phone });
    console.log("Existing partner check:", partnerExists);

    if (partnerExists) {
      await client.close();
      return res.status(200).json({
        success: false,
        message: "Partner already exists"
      });
    }

    // Insert new partner
    const result = await collection.insertOne(newPartner);
    console.log("Registration result:", result);

    await client.close();
    return res.status(200).json({
      success: true,
      message: "Partner registered successfully",
      partnerId: result.insertedId
    });

  } catch (err) {
    console.error("Error in partner registration:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};

//endpoint for updating account status of the partner 
export const updateAccountStatus = async (req, res) => {
  try {
    const { partnerId, status } = req.body;
    const validStatuses = ["active", "inactive", "suspended"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid account status" });
    }

    await client.connect();
    const database = client.db("Partners");
    const collection = database.collection("profile");

    const result = await collection.updateOne(
      { _id: new ObjectId(partnerId) },
      { $set: { accountStatus: status } }
    );

    await client.close();

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }

    res.status(200).json({ success: true, message: "Account status updated successfully" });
  } catch (err) {
    console.error("Error updating account status:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


//endpoint to get all the partners with details 
export const getAllPartners = async (req, res) => {
  try {
    await client.connect();
    const database = client.db("Partners");
    const collection = database.collection("profile");

    const partners = await collection.find({}).toArray();

    res.status(200).json({ success: true, data: partners });
  } catch (err) {
    console.error("Error fetching partners:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
};


//get partner by status 
export const getPartnerbyStatus = async (req, res) => {
  try {
    const { status } = req.body;  
    const validStatuses = ["active", "inactive", "suspended"];
    const query = {};

    if (status) {
      let statuses = Array.isArray(status) ? status : [status];

      statuses = statuses.filter((s) => validStatuses.includes(s));

      if (statuses.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid account status provided" });
      }

      query.accountStatus = { $in: statuses };
    }

    await client.connect();
    const database = client.db("Partners");
    const collection = database.collection("profile");

    const partners = await collection.find(query).toArray();

    if (partners.length === 0) {
      return res.status(404).json({ success: false, message: "No partners found" });
    }

    res.status(200).json({ success: true, data: partners });
  } catch (err) {
    console.error("Error fetching partners:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
};


export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
  console.log("cjqhcqjc jhq")
};


 

//endpoint to get partner checklist
export const getPartnerChecklist = async (req, res) => {
  try {
    const { partnerId } = req.body;  

    await client.connect();
    const database = client.db("Partners");
    const collection = database.collection("profile");

    const partner = await collection.findOne({ _id: new ObjectId(partnerId) });

    if (!partner) {
      await client.close();
      return res.status(404).json({ success: false, message: "Partner not found" });
    }

    const checklist = {
      companyNameVerification: partner.companyNameVerification || false,
      businessTypeVerification: partner.businessTypeVerification || false,
      licenseNumberVerification: partner.licenseNumberVerification || false,
      gstNumberVerification: partner.gstNumberVerification || false,
      locationVerification: partner.locationVerification || false,
    };

    res.status(200).json({ success: true, checklist });
  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
};

//endpoint to update partner checklist
export const updatePartnerChecklist = async (req, res) => {
  try {
    const { partnerId, ...updateFields } = req.body;  

    await client.connect();
    const database = client.db("Partners");
    const collection = database.collection("profile");

    const result = await collection.updateOne(
      { _id: new ObjectId(partnerId) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Partner not found" });
    }

    res.status(200).json({ success: true, message: "Checklist updated successfully" });
  } catch (err) {
    console.error("Error updating checklist:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    await client.close();
  }
};





