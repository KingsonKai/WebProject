//关键思想：把每一个圆圈的结果得到后的回调函数设为调用下一个圆圆取值
//注意:保留了S1的功能，如果不按@+而是直接按ABCDE则当次计算我设置为不可再按@+，移开鼠标再次移来打开计算器就可以重新开始；
window.onload=function() {
    $(".icon-wrap").mouseleave(function() {initialization();});
    $(".icon-wrap").mouseenter(function() {initialization();});
    mouseshape();                                                           //鼠标悬停形状
    $("li").click(function() {getNum(this,function() {});$(".icon").attr("status", "icon_inactive");});         //点击获取随机数
    $(".result").click(function() {result_click(this);});
    $(".icon").click(function() {icon_click($("li"));});
}
function icon_click(circles) {                                              //实现一指禅
    if($(".icon").attr("status")=="icon_active") {                          //防止重复点@+
    var callbacks = [];
    for (var i = 0; i < 4; i++) {										    //把每一个圆圈的结果得到后的回调函数设为调用下一个圆圆取值
        (function(j) {
            callbacks[j] = function() {
                getNum(circles[j + 1], callbacks[j + 1]);
            }
        })(i);
    }
    callbacks[4] = function() {result_click($(".result"));}                 //最后一个数字获得后执行求和
    getNum(circles[0], callbacks[0]);                                //开始获取数字
    $(".icon").attr("status", "icon_inactive");                         //防止得出结果后还点@+
}
}
function initialization() {                                                 //初始化
    $("li span").each(function() {
        $(this).removeClass("clicked");
        $(this).html("");
    });
    $("li").each(function() {
        $(this).attr("status", "active");
        $(this).attr("class", "button active");
    });
    $(".result p").html("");
    $(".result").attr("status", "bubble_inactive");
    $(".result").removeClass("bubbleactive");
    $(".icon").attr("status", "icon_active");
    mouseshape();
}
function mouseshape() {
    $("li").mouseover(function() {
        if ($(this).attr("status") != "active") {
            this.style.cursor = "default";
        } else {
            this.style.cursor = "pointer";
        }
    });
    $(".result").mouseover(function() {
        if ($(this).attr("status") == "bubble_inactive") {
            this.style.cursor = "default";
        } else {
            this.style.cursor = "pointer";
        }
    });
    $(".icon").mouseover(function() {
            this.style.cursor = "pointer";
    });
}
function getNum(clickedcircle, callback) {               //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        var circles = $("li");
        for (var i = 0; i < circles.length; i++) {              //设置点击某个小圆圈获取数字中的所有圆圈样式
            if (circles[i] != clickedcircle && $(circles[i]).attr("status") != "numgot") {
                $(circles[i]).attr("status", "inactive");
                $(circles[i]).attr("class", "button inactive");
            }
        }
        var num = $(clickedcircle).children("span");
        $(num).addClass("clicked");
        $(num).html("...");
        $.get("/", function(data) {
            $(num).html(data);
            num_got_callback(clickedcircle);
            callback();
        });
    }
}
function num_got_callback(clickedcircle) {                          //当前圆圈得到数后回复原来其他圆圈样式
    $(clickedcircle).attr("status", "numgot");
    $(clickedcircle).attr("class", "button numgot");
    $("li").each(function() {
        if ($(this).attr("status") != "numgot") {
            $(this).attr("status", "active");
            $(this).attr("class", "button active");
        }
    });
    if (isallgetnum()) {
        $(".result").addClass("bubbleactive");
        $(".result").attr("status", "bubble_active");
        $(".result").mouseover(function() {
            this.style.cursor = "pointer";
        });
    }
}
function isallgetnum() {                                //判断是否全部圆圈获得随机数
    var flag = true;
        $("li").each(function() {
            if ($(this).attr("status") != "numgot") {
                flag = false;
            }
        });
    return flag;
}


function result_click(clickedcircle) {                  //点击大圆圈
    if ($(clickedcircle).attr("status") === "bubble_active") {
        var sum = 0;
        $("li span").each(function() {
            sum += parseInt($(this).html());
        });
        var text = $(clickedcircle).children();
        $(text).html(sum);
        $(".result").mouseover(function() {
            this.style.cursor = "default";
        });
        $(".icon").mouseover(function() {
            this.style.cursor = "default";
        });
        $(clickedcircle).attr("status", "bubble_inactive");
        $(".result").removeClass("bubbleactive");
    }
}
