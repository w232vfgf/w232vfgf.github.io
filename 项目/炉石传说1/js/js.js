var gd = document.querySelector('#bj  .nav');
var mg = document.querySelector('#bj  .container');
var go = $('.go-top');
var bt = $(" .b-t-bt");

// offsetTop则是元素的上边框与父元素的上边框的绝对距离。
var gdY = gd.offsetTop;
document.body.onscroll = function() {
    //固定导航栏
    if (window.pageYOffset > gdY) {
        gd.style.position = 'fixed';
        gd.style.left = '50%';
        gd.style.marginLeft = '-512px';
        mg.style.marginTop = '52px';
    } else {
        gd.style.position = 'relative';
        mg.style.marginTop = '0px';
    }
    //返回顶部按钮在一定高度出现和隐藏
    if (window.pageYOffset < bt.offset().top - window.innerHeight) {
        go.css("opacity", "0");
    } else {
        go.css("opacity", "1");
    }
};
//使返回顶部时有过渡效果
function GoTop() {
    $("html,body").animate({
        scrollTop: 0
    }, 800);
}

$(".xlcd").click(function() {
    $(".hzmt").slideToggle();
});

setInterval(function() {
    $('.cbl-1').toggleClass("ss");
}, 5000);


//下载
$(".xz").click(function() {
    $(this).addClass("ace").siblings().removeClass("ace");
    $(".lj").eq($(this).index()).addClass('d').siblings().removeClass('d');
    if ($(this).index() == 1) {
        $('.ew').addClass("d");
    }
    if ($(this).index() == 2) {
        $('.ew1').addClass("d");
    }
})

//电竞赛事的轮播图
var z = 0;
var imgs = $('.b-t-img');
var box = document.querySelector('.xsc');
$('.container .fr .b-t a.sg ').click(function() {
    z--;
    if (z < 0) {
        z = imgs.length - 1;
    }
    box.style.marginLeft = -249 * z + 'px'

})
$('.container .fr .b-t a.xg').click(function() {
    z++;
    if (z > imgs.length - 1) {
        z = 0;
    }
    box.style.marginLeft = -249 * z + 'px';
})
var timer = setInterval(function() {
    $('.container .fr .b-t a.xg').click();
}, 3000);
$(".lbt").hover(function() {
    //鼠标移入
    clearInterval(timer);
}, function() {
    timer = setInterval(function() {
        $('.container .fr .b-t a.xg').click();
    }, 3000);
});

//首页轮播图
var df = $('.xtp .xx');
var old = $(".lbtp li");
var wz = $(".wz li");
var index = 0;
$(".lbtp").append(old.eq(0).clone(true));
for (var i = 0; i < df.length; i++) {
    df.eq(i).hover(function() {
        // index() 方法返回指定元素相对于其他指定元素的 index 位置。
        index = df.index($(this));
        selectPic(index);
    })
}

function selectPic(num) {
    // siblings() 方法返回被选元素的所有同级元素。
    df.eq(num).addClass("f").siblings().removeClass("f");
    setTimeout(function() {
        wz.eq(num).addClass("d").siblings().removeClass("d");
    }, 200);
    $(".lbtp").animate({
        marginLeft: -num * 640 + "px",
    }, 500, function() {
        //检查是否到最后一张
        if (index === old.length) {
            index = 0;
            $(".lbtp").css("marginLeft", "0px");
            df.eq(0).addClass("f").siblings().removeClass("f");
            wz.eq(0).addClass("d").siblings().removeClass("d");

        }
    })
}
var timer = setInterval(function() {
    index++;
    selectPic(index);
}, 3000);
$(".xtp").hover(function() {
    //鼠标移入
    clearInterval(timer);

}, function() {
    timer = setInterval(function() {
        index++;
        selectPic(index);
    }, 3000);
});