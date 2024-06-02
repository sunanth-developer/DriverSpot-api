import { db } from "../db.js";

export const Editdriverdates = (req, res)=>{
  let q = `${req.body.driversid}`
    db.query("UPDATE Drivers SET notavilable = '"+req.body.notavilable+"' WHERE id = '"+req.body.id+"' ;", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
