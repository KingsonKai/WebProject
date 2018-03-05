window.onload = function() {
	var zhuti = document.getElementById("zhuti");
	var kaiguan = document.getElementById("caozuo");
	var state = document.getElementById("zhuangtai");
	var timein = document.getElementById("time-info");
	var scorein = document.getElementById("score-info");
	var isStart = 0;
	var time = 30;
	var score = 0;
	//标记出现老鼠的位置
	var mouse = 0;
	// 计时器
	var timeCount;
	//创建老鼠洞
	var holes = [];
	for (var i = 0; i < 60; ++i) {
		holes.push(document.createElement("div"));
		holes[i].className = "hole";
		zhuti.appendChild(holes[i]);
	}
	//设置开关
	kaiguan.onclick=function() {
		if(isStart==0) {
			isStart=1;
			time=30;
			score=0;
			timein.innerHTML = time;
			scorein.innerHTML = score;
			state.innerHTML = "Playing";
			mouse = Math.floor(Math.random()*60);
			holes[mouse].className = "holemouse";
			timeCount = setInterval(function() {
				time -= 1;
				timein.innerHTML = time;
				if (time == 0) {
					holes[mouse].className = "hole";
					state.innerHTML = "Game Over";
					isStart = 0;
					clearInterval(timeCount);
					alert("Game Over.\nYour socre is: "+score);
				}
			}, 1000);
		}
		else if(isStart==1) {
			holes[mouse].className = "hole";
			zhuangtai.innerHTML = "Game Over";
			isStart=0;
			clearInterval(timeCount);
			alert("Game Over.\nYou have stopped the game and your socre is: "+score);
		}
	}
	//打地鼠
	for (var i = 0; i < 60; ++i) {
		holes[i].onclick = function() {
			if (isStart) {
				if (this.className == "hole"&&score>0) {
					--score;
				} else if(this.className == "holemouse") {
					++score;
					this.className = "hole";
					var lastMouse = mouse;
					while (mouse == lastMouse) {
						mouse = Math.floor(Math.random()*60);
					}
					holes[mouse].className = "holemouse";
				}
				scorein.innerHTML = score;
			}
		}
	}
}