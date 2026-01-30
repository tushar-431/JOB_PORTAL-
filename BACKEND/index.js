import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from './utils/db.js'
import userRouter from "./routes/user.routes.js"
import companyRouter from "./routes/company.routes.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.routes.js"
import path from "path"

dotenv.config({})
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};


app.use(cors(corsOptions))


const PORT = process.env.PORT || 5001


//api's
app.use('/api/user', userRouter)
app.use('/api/company', companyRouter)
app.use('/api/job', jobRouter)
app.use('/api/application', applicationRouter)


// ------- code for deployment --------

if(process.env.Node_Env === "production"){
  console.log("first")
  const dirpath = path.resolve();
  app.use(express.static("./FRONTEND/dist"))

  app.get('/', (req,res)=>{
    res.sendFile(path.resolve(dirpath, "./FRONTEND/dist", "index.html"))

  console.log("first2",dirpath )
  app.get('/', (req,res)=>{
    console.log("first3")
    // res.sendFile(path.resolve(dirpath, "./FRONTEND/dist", "index.html"))

  })
} 


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`)
})
