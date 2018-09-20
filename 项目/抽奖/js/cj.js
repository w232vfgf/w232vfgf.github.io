
//还原了原版的效果
var oPointer = document.getElementsByTagName("img")[0];
var oTurntable = document.getElementsByTagName("img")[1];
var on = true;
oPointer.onclick = function() {
	if(on === true) {
		rotate();
	}
	on = false;
}
var ge = function() {
	var item = rnd(0, 7);
	function rnd(n, m) {
		return Math.floor(Math.random() * (m - n + 1) + n)
	}
	switch(item) {
		case 0:
		//return 会直接跳过 所以不用 break了
			return {
				x: 337,
				t: "未中奖"
			};
		case 1:
			return {
				x: 26,
				t: "免单4999元"
			};
		case 2:
			return {
				x: 88,
				t: "免单50元"
			};
		case 3:
			return {
				x: 137,
				t: "免单10元"
			};
		case 4:
			return {
				x: 185,
				t: "免单5元"
			};
		case 5:
			return {
				x: 185,
				t: "免单5元"
			};
		case 6:
			return {
				x: 235,
				t: "免分期服务费"
			};
		case 7:
			return {
				x: 287,
				t: "提高白条额度"
			};
	}
}
var rotate = function() {
	oTurntable.style.transition = 'all 3s';
	var z = ge();
	var deg = z.x;
	oTurntable.style.transform = 'rotate(' + (deg + 360 * 3) + 'deg)';
	setTimeout(function() {
		oTurntable.style.transition = 'all 0s';
		oTurntable.style.transform = 'rotate(' + deg + 'deg)';
		alert(z.t);
		on = true;
	}, 3000);
}