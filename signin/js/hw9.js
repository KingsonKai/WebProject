var flags = [true, true, true, true];          //标记哪一项信息的正误,错则为true
window.onload = function() {
	name_judge();
    id_judge();
    tel_judge();
    mail_judge();
}
function name_judge() {		//判断用户名格式正误
	$('#name').focusout(function() {
        var text = name_check(this.value);
        if (text == "OK!") flags[0] = false;
        	else flags[0] = true;
        $("#name_mess").text(text);
    });
}
function id_judge() {		//判断学号格式正误
	$('#id').focusout(function() {
        var text = id_check(this.value);
        if (text == "OK!") flags[1] = false;
        	else flags[1] = true;
        $("#id_mess").text(text);
    });
}
function tel_judge() {		//判断电话号码格式正误
	$('#tel').focusout(function() {
        var text = tel_check(this.value);
        if (text == "OK!") flags[2] = false;
        	else flags[2] = true;
        $("#tel_mess").text(text);
    });
}
function mail_judge() {		//判断邮箱格式正误
	$('#mail').focusout(function() {
        var text = mail_check(this.value);
        if (text == "OK!") flags[3] = false;
        	else flags[3] = true;
        $("#mail_mess").text(text);
    });
}
function name_check(name) {                //检查用户名
    if (name == "") return "*不能为空";
    if (!name[0].match(/[a-zA-Z]/)) return "[error]首字符应为字母";
    if (name.length < 6) return "[error]用户名长度应大于6";
    if (name.length > 18) return "[error]用户名长度应小于18";
    if ((/[a-zA-Z][\w_]{5,17}/).exec(name)) return "OK!";
    return "[error]出现非法字符";
}
function id_check(id) {                //检查学号
    if (id == "") return "*不能为空";
    if (!id[0].match(/[1-9]/)) return "[error]首位应为1-9";
    if (id.length != 8) return "[error]学号长度应为8";
    if ((/[0-9][\d]{7}/).exec(id)) return "OK!";
    return "[error]出现非法字符";
}
function tel_check(tel) {                //检查电话
    if (tel == "") return "*不能为空";
    if (!tel[0].match(/[1-9]/)) return "[error]首位应为1-9";
    if (tel.length != 11) return "[error]电话长度应为11";
    if ((/[0-9][\d]{10}/).exec(tel)) return "OK!";
    return "[error]出现非法字符";
}

function mail_check(mail) {                //检查邮箱
    if (mail == "") return "*不能为空";
    if ((/^[a-zA-Z0-9_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/).exec(mail))
        return "OK!";
    return "[error]格式错误";
}
function handon() {		//返回信息格式的正误
    if (flags[0]) {
        alert("用户名格式错误，注册失败");
        return false;
    }
    if (flags[1]) {
        alert("学号格式错误，注册失败");
        return false;
    }
    if (flags[2]) {
        alert("电话格式错误，注册失败");
        return false;
    }
    if (flags[3]) {
        alert("邮箱格式错误，注册失败");
        return false;
    }
    return true;
}