
import { db } from "../db.js";

export const Adduseraddress = (req, res)=>{
    console.log(req.body)
   let q="INSERT INTO Useraddress (addresstitle,address,aid) VALUES ('"+req.body.addresstitle+"','"+req.body.address+"','"+req.body.aid+"')"
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
export const Getuseraddress = (req, res)=>{
    console.log(req.body)
   let q="SELECT * FROM  Useraddress WHERE aid='"+req.body.aid+"'"
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}

export const Edituseraddress = (req, res)=>{
    console.log(req.body.q)
    db.query(req.body.q, (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
     
    });
}
export const Deleteuseraddress = (req, res)=>{
   let q= "DELETE FROM Useraddress WHERE id = '"+req.body.id+"'"
   console.log("    qfqfq3",q)
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
       console.log(data)
     return res.status(200).json(data);
     
    });
}

