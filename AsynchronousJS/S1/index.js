//思路：
//用一个自定义属性status给各个圆圈标明所处状态，然后才根据状态来改为对应的class
//active表示小圆圈可点击
//inactive表示小圆圈不可点击
//numgot表示小圆圈已获取数字
//bubble_inactive表示结果圈不可点击,q全部小圆圈获得随机数后才改为bubble_active，才可以点击它获取sum
window.onload=function() {
	$(".icon-wrap").mouseleave(function() {initialization();});									//移出时进行初始化
    $(".icon-wrap").mouseenter(function() {initialization();});									//移入时进行初始化
    mouseshape();                                                                              //鼠标悬停形状
    $("li").click(function() {getNum(this,function(obj) {num_got_callback(obj);});});   //点击获取随机数
    $(".result").click(function() {result_click(this);});
}
function initialization() {                                                                    //初始化
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
}
function getNum(clickedcircle,callback) {                         //获取随机数
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
        $.get("null.txt", function(data) {
            $(num).html(data);
            callback(clickedcircle);
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
function isallgetnum() {                //判断是否全部圆圈获得随机数
    var flag = true;
        $("li").each(function() {
            if ($(this).attr("status") != "numgot") {
                flag = false;
            }
        });
    return flag;
}
function result_click(clickedcircle) {             						//点击大圆圈
    if ($(clickedcircle).attr("status") === "bubble_active") {
        var sum = 0;
        $("li span").each(function() {									//求和
            sum += parseInt($(this).html());
        });
        var text = $(clickedcircle).children();
        $(text).html(sum);
        $(".result").mouseover(function() {
            this.style.cursor = "default";
        });
        $(clickedcircle).attr("status", "bubble_inactive");
        $(".result").removeClass("bubbleactive");
    }
}
