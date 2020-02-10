//Simple HTTP Server
/*const http  = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res)=>{
        console.log(req.headers);
        res.statusCode = 200 ;
        res.setHeader = ('Conten-type','text/html');
        res.end('<html><body><h1>Hello, World</h1></body></html> ');
} )

server.listen(port,hostname,()=>{
    console.log(`Sever running at http://${hostname}:${port}/`);
})
*/

//Using fs,path,http core modules
const http  = require('http');
const path = require('path');
const fs  = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) =>{
        console.log("Server running for URl :" + req.url+" for method: "+req.method);
        if(req.method =='GET'){
        var fileVar;
        if(req.url=='/') fileVar = '/index.html';
        else fileVar=req.url;
        var flVar  = path.resolve('./public'+fileVar);
        const fileExt = path.extname(flVar);
        if(fileExt=='.html'){
            fs.exists(flVar,(exists)=>{
                if(!exists){
                res.statusCode = 404;
                res.setHeader  = ('Content-Type','text/html');
                res.end('<html><body><h1>Error 404 '+fileVar+'Page Does not Exist</h1></body></html>');
                return ;

            }
            res.statusCode = 200;
            res.setHeader  = ('Content-Type','text/html');
            fs.createReadStream(flVar).pipe(res);

            });
        }
        else{
            res.statusCode = 404;
            res.setHeader  = ('Content-Type','text/html');
            res.end('<html><body><h1>Error 404<br> '+flVar+'Extension Does not Exist</h1></body></html>');
            
        }
        }
        else{
            res.statusCode = 404;
            res.setHeader  = ('Content-type','text/html');
            res.end('<html><body><h1>Error 404<br> '+req.method+'method not supported</h1></body></html>');
            
        } 
})
/*

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);
  
    if (req.method == 'GET') {
      var fileUrl;
      if (req.url == '/') fileUrl = '/index.html';
      else fileUrl = req.url;
  
      var filePath = path.resolve('./public'+fileUrl);
      const fileExt = path.extname(filePath);
      if (fileExt == '.html') {
        fs.exists(filePath, (exists) => {
          if (!exists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          fs.createReadStream(filePath).pipe(res);
        });
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
      }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }
  })*/
  server.listen(port , hostname , ()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})