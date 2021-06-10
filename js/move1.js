function move(dom,obj,cb){
    //创建对象，存放每个属性的定时器
    var o1={}
    //遍历传入的obj对象
    for(let attr in obj){
        //给o1对象添加键值
        o1[attr]=setInterval(function(){
            //获取起始值
            var start
            //判断当前键名是否为透明度
            if(attr=="opacity"){
                start=getStyle(dom,attr)*100
            }else{
                start=parseInt(getStyle(dom,attr))
            }
            //终点
            var end=obj[attr]
            //判断终点是否大于起点
            if(end>start){
                var speed=5
            }else{
                var speed=-5
            }
            //判断剩余的运动量是否小于等于步长
            if(Math.abs(end-start)<=Math.abs(speed)){
                clearInterval(o1[attr])
                //判断当前属性是否为透明度
                if(attr=="opacity"){
                    dom.style[attr]=end/100
                }else{
                    dom.style[attr]=end+'px'
                }
                //删除对象中的键值对
                delete o1[attr]
                //获取当前o1对象中键值对的个数
                var m=getObj(o1)
                //当前m等于0
                if(m==0){
                    !cb||cb()
                }

            }else{
                if(attr=="opacity"){
                    start+=speed
                    dom.style[attr]=start/100
                }else{
                    start+=speed
                    dom.style[attr]=start+'px'
                }
            }
        },30)
    }
}
//获取样式
function getStyle(dom,attr1){
    if(dom.currentStyle){
        return dom.currentStyle[attr1]
    }else{
        return window.getComputedStyle(dom)[attr1]
    }
}
//获取对象键值对的个数
function getObj(obj){
    var num=0 //键值对的个数
    for(var i in obj){
        num++
    }
    return num
}

//创建运动函数
/* function move1(){
    a++
    if(a>2){
        a=0
    }
    //给将要显示的图片设置位置
    $('.bannli').eq(a).css("left","750px")
    $('.bannli').eq(a).animate({left:0},500)
    $('.bannli').eq(b).animate({left:-750},500)
    b=a
}
//轮播图左滑动
function move2(){
    a--
    if(a<0){
        a=2
    }
    //给将要显示的图片设置位置
    $('.bannli').eq(a).css("left","-750px")
    $('.bannli').eq(a).animate({left:0},500)
    $('.bannli').eq(b).animate({left:750},500)
    b=a
} */