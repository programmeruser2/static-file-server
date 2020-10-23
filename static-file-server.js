#!/usr/bin/env node
const mimeTypes = require('mime-types');
const http = require('http');
const fs = require('fs');
module.exports = startServer;
function startServer(port, directory) {
  port = port || process.env.PORT || 8080;
  directory = directory || '';
  directory = directory ? directory+'/' : '';
  const server = http.createServer(function (req,res) {
    let filePath = req.url;
    if(filePath === '/') {
      filePath = 'index.html';
    } else {
      filePath = filePath.slice(1);
    }
    const mimeType = mimeTypes.lookup(filePath);
    if(!mimeType) {
      res.setHeader('Content-Type', 'text/html');
    } else {
      res.setHeader('Content-Type', mimeType);
    }
    fs.readFile(directory + filePath, (err, data) => {
      if(err) {
        if(err.code === 'ENOENT') {
          res.setHeader('Status', 404);
          res.end(err.message);
        } else {
          res.setHeader('Status', 500);
          res.end(err.message)
        }
      } else {
        
        res.end(data);
      }
    });
  });
  server.listen(port);
}