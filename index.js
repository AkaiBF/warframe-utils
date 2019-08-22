"use strict"

const app = require('./app.js')
const port = process.env.PORT || 3000
const logger = require('morgan')
const Items = require('warframe-items')

app.use(logger('dev'))
app.listen(port, () => {
  console.log("Running on port " + port)
})

function checkMelee(component) {
  const components = ['Hilt', 'Blade', 'Blueprint']
  for(let i of components) {
    if(i==component) {
      return true
    }
  }
  return false
}

function getMeleeResources(req, res) {
  let pre = req.body.items
  let options = {category:['Melee']}
  let items = new Items(options)
  let result = []
  for(let i of pre) {
    for(let j of items) {
      if(i == j.name) {
        for(let component of j.components) {
          let found = false
          for(let rcomponent of result) {
            if(rcomponent.name == component.name) {
              rcomponent += component.itemCount
              found = true
            }
          }
          if(!found) {
            if(checkMelee(component.name)) {
              result.push({name:j.name + ' ' + component.name, number:component.itemCount})
            } else {
              result.push({name:component.name, number:component.itemCount})
            }
          }
        }
      }
    }
  }
  return res.status(200).send(result)
}

function getMelee(req, res) {
  let options = {category:['Melee']}
  let items = new Items(options)
  let result = []
  for(let item of items) {
    result.push(item.name)
  }
  return res.status(200).send(result)
}

function checkPrimary(component) {
  const components = ['Receiver', 'Stock', 'Barrel', 'Blueprint']
  for(let i of components) {
    if(i==component) {
      return true
    }
  }
  return false
}

function getPrimaryResources(req, res) {
  let pre = req.body.items
  let options = {category:['Primary']}
  let items = new Items(options)
  let result = []
  for(let i of pre) {
    for(let j of items) {
      if(i == j.name) {
        for(let component of j.components) {
          let found = false
          for(let rcomponent of result) {
            if(rcomponent.name == component.name) {
              rcomponent += component.itemCount
              found = true
            }
          }
          if(!found) {
            if(checkPrimary(component.name)) {
              result.push({name:j.name + ' ' + component.name, number:component.itemCount})
            } else {
              result.push({name:component.name, number:component.itemCount})
            }
          }
        }
      }
    }
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

function checkSecondary(component) {
  const components = ['Receiver', 'Stock', 'Barrel', 'Blueprint']
  for(let i of components) {
    if(i==component) {
      return true
    }
  }
  return false
}

function getSecondaryResources(req, res) {
  let pre = req.body.items
  let options = {category:['Secondary']}
  let items = new Items(options)
  let result = []
  for(let i of pre) {
    for(let j of items) {
      if(i == j.name) {
        for(let component of j.components) {
          let found = false
          for(let rcomponent of result) {
            if(rcomponent.name == component.name) {
              rcomponent += component.itemCount
              found = true
            }
          }
          if(!found) {
            if(checkSecondary(component.name)) {
              result.push({name:j.name + ' ' + component.name, number:component.itemCount})
            } else {
              result.push({name:component.name, number:component.itemCount})
            }
          }
        }
      }
    }
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

function checkWarframe(component) {
  const components = ['Blueprint', 'Neuroptics', 'Chassis', 'Systems']
  for(let i of components) {
    if(i == component) {
      if(i == 'Blueprint') return 0
        return 1
    }
  }
  return 2
}

function checkParts(component) {
  const comp = 'Blueprint'
  if(comp == component)
    return true
  return false
}

function getWarframeResources(req, res) {
  let pre = req.body.items
  let options = {category:['Warframes']}
  let items = new Items(options)
  let result = []
  for(let i of pre) {
    for(let j of items) {
      if(i == j.name) {
        for(let component of j.components) {
          let found = false
          for(let rcomponent of result) {
            if(rcomponent.name == component.name) {
              rcomponent.number += component.itemCount
              found = true
            }
          }
          if(!found) {
            switch(checkWarframe(component.name)) {
              case 0:
                result.push({name:i+ ' ' + component.name, number:component.itemCount})
                break
              case 1:
                let wfparts = new Items('Misc')
                for(let k of wfparts) {
                  if(k.name == i + ' ' + component.name) {

                    for(let partcomp of k.components) {
                      let fou = false
                      for(let rcomponent of result) {
                        if(rcomponent.name == partcomp.name) {
                          rcomponent.number += partcomp.itemCount
                          fou = true
                        }
                      }
                      if(!fou) {
                        if(checkParts(partcomp.name)) {
                          result.push({name:k.name + ' ' + partcomp.name, number:partcomp.itemCount})
                        } else {
                          result.push({name:partcomp.name, number:partcomp.itemCount})
                        }
                      }
                    }
                  }
                }
                break
              case 2:
                result.push({name:component.name, number:component.itemCount})
                break
            }
          }
        }
      }
    }
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
app.get('/warframe/secondary', getSecondary)
app.get('/warframe/melee', getMelee)
app.get('/warframe/warframes', getWarframes)
app.post('/warframe/primary-resources', getPrimaryResources)
app.post('/warframe/secondary-resources', getSecondaryResources)
app.post('/warframe/melee-resources', getMeleeResources)
app.post('/warframe/warframe-resources', getWarframeResources)