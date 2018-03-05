	var isStart = 0;
	var time = 30;
	var score = 0;
	var mouse = 0;        //标记出现老鼠的位置
	var timeCount;        // 计时器
	var holes = [];       //创建老鼠洞
window.onload = function() {
	createholes();
	$("#caozuo").click(function() {           //button
		if(isStart==0) start_button();
		else if(isStart==1) stop_or_end_button();
	}
	);
	hitmouse();
}
function createholes() {	//创建老鼠洞
	for (var i = 0; i < 60; ++i) {
		holes.push(document.createElement("div"));
		holes[i].className = "hole";
		$("#zhuti").append(holes[i]);
	}
}
function start_button() {	//开始游戏进行的前置操作
	isStart=1;
	time=30;
	score=0;
	$("#time-info").html(time);
	$("#score-info").html(score);
	$("#zhuangtai").html("Playing");
	mouse = Math.floor(Math.random()*60);
	holes[mouse].className = "holemouse";
	timeCount = setInterval(function() {
	time -= 1;
	$("#time-info").html(time);
	if (time == 0) {stop_or_end_button();}}, 1000);
}
function stop_or_end_button() {		//游戏停止或者结束的操作
	holes[mouse].className = "hole";
	$("#zhuangtai").html("Game Over");
	$("#time-info").html("0");
	$("#score-info").html("0");
	isStart=0;
	clearInterval(timeCount);
	alert("Game Over.\nYour socre is: "+score);
}
function hitmouse() {		//打地鼠
	for (var i = 0; i < 60; ++i) {
		holes[i].onclick = function() {
		if (isStart) {
		if (this.className == "hole"&&score>0) --score;
		 else if(this.className == "holemouse") {
			++score;
			this.className = "hole";
			var lastMouse = mouse;
			while (mouse == lastMouse)
			mouse = Math.floor(Math.random()*60);
			holes[mouse].className = "holemouse";
		}
		$("#score-info").html(score);}
		}
	}
}