var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	if(req.session.user == null) res.redirect("/login");
    if (req.query.username) {
    	if (req.session.user.name == req.query.username) res.redirect("/details");
    	else {
    		req.session.error = "只能够访问自己的数据"
    		res.redirect("/details");
    	}
    } else {
    	res.redirect("/details");
    }
});
router.route("/regist").get(function(req,res) {
	res.render("regist");
}).post(function(req,res) {
	var User = global.getmodel.getModel('user');
	var currname = req.body.currname;
	var currpassword = req.body.currpassword;
	var curremail = req.body.curremail;
	var currid = req.body.currid;
	var currphone = req.body.currphone;
	User.findOne({"name": currname},function(err,doc) {
		if (err) {
			res.sendStatus(500);
			req.session.error =  '获取用户信息失败，请重试';
			console.log(err);
		} else if (doc) {
			req.session.error = '用户名已被注册';
			res.sendStatus(500);
		} else {
			User.findOne({"email":curremail}, function(err, doc) {
				if (err) { 
					res.sendStatus(500);
					req.session.error =  '获取用户信息失败，请重试';
					console.log(err);
				} else if (doc) { 
					req.session.error = '邮箱已被注册';
					res.sendStatus(500);
				} else {
					User.findOne({"phone":currphone}, function(err, doc) {
						if (err) { 
							res.sendStatus(500);
							req.session.error =  '获取用户信息失败，请重试';
							console.log(err);
						} else if (doc) { 
							req.session.error = '电话已被注册';
							res.sendStatus(500);
						} else {
							User.findOne({"id":currid}, function(err, doc) {
								if (err) {
									res.sendStatus(500);
									req.session.error = "获取用户信息失败，请重试";
									console.log(err);
								}else if (doc) {
									req.session.error = "学号已被注册";
									res.sendStatus(500);
								} else {
									User.create({
										name: currname,
										password: currpassword,
										id: currid,
										email: curremail,
										phone: currphone
									}, function(err, doc) {
										if (err) {
											res.sendStatus(500);
										} else {
											req.session.user = doc;
											res.sendStatus(200);
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});
router.get('/details', function(req, res, next) {
	if(!req.session.user){
		req.session.error = "请先登录"
		res.redirect("/login");
	}
	res.render("details");
});
router.get('/logout', function(req, res, next) {
	req.session.user = null;
	req.session.error = null;
	res.redirect("/login");    
});
router.route("/login").get(function(req,res){
	res.render("login");
}).post(function(req,res) {
	var User = global.getmodel.getModel('user');  
	var currname = req.body.currname;
	var currpassword = req.body.currpassword;
	User.findOne({"name":currname},function(err,doc) {
		if(err){
			res.sendStatus(500);
			req.session.error =  '获取用户信息失败，请重试';
			console.log(err);
		} else if (!doc){
			req.session.error = '用户不存在';
			res.sendStatus(500);
		} else { 
			if(currpassword != doc.password) {
				req.session.error = "密码错误";
				res.sendStatus(500);
			} else {
				req.session.user = doc;
				res.sendStatus(200);
			}
		}
	});
});
module.exports = router;
