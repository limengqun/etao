// //获取操作对象
// var sbt=document.querySelector('.login-zc1')
// var user1=document.querySelector(".login-zh")
// var pass1=document.querySelector(".login-mm")
// //获取地址栏中的参数
// var search1=location.search

// //给按钮绑定点击事件
// sbt.onclick=function(){
//     //获取输入框中的value值
//     var u1=user1.value
//     var p1=pass1.value
//     //通过ajax来发送请求
//     ajax({
//         url:'../php/zhuce.php',
//         data:`username=${u1}&password=${p1}`,
//         success:function(dt){
//            //判断当前返回值是否为1
//            if(dt==1){
//                alert("注册成功")
//            }else{
//                alert("注册失败")
//            }
//         }
//     })
//     return false
// }