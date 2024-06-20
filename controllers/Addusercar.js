
import { db } from "../db.js";

export const Addcar = (req, res)=>{
    
   let q="INSERT INTO Usercars (cartype,carname,uid,geartype,registrationno) VALUES ('"+req.body.cartype+"','"+req.body.vehicle+"','"+req.body.uid+"','"+req.body.geartype+"','"+req.body.registrationno+"')"
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
     return  res.status(200).json(data);
      
    });
}
export const Getcar = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Usercars WHERE uid='"+req.body.uid+"'"
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}

export const Editcar = (req, res)=>{
    console.log(req.body.q)
    db.query(req.body.q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}
export const Deletecar = (req, res)=>{
   let q= "DELETE FROM Usercars WHERE id = '"+req.body.id+"'"
   console.log(q)
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}

