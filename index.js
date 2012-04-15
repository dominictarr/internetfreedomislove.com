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


var signup = fs.readFileSync('public/signup.html', 'utf-8')

app
  .use(express.bodyParser())
  .use(express.router(function (app) {

    app.post('/signup', function (req, res, next) {
      var line = [new Date()]
      for(var k in req.body)
        line.push(req.body[k])
      if(line.length > 1) {
        line = line.map(JSON.stringify).join(',') + '\n'
        logStream.write(line)
      }
      res.end(signup)
    })

    app.get('/download', function(req, res) {
      fs.createReadStream('signup.log').pipe(res)
    })
  }))
  .use(express.static('public'))
  .listen(process.env.PORT || 2000)
