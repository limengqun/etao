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
            pagesize:20,
            totalsize:arr.length,
            totalpage:Math.ceil(arr.length/20)
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
        var arr2=arr.slice((m-1)*20,m*20)
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
                            <p class="rowbox-p2">￥ ${item.price1} <span class="rowbox-s1">${item.price2}</span></p>
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
