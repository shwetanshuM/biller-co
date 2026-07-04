require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const {adminRouter}=require("./routes/admin")
const {membersRouter}=require("./routes/members")
const { paymentsRouter } = require("./routes/payments")

const app=express()
const cors = require("cors")
app.use(cors())  
app.use(express.json())
app.use("/admin",adminRouter)
app.use("/members",membersRouter)
app.use("/payments",paymentsRouter)



async function main(){
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(3000)
  console.log("listening")
}

main()