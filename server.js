const express = require('express');
const mongoose = require('mongoose');
const connection = require('./config/db');
const router = require('./routes/user.routes');
const app = express();

app.use(express.json());

connection()

app.use("/", router)
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})