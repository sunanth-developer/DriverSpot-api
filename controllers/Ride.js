import { db } from "../db.js";

export const AcceptRide = (req, res)=>{
    console.log(req.body)
   let q = "UPDATE Bookings SET d_id = '"+req.body.driverid+"', booking_status = 'accepted' WHERE (id = '"+req.body.bookingid+"');"
    db.query(q, (err, data) => {
      if (err) console.log(err);
     return res.status(200).json(data);
      
    });
}

export const UploadRideImages = (req, res)=>{
    console.log(req.body)
   let q = "INSERT INTO Rideimages (selfie, carfront, carback, carleft, carright, driverid, userid,bookingid) VALUES ('"+req.body.selfieimg+"','"+req.body.carfrontimg+"','"+req.body.carbackimg+"','"+req.body.carleftimg+"','"+req.body.carrightimg+"','"+req.body.driverid+"','"+req.body.userid+"','"+req.body.bookingid+"');"
    db.query(q, (err, data) => {
      if (err) console.log(err);
     return res.status(200).json(data);
      
    });
}
export const Getimages = (req, res)=>{
    console.log(req.body)
   let q = "SELECT * FROM Rideimages where id=1;"
    db.query(q, (err, data) => {
      if (err) console.log(err);
     return res.status(200).json(data);
      
    });
}