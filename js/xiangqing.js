//获取操作对象
var box=document.querySelector(".container")
//获取地址栏中的参数信息
var search1=location.search
var dt
//判断当前地址栏中是否有参数
if(search1){
    //分割字符串
    var ar1=search1.split("=")
    //判断当前参数是否为id
    if(ar1[0]=="?id"){
        //获取当前参数的值
        var id=ar1[1];
        (async function(){
            //发送请求，并获取响应结果
            dt=await promiseAjax({
                url:'../php/xiangqing.php',
                data:'id='+id
            })
            //把字符串转为对象
            dt=eval('('+dt+')')
            //把数据渲染到页面中
            var str=`
            <div class="header">
                <div class="header-c">
                    <ul class="fl header-l">
                        <li class="fl">天猫首页</li>
                        <li class="fl">瞄,欢迎来天猫</li>
                        <li class="fl login-dl">请登录</li>
                        <li class="fl login-zc">免费注册</li>
                    </ul>
                    <ul class="fr header-l">
                        <li class="fl">我的淘宝</li>
                        <li class="fl">购物车</li>
                        <li class="fl">收藏夹</li>
                        <li class="fl">手机版</li>
                        <li class="fl">淘宝网</li>
                        <li class="fl">商家支持</li>
                        <li class="fl">网站导航</li>
                    </ul>
                </div>
            </div>
            
            <div class="banner">
                <div class="banner-c"><img src="../img/xiangqingbanner1.jpg"></div>
            </div>
            
            <div class="content">
                <div class="content-c">
                    <div class="content-cl fl">
                        <div class="zzz">
                            <div class="leftBox">
                                <img src="${dt.leftfdj}" alt="">
                                <div class='mark'></div>
                                <ul class="fadajing-u">
                                    <li class='br brr'><img src="${dt.xiaofdj}"></li>
                                    <li class="brr"><img src="${dt.xiaofdj1}"></li>
                                    <li class="brr"><img src="${dt.xiaofdj2}"></li>
                                    <li class="brr"><img src="${dt.xiaofdj3}"></li>
                                    <li class="brr"><img src="${dt.xiaofdj4}"></li>
                                </ul>
                                <div class='rightBox'>
                                    <img src="${dt.leftfdj}" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="zzz-b">
                            <p class="zzz-bp1">收藏商品 <span>${dt.renqi}</span></p>
                        </div>
                    </div>
                    <div class="content-cr fl">
                        <div class="gwc-t">
                            <h2 class="gwc-h2">${dt.gwch2}</h2>
                            <p class="gwc-bp1">${dt.gwcbp1}</p>
                        </div>
                        <div class="gwc-jg">
                            <p class="gwc-jgp1">价格<span class="gwc-s1">${dt.gwcs1}</span></p>
                            <p class="gwc-jgp2">618网尚日<span class="gwc-s2">${dt.gwcs2}</span></p>
                        </div>
                        <div class="gwc-ys">
                            <p class="gwc-ys1">北京 至 深圳罗湖区快递0.00</p>
                            <p class="gwc-ys1">17:00前付款，预计6月11日送达</p>
                        </div>
                        <div class="gwc-cm">
                            <p class="gwc-cm1">均码(单只不分左右)【领券购2只更优惠+晒单奖励5元】</p>
                            <p class="gwc-cm1">加大(单只不分左右)【领券购2只更优惠+晒单奖励5元】</p>
                        </div>
                        <div class="gwc-coloc">
                            <p class="gwc-cop1">颜色分类</p>
                            <ul>
                                <li><img src="${dt.liimg1}"></li>
                                <li><img src="${dt.liimg2}"></li>
                                <li><img src="${dt.liimg3}"></li>
                                <li><img src="${dt.liimg4}"></li>
                                <li><img src="${dt.liimg5}"></li>
                                <li><img src="${dt.liimg6}"></li>
                            </ul>
                        </div>
                        <div class="gwc-gwc">
                            <div class="gwc-gwc-c">
                                <button class="ljgm"><a href="./cart.html">立即购买</a></button>
                                <button class="jion-gwc"><a href="javascript:;">加入购物车</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="xxpic">
                <div class="xxpic-c">
                    <ul>
                        <li><img src="${dt.xxpic1}"></li>
                        <li><img src="${dt.xxpic2}"></li>
                        <li><img src="${dt.xxpic3}"></li>
                        <li><img src="${dt.xxpic4}"></li>
                        <li><img src="${dt.xxpic5}"></li>
                        <li><img src="${dt.xxpic6}"></li>
                        
                    </ul>
                </div>
            </div>
            `
            box.innerHTML=str
            // 放大镜
                /* 
            思路：
                1、页面布局
                2、明确操作对象
                3、确定事件类型
                4、设置边界条件
                5、计算右边图片和左边蒙版层的移动比例
            */
            //获取操作对象
            var leftBox = document.querySelector(".leftBox")
            var rightBox = document.querySelector(".rightBox")
            var mark = document.querySelector(".mark")
            var lis = document.querySelectorAll('.brr')
            //获取图片对象
            var img1 = rightBox.querySelector('img')
            var img2 = leftBox.querySelector('img')
            //给大盒子对象绑定鼠标移入事件
            leftBox.onmouseover = function () {
                //让蒙版层和右边大盒子显示
                mark.style.display = 'block'
                rightBox.style.display = 'block'
            }
            //给左边大盒子绑定鼠标移动事件
            leftBox.onmousemove = function (e) {
                //兼容事件对象
                var e = e || window.event
                //获取光标的在左边盒子中的移动距离
                var top1 = e.pageY - leftBox.offsetTop - parseInt(mark.offsetHeight / 2)
                var left1 = e.pageX - leftBox.offsetLeft - parseInt(mark.offsetWidth / 2)
                //设置边界条件
                var maxX = leftBox.offsetWidth - mark.offsetWidth
                var maxY = leftBox.offsetHeight - mark.offsetHeight
                //图片的移动距离
                var imgX, imgY
                //水平方向
                if (left1 <= 0) {
                    mark.style.left = "0px"
                    imgX = 0
                } else if (left1 >= maxX) {
                    mark.style.left = maxX + 'px'
                    imgX = maxX
                } else {
                    mark.style.left = left1 + 'px'
                    imgX = left1
                }
                //垂直方向
                if (top1 <= 0) {
                    mark.style.top = "0px"
                    imgY = 0
                } else if (top1 >= maxY) {
                    mark.style.top = maxY + "px"
                    imgY = maxY
                } else {
                    mark.style.top = top1 + "px"
                    imgY = top1
                }

                //让右边图片跟着移动

                img1.style.left = -2 * imgX + 'px'
                img1.style.top = -2 * imgY + 'px'

            }
            leftBox.onmouseout = function () {
                //让蒙版层和右边大盒子隐藏
                mark.style.display = 'none'
                rightBox.style.display = 'none'
            }
            //遍历每个li对象
            for (var i = 0; i < lis.length; i++) {
                //给每个li对象绑定点击事件
                lis[i].onclick = function () {
                    //清除li对象上的class属性值
                    for (var j = 0; j < lis.length; j++) {
                        lis[j].className = ''
                    }
                    //给指定的li对象添加class属性值
                    this.className = 'br'
                    //获取当前li对象中的图片地址
                    var imgUrl = this.lastElementChild.getAttribute('src')
                    //修改左右两个盒子中的图片
                    img1.setAttribute("src", imgUrl)
                    img2.setAttribute("src", imgUrl)
                }
            }
            $('.login-zc').click(function () {
                location.href = "./etao-zhuce.html"
            })
            $('.login-dl').click(function () {
                location.href = "./etao-login.html"
            })
        })()
    }else{
        alert("参数有误")
        location.href="./etao-list.html"
    }
}else{
    alert("非法进入，请选择商品")
    location.href="./etao-list.html"
}

