var box = document.getElementsByClassName("box")[0];
var imgs = box.getElementsByTagName("img");
var zou = document.getElementsByClassName("zuo")[0];
var you = document.getElementsByClassName("you")[0];
var dian = document.getElementsByClassName("dian");
var dians = dian[0].getElementsByTagName("i");
var z=0;
dians[0].style.background="white";
var inzuo=function(){
	z--;
	if (z<0) {
		z=imgs.length-1;
	}
	box.style.marginLeft = -1200* z + 'px'
	dianw();
	dians[z].style.background="white";
}

var inyou=function(){
	z++;
	if (z>imgs.length-1) {
		z=0;
	}
	box.style.marginLeft = -1200* z + 'px';
	dianw();
	dians[z].style.background="white";	
}
zou.onclick=function(){
	inzuo();
	
}
you.onclick=function(){
	inyou();
}
var dianw = function(){
	for (var i=0;i<dians.length;i++) {
		dians[i].style.background="rgba(0,0,255,0.3)";
	}
}

for (var h=0;h<dians.length;h++) {
	dians[h].index=h;
}
for (var i=0;i<dians.length;i++) {
	dians[i].onclick=function(){
		box.style.marginLeft = -1200* this.index+ 'px';
		dianw();
		this.style.background="white";
	}
}
//setInterval(function(){ inyou() }, 2000);