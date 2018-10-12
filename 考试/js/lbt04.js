var img=$('img');
var box =$(".box");
var zou=$(".zuo");
var you=$(".you");
var ol=$('ol');
var index=0;
var timer = null;
var flag = true;

// eq() 方法返回带有被选元素的指定索引号的元素。
// append() 方法在被选元素的结尾插入指定内容。
box.append(img.eq(0).clone(true));
for (var j= 0; j <img.length ; j++) {
    // createElement() 方法通过指定名称创建一个元素
    var li=document.createElement("li");
    ol.append(li);
}
// contents() 方法获得匹配元素集合中每个元素的子节点，包括文本和注释节点。
for (var i = 0; i <ol.contents().length; i++) {
    ol.contents() .eq(i).hover(function () {
        // index() 方法返回指定元素相对于其他指定元素的 index 位置。
        index = ol.contents().index($(this));
       selectPic(index);
    })

}
ol.contents().eq(0).css("background","black");
function selectPic(num) {
    // siblings() 方法返回被选元素的所有同级元素。
    ol.contents().eq(num).css("background","black").siblings().css("background","rgba(0, 255, 255, 0.3)");
    box.animate({
        marginLeft: -num * 1200 +"px",
    }, 1000, function() {
        //检查是否到最后一张
        if (index === img.length) {
            index = 0;
            box.css("marginLeft", "0px");
            ol.contents() .eq(0).css("background","black").siblings().css("background","rgba(0, 255, 255, 0.3)");
        }
    })
}
you.click(function() {
    //右箭头
    flag = false;
    clearInterval(timer);
    if (index === img.length) {
        index = 0;
        box.css("marginLeft", "0px");
    }
    index++;
    selectPic(index);
});
// hover() 方法规定当鼠标指针悬停在被选元素上时要运行的两个函数。
// 方法触发 mouseenter 和 mouseleave 事件。
// 注意: 如果只指定一个函数，则 mouseenter 和 mouseleave 都执行它。
$(".bigbox").hover(function() {
    //鼠标移入
    clearInterval(timer);
    flag = false;
}, function() {
    flag = true;
    timer = setInterval(go, 3000);
});
zou.click(function() {
    //左箭头
    flag = false;
    clearInterval(timer);
    if (index === 0) {
        index = img.length ;
        box.css("marginLeft", -(img.length ) * 1200 +"px");
    }
    index--;
    selectPic(index);
});
function autoGo(b) {
    //自动行走
    if (b) {
        timer = setInterval(go, 3000);
    }
}
autoGo(flag);
function go() {
    //计时器的函数
    index++;
    selectPic(index);
}