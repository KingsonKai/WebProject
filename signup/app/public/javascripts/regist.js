var flags = [true, true, true, true,true,true];          //标记哪一项信息的正误,错则为true
function name_judge() {		//判断用户名格式正误
	$('#name').focusout(function() {
        var text = name_check(this.value);
        if (text == "OK!") flags[0] = false;
        	else flags[0] = true;
        $("#errordisplay").text(text);
    });
}
function id_judge() {		//判断学号格式正误
	$('#id').focusout(function() {
        var text = id_check(this.value);
        if (text == "OK!") flags[1] = false;
        	else flags[1] = true;
        $("#errordisplay").text(text);
    });
}
function tel_judge() {		//判断电话号码格式正误
	$('#phone').focusout(function() {
        var text = tel_check(this.value);
        if (text == "OK!") flags[2] = false;
        	else flags[2] = true;
        $("#errordisplay").text(text);
    });
}
function mail_judge() {		//判断邮箱格式正误
	$('#email').focusout(function() {
        var text = mail_check(this.value);
        if (text == "OK!") flags[3] = false;
        	else flags[3] = true;
        $("#errordisplay").text(text);
    });
}
function password_judge() {
	$("#password").focusout(function() {
        var text = password_check(this.value);
        if (text == "OK!") flags[4] = false;
        	else flags[4] = true;
        $("#errordisplay").text(text);
    });
}
function passwordd_judge() {
	$("#passwordd").focusout(function() {
        var text = passwordd_check(this.value);
        if (text == "OK!") flags[5] = false;
        	else flags[5] = true;
        $("#errordisplay").text(text);
    });
}
function password_check(password) {                //检查密码
    if (password == "") return "[error]不能为空";
    if (password.length < 6) return "[error]密码长度应大于6";
    if (password.length > 12) return "[error]密码长度应小于12";
    if (password.match(/[^a-zA-Z_0-9]/)) return "[error]密码只能由字母，数字，下划线组成";
    return "OK!";
}
function passwordd_check(passwordd) {                //检查密码
	var password=document.getElementById('password').value;
    if(passwordd=="") return "[error]不能为空";
    if(passwordd!=password) return "[error]两次密码输入不同";
    return "OK!";
}
function name_check(name) {                //检查用户名
    if (name == "") return "[error]不能为空";
    if (!name[0].match(/[a-zA-Z]/)) return "[error]首字符应为字母";
    if (name.length < 6) return "[error]用户名长度应大于6";
    if (name.length > 18) return "[error]用户名长度应小于18";
    if ((/[a-zA-Z][\w_]{5,17}/).exec(name)) return "OK!";
    return "[error]出现非法字符";
}
function id_check(id) {                //检查学号
    if (id == "") return "[error]不能为空";
    if (!id[0].match(/[1-9]/)) return "[error]首位应为1-9";
    if (id.length != 8) return "[error]学号长度应为8";
    if ((/[0-9][\d]{7}/).exec(id)) return "OK!";
    return "[error]出现非法字符";
}
function tel_check(tel) {                //检查电话
    if (tel == "") return "[error]不能为空";
    if (!tel[0].match(/[1-9]/)) return "[error]首位应为1-9";
    if (tel.length != 11) return "[error]电话长度应为11";
    if ((/[0-9][\d]{10}/).exec(tel)) return "OK!";
    return "[error]出现非法字符";
}

function mail_check(mail) {                //检查邮箱
    if (mail == "") return "[error]不能为空";
    if ((/^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/).exec(mail))
        return "OK!";
    return "[error]格式错误";
}
function check() {
    if (flags[0]) {
        alert("[error]用户名格式错误，注册失败");
        return false;
    }
    if (flags[4]) {
		alert("[error]密码格式错误，注册失败");
        return false;
    }
    if (flags[5]) {
    	alert("[error]两次输入的密码不一样，注册失败");
        return false;
    }
    if (flags[1]) {
        alert("[error]学号格式错误，注册失败");
        return false;
    }
    if (flags[2]) {
        alert("[error]电话格式错误，注册失败");
        return false;
    }
    if (flags[3]) {
        alert("[error]邮箱格式错误，注册失败");
        return false;
    }
    return true;
}
window.onload = function() {
	name_judge();
	password_judge();
	passwordd_judge()
    id_judge();
    tel_judge();
    mail_judge();
    $("#log").click(function() {window.location.href="http://127.0.0.1:8000/login";});
    $("#regis").click(function() {
        if (check()) {
            var name = document.getElementById('name').value;
            var password = document.getElementById('password').value;
            var id = document.getElementById('id').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            $("#errordisplay").text("");
            $.ajax({
                url: '/regist',
                type: 'post',
                data: {currname:name,currpassword:password,currid:id,curremail:email,currphone:phone},
                success: function(data,status){ 
                    if(status == 'success'){
                        window.location.href = "http://127.0.0.1:8000/details";
                    }
                },
                error: function(data,err){ 
                        window.location.href = "http://127.0.0.1:8000/regist";
                }
            }); 
        } else {
            window.location.href = "http://127.0.0.1:8000/regist";
        }
    });
}