//给大盒子对象绑定点击事件
box.onclick=function(e){
    //事件对象兼容
    var e = e || window.event
    //事件目标的兼容
    var target=e.target || e.srcElement
    //判断当前点击的是否为加入购物车
    if(target.innerHTML=="加入购物车"){
        //获取localStorage中cartList5
        var cartList5=localStorage.getItem("cartList5")||[]
        //判断当前cartList5是否存在
        if(cartList5.length>0){
            //把cartList5转为数组对象
            cartList5=eval('('+cartList5+')')
            var bool=true //是否有相同的商品
            //遍历数组
            cartList5.forEach(item=>{
                //判断当前遍历的商品是否跟添加的商品相同
                if(dt.id==item.id){
                    bool=false
                    //让当前的商品数量加1
                    item.cart_number++
                    //重新给localStorage设置键值对
                    localStorage.setItem("cartList5",JSON.stringify(cartList5))
                }
            })
            //判断bool是否为true
            if(bool){
                 //修改dt对象中的数量
                dt.cart_number=1
                //把当前商品追加到cartList5中
                cartList5.push(dt)
                //重新给localStorage设置键值对
                localStorage.setItem("cartList5",JSON.stringify(cartList5))
            }
        }else{
            //修改dt对象中的数量
            dt.cart_number=1
            //把当前商品追加到cartList5中
            cartList5.push(dt)
            //重新给localStorage设置键值对
            localStorage.setItem("cartList5",JSON.stringify(cartList5))
        }
    }
}