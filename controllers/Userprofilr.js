import { db } from "../db.js";
export const Editprofile = (req, res)=>{
  console.log(req.body)
    db.query("UPDATE Users SET name = '"+req.body.editedname+"', email = '"+req.body.editedemail+"', alternatemobile = '"+req.body.editedalternatemobile+"', dob = '"+req.body.editeddob+"' WHERE (id = '"+req.body.uid+"');", (err, data) => {
      if (err) console.log(err);
     return res.status(200).json(data);
    });
}
export const Getprofile = (req, res)=>{
  console.log(req.body)
    db.query("SELECT * FROM Users  WHERE id = '"+req.body.uid+"'", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
    });
}
export const Getusers = (req, res)=>{
  console.log(req.body)
    db.query("SELECT mobileno FROM Users", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
    });
}