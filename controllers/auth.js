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
    const q = "INSERT INTO Drivers (name,DOB,email,gender,mobile,password,drivinglisence,adharno,TNC,telugu,english,hindi,totalexperience,pancard) VALUES ('"+req.body.name+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.gender+"','"+req.body.mobile+"','"+hash+"','"+req.body.drivinglisence+"','"+req.body.adhar+"','"+req.body.terms+"','"+req.body.telugu+"','"+req.body.english+"','"+req.body.hindi+"','"+req.body.experience+"','"+req.body.pancard+"')";
    //(email,gender,drivinglisence,password,mobile,adhar,name,terms,dob,pancard,telugu,hindi,english,experience)

    db.query(q, (err, data) => {
      if (err) return console.log(err);
      return res.status(200).json("User has been created.");
    });
  });
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






