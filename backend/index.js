const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.get("/",(req,res) => {
    res.send("Hey")
})
 

app.listen(3000)