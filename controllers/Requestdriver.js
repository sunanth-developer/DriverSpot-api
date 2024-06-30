import { db } from "../db.js";

export const Requestdriver = (req, res)=>{
    console.log(req.body)
   let q="INSERT INTO Bookings (b_id,d_id,booking_status,startlocation,destination,price,car,cartype,triptype,username,bookingtype,ride_distance,Expected_time) VALUES ('"+req.body.uid+"','"+req.body.driverids+"','"+req.body.bookingstatus+"','"+req.body.pickup+"','"+req.body.destinationp+"','"+req.body.price+"','"+req.body.carname+"','"+req.body.cartype+"','"+req.body.triptype+"','"+req.body.mobileno+"','"+req.body.bookingtype+"','"+req.body.distance+"','"+req.body.time+"')"
    db.query(q, (err, data) => {
      if (err)res.status(500).send(err);
     return res.status(200).json(data);

      
    });
}
export const Getrequests = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Bookings WHERE b_id='"+req.body.bid+"'"
    db.query(q, (err, data) => {
      if (err)res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}

export const Getfilterrequests = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Bookings WHERE b_id='"+req.body.bid+"' AND bookingtype='"+req.body.val+"'"
    db.query(q, (err, data) => {
      if (err)res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}


export const Getrequestsdriver = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Bookings WHERE d_id='"+req.body.driverid+"'"
    db.query(q, (err, data) => {
      if (err)res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}

export const Editresponce = (req, res)=>{
   let q= "UPDATE Bookings SET booking_status = '"+req.body.responce+"' WHERE id = "+req.body.id+" "
   console.log(q)
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}
export const Deleterequest = (req, res)=>{
   let q= "DELETE FROM Usercars WHERE id = '"+req.body.id+"'"
   console.log(q)
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}
