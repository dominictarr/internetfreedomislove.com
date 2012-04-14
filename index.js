#! /usr/bin/env node
require('http').createServer(function (req, res) {
  res.end('facebook2')
}).listen(process.env.PORT || 2000)
