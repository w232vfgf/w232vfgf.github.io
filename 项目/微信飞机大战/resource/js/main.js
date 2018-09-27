var box = document.getElementById('box');
var sta = document.getElementById('start');
var main = document.getElementById('main');
var score = document.getElementById('score');
var susp = document.getElementById('suspend');
var cont = document.getElementById('continue');
var over = document.getElementById('over');
var on = true;

var imgs = document.getElementsByTagName("img");

// 获取游戏界面宽高度
var boxClass = box.currentStyle ? box.currentStyle : window.getComputedStyle(box, null);
var stageSizeX = parseInt(boxClass.width);
var stageSizeY = parseInt(boxClass.height);

//开始游戏
var start = function() {
    sta.style.display = "none";
    main.style.display = 'block';
    score.style.display = 'block';
    star();
};
//重新开始游戏
var restart = function() {
    susp.style.display = 'none';
    over.style.display = 'none';
    on = true;
    //清除画面
    for (var i = imgs.length - 1; i >= 0; i--) {
        imgs[i].parentNode.removeChild(imgs[i]);
    }
    ourPlane.hp = 1;
    score.innerHTML = 0;
    sco = 0;
    enemies = new Enemy;
    star();
    ourPlane.draw();
    ourPlane.segement = [];
};
//继续游戏
cont.onclick = function() {
    susp.style.display = 'none';
    on = true;
    star();
};
// 双击暂停游戏，弹出继续游戏和重新游戏
main.ondblclick = function() {
    if (on === true) {
        susp.style.display = 'block';
        clearInterval(an);
    }
    on = false;
};
//下面是五个对象
var ourPlaneX = {
    width: 66,
    height: 80,
    img: './resource/img/our-plane.gif',
    boomSrc: './resource/img/our-plane-boom.gif',
    boomTime: 100,
    hp: 1
};
var bulletX = {
    width: 6,
    height: 14,
    img: './resource/img/our-bullet.png',
    speed: 20
};

var s = {
    width: 34,
    height: 24,
    img: './resource/img/enemy-plane-s.png',
    boomSrc: './resource/img/enemy-plane-s-boom.gif',
    boomTime: 100,
    hp: 1,
};
var m = {
    width: 46,
    height: 60,
    img: './resource/img/enemy-plane-m.png',
    hitSrc: './resource/img/enemy-plane-m-hit.png',
    boomSrc: './resource/img/enemy-plane-m-boom.gif',
    boomTime: 100,
    hp: 3,
};
var l = {
    width: 110,
    height: 164,
    img: './resource/img/enemy-plane-l.png',
    hitSrc: './resource/img/enemy-plane-l-hit.png',
    boomSrc: './resource/img/enemy-plane-l-boom.gif',
    boomTime: 100,
    hp: 7,
};
//飞船的构造函数
var airship = function(centerX, centerY, planeModel, speed) {
    //随机出现的位置
    this.centerX = centerX;
    this.centerY = centerY;
    //宽，高
    this.sizeX = planeModel.width;
    this.sizeY = planeModel.height;
    this.imgs = planeModel.img;
    this.boomSrc = planeModel.boomSrc;
    this.boomTime = planeModel.boomTime;
    this.hp = planeModel.hp;
    this.speed = speed;
    //定位点
    this.currentX = this.centerX - this.sizeX / 2;
    this.currentY = this.centerY - this.sizeY / 2;
};
// 画出飞船的方法
airship.prototype.draw = function() {
    // Image 对象代表嵌入的图像。
    // <img> 标签每出现一次，一个 Image 对象就会被创建。
    // 同理 , 创建一个Image对象，就会生成一个<img>标签;
    this.imgNode = new Image();
    this.imgNode.src = this.imgs;
    this.imgNode.style.position = 'absolute';
    this.imgNode.style.top = this.centerY - this.sizeY / 2 + 'px';
    this.imgNode.style.left = this.centerX - this.sizeX / 2 + 'px';
    main.appendChild(this.imgNode);
};
// 飞船的移动方法
airship.prototype.move = function() {
    this.currentY += this.speed;
    this.imgNode.style.top = this.currentY + 'px';
    this.checkOverRange();
};
//添加一个检查方法
airship.prototype.checkOverRange = function() {
    // 如果飞船超出画布 就给当前飞船对象添加一个isBottomRange的属性
    this.isBottomRange = this.currentY > (stageSizeY - this.sizeY);
    this.isTopRange = this.currentY < 0;
};
//获取参数，生成随机位置
var randomNumber = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
};

