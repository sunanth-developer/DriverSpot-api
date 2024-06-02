import { db } from "../db.js";

export const Requestdriver = (req, res)=>{
    console.log(req.body)
   let q="INSERT INTO Bookings (b_id, driver_id, driver_name,startlocation, destination, price, booking_day, car, cartype) VALUES ('"+req.body.bid+"','"+req.body.did+"','"+req.body.dname+"','"+req.body.from+"','"+req.body.to+"','"+req.body.price+"','"+req.body.bookingday+"','"+req.body.car+"','"+req.body.cartype+"')"
    db.query(q, (err, data) => {
      if (err) console.log(err);
     return res.status(200).json(data);
      
    });
}
export const Getrequests = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Bookings WHERE b_id='"+req.body.bid+"'"
    db.query(q, (err, data) => {
      if (err) console.log(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}


export const Getrequestsdriver = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Bookings WHERE driver_id='"+req.body.driverid+"'"
    db.query(q, (err, data) => {
      if (err) console.log(err);
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
