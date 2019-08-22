"use strict"

const app = require('./app.js')
const port = process.env.PORT || 3000
const logger = require('morgan')
const Items = require('warframe-items')

app.use(logger('dev'))
app.listen(port, () => {
  console.log("Running on port " + port)
})

function getMelee(req, res) {
  let options = {category:['Melee']}
  let items = new Items(options)
  let result = []
  for(let item of items) {
    result.push(item.name)
  }
  return res.status(200).send(result)
}

function getPrimary(req, res) {
  let options = {category:['Primary']}
  let items = new Items(options)
  let result = []
  for(let item of items) {
    result.push(item.name)
  }
  return res.status(200).send(result)
}

function getSecondary(req, res) {
  let options = {category:['Secondary']}
  let items = new Items(options)
  let result = []
  for(let item of items) {
    result.push(item.name)
  }
  return res.status(200).send(result)
}

function getWarframes(req, res) {
  let options = {category:['Warframes']}
  let items = new Items(options)
  let result = []
  for(let item of items) {
    result.push(item.name)
  }
  return res.status(200).send(result)
}

app.get('/warframe/primary', getPrimary)
