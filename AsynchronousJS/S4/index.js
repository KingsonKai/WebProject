//关键思路：用rand数组得出0~4的五个不同随机数字分别代表A~E，然后一个圆圈的回调函数设为调用rand数组中下一个数字代表的圆圈
////注意:保留了S1的功能，如果不按@+而是直接按ABCDE则当次计算我设置为不可再按@+，移开鼠标再次移来打开计算器就可以重新开始；
window.onload=function() {
    $(".icon-wrap").mouseleave(function() {initialization();});
    $(".icon-wrap").mouseenter(function() {initialization();});
    mouseshape();                                                        //鼠标悬停形状
    $("li").click(function() {getNum(this,function() {});$(".icon").attr("status", "icon_inactive");});         //点击获取随机数
    $(".result").click(function() {result_click(this);});
    $(".icon").click(function() {icon_click($("li"));});
}
function icon_click(circles) {                                  //实现乱点鸳鸯
    if($(".icon").attr("status")=="icon_active") {
    var rand=[-1,-1,-1,-1,-1];											//标记随机序列
    for(var count=0;count<5;count++) {
        (function(j) {
            var temp=0;
            do{
                temp=Math.floor(Math.random() * 5);
            } while(ishad(temp,rand));                                  //防止重复
            rand[j]=temp;
        })(count);														//实现不重复随机序列
    }
    show_order(rand);                                                   //把A~E顺序打印出来
    var callbacks = [];													//设置每个圆圆获取数字后对应的回调函数
    for (var i = 0; i < 4; i++) {
        (function(i) {
            callbacks[i] = function() {
                getNum(circles[rand[i + 1]], callbacks[i + 1]);
            }
        })(i);
    }
    callbacks[4] = function() {result_click($(".result"));}
    getNum(circles[rand[0]], callbacks[0]);						//开始按照序列依次获取各个圆圈的随机数
    $(".icon").attr("status", "icon_inactive");                         //防止得出结果后还点@+
}
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
function addclass() {
    $("li").each(function() {
        if ($(this).attr("status") === "inactive" || $(this).attr("status") === "numgot") {
            $(this).addClass("inactive");
        } else {
            $(this).addClass("active");
        }
    });
}
function getNum(clickedcircle, callback) {                         //获取随机数
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
            num_got_recover(clickedcircle);                         //当前圆圈得到数后回复原来其他圆圈样式
            callback();
        });
    }
}
function num_got_recover(clickedcircle) {                          //当前圆圈得到数后回复原来其他圆圈样式
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
