import { db } from "../db.js";

export const Getsharedrides = (req, res)=>{
    console.log(req.body)
   let q = "SELECT * from sharedrides where sharedwith='"+req.body.mobile+"' AND Ridestatus='started' "
    db.query(q, (err, data) => {
      if (err) res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}

export const Getbookingdetails = (req, res)=>{
    console.log(req.body)
   let q = "SELECT * from Bookings WHERE username='"+req.body.mobile+"' AND booking_status='started'"
    db.query(q, (err, data) => {
      if (err) res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}

export const Shareride = (req, res)=>{
    console.log(req.body)
   let q = "INSERT INTO sharedrides (b_id, d_id, usermobile, userlocation, driverlocation, sharedwith, pickuppoint, destination, drivername, drivermobile, vehicleregistration, vehicletype, vehiclename, geartype,driverimage) VALUES ('"+req.body.b_id+"', '"+req.body.d_id+"', '"+req.body.mobile+"', '"+req.body.userlocation+"', '"+req.body.driverlocation+"', '"+req.body.sharedwith+"', '"+req.body.pickuppoint+"', '"+req.body.destination+"', '"+req.body.drivername+"', '"+req.body.drivermobile+"', '"+req.body.vehicleregistration+"', '"+req.body.vehicletype+"', '"+req.body.vehiclename+"','"+req.body.geartype+"','"+req.body.driverimg+"');"                                        
    db.query(q, (err, data) => {
      if (err) res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}

export const  Updateuserlocation = (req, res)=>{
    console.log(req.body)
   let q = "INSERT INTO sharedrides (userlocation) VALUES ('"+req.body.userlocation+"');"
    db.query(q, (err, data) => {
      if (err) res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}

export const Updatedriverlocation = (req, res)=>{
    console.log(req.body)
   let q = "INSERT INTO sharedrides (driverlocation) VALUES ('"+req.body.driverlocation+"');"
    db.query(q, (err, data) => {
      if (err) res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
