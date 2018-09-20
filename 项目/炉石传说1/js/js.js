var gd=document.querySelector('#bj  .nav');
var mg=document.querySelector('#bj  .container');
// offsetTop则是元素的上边框与父元素的上边框的绝对距离。
var gdY=gd.offsetTop;
document.body.onscroll = function() {
    if(window.pageYOffset > gdY) {
        gd.style.position = 'fixed';
        gd.style.left='50%';
        gd.style.marginLeft='-512px';
        mg.style.marginTop='52px';
    } else {
       gd.style.position = 'relative';
        mg.style.marginTop='0px';
    }
};