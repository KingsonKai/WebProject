//关键思路：前面部分和S4没差什么，关键一点在于运用一个函数数组装载abcde五个Handler，按照rand随机顺序轮到谁了就调用谁的Handler
////注意:保留了S1的功能，如果不按@+而是直接按ABCDE则当次计算我设置为不可再按@+，移开鼠标再次移来打开计算器就可以重新开始；
window.onload=function() {
    $(".icon-wrap").mouseleave(function() {initialization();});
    $(".icon-wrap").mouseenter(function() {initialization();});
    mouseshape();                                                        //鼠标悬停形状
    $("li").click(function() {getNum(this,function() {});$(".icon").attr("status", "icon_inactive");});        //点击获取随机数
    $(".result").click(function() {result_click(this);});
    $(".icon").click(function() {icon_click($("li"), resultHandler);});
}
function icon_click(circles, resultHandler) {                                  //实现乱点鸳鸯
    if($(".icon").attr("status")=="icon_active") {
    var rand=[-1,-1,-1,-1,-1];
    for(var count=0;count<5;count++) {
        (function(j) {
            var temp=0;
            do{
                temp=Math.floor(Math.random() * 5);
            } while(ishad(temp,rand));                                  //防止重复
            rand[j]=temp;
        })(count);
    }
    show_order(rand);                                                   //把A~E顺序打印出来
    var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
    var callbacks = [];
    for (var i = 0; i < 4; i++) {
        (function(i) {
            callbacks[i] = function(message, currentSum) {
                if (message) {
                    $("#order").html(message);
                }
                handlers[rand[i + 1]](circles[rand[i + 1]], currentSum, callbacks[i + 1]);
            }
        })(i);
    }
    callbacks[4] = resultHandler;
    handlers[rand[0]](circles[rand[0]], 0, callbacks[0]);
    $(".icon").attr("status", "icon_inactive");                         //防止得出结果后还点@+
}
}

function resultHandler(message, currentSum) {
    $(".result").addClass("bubbleactive");
    if (message) {
        $("#order").html(message);
    }
    setTimeout(function() {
        var text = $(".result").children();
        $(text[0]).html(currentSum);
        $("#order").html("大气泡：楼主异步调用战斗力感人，目测不超过" + currentSum);
        $(".result").removeClass("bubbleactive");
    }, 2000);
}

function aHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        numgetting_style(obj);                                              //点击某个小圆圈时右上角出现三个点，其他圆圈变灰
        $.get("/", function(data) {
            if (Math.random() > 0.5) {										// 随机决定请求是否成功
                $("#order").html("A：这是个天大的秘密");
                buttons_renew(obj, data);                                 //当前圆圈得到数后回复原来其他圆圈样式
                callback(null, currentSum + parseInt(data));
            } else { 														// 不成功则传递错误信息
                var message = "A：这不是个天大的秘密";
                buttons_renew(obj, data);
                callback(message, currentSum + parseInt(data));
            }
        });
    }
}

function bHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        numgetting_style(obj);
        $.get("/", function(data) {
            if (Math.random() > 0.5) {
                $("#order").html("B: 我不知道");
                buttons_renew(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var message = "B：我知道";
                buttons_renew(obj, data);
                callback(message, currentSum + parseInt(data));
            }
        });
    }
}

function cHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        numgetting_style(obj);
        $.get("/", function(data) {
            if (Math.random() > 0.5) {
                $("#order").html("C: 你不知道");
                buttons_renew(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var message = "C：你知道";
                buttons_renew(obj, data);
                callback(message, currentSum + parseInt(data));
            }
        });
    }
}

function dHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        numgetting_style(obj);
        $.get("/", function(data) {
            if (Math.random() > 0.5) {
                $("#order").html("D: 他不知道");
                buttons_renew(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var message = "D：他知道";
                buttons_renew(obj, data);
                callback(message, currentSum + parseInt(data));
            }
        });
    }
}

function eHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        numgetting_style(obj);
        $.get("/", function(data) {
            if (Math.random() > 0.5) {
                $("#order").html("E：才怪");
                buttons_renew(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var message = "E：不怪";
                buttons_renew(obj, data);
                callback(message, currentSum + parseInt(data));
            }
        });
    }
}
function numgetting_style(obj) {                                    //点击某个小圆圈时右上角出现三个点，其他圆圈变灰
    var circles = $("li");
    for (var i = 0; i < circles.length; i++) {
        if (circles[i] != obj && $(circles[i]).attr("status") != "numgot") {
            $(circles[i]).attr("status", "inactive");
            $(circles[i]).attr("class", "button inactive");
        }
    }
    var num = $(obj).children("span");
    $(num).addClass("clicked");
    $(num).html("...");
}
function buttons_renew(obj, data) {                                 //当前圆圈得到数后回复原来其他圆圈样式
    var num = $(obj).children("span");
    $(num).html(data);
    $(obj).attr("status", "numgot");
    $(obj).attr("class", "button numgot");
    $("li").each(function() {
        if ($(this).attr("status") != "numgot") {
            $(this).attr("status", "active");
            $(this).attr("class", "button active");
        }
    });
}
function show_order(rand) {                                             //把A~E顺序打印出来
    var zifu=['A','A','A','A','A'];
    for(var i=0;i<5;i++) {
        (function(j) {
            zifu[j]=getword(rand[j]);
        })(i);
    }
    $("#order").html(zifu[0]+"->"+zifu[1]+"->"+zifu[2]+"->"+zifu[3]+"->"+zifu[4]);
}
function getword(a) {                                                      //0~4分别代表A~E
    if(a==0) {
        return 'A';
    } else if(a==1) {
        return 'B';
    } else if(a==2) {
        return 'C';
    } else if(a==3) {
        return 'D';
    } else if(a==4) {
        return 'E';
    }
}
function ishad(temp,rand) {                         //看是否已经有这个数字
    var pan=false;
    for(var i=0;i<5;i++) {
        (function(j) {
            if(rand[j]==temp) {pan=true;}
        })(i);
    }
    return pan;
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
    $("#order").html("");
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
function getNum(clickedcircle, callback) {                         //获取随机数
    if ($(clickedcircle).attr("status") === "active") {
        numgetting_style(clickedcircle);
        $.get("/", function(data) {
            buttons_renew(clickedcircle, data);                                //当前圆圈得到数后回复原来其他圆圈样式
            if (isallgetnum()) {
                $(".result").addClass("bubbleactive");
                $(".result").attr("status", "bubble_active");
                $(".result").mouseover(function() {
                this.style.cursor = "pointer";
                });
    }
            if($(clickedcircle).attr("status")=="numgot") {callback();}
        });
    }
}
function isallgetnum() {                             //判断是否全部圆圈获得随机数
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