// 敌机的构造函数
var Enemy = function() {
    this.segments = []; //存储敌机的数组
    this.generatedCount = 0; //计数器，多少个数时生成飞机
};

Enemy.prototype.createNewEnemy = function() {
    this.generatedCount++;

    if (this.generatedCount % 17 === 0) { //生成17个飞机后生成大飞机
        this.newEnemy = new airship(randomNumber(l.width / 2, stageSizeX - l.width / 2), 12, l, 1)
    } else if (this.generatedCount % 5 === 0) {
        this.newEnemy = new airship(randomNumber(m.width / 2, stageSizeX - m.width / 2), 12, m, randomNumber(2, 3))
    } else {
        this.newEnemy = new airship(randomNumber(s.width / 2, stageSizeX - s.width / 2), 12, s, randomNumber(3, 5))
    }

    // 把新生成的飞船写入数组
    this.segments.push(this.newEnemy);
    // 把新生成的飞船画出来
    this.newEnemy.draw();
};

var ss = 0;
var sco = 0; //存储分数
// 移动所有的飞船
Enemy.prototype.moveAllEnemy = function() {
    // 遍历敌机对象里面的保存敌机的数组 让每一个都移动
    for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].move();
        // 如果超出画布怎么样
        if (this.segments[i].isBottomRange) {
            main.removeChild(this.segments[i].imgNode);
            this.segments.splice(i, 1);
        }
        // 检测子弹碰撞
        for (var j = 0; j < ourPlane.segement.length; j++) {

            // 如果飞机还未死亡就挡住子弹
            if (this.segments[i].hp > 0) {
                //水平碰撞
                var horizontalCollision = Math.abs(this.segments[i].centerX - ourPlane.segement[j].currentX) < (this.segments[i].sizeX / 2 + ourPlane.segement[j].sizeX / 2);
                //垂直碰撞
                var verticalCollision = Math.abs(this.segments[i].centerY - ourPlane.segement[j].currentY) < (this.segments[i].sizeY / 2 + ourPlane.segement[j].sizeY / 2);
                var checkBulletCollision = horizontalCollision && verticalCollision;
                if (checkBulletCollision) {
                    // 飞机挨打
                    sco++;
                    score.innerHTML = sco;
                    //进行判定，挨打图片存在就换挨打图片，否则换成爆炸图片
                    this.segments[i].imgNode.src = this.segments[i].hitSrc ? this.segments[i].hitSrc : this.segments[i].boomSrc;
                    this.segments[i].hp--;

                    // 把子弹干掉
                    main.removeChild(ourPlane.segement[j].imgNode);
                    ourPlane.segement.splice(j, 1);
                }
            }
        }
        // 检测与我方飞机的碰撞
        var ourHorizontalCollision = Math.abs(this.segments[i].currentX - ourPlane.currentX) < (this.segments[i].sizeX / 2 + ourPlane.sizeX / 2);
        var ourVerticalCollision = Math.abs(this.segments[i].currentY - ourPlane.currentY) < (this.segments[i].sizeY / 2 + ourPlane.sizeY / 2);
        var checkOurCollision = ourHorizontalCollision && ourVerticalCollision;

        if (checkOurCollision) {
            this.segments[i].hp = 0;
            ourPlane.hp--;
        }

        //检测飞机是否死亡
        if (this.segments[i].hp <= 0) {
            this.segments[i].imgNode.src = this.segments[i].boomSrc;
            this.segments[i].boomTime -= 10;
            // 把飞机干掉
            if (this.segments[i].boomTime <= 0) {
                main.removeChild(this.segments[i].imgNode);
                this.segments.splice(i, 1);
            }
        }
    }
};
// 实例化所有敌机
var enemies = new Enemy();


