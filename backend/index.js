import express from 'express';
import { connectDB } from './DB/connectDB.js';
import authRoutes from './Routes/authRoutes.js'
import dotenv from "dotenv";

dotenv.config()
const app = express();

app.get('/',(req,res)=>{
  res.send("Hello Nigga ")
})

app.use('/api/auth', authRoutes)

connectDB().then(app.listen(3000,()=>{
  console.log("Server is running on port 3000...............")
}))



