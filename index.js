#! /usr/bin/env node
var express = require('express')
var app = express.createServer()
var join = require('path').join
var fs = require('fs')
var es = require('event-stream')
console.log(join(__dirname, 'public'))

/*
  parse a form...
  set, name, question, placeholder
    
*/

var logStream = fs.createWriteStream('signup.log', {flags: 'a', encoding: 'utf-8'})

var signup = fs.readFileSync('public/signup.html', 'utf-8')

app
  .use(express.logger())
  .use(express.bodyParser())
  .use(express.router(function (app) {

    app.post('/signup', function (req, res, next) {
      var line = [new Date()]
      console.log(req.body)
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

    function parseCSV () {
      return es.connect(
          es.split(), 
          es.map(function (l, cb) {
            var line
            try {
               line = JSON.parse('[' + l + ']')
            } catch (e) { cb() }
            cb(null, line)
          })
        )
    }


    app.get('/emails', function (req, res) {
      fs.createReadStream('signup.log')
        .pipe(parseCSV())
        .pipe(es.mapSync(function (line) {
          return line[1] + ', ' + line[2] + '\n'
        }))
        .pipe(res)
    })
    app.get('/details', function (res, res) {
     var fields =  ['date', 'name', 'email', 'show', 'origin', 'message', 'privacy', 'envy', 'sellout', 'comfert', 'skill', 'experience', 'attitude']

    fs.createReadStream('signup.log')
      .pipe(parseCSV())
      .pipe(es.mapSync(function (line) {
        var obj = {}
        var s = ''
        fields.forEach(function (name, i) {
          
          if(Array.isArray(line[i]))
            line[i] = '\n' + line[i].map(function (e) { return '  ' + e }).join('\n')
          s += name + ': ' + line[i] + '\n'

        })

        return s + '\n----------\n\n' 
      }))
      .pipe(res)

    })
  }))
  .use(express.static('public'))
  .listen(process.env.PORT || 2000)
