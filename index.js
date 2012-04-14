#! /usr/bin/env node
require('http').createServer(function (req, res) {
  res.end('ifil')
}).listen(process.env.PORT || 2000)
