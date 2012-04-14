#! /usr/bin/env node
var express = require('express')
var app = express.createServer()
var join = require('path').join
var fs = require('fs')

console.log(join(__dirname, 'public'))

/*
  parse a form...
  set, name, question, placeholder
    
*/

var logStream = fs.createWriteStream('signup.log', {flags: 'a', encoding: 'utf-8'})


app
  .use(express.static('public'))
  .use(express.bodyParser())
  .use(express.router(function (app) {

    app.post('/signup', function (req, res) {
      var line = [new Date()]
      for(var k in req.body)
        line.push(req.body[k])
      line = line.map(JSON.stringify).join(',') + '\n'
      logStream.write(line)
      console.log(line)
      res.end('thank you for signing up')
    })

    app.get('/download', function(req, res) {
      fs.createReadStream('signup.log').pipe(res)
    })
  }))
  .listen(process.env.PORT || 2000)
