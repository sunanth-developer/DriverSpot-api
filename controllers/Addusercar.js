
import { db } from "../db.js";

export const Addcar = (req, res)=>{
    console.log(req.body)
   let q="INSERT INTO Usercars (cartype,carname,uid) VALUES ('"+req.body.cartype+"','"+req.body.vehicle+"','"+req.body.uid+"')"
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
export const Getcar = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Usercars WHERE uid='"+req.body.aid+"'"
    db.query(q, (err, data) => {
      if (err) return console.log(err);
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

