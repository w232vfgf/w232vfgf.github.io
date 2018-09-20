var box = document.getElementsByClassName("box");
var imgs = box[0].getElementsByTagName("img");
var zou = document.getElementsByClassName("zuo");
var you = document.getElementsByClassName("you");
var dian = document.getElementsByClassName("dian");
var dians = dian[0].getElementsByTagName("i");

var i = 0;
zou[0].onclick = function() {
	i--;
	if(i <0) {
		i =imgs.length - 1;
	}
	inimgs();
	imgs[i].style.opacity = "1";
}

you[0].onclick = function() {
	i++;
	if (i>imgs.length - 1) {
		i = 0;
	}
	inimgs();
	imgs[i].style.opacity = "1";
}
//dians[0].onclick=function  () {
//	imgs[0].style.opacity = "1";
//	imgs[1].style.opacity = "0";
//	imgs[2].style.opacity = "0";
//}
//dians[1].onclick=function  () {
//	imgs[1].style.opacity = "1";
//	imgs[0].style.opacity = "0";
//	imgs[2].style.opacity = "0";
//}
//dians[2].onclick=function  () {
//	imgs[2].style.opacity = "1";
//	imgs[1].style.opacity = "0";
//	imgs[0].style.opacity = "0";
//}
var inimgs = function() {
	for(var i = 0; i < imgs.length; i++) {
		imgs[i].style.opacity = "0";
	}
}
for(var h = 0; h < dians.length; h++) {
	dians[h].index = h;
}
for(var j = 0; j < dians.length; j++) {
	dians[j].onclick = function() {
		inimgs();
		imgs[this.index].style.opacity = "1";
}

}