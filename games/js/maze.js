window.onload = function() {
	// 迷宫主要元素
	var start = document.getElementById("start");
	var end = document.getElementById("end");
	var checkc = document.getElementById("cheat");
	var walls = document.getElementsByClassName("wall");
	var chongzhi=document.getElementsByClassName("chongzhi");
	var w1=document.getElementById("zuoshang");
	var w2=document.getElementById("zhongshang");
	var w3=document.getElementById("youshang");
	var w4=document.getElementById("zuoxia");
	var w5=document.getElementById("zhongxia");
	var w6=document.getElementById("youxia");
	// 判断游戏是否开始
	var flag = false;
	// 判断作弊
	var cheat = false;
	// 输出提示信息
	var zhuyi = document.getElementById("zhuyi");

	// 游戏开始
	start.onmouseover = function() {
		cheat = false;
		w1.className="wall";
		w2.className="wall";
		w3.className="wall";
		w4.className="wall";
		w5.className="wall";
		w6.className="wall";
		zhuyi.innerHTML = "Game Begin!";
		flag = true;
	}

	// 判断作弊
	checkc.onmouseover = function() {
		if (flag) {
			cheat = true;
		}
	}

	// 撞墙处理
	for (var i = 0; i < walls.length; i++) {
		walls[i].onmouseover = function() {
			if (flag) {
				this.className = "breakwall";
				flag = false;
				zhuyi.innerHTML = "You Lose.";
			}
		}
	}
	// 到达终点
	end.onmouseover = function() {
		if (flag) {
			if (!cheat) {
				zhuyi.innerHTML = "You Win!";
			} else {
				zhuyi.innerHTML =
				"Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
			}
			flag = false;
			cheat = false;
		}
	}

	//移出迷宫就重置墙
	if(flag==0) {
		for (var i = 0; i < chongzhi.length; i++) {
		chongzhi[i].onmouseover = function() {
		w1.className="wall";
		w2.className="wall";
		w3.className="wall";
		w4.className="wall";
		w5.className="wall";
		w6.className="wall";
		zhuyi.innerHTML="";
		}
	}
	}
}
