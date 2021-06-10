var row=document.querySelector(".row")
var pagination=document.querySelector(".pagination");

//通过自执行函数来获取数据
(async function(){
    var arr=await promiseAjax({
        url:'../php/list.php'
    })
    //把字符串转为对象
    arr=eval('('+arr+')')
    //配置传入的对象信息
    var o1={
        pageInfo:{
            pagenum:1,
            pagesize:10,
            totalsize:arr.length,
            totalpage:Math.ceil(arr.length/10)
        },
        textInfo:{
            first:"首页",
            prev:"上一页",
            next:"下一页",
            last:"尾页"
        }
    }
    //实例化分页器对象
    new Pagination(pagination,o1,(m)=>{
        //通过页码，来进行分页数据显示
        var arr2=arr.slice((m-1)*10,m*10)
        //创建字符串，拼接所有内容
        var str=''
        //遍历数组中所有数据
        arr2.forEach(item=>{
            str+=`
                <a href="./xiangqing.html?id=${item.id}" style="display： block;">
                    <div class="rowbox fl">
                        <img src="${item.img}">
                        <div class="rowbox-b">
                            <div class="rowbox-p1">${item.title1}</div>
                            <p class="rowbox-p2">${item.price1} <span class="rowbox-s1">${item.price2}</span></p>
                            <div class="rowbox-p3">${item.price3} <span class="rowbox-s2">${item.rebaterate}</span></div>
                            <p class="rowbox-p4">${item.sales}</p>
                        </div>
                    </div>
                </a>
            `
        })
        //把拼接好的内容渲染到页面中
        row.innerHTML=str
    })
})()

//获取操作对象
var box=document.querySelector(".show-c")
//获取localStorage中是否有cartList5
var cartList5=localStorage.getItem("cartList5")

//获取cookie
var name1=getCookie("name")
//判断姓名是否存在
if(name1){
    //转为对象
    cartList5=eval('('+cartList5+')')
    show1()
}else{
    alert("尚未登录，请登录")
    //获取当前地址栏信息
    var url=location.href
    location.href='./etao-login.html?newUrl='+url
}

function show1(){
    //判断当前是否有数据
    if(cartList5.length>0){
        //判断是否所有的商品中is_select都为1
        var bool=cartList5.every(item=>{
            return item.is_select==1
        })
        //拼接字符串
        var str2=`
        <p class="show-cp1"></p>
        <ul class="show-top">
            <li style="width: 90px;">
                <input type="checkbox" name="quan" ${bool?"checked":''}>&nbsp;&nbsp;全选
            </li>
            <li class="li2">商品信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>金额</li>
            <li>操作</li>
            <div class="clear"></div>
        </ul>
        `
        //遍历数组中所有元素
        cartList5.forEach(item=>{
            str2+=`
            <div class="content">
                <ul class="show-con">
                    <li style="width: 90px;">
                        <input type="checkbox" name="xuan" ${item.is_select==1?"checked":''} data-id=${item.id}>
                    </li>
                    <li class="li2"><img src="${item.img}"></li>
                    <li>￥<span>${item.price1}</span></li>
                    <li>
                    <button ${item.cart_number<=1?"disabled":''} data-id=${item.id}>-</button>
                    <button>${item.cart_number}</button>
                    <button data-id=${item.id}>+</button>
                    </li>
                    <li>￥<span>${item.price1}</span></li>
                    <li><button data-id=${item.id}>删除</button></li>
                    <div class="clear"></div>
                </ul>
            </div>
            `
        })
        str2+=`
        <div class="floor">
            <ul class="show-but">
                <li style="width: 90px;">
                    <input type="checkbox" name="quan" ${bool?"checked":''}>&nbsp;&nbsp;全选
                </li>
                <li style="width: 90px;"><button>清空购物车</button></li>
                <li>已选商品<span>${total()[0]}</span>件</li>
                <li>合计(不含运费)：￥<span>${total()[1]}</span>
                </li>
                <li style="float: right;" class="jiesuan">结算</li>
                <div class="clear"></div>
            </ul>
        </div>
        `
        //把所有拼接好的内容，渲染到页面中
        box.innerHTML=str2
    }else{
        var str=`
        <div class="qiong">
            <h2><a href="./etao-list.html" class="leibiao">返回列表页</a></h2>
            <div class="jumbotron">
                <p class="le-p1">啥呀没有，穷逼</p>
                <p>点击下方按钮快去选购吧! ^_^</p>
                <p class="le-p2"><a href="./etao-list.html">赶紧去逛逛吧</a></p>
            </div>
        </div>
        `
        //把当前字符串渲染到页面中
        box.innerHTML=str
    }
}

