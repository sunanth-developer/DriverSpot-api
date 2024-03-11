import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM Users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
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
export const driverregister = (req, res) => {
  //CHECK EXISTING USER
  
  const q = "SELECT * FROM Drivers WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
console.log(req.body)
    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body)
    const q = "INSERT INTO Drivers (name,age,DOB,email,gender,mobile,password,drivinglisence,adharno,Luxery,LuxeryExp,Auto,AutoExp,Manual,ManualExp,Luxeryoutstation,Luxeryperday,Luxeryperhour,Luxeryperkm,Luxeryoneway,Luxeryroundtrip,Autooutstation,Autoperday,Autoperhour,Autooneway,Autoroundtrip,Autoperkm,Manualoutstation,Manualperday,Manualperhour,Manualperkm,Manualoneway,Manualroundtrip,Luxerycarsdriven,Autocarsdriven,Manualcarsdriven,Luxerypriceperday,Luxerypriceperhour,Luxerypriceperkm,Luxerypriceoneway,Luxerypriceroundtrip,Autopriceperday,Autopriceperhour,Autopriceperkm,Autopriceoneway,Autopriceroundtrip,Manualpriiceperday,Manualpriiceperhour,Manualpriiceperkm,Manualpriiceoneway,Manualpriiceroundtrip) VALUES ('"+req.body.name+"','"+req.body.email+"','"+hash+"','"+req.body.mobile+"','"+req.body.gender+"')";
    

    db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
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

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};


export const merchantregister = async (req, res) => {
  //CHECK EXISTING USER
   
  const q = "SELECT * FROM Merchants WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt =  bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const q = 
    "INSERT INTO Merchants (storename,email,password,mobile,cars,bikes,scotys) VALUES ('"+req.body.storename+"','"+req.body.email+"','"+hash+"','"+req.body.mobile+"','"+req.body.cars+"','"+req.body.bikes+"','"+req.body.scotys+"')";
    

    db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const merchantlogin = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM Merchants WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
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
    console.log("kbdwkwkfbwkdq",token)
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};




