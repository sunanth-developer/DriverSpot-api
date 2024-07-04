import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const driverregister = (req, res) => {
  //CHECK EXISTING USER
  console.log(req.body)
  const q = "SELECT * FROM Drivers WHERE email = '"+req.body.email+"'";
  db.query(q, (err, data) => {
    if (err) return console.log(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body)
    const q = "INSERT INTO Drivers (name,DOB,email,gender,mobile,password,drivinglisence,adharno) VALUES ('"+req.body.name+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.gender+"','"+req.body.mobile+"','"+hash+"','"+req.body.drivinglisence+"','"+req.body.adhar+"')";
    

    db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const driverregister2 = (req, res) => {

    const q = "UPDATE Drivers SET Luxery='"+req.body.luxery+"',LuxeryExp='"+req.body.luxeryexp+"',Auto='"+req.body.auto+"',AutoExp='"+req.body.autoExp+"',Manual='"+req.body.manual+"',ManualExp='"+req.body.manualexp+"',Luxeryoutstation='"+req.body.luxeryoutstation+"',Luxeryperday='"+req.body.luxeryperday+"',Luxeryperhour='"+req.body.luxeryperhour+"',Luxeryperkm='"+req.body.luxeryperkm+"',Luxeryoneway='"+req.body.luxeryoneway+"',Luxeryroundtrip='"+req.body.luxeryroundtrip+"',Autooutstation='"+req.body.autooutstation+"',Autoperday='"+req.body.autoperday+"',Autoperhour='"+req.body.autoperhour+"',Autooneway='"+req.body.autooneway+"',Autoroundtrip='"+req.body.autoroundtrip+"',Autoperkm='"+req.body.autoperkm+"',Manualoutstation='"+req.body.manualoutstation+"',Manualperday='"+req.body.manualperday+"',Manualperhour='"+req.body.manualperhour+"',Manualperkm='"+req.body.manualperkm+"',Manualoneway='"+req.body.manualoneway+"',Manualroundtrip='"+req.body.manualroundtrip+"',Luxerycarsdriven='"+req.body.luxerycarsdriven+"',Autocarsdriven='"+req.body.Autocarsdriven+"',Manualcarsdriven='"+req.body.Manualcarsdriven+"',Luxeryperdayprice='"+req.body.luxerypriceperday+"',Luxeryperhourprice='"+req.body.luxerypriceperhour+"',Luxeryperkmprice='"+req.body.luxerypriceperkm+"',Luxeryonewayprice='"+req.body.luxerypriceoneway+"',Luxeryroundtripprice='"+req.body.luxerypriceroundtrip+"',Autoperdayprice='"+req.body.autopriceperday+"',Autoperhourprice='"+req.body.autopriceperhour+"',Autoperkm='"+req.body.autopriceperkm+"',Autoonewayprice='"+req.body.autopriceoneway+"',Autoroundtripprice='"+req.body.autopriceroundtrip+"',Manualperdayprice='"+req.body.manualpriceperday+"',Manualperhourprice='"+req.body.manualpriceperhour+"',Manualperkmprice='"+req.body.manualpriceperkm+"',Manualonewayprice='"+req.body.manualpriceoneway+"',Manualroundtripprice='"+req.body.manualpriceroundtrip+"' WHERE email = '"+req.body.email+"';"
    

    db.query(q, (err, data) => {
      if (err) return console.log(err);
      console.log(res)
      return res.status(200).json("User has been created.");
    });
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



export const driverlogin = (req, res) => {
  //CHECK USER
  console.log("hello")
  const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash)
console.log(req.body)
  const q = "SELECT * FROM Drivers WHERE email = '"+req.body.email+"'";

  db.query(q, (err, data) => {
    if (err) return console.log("e2f23f",err);
    if (data.length === 0) return console.log("usernot found");
    console.log(data[0].password)
    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    console.log("ssss",isPasswordCorrect)
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.cookie("access_token", token, {
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
  console.log("cjqhcqjc jhq")
};






