import { db } from "../db.js";

export const Getbookingstatus = (req, res)=>{
    db.query("select booking_status from Bookings where id='"+req.body.bookingid+"'", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}