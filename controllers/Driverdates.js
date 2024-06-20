import { db } from "../db.js";

export const Editdriverdates = (req, res)=>{
  console.log(req.body)
    db.query("UPDATE Drivers SET notavilable = '"+req.body.notavilable+"' WHERE id = '"+req.body.id+"' ;", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
export const Notavilabledriverdates = (req, res)=>{
  console.log(req.body)
    db.query("SELECT notavilable from Drivers  WHERE id = '"+req.body.id+"' ;", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
export const driverbookings = (req, res)=>{
  console.log("hello")
  console.log(req.body.bookingtype)
    db.query("SELECT * FROM Bookings WHERE bookingtype='"+req.body.bookingtype+"' AND booking_status='pending' AND JSON_CONTAINS(d_id, '"+req.body.d_id+"', '$') ;", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}


export const Driverstatus = (req, res)=>{
  
    db.query("UPDATE Drivers SET Driverstatus = '"+req.body.status+"' WHERE (id = '"+req.body.d_id+"')", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}


export const Driverdata = (req, res)=>{
  
    db.query("SELECT * FROM Drivers WHERE (id = '"+req.body.d_id+"')", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}