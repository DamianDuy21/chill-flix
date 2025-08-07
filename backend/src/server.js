const express = require('express')
require("dotenv").config()
const path = require('path')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 8001
const hostname = process.env.HOST_NAME


//mongoose
const mongoose = require("mongoose")

//connection
const connection = require("./config/database.js")
const User = require('./models/user.js')
const userRouter = require('./routes/userAPI.js')

//cors
app.use(cors());

//config static files
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/v1/api/', userRouter);

(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Example app listening on hostname = ${hostname}, port ${port}`)
        })
    } catch (err) {
        console.log(err)
    }

})()

