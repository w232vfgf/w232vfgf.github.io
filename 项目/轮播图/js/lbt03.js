var box = document.getElementsByClassName("box")[0];
var imgs = box.getElementsByTagName("img");
var zou = document.getElementsByClassName("zuo")[0];
var you = document.getElementsByClassName("you")[0];
var dian = document.getElementsByClassName("dian");
var dians = dian[0].getElementsByTagName("i");


var on=true;
 zou.onclick=function () {
    // if (on===true){
        san();
    // }
    // on=false;
};
you.onclick=function () {
    if (on===true){
    xia();
    }
    on=false;
};

var san=function () {
    box.insertBefore(box.lastElementChild, box.firstElementChild);
    box.style.transition = 'all 3s';
};
var xia=function () {
    box.style.transition = 'all 3s';
    box.style.marginLeft= '-1200px';
    setTimeout(function () {
        box.style.transition = 'all 0s';
        box.style.marginLeft = '0px';
        // box.insertBefore(box.lastElementChild, box.firstElementChild);
        box.appendChild(box.firstElementChild);
        on=true;
    },3000)
};