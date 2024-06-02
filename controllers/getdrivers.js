
import { db } from "../db.js";

export const getdrivers = (req, res)=>{
  let q = `${req.body.driversid}`
    db.query("SELECT * FROM Drivers WHERE id IN ("+q+") ", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
export const getdriverslocation = (req, res)=>{
    db.query("SELECT * FROM Drivers ", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}


export const searchDrivers = (req, res)=>{
   console.log("wf  wf  fw",req.body.query)
    db.query(req.body.query, (err, data) => {
      if (err) return res.status(500).send(err);
      
      console.log(data)
     return res.status(200).json(data);
    
      
    });
}

