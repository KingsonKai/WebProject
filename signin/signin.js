var requestHandlers = require("./requestHandlers");
var path = require("path");
var http = require("http");
var url = require("url");
var qs = require("querystring");

function route(pathname, response, postData, user) {
  if (path.extname(pathname) != "") {
  	//console.log("1");
  	requestHandlers.sign(response, pathname);
  } else if (postData != "") {
  	//console.log("2");
  	requestHandlers.saveuser(response, postData);
  } else if (user) {
  	//console.log("3");
  	requestHandlers.check(response, user);
  } else {
  	//console.log("4");
  	requestHandlers.sign(response, "index.html");
  }
}
function start(route) {     //创建服务器，接受客户端数据
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    //console.log("pathname:"+pathname);
    var get = qs.parse(url.parse(request.url).query);
    //console.log("query:"+url.parse(request.url).query);
    if (typeof get == "undefined") get = {};
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
    });
    request.addListener("end", function() {
      route(pathname, response, postData, get['username']);
    });
  }
  http.createServer(onRequest).listen(8000);
  console.log("Server has started at Localhost:8000");
}

start(route);