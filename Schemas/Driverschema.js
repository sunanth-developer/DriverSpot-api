import mongoose from 'mongoose'
console.log("hello")
const driverSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  drivingLicense: { type: String, required: true },
  password: { type: String, required: true }, // Store hashed passwords
  mobile: { type: String, required: true },
  adhar: { type: String, required: true },
  name: { type: String, required: true },
  terms: { type: Boolean, required: true },
  dob: { type: String, required: true },
  pancard: { type: String, required: true },
  telugu: { type: Boolean, required: true },
  hindi: { type: Boolean, required: true },
  english: { type: Boolean, required: true },
  experience: { type: Number, required: true },
},
{
    timestamps:true
}
);
// Create the Driver model
const Driver = new mongoose.model('drivers',driverSchema);

export default Driver;