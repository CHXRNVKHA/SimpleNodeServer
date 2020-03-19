const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3020;
const notFoundMsg = 'Resourse not found!';
const homePageName = 'index.html';

const notFoundRes = function (res) {
   res.statusCode = 404;
   res.end(`<h1>${notFoundMsg}</h1>`);
}
const showFile = function (filePath, res) {
   if (filePath === '/') {
      filePath = homePageName;
   }
   else {
      filePath = filePath.substr(1);
   }
   fs.readFile(filePath, (err, data) => {
      if (err) {
         notFoundRes(res);
      }
      else {
         res.end(data);
      }
   })
}

const server = http.createServer((req, res) => {
   res.setHeader('Content-Type', 'text/html; charset=utf-8;');
   const filePath = req.url;
   switch (filePath) {
      case '/':
      case '/index.html': {
         showFile(filePath, res);
         break;
      }
      case '/about.html': {
         showFile(filePath, res);
         break;
      }
      case '/contact.html': {
         showFile(filePath, res);
         break;
      }
      default: {
         notFoundRes(res);
         break;
      }
   }
});
server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});
