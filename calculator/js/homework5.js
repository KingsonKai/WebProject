window.onload = function() {
	var shuru = "";
	var jieguo = document.getElementById("result");
	var xianshi = document.getElementById("shizi");
	var biao = 0;
	   /*标记是否已经执行过等号运算，0为没；*/
	document.getElementById("s0").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "0";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s1").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "1";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s2").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "2";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s3").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "3";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s4").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "4";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s5").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "5";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s6").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "6";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s7").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "7";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s8").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "8";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("s9").onclick = function() {
		if (biao == 1) {
			shuru = "";
			biao = 0;
		}
		shuru = shuru + "9";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("jia").onclick = function() {
		biao = 0;
		shuru = shuru + "+";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("jian").onclick = function() {
		biao = 0;
		shuru = shuru + "-";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("cheng").onclick = function() {
		biao = 0;
		shuru = shuru + "*";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("chu").onclick = function() {
		biao = 0;
		shuru = shuru + "/";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("dian").onclick = function() {
		biao = 0;
		shuru = shuru + ".";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("tui").onclick = function() {
		biao=0;
		shuru = xianshi.innerHTML + "";
		if(shuru=="(请输入算式)") {
			shuru = shuru.slice(0, 0);
		} else {
			shuru = shuru.slice(0, shuru.length-1);
		}
		xianshi.innerHTML = shuru;
	};
	document.getElementById("left").onclick = function() {
		biao = 0;
		shuru = shuru + "(";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("right").onclick = function() {
		biao = 0;
		shuru = shuru + ")";
		xianshi.innerHTML = shuru;
	};
	document.getElementById("clear").onclick = function() {
		shuru = "";
		xianshi.innerHTML = "(请输入算式)";
		jieguo.innerHTML = "0";
		biao = 1;
	};
	document.getElementById("deng").onclick = function() {
		try {
			shuru = eval(shuru).toFixed(14);
			/*保留14位小数*/
		for (var i = 0; i < shuru.length; i++) {
        if (shuru[i] == ".") break;
    	}
    	if (i != shuru.length) {
        	for (i = shuru.length - 1; i >= 0; i--) {
        	if (shuru[i] == "0") {
            	shuru = shuru.slice(0, shuru.length - 1);
            	i = shuru.length;
        	} else if ( shuru[i] == ".") {
            	shuru = shuru.slice(0, shuru.length - 1);
            	break;
        	}
        else break;
        	}
    	}
    	/*把多余的尾0去掉*/
    }
    /*捕获异常则报错*/
		catch(err) {
				alert("Error：输入了不合法的运算式！\n\n" + "错误类型：" + err.messages + "\n\n");
				jieguo.innerHTML ="0";
				xianshi.innerHTML = "(请输入算式)";
				shuru="0";
		}
		if (shuru == undefined || isNaN(shuru) || shuru == Infinity|| isNaN(parseFloat(shuru))) {
				alert("Error：输入了不合法的运算式！");
				jieguo.innerHTML ="0";
				xianshi.innerHTML = "(请输入算式)";
				shuru="0";
		}
		/*得到不正常的结果也报错*/
		jieguo.innerHTML =shuru;
		biao = 1;
		/*标记已经进行了运算*/
	};
};
