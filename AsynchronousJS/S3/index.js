//主要思想：把全部圆圈设置调用获取数字的函数
////注意:保留了S1的功能，如果不按@+而是直接按ABCDE则当次计算我设置为不可再按@+，移开鼠标再次移来打开计算器就可以重新开始；
window.onload=function() {
    $(".icon-wrap").mouseleave(function() {initialization();});
    $(".icon-wrap").mouseenter(function() {initialization();});
    mouseshape();                                                                   //鼠标悬停形状
    $("li").click(function() {getNum(this,function() {});$(".icon").attr("status", "icon_inactive");});      //点击获取随机数
    $(".result").click(function() {result_click(this);});
    $(".icon").click(function() {icon_click();});
}
function icon_click() {                                                             //全部圆圈直接进入数字获取状态
    if($(".icon").attr("status")=="icon_active") {
    /*$("li").each(function() {
        getNum(this, function() {result_click($(".result"));});
    });*/
    var cirs=$("li");
    getNum1(cirs[0], function() {result_click($(".result"));});
    getNum2(cirs[1], function() {result_click($(".result"));});
    getNum3(cirs[2], function() {result_click($(".result"));});
    getNum4(cirs[3], function() {result_click($(".result"));});
    getNum5(cirs[4], function() {result_click($(".result"));});
    $(".icon").attr("status", "icon_inactive");                         //防止得出结果后还点@+
}
}
function initialization() {                                                         //初始化
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
    $(".icon").mouseover(function() {
            this.style.cursor = "pointer";
    });
}
function getNum1(clickedcircle, callback) {                         //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        var circles = $("li");
        var num = $(clickedcircle).children("span");
        $(num).addClass("clicked");
        $(num).html("...");
        $.get("1.txt", function(data) {
            $(num).html(data);
            $(clickedcircle).attr("status", "numgot");
            $(clickedcircle).attr("class", "button numgot");
            if (isallgetnum()) {
                $(".result").addClass("bubbleactive");
                $(".result").attr("status", "bubble_active");
                $(".result").mouseover(function() {
                    this.style.cursor = "pointer";
                });
            }
            callback();
        });
    }
}
function getNum2(clickedcircle, callback) {                         //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        var circles = $("li");
        var num = $(clickedcircle).children("span");
        $(num).addClass("clicked");
        $(num).html("...");
        $.get("2.txt", function(data) {
            $(num).html(data);
            $(clickedcircle).attr("status", "numgot");
            $(clickedcircle).attr("class", "button numgot");
            if (isallgetnum()) {
                $(".result").addClass("bubbleactive");
                $(".result").attr("status", "bubble_active");
                $(".result").mouseover(function() {
                    this.style.cursor = "pointer";
                });
            }
            callback();
        });
    }
}
function getNum3(clickedcircle, callback) {                         //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        var circles = $("li");
        var num = $(clickedcircle).children("span");
        $(num).addClass("clicked");
        $(num).html("...");
        $.get("3.txt", function(data) {
            $(num).html(data);
            $(clickedcircle).attr("status", "numgot");
            $(clickedcircle).attr("class", "button numgot");
            if (isallgetnum()) {
                $(".result").addClass("bubbleactive");
                $(".result").attr("status", "bubble_active");
                $(".result").mouseover(function() {
                    this.style.cursor = "pointer";
                });
            }
            callback();
        });
    }
}
function getNum4(clickedcircle, callback) {                         //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        var circles = $("li");
        var num = $(clickedcircle).children("span");
        $(num).addClass("clicked");
        $(num).html("...");
        $.get("4.txt", function(data) {
            $(num).html(data);
            $(clickedcircle).attr("status", "numgot");
            $(clickedcircle).attr("class", "button numgot");
            if (isallgetnum()) {
                $(".result").addClass("bubbleactive");
                $(".result").attr("status", "bubble_active");
                $(".result").mouseover(function() {
                    this.style.cursor = "pointer";
                });
            }
            callback();
        });
    }
}
function getNum5(clickedcircle, callback) {                         //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        var circles = $("li");
        var num = $(clickedcircle).children("span");
        $(num).addClass("clicked");
        $(num).html("...");
        $.get("5.txt", function(data) {
            $(num).html(data);
            $(clickedcircle).attr("status", "numgot");
            $(clickedcircle).attr("class", "button numgot");
            if (isallgetnum()) {
                $(".result").addClass("bubbleactive");
                $(".result").attr("status", "bubble_active");
                $(".result").mouseover(function() {
                    this.style.cursor = "pointer";
                });
            }
            callback();
        });
    }
}
function isallgetnum() {                //判断是否全部圆圈获得随机数
    var flag = true;
        $("li").each(function() {
            if ($(this).attr("status") != "numgot") {
                flag = false;
            }
        });
    return flag;
}
function result_click(clickedcircle) {              //点击大圆圈
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
