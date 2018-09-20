var cj = document.getElementById("cj");
var zj = document.getElementById("zj");

//点击抽奖开始
var on = true;
cj.onclick = function() {
	//避免多次点击
	if(on === true) {
		rotate();
	}
	on = false;
}

var ge = function() {
	//随机数    Math.floor（）往下取整       Math.random()给一个小于1的随机数
	var randomNumber = Math.floor(Math.random() * 100);
	//设置概率
	if(randomNumber < 1) {
		return {
			code: 1,
			text: "免单4999元"
		}
	} else if(randomNumber < 5) {
		return {
			code: 2,
			text: "免单50元"
		}
	} else if(randomNumber < 10) {
		return {
			code: 3,
			text: "免单10元"
		}
	} else if(randomNumber < 20) {
		return {
			code: 4,
			text: "免单5元"
		}
	} else if(randomNumber < 40) {
		return {
			code: 5,
			text: "免分期服务费"
		}
	} else if(randomNumber < 60) {
		return {
			code: 6,
			text: "提高白条额度"
		}
	}else {
		return {
			code: 7,
			text: "感谢参与,继续努力"
		}
	}
}

var rotate = function() {
	var z = ge();
	//计算旋转角度
	var currentAngle = 30 + (360 / 7) * (z.code - 1);
	zj.style.transition = 'all 3s';
	zj.style.transform = 'rotate(' + (currentAngle + 360 * 3) + 'deg)';
	//等抽奖盘转完
	setTimeout(function() {
		//清除演示时间，偷偷的清除360 * 3，让每次抽奖都有转很多圈的效果
		zj.style.transition = 'all 0s';
		zj.style.transform = 'rotate(' + currentAngle + 'deg)';
		//让中奖提示在抽奖盘转完后提示
		alert(z.text);
		//让下次点击有效
		on = true;
	}, 3000);//计时器3s,让setTimeout里的事件在抽奖盘转完后执行
}