//我方飞船
var ourPlane = new airship(stageSizeX / 2, stageSizeY - ourPlaneX.height / 2, ourPlaneX, 0);
ourPlane.draw();
//鼠标移动事件
main.onmousemove = function(ev) {

    ourPlane.centerX = ev.clientX - box.offsetLeft;
    if (ourPlane.centerX < 0) {
        ourPlane.centerX = 0;
    }
    if (ourPlane.centerX > stageSizeX) {
        ourPlane.centerX = stageSizeX;
    }
    ourPlane.centerY = ev.clientY - box.offsetTop;
    if (ourPlane.centerY < 0) {
        ourPlane.centerY = 0;
    }
    if (ourPlane.centerY > (stageSizeY - ourPlane.sizeY / 2)) {
        ourPlane.centerY = (stageSizeY - ourPlane.sizeY / 2);
    }

    ourPlane.currentX = ourPlane.centerX - ourPlane.sizeX / 2;
    ourPlane.currentY = ourPlane.centerY - ourPlane.sizeY / 2;

    ourPlane.imgNode.style.left = ourPlane.currentX + 'px';
    ourPlane.imgNode.style.top = ourPlane.currentY + 'px';
};

// 在我方飞船A ourPlane 这个对象里面添加一个数组 用来保存他发射的子弹
ourPlane.segement = [];

// 子弹构造函数
var Bullet = airship;
//子弹的生成
function creatNewBullet() {
    ourPlane.newBullet = new Bullet(ourPlane.centerX, ourPlane.centerY - ourPlane.sizeY / 2, bulletX, -10);
    ourPlane.segement.push(ourPlane.newBullet);
    ourPlane.newBullet.draw();
}
//删除子弹
function moveNewBullet() {
    for (var i = 0; i < ourPlane.segement.length; i++) {
        ourPlane.segement[i].move();
        if (ourPlane.segement[i].isTopRange) {
            main.removeChild(ourPlane.segement[i].imgNode);
            ourPlane.segement.splice(i, 1);
        }
    }
}
//游戏结束的方法
var gameOver = function() {
    ourPlane.imgNode.src = ourPlane.boomSrc; //更换成爆炸图片
    clearInterval(an);
    over.style.display = 'block';
    document.querySelector('p#final-score').innerText = sco; //输出游戏分数
    document.querySelector('p#final-cname').innerText = ss;
};

var time = 0;
var star = function() {
    if (!localStorage.sites) {
        localStorage.sites = JSON.stringify([]);
        var newItem = {
            ss
        }
        var tmp = JSON.parse(localStorage.getItem('sites'))
        tmp.push(newItem)
        localStorage.setItem('sites', JSON.stringify(tmp));
    };
    if (!document.cookie) {
        var tmp = JSON.parse(localStorage.getItem('sites'));
        var dd = tmp.sort();
        setCookie("最高分", dd[dd.length - 1].ss);
    } else {
        setCookie("最高分", sco);
    }
    an = setInterval(function() {
        time++;

        if (time % 50 === 0) {
            enemies.createNewEnemy(); //生成飞机
        }
        enemies.moveAllEnemy();
        if (time % 5 === 0) {
            creatNewBullet(); //生成子弹
        }
        moveNewBullet();
        //进行血量判定，看游戏是否结束
        if (ourPlane.hp <= 0) {
            fs();
            getCookie(sco);
            gameOver();
        }
    }, 20);
};

function fs() {
    var tmp = JSON.parse(localStorage.getItem('sites'))
    if (localStorage.sites) {
        var dd = tmp.sort();
        if (sco > dd[dd.length - 1].ss) {
            var newItem = {
                ss: sco
            }
            tmp.push(newItem)
            localStorage.setItem('sites', JSON.stringify(tmp));
            return ss = sco;
        } else {
            return ss = dd[dd.length - 1].ss;
        }

    }
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    if (cvalue > ss) {
        document.cookie = cname + "=" + cvalue + "; " + expires;
    } else {
        document.cookie = cname + "=" + ss + "; " + expires;
    }
}

function getCookie(cvalue) {

    var ca = document.cookie.split('=');
    if (cvalue < ca[1]) {
        return ss = ca[1];
    } else {
        return ss = cvalue;
    }
}