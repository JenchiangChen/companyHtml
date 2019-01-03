/**
 * Created by newuser on 2017/7/24.
 */
// 动态修改css样式
function fnMove(ele, obj,callback) {
    //参数一:需要动态变化样式的元素
    //参数二:一个对象 其 键为需要变化的css属性名,值为css属性目标值 例{fontSize:500,height:140,opacity:50}
    //参数三:回调如果动画结束 调用该函数

    clearInterval(ele.timer);

    //创建计时器动态的修改 目标元素的css属性值
    // 用ele存储timer 目的不让计时器number被释放,导致无法阻止计时器
    ele.timer = setInterval(function () {

        var fnStop = true; //标记 判断是否所有动画都达到目标值

        for (var attr in obj) { //遍历对象 获取到所有需要修改的属性名和目标值
            var curr = 0;
            // 元素当前css属性值 如果属性是opacity 0 - 1
            // 因为我们的速度大于等于1 直接操作0-1小数不太好操作
            // 我们对他进行放大100倍操作
            if(attr == 'opacity'){
                curr = parseInt(getStyle(ele, attr)*100)
            }else {
                curr = parseInt(getStyle(ele, attr))
            }

            //定义一个速度 让目标元素 每30毫秒增加5像素 直到达到目标值停止计时器(动画结束)
            //减速运动 目标值(不变) - 减去当前值(越来越接近目标) 减出来的结果越来越小 除以6不要让当前值 一瞬间达到目标值
            var speed = (obj[attr] - curr)/6;
            //放大动作  0.3 => 1   -0.3 => -1 避免让速度等于0
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(speed != 0){
                fnStop = false;
            }

            //动态改变css属性值  如果是透明度 我们之前给他乘以100倍 这里需要还原回0-1的数
            if(attr == 'opacity'){
                ele.style[attr] = parseFloat((curr + speed)/100);
                //透明度兼容写法 老版本浏览器透明度为0-100
                ele.style.filter = 'alpha(opacity:'+(curr + speed)+')'
            }else {
                ele.style[attr] = curr + speed + 'px'
            }

        }
        //所有动画完成
        if (fnStop){
            clearInterval(ele.timer);
            if(callback){
                callback();
            }
        }
    }, 30)


}
//获取 需要获取的元素对象,需要获取的样式属性
function getStyle(ele, sAttr) {
    //兼容写法获取 元素css样式的值
    //高版本浏览器getComputedStyle
    if (window.getComputedStyle) {
        sAttr = window.getComputedStyle(ele, null)[sAttr];
    } else {
        //低版本浏览器
        sAttr = ele.currentStyle(sAttr);
    }
    return sAttr
}