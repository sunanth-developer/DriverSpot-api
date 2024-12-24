
import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);// Import your Mongoose User model

export const Allmessage = (req, res)=>{
  const query = `
    SELECT 
      cm.message_id, cm.customer_id, cm.message_text, cm.status, cm.message_timestamp,
      er.response_id, er.executive_id, er.response_text, er.response_timestamp
    FROM CustomerMessages cm
    LEFT JOIN ExecutiveResponses er ON cm.message_id = er.message_id;
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
}
export const Message = (req, res)=> {
  const { customer_id, message_text } = req.body;

  const query = 'INSERT INTO CustomerMessages (customer_id, message_text) VALUES (?, ?)';
  db.query(query, [customer_id, message_text], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message_id: results.insertId, customer_id, message_text });
  });
}

// Add new executive response
export const Responce = (req, res) => {
  const { message_id, executive_id, response_text } = req.body;

  const query = 'INSERT INTO ExecutiveResponses (message_id, executive_id, response_text) VALUES (?, ?, ?)';
  db.query(query, [message_id, executive_id, response_text], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ response_id: results.insertId, message_id, executive_id, response_text });
  });
}
