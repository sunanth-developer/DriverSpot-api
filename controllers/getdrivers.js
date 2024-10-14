
import { db } from "../db.js";

export const getdrivers = (req, res)=>{
  let q = `${req.body.driversid}`
    db.query("SELECT * FROM Drivers WHERE id IN ("+q+") ", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);
      
    });
}
export const getdriverslocation = (req, res)=>{
    db.query("SELECT * FROM Drivers WHERE accountStatus = 'active' AND Driverstatus = 'active'AND ridestatus = 'waiting' ", (err, data) => {
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
 export const getdriverbymobile = (req, res)=>{
    db.query("SELECT * FROM Drivers WHERE mobile='"+req.body.mobile+"'", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);

    });
}
 export const getdriverbyaccount = (req, res)=>{
    db.query("SELECT * FROM Drivers WHERE accountStatus='"+req.body.accountStatus+"'", (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);

    });
}
 export const editdriveraccount = (req, res)=>{

const tableName = "Drivers";

const fields = Object.keys(req.body.editdata);
const values = Object.values(req.body.editdata);

const setClause = fields.map(field => `${field} = ?`).join(", ");

const sqlQuery = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;

const queryParams = [...values, req.body.id]; 

 db.query(sqlQuery, queryParams, (err, data) => {
      if (err) return res.status(500).send(err);
     return res.status(200).json(data);

    });
   
}
