var time = 0;
var timer = null;
var blank={row:4,col:4};            //标定白块坐标
var tu="tu1";
var puzzles=document.getElementsByClassName("b");//用puzzles数组16个数来绑定16个方块，空白方块一直是puzzles【15】
var isStart=0;
var isran=0;                         //判断是否进入随机状态（防止在随机中对拼图进行了胜利判断）
window.onload=function() {
	changepicture();
	start_recover_button();
	for (var m = 0; m < puzzles.length; m++) { //点击移动方块
		puzzles[m].onclick = (function(m) {
			return function() {
			move(puzzles[m], getPos(puzzles[m]));
		}
		})(m);
	}
}
function start_recover_button() {	//开始（重置）按钮
	$("#start-recover").click(function() {
		if(isStart==0) {
			isStart=1;
			$("#start-recover").html("重置");
			timer = setInterval(function () {
			time++;
			$("#time-info").html(time);
		}, 1000);
			Random();
		}
		else if(isStart==1) reset();
	}
	);
}
function changepicture() {         //交换背景图
	$("#change").click(function () {
	if(tu=="tu1") tu="tu2";
	 else if(tu=="tu2") tu="tu3";
	 else if(tu=="tu3") tu="tu4";
	 else if(tu=="tu4") tu="tu5";
	 else if(tu=="tu5") tu="tu1";
	reset();
});
}
function reset() {		//还原初始状态
	isStart=0;
	clearInterval(timer);           //清除时间循环
	time = 0;
	$("#time-info").html("0");
	$("#start-recover").html("开始");
	var row=1,col=1;
	for(var i=0;i<puzzles.length;i++) {   //重置各个方块以及白块的位置信息
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
function getPos (id) { //获取id这个方块的位置坐标
	var name = id.className;
	var row = name[name.indexOf("row") + 3];
	var col = name[name.indexOf("col") + 3];
	return {row: parseInt(row),col: parseInt(col)}
}
function move(id, pos) { //移动方块以及更新白块坐标
	if (isStart == 0)
		return;
	if ((pos.row + 1 == blank.row || pos.row - 1 == blank.row ) && pos.col == blank.col) row_col_move(id,pos);
	 else if (pos.row == blank.row && (pos.col + 1 == blank.col || pos.col - 1 == blank.col)) row_col_move(id,pos);
	 else return;
	if (check()&&isran==0) { //必须是非随机状态下的检测胜利才行，防止随机过程中自动得到win
		alert("You Win!\nThe time you cost is : " + time);
		reset();
	}
}
function row_col_move(id,pos) {    //白块横纵向移动
	var temp=id.className;
	id.className="row"+blank.row+" col"+blank.col+" "+tu+" b";
	puzzles[15].className=temp;
	blank.row = pos.row;
	blank.col = pos.col;
}
function check() {        //判断是否胜利
	if(isStart==1) {
		var row=1,col=1;
		for(var i=0;i<puzzles.length;i++) {
			if(puzzles[i].className!="row"+row+" col"+col+" "+tu+" b") return 0;
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
function Random() {		//洗牌，打乱拼图
	isran=1;
	var t=30;
	while(t--) {
		var direction=Math.floor(Math.random() * 4);     //用0,1,2,3分别代表白块上右下左四个方向
		if((direction==0&&blank.row-1==0)||(direction==1&&blank.col+1==5)||(direction==2&&blank.row+1==5)||(direction==3&&blank.col-1==0)) t++;//判断该方向能否移动
		else if(direction==0) move_up();
		else if(direction==1) move_right();
		else if(direction==2) move_down();
		else if(direction==3) move_left();
	if(check()) t++; //避免随机后是原图
	}
isran=0;
}
function move_up() {	//白块向上移动
	for(var i=0;i<puzzles.length;i++) {
		if(puzzles[i].className=="row"+(blank.row-1)+" col"+blank.col+" "+tu+" b") {
			move(puzzles[i],getPos(puzzles[i]));
			break;
		}
	}
}
function move_right() {		//白块向右移动
	for(var i=0;i<puzzles.length;i++) {
		if(puzzles[i].className=="row"+blank.row+" col"+(blank.col+1)+" "+tu+" b") {
			move(puzzles[i],getPos(puzzles[i]));
			break;
		}
	}
}
function move_down() {		//白块向下移动
	for(var i=0;i<puzzles.length;i++) {
		if(puzzles[i].className=="row"+(blank.row+1)+" col"+blank.col+" "+tu+" b") {
			move(puzzles[i],getPos(puzzles[i]));
			break;
		}
	}
}
function move_left() {		//白块向左移动
	for(var i=0;i<puzzles.length;i++) {
		if(puzzles[i].className=="row"+blank.row+" col"+(blank.col-1)+" "+tu+" b") {
			move(puzzles[i],getPos(puzzles[i]));
			break;
		}
	}
}