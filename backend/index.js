import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { connectDB } from './DB/connectDB.js';
import authRoutes from './Routes/authRoutes.js'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"http://localhost:5173", credentials:true}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*path}",(req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend","dist","index.html"));
  });
}

connectDB().then(app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
}))



