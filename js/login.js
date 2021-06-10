//获取操作对象
var btn=document.querySelector("[type='button']")
var user1=document.querySelector("[name='username']")
var pass1=document.querySelector("[name='pass1']")
//获取地址栏中的参数
var search1=location.search
//给按钮绑定点击事件
btn.onclick=function(){
    //获取输入框中的value值
    var u1=user1.value
    var p1=pass1.value
    
    //通过ajax来发送请求
    ajax({
        url:'../php/login.php',
        data:`username=${u1}&pass2=${p1}`,
        
        success:function(dt){
            
           //判断当前返回值是否为1
           if(dt==1){
              //保存账号
              setCookie('name',u1)
              // 判断当前search1是否有值
              if(search1){
                //分割参数
                var url1=search1.split('=')[1]
                //跳转到指定的地址中
                location.href=url1
              }else{
                // 跳转到列表页
                location.href="../pages/etao-list.html"
              }
           }else{
               alert("账号或密码有误")
               location.href="../pages/etao-login.html"
           }
        }
    })
    return false
}