require('http').createServer(function (req, res) {
  res.end('HELLO')
}).listen(process.env.PORT || 2000)