//给box大盒子对象绑定点击事件
box.onclick=function(e){
    //事件对象兼容
    var e = e || window.event
    //目标对象兼容
    var target=e.target || e.srcElement
    //判断点击的是否为加法按钮
    if(target.innerHTML=='+'){
        
        //获取当前操作对的id属性值
        var id=target.getAttribute("data-id")
        //操作cartList5中指定的数据
        cartList5.forEach(item=>{
            //判断是否为当前要操作的商品
            if(item.id==id){
                item.cart_number++
            }

        })
        //把修改完毕的cartList5重新存储在localStorage中
        localStorage.setItem("cartList5",JSON.stringify(cartList5))
        show1()
    }
    //减法
    if(target.innerHTML=='-'){
        //获取id
        var id=target.getAttribute("data-id")
         //操作cartList5中指定的数据
         cartList5.forEach(item=>{
            //判断是否为当前要操作的商品
            if(item.id==id){
                item.cart_number--
            }
        })
        //把修改完毕的cartList5重新存储在localStorage中
        localStorage.setItem("cartList5",JSON.stringify(cartList5))
        show1()
    }
    //删除
    if(target.innerHTML=="删除"){
        //获取id属性值
        var id=target.getAttribute("data-id")
        cartList5=cartList5.filter(item=>{
            return item.id!=id
        })
        //把修改完毕的cartList5重新存储在localStorage中
        localStorage.setItem("cartList5",JSON.stringify(cartList5))
        show1()
    }
    //判断是否为全选框
    if(target.name=="quan"){
        //遍历所有商品
        cartList5.forEach(item=>{
            //判断当前全选框是否被选中
            if(target.checked){
                item.is_select=1
            }else{
                item.is_select=0
            }
        })
        //把修改完毕的cartList5重新存储在localStorage中
        localStorage.setItem("cartList5",JSON.stringify(cartList5))
        show1()
    }
    //判断点击的是否为选中框对象
    if(target.name=="xuan"){
        //获取当前选中框对象的id属性
        var id=target.getAttribute('data-id')
        //遍历数组元素
        //遍历所有商品
        cartList5.forEach(item=>{
           //判断是否为当前要操作的商品
           if(item.id==id){
               //判断当前商品中is_select是否等于1
               if(item.is_select==1){
                    item.is_select=0
               }else{
                    item.is_select=1
               }
           }
        })
        //把修改完毕的cartList5重新存储在localStorage中
        localStorage.setItem("cartList5",JSON.stringify(cartList5))
        show1()
    }
    //结算
    if(target.innerHTML=='结算'){
        alert("你已支付："+total()[1])
        //过滤不满足条件的商品
        cartList5=cartList5.filter(item=>{
            return item.is_select!=1
        })
        //把修改完毕的cartList5重新存储在localStorage中
        localStorage.setItem("cartList5",JSON.stringify(cartList5))
        show1()
    }
    //清空购物车
    if(target.innerHTML=="清空购物车"){
         cartList5=[]
         //把修改完毕的cartList5重新存储在localStorage中
         localStorage.setItem("cartList5",JSON.stringify(cartList5))
         show1()
    }
}

//计算所选商品价格和数量
function total(){
    var nums=0 //所选商品数量
    var prices=0 //所选商品价格
    //遍历所有商品
    cartList5.forEach(item=>{
        //判断当前商品是否被选中
        if(item.is_select==1){
            nums+=item.cart_number
            prices+=parseFloat(item.price1)*parseInt(item.cart_number)
        }
    })
    return [nums,prices]
}
