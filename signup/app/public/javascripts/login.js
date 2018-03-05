var flags = [true, true];          //标记哪一项信息的正误,错则为true
function check() {
    if (flags[0]) {
        alert("[error]用户名格式错误，登录失败");
        return false;
    }
    if (flags[1]) {
        alert("[error]密码格式错误，登录失败");
        return false;
    }
    return true;
}
function name_judge() {     //判断用户名格式正误
    $('#name').focusout(function() {
        var text = name_check(this.value);
        if (text == "OK!") flags[0] = false;
            else flags[0] = true;
        $("#errordisplay").text(text);
    });
}
function password_judge() {
    $("#password").focusout(function() {
        var text = password_check(this.value);
        if (text == "OK!") flags[1] = false;
            else flags[1] = true;
        $("#errordisplay").text(text);
    });
}
function name_check(name) {                //检查用户名
    if (name == "") return "[error]不能为空";
    if (!name[0].match(/[a-zA-Z]/)) return "[error]首字符应为字母";
    if (name.length < 6) return "[error]用户名长度应大于6";
    if (name.length > 18) return "[error]用户名长度应小于18";
    if ((/[a-zA-Z][\w_]{5,17}/).exec(name)) return "OK!";
    return "[error]出现非法字符";
}
function password_check(password) {                //检查密码
    if (password == "") return "[error]不能为空";
    if (password.length < 6) return "[error]密码长度应大于6";
    if (password.length > 12) return "[error]密码长度应小于12";
    if (password.match(/[^a-zA-Z_0-9]/)) return "[error]密码只能由字母，数字，下划线组成";
    return "OK!";
}
window.onload = function() {
    name_judge();
    password_judge();
    $("#regis").click(function() {window.location.href="http://127.0.0.1:8000/regist";});
    $("#log").click(function() {
        if(check()) {
        var name = document.getElementById('name').value;
        var password = document.getElementById('password').value;
            $.ajax({
                url: '/login',
                type: 'post',
                data: {currname:name,currpassword:password},
                success: function(data,status){ 
                    if(status == 'success'){
                        window.location.href = "http://127.0.0.1:8000/details";
                    }
                },
                error: function(data,err){ 
                        window.location.href = "http://127.0.0.1:8000/login";
                }
            });
        } else {window.location.href = "http://127.0.0.1:8000/login";}
    });
}