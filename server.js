/**
 * Created by feng on 2017/12/28.
 */


const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');
// const bodyParse = require('body-parser');

/*let app = express();
app.use(express.static(path.join(__dirname, './public')));*/

// need it...
// app.use(bodyParser.urlencoded({ extended: false }));


let server = http.createServer(
  (req,res)=>{
    console.log(req.url,'req');
    //console.log(res,'res');
    var urlObj = url.parse(req.url,true);
    let pathName = urlObj.pathname;
    console.log(urlObj,'urlObj');


    var suffix = pathName.substr(req.url.length - 4, 4);
    var realpath = __dirname + '/';


    /*app.get('/',function (req,res) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('shouye');
    });*/

    if (suffix === '.css') {
      var filename = pathName.substr(5,req.url.length - 5);
     // console.log(filename,'css-filename');

      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(get_file_content(realpath + '/css/' + filename));
    } else if (suffix === '.jpg') {
      var filename = pathName.substr(8,req.url.length - 8);
      //console.log(filename,'jpg-filename');

      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(get_file_content(realpath+'/images/'+filename));

    } else if (suffix.indexOf('.js') != '-1'){
      var filename = pathName.substr(4,req.url.length - 4);
      //console.log(filename,'js-filename');

      res.writeHead(200, { 'Content-Type': 'application/x-javascript' });
      res.end(get_file_content(__dirname + '/js/'+ filename));
    } else if(req.url == '/'){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(get_file_content(__dirname + '/' + 'home.html'));
    } else if(/\/(\?userId=[\s\S]*)+/.test(req.url)){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(get_file_content(__dirname + '/' + 'home.html'));
    }else if(req.url == '/detail.html'){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(get_file_content(__dirname + '/' + 'detail.html'));
    }else if(/\/detail\.html\/(\?goodsId=[\s\S]*)+/.test(req.url)){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(get_file_content(__dirname + '/' + 'home.html'));
    } else if (suffix == 'html'){
      var filename = pathName.substr(1,req.url.length - 1);
      console.log(filename,'html-filename');

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(get_file_content(__dirname + '/' + filename));
    } else if (suffix == '.ico'){

      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(get_file_content(realpath+'/images/iphone.jpg'));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('貌似迷路了，，，');
    }




    /*res.writeHead(200,{"content-type":"text/html"});
    res.end(fs.readFileSync(__dirname+"/"+"home.html","utf8"));*/

    /*else if(/\/(\?userId=[\s\S]*)?/.test(req.url)){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(get_file_content(__dirname + '/' + 'home.html'));
    }*/
  }
).listen(1990,function () {
  console.log('listening 1990 success');
})

function get_file_content(filepath) {
  return fs.readFileSync(filepath);
}



