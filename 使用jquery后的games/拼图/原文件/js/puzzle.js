var time = 0;
var timer = null;
//标定白块坐标
var blank={row:4,col:4};
var tu="tu1";
//用puzzles数组16个数来绑定16个方块，空白方块一直是puzzles【15】
var puzzles=document.getElementsByClassName("b");
var isStart=0;
//判断是否进入随机状态（防止在随机中对拼图进行了胜利判断）
var isran=0;
window.onload=function() {
	var startrecover=document.getElementById("start-recover");
	var change=document.getElementById("change");
	var timeinfo=document.getElementById("time-info");
	//交换背景图
	change.onclick=function () {
	if(tu=="tu1") {
		tu="tu2";
	} else if(tu=="tu2") {
		tu="tu3";
	} else if(tu=="tu3") {
		tu="tu4";
	} else if(tu=="tu4") {
		tu="tu5";
	} else if(tu=="tu5") {
		tu="tu1";
	}
	isStart=0;
	clearInterval(timer); //清除时间循环
	time = 0;
	timeinfo.innerHTML = "0";
	startrecover.innerHTML="开始";
	//重置各个方块以及白块的位置信息
	var row=1,col=1;
	for(var i=0;i<puzzles.length;i++) {
		puzzles[i].className="row"+row+" col"+col+" "+tu+" b";
		col++;
		if(col==5) {
			col=1;
			row++;
		}
	}
	blank.row=4;
	blank.col=4;
}
	startrecover.onclick=function() {
		if(isStart==0) {
			isStart=1;
			startrecover.innerHTML="重置";
			clearInterval(timer); //清除时间循环
			time = 0;
			timeinfo.innerHTML = "0";
			timer = setInterval(function () {
			time++;
			timeinfo.innerHTML= time;
		}, 1000);
			Random();
		}
		else if(isStart==1) {
			isStart=0;
			clearInterval(timer); //清除时间循环
			time = 0;
			timeinfo.innerHTML = "0";
			startrecover.innerHTML="开始";
			//重置各个方块以及白块的的位置信息
			var row=1,col=1;
			for(var i=0;i<puzzles.length;i++) {
				puzzles[i].className="row"+row+" col"+col+" "+tu+" b";
				col++;
				if(col==5) {
					col=1;
					row++;
				}
			}
			blank.row=4;
			blank.col=4;
		}
	}
	//点击移动方块
	for (var m = 0; m < puzzles.length; m++) {
		puzzles[m].onclick = (function(m) {
			return function() {
			move(puzzles[m], getPos(puzzles[m]));
		}
		})(m);
	}
}
//获取id这个方块的位置坐标
function getPos (id) {
	var name = id.className;
	var row = name[name.indexOf("row") + 3];
	var col = name[name.indexOf("col") + 3];
	return {
		row: parseInt(row),
		col: parseInt(col)
	}
}
//移动方块以及更新白块坐标
function move(id, pos) {
	if (isStart == 0)
		return;
	if ((pos.row + 1 == blank.row || pos.row - 1 == blank.row ) && pos.col == blank.col) {
		var temp=id.className;
		id.className="row"+blank.row+" col"+blank.col+" "+tu+" b";
		puzzles[15].className=temp;
		blank.row = pos.row;
		blank.col = pos.col;
	} else if (pos.row == blank.row && (pos.col + 1 == blank.col || pos.col - 1 == blank.col)) {
		var temp=id.className;
		id.className="row"+blank.row+" col"+blank.col+" "+tu+" b";
		puzzles[15].className=temp;
		blank.row = pos.row;
		blank.col = pos.col;
	} else {
		return;
	}
	//必须是非随机状态下的检测胜利才行，防止随机过程中自动得到win
	if (check()&&isran==0) {
		alert("You Win!\nThe time you cost is : " + time);
		isStart=0;
		clearInterval(timer); //清除时间循环
		time = 0;
		var timeinfot=document.getElementById("time-info");
		timeinfot.innerHTML = "0";
		var startrecovers=document.getElementById("start-recover");
		startrecovers.innerHTML="开始";
		//重置各个方块以及白块的的位置信息
		var row=1,col=1;
		for(var i=0;i<puzzles.length;i++) {
			puzzles[i].className="row"+row+" col"+col+" "+tu+" b";
			col++;
			if(col==5) {
				col=1;
				row++;
			}
		}
		blank.row=4;
		blank.col=4;
	}
}
//判断是否胜利
function check() {
	if(isStart==1) {
		var row=1,col=1;
		for(var i=0;i<puzzles.length;i++) {
			if(puzzles[i].className!="row"+row+" col"+col+" "+tu+" b") {
				return 0;
			}
			col++;
			if(col==5) {
				col=1;
				row++;
			}
		}
	return 1;
	}
	return 0;
}
function Random() {
	isran=1;
	var t=30;
	while(t--) {
		//用0,1,2,3分别代表上右下左四个方向
		var direction=Math.floor(Math.random() * 4);
		//判断该方向能否移动
		if((direction==0&&blank.row-1==0)||(direction==1&&blank.col+1==5)||(direction==2&&blank.row+1==5)||(direction==3&&blank.col-1==0)) {
			t++;
		}
		else if(direction==0) {
			for(var i=0;i<puzzles.length;i++) {
			if(puzzles[i].className=="row"+(blank.row-1)+" col"+blank.col+" "+tu+" b") {
				move(puzzles[i],getPos(puzzles[i]));
				break;
			}
		}
		}
		else if(direction==1) {
			for(var i=0;i<puzzles.length;i++) {
			if(puzzles[i].className=="row"+blank.row+" col"+(blank.col+1)+" "+tu+" b") {
				move(puzzles[i],getPos(puzzles[i]));
				break;
			}
		}
	}
		else if(direction==2) {
			for(var i=0;i<puzzles.length;i++) {
			if(puzzles[i].className=="row"+(blank.row+1)+" col"+blank.col+" "+tu+" b") {
				move(puzzles[i],getPos(puzzles[i]));
				break;
			}
		}
	}
		else if(direction==3) {
			for(var i=0;i<puzzles.length;i++) {
			if(puzzles[i].className=="row"+blank.row+" col"+(blank.col-1)+" "+tu+" b") {
				move(puzzles[i],getPos(puzzles[i]));
				break;
			}
			
		}

	}
	//避免随机后是原图
	if(check()) {
		t++;
	}
	}
isran=0;
}
