const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require('cors')
const authRoute = require('./routes/auth')

const  dbURI = "mongodb://localhost/eventiradvehicle"
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoute)


mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})

app.listen(2500, () => {console.log("Server started: 2500")})