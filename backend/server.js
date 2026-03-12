import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'


const app = express()
const PORT = 5002

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('Backend is Working')
})

app.get('/api/test',(req,res)=>{
  res.json({message:"API works"})
})

app.use("/auth",authRoutes)
app.listen(PORT,() => {
  console.log(`Server running on http://localhost:${PORT}`);
})