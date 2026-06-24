import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';


import { connectDB } from './DB/connectDB.js';
import authRoutes from './Routes/authRoutes.js'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"http://localhost:5173", credentials:true}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)

connectDB().then(app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
}))



