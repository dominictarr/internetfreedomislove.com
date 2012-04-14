#! /usr/bin/env node

var connect = require('connect')
var join = require('path').join

console.log(join(__dirname, 'public'))

connect()
  .use(connect.static('public'))
  .use(connect.bodyParser())
  .listen(process.env.PORT || 2000)
