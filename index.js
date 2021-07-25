const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic("./");

const server = http.createServer(function(req, res) {
  let done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(3000);