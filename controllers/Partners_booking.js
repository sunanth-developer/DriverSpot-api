import { MongoClient } from 'mongodb';
const uri ="mongodb+srv://sunanthsamala7:MmQXJz6cCKld1vsY@users.lzhtx.mongodb.net/?retryWrites=true&w=majority&appName=users"
const client = new MongoClient(uri);

export const pickupanddropbooking = async (req, res) => {
    try {
        console.log(req.body)
        const newBooking ={
          p_id:  req.body.partnerId,
          pickup_location: req.body.pickupPoint,
          drop_location: req.body.destination,
          booking_type: req.body.bookingType,
          carname: req.body.carName,
          cartype: req.body.vehicleType,
          transmission: req.body.gearType,
          registrationNo: req.body.registrationNo,
          schedule_date: req.body.scheduleDateTime,
          serviceName: req.body.serviceName,
          booking_status: req.body.status,
        };
        await client.connect();
        console.log("client",newBooking)
        const database = client.db("Partners");
    const collection = database.collection("bookings");
        const savedBooking = await collection.insertOne(newBooking);
        console.log(savedBooking)
        return res.status(200).json(savedBooking);
       
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    };






export const logisticsbooking = async (req, res) => {
    try {
        console.log(req.body)
        const newBooking ={
          p_id: req.body.userId,
          pickup_location: req.body.pickupPoint,
          drop_location: req.body.destination,
          username: req.body.mobileno,
          schedule_date: req.body.scheduledDateTime,
          serviceName: req.body.serviceName,
          booking_status: req.body.status,
          eliteDrivers: req.body.eliteDrivers,
          proDrivers: req.body.proDrivers,
          luxuryDrivers: req.body.luxuryDrivers,
          start_time: req.body.startTime,
          end_time: req.body.endTime,
          
        };
        await client.connect();
        console.log("client",newBooking)
        const database = client.db("Partners");
    const collection = database.collection("bookings");
        const savedBooking = await collection.insertOne(newBooking);
        console.log(savedBooking)
        return res.status(200).json(savedBooking);
       
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    };



    export const valetbooking = async (req, res) => {
        try {
            console.log(req.body)
            const newBooking ={
              p_id: req.body.userId,
              start_location: req.body.location,
              booking_type: req.body.bookingType,
              triptype: req.body.tripType,
              username: req.body.mobileno,
              bookingtype: req.body.bookingType,
              schedule_date: req.body.scheduledDateTime,
              serviceName: req.body.serviceName,
              booking_status: req.body.status,
              eliteDrivers: req.body.eliteDrivers,
              proDrivers: req.body.proDrivers,
              luxuryDrivers: req.body.luxuryDrivers,
              start_time: req.body.startTime,
              end_time: req.body.endTime,
              
            };
            await client.connect();
            console.log("client",newBooking)
            const database = client.db("Partners");
        const collection = database.collection("bookings");
            const savedBooking = await collection.insertOne(newBooking);
            console.log(savedBooking)
            return res.status(200).json(savedBooking);
           
          } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
          }
        };
    


        export const partnerbookings = async(req, res)=>{
  
            const query = {// Match bookingtype
              p_id: req.body.id, // Match any value in d_id array
            };
            console.log("query",query)
            const client = new MongoClient(uri);
            const database = client.db("Partners");
            const collection = database.collection("bookings");
          
            const data = await collection.find({p_id:req.body.id}).toArray();
            console.log("data",data)
            return res.status(200).json(data);
          
          }
          