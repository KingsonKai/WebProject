var qs = require("querystring");
var path = require("path");
var fs = require("fs");
var url = require("url");

function write(the_user) {    //判断用户是否注册过，没则存储用户
  var count = 0;
  var arr = JSON.parse(fs.readFileSync("./data/data.txt"));
  for (; arr[count]; count++) {
    if (arr[count]['username'] == the_user['username'])
      return "用户名已存在";
    if (arr[count]['userid'] == the_user['userid'])
      return "学号已存在";
    if (arr[count]['usermail'] == the_user['usermail'])
      return "邮箱已存在";
    if (arr[count]['usertel'] == the_user['usertel'])
      return "电话已存在";
  }
  arr[count] = the_user;
  fs.writeFile('./data/data.txt', JSON.stringify(arr), function (err) {
      if (err) throw err;
      console.log('New user\'s saved!');
  });
  return "";
}
function ccheck(username) {   //得到某个已注册的用户资料
  var arr = JSON.parse(fs.readFileSync("./data/data.txt")), res = {};
  for (var count = 0; arr[count]; count++) {
    if (arr[count]['username'] == username) {
      res = arr[count];
      break;
    }
  }
  return res;
}
function sign(response, pathname) {
  console.log("call function sign");
  switch(path.extname(pathname)) {
    case ".html":
      response.writeHead(200, {"Content-Type": "text/html"});
      pathname = "./html/" + pathname;
      break;
    case ".js":
      response.writeHead(200, {"Content-Type": "text/javascript"});
      pathname = "./js/" + pathname;
      break;
    case ".css":
      response.writeHead(200, {"Content-Type": "text/css"});
      pathname = "./css/" + pathname;
      break;
    case ".jpg":
      response.writeHead(200, {"Content-Type": "image/jpeg"});
      pathname = "./image/" + pathname;
      break;
    default:
      response.writeHead(200, {"Content-Type": "application/octet-stream"});
  }
  fs.readFile(pathname,function (err,data){
    if (err) console.error(err);
    response.end(data);
  })
}
function new_page(the_user) {   //创建详情网页
  var body = "<!DOCTYPE html>"+
              "<html>"+
              "<head>"+
              "<title>用户详情</title>"+
              "<meta charset='utf-8'>"+
              "<link rel='stylesheet' type='text/css' href='hw9.css'>"+
              "</head>"+
              "<body>"+
              "<form name='form'>"+
              "<h1>用户详情</h1>"+
              "<div id='con'>"+
              "用户名:<span>"+
              the_user['username']+
              "</span>"+
              "<br />"+
              "学 号 :<span>"+
              the_user['userid']+
              "</span>"+
              "<br />"+
              "电 话 :<span>"+
              the_user['usertel']+
              "</span>"+
              "<br />"+
              "邮 箱 :<span>"+
              the_user['usermail']+
              "</span>"+
              "</div>"+
              "</form></body></html>"
  return body;
}
function check(response, user) {   //跳转用户详情页面
  var the_user = ccheck(user);
  response.writeHead(200, {"Content-Type": "text/html"});
  if (the_user["username"]) {
    response.end(new_page(the_user));
  } else {
    fs.readFile("./html/index.html",function (err,data){
      if (err) console.error(err);
      response.end(data);
    })
  }
}
function saveuser(response, postData) {      //储存用户信息
  var the_user = qs.parse(postData);
  response.writeHead(200, {"Content-Type": "text/html"});
  var write_message = write(the_user);
  if (write_message == "") {                        //注册成功并且跳转详情界面
    response.end(new_page(the_user));
  } else {                                           //注册失败的报错
    fs.readFile("./html/index.html",function (err,data){
      if (err) console.error(err);
      response.write(data);
      response.write("<script type='text/javascript'>alert('" + write_message + "');</script>")
      response.end();
    })
  }
}

exports.sign = sign;
exports.saveuser = saveuser;
exports.check = check;