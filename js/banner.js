function Slide(sId) {

    this.oBox = document.getElementById(sId);

    this.oUl = this.oBox.getElementsByTagName('ul')[0];

    this.aLi = this.oUl.getElementsByTagName('li');

    this.oPrev = this.oBox.getElementsByClassName('prev')[0];

    this.oNext = this.oPrev.nextElementSibling;

    this.oDoc = this.oNext.nextElementSibling;

    this.nWidth = this.aLi[0].offsetWidth;

    this.now = 1;

    //在构造器中直接调用初始化方法
    this.init();
}
Slide.prototype.createDoc = function () {

    for (var i = 0; i < this.aLi.length - 2; i++) {

        var oSpan = document.createElement('span');

        this.oDoc.appendChild(oSpan);

    }

    this.oSpan = this.oDoc.children;

    this.oSpan[0].className = 'active';

};

Slide.prototype.init = function () {

    // 初始化让页面展示第一张图片
    this.oUl.style.left = -this.nWidth + 'px';

    //给页面添加span控制点
    this.createDoc();

    var that = this;
    //自动轮播的实现
    this.oBox.timer = setInterval(function () {

        //TODO:轮播图next 滚动
        that.fnNext();

    }, 2000)

    //清除计时器
    this.oBox.onmouseover = function () {
        clearInterval(this.timer);
    }
    //重新开始
    this.oBox.onmouseout = function () {
        this.timer = setInterval(function () {
            //TODO:轮播图next 滚动
            that.fnNext();
        }, 2000)
    }

    this.oNext.onclick = function () {
        that.fnNext();
    }
    this.oPrev.onclick = function () {
        that.fnPrev();
    }

    for (var i = 0; i < this.oSpan.length; i++) {
        this.oSpan[i].index = i;
        this.oSpan[i].onclick = function(){
            that.now =this.index + 1;
            that.fnChange();
        }
    }


};

Slide.prototype.fnPrev = function () {
    this.now--;
    if (this.now <= 0) {
        this.now = this.aLi.length - 2;
//                console.log('new now'+this.now)
        this.oUl.style.left = -this.nWidth * (this.now + 1) + 'px'
    }
    this.fnChange();
}

Slide.prototype.fnNext = function () {

    this.now++;

    if (this.now >= this.aLi.length) {

        this.now = 2;

        this.oUl.style.left = -this.nWidth + 'px';

    }

    //TODO:图片滚动效果
    this.fnChange();

}
//
Slide.prototype.fnChange = function () {

    for (var i = 0; i < this.oSpan.length; i++) {

        this.oSpan[i].className = '';

    }

    var index = this.now - 1;

//            console.log(this.now);//now - 1 = span的index  第一张 now = ali.length - 1

    if (this.now > this.oSpan.length) {

        index = 0

    }

    this.oSpan[index].className = 'active';

    fnMove(this.oUl, {'left': -this.nWidth * this.now})

}

window.onload = function () {

        var slide = new Slide("box");
        window.onresize=function () {
            location.reload()
        }

    }