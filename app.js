"use strict"

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))
app.use(bodyParser.json({limit:'50mb',extended:true}))

module.exports = app
