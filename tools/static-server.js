#!/usr/bin/env node
// Simple static file server
// Usage: node static-server.js [root] [port]
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.argv[2] || '.';
const port = parseInt(process.argv[3], 10) || 8000;

const mime = {
  '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.svg':'image/svg+xml',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.json':'application/json', '.txt':'text/plain'
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURI(req.url.split('?')[0]);
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
    const filePath = path.join(process.cwd(), root, urlPath);
    if (!filePath.startsWith(path.join(process.cwd(), root))) {
      res.writeHead(403);
      return res.end('Forbidden');
    }
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, {'Content-Type':'text/plain'});
        return res.end('404 Not Found');
      }
      const ext = path.extname(filePath).toLowerCase();
      const type = mime[ext] || 'application/octet-stream';
      res.writeHead(200, {'Content-Type': type});
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}/`);
});
