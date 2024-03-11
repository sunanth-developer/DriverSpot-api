
import { db } from "../db.js";

export const getdrivers = (req, res)=>{
   
    db.query("SELECT * FROM Drivers", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}