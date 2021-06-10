<?php
include "./datas.php";
//获取传入的参数
$n=$_GET['username'];
$p=$_GET['pass1'];

//编写SQL语句
$sql="insert into etaouser(name,pass) values('$n','$p')";
//执行SQL语句
$result=mysqli_query($link,$sql);
//判断当前数据是否添加成功
if($result){
    echo "<script>alert('注册成功');location.href='../pages/etao-login.html'</script>";
    // echo "1";
}
else{
    echo "<script>alert('注册失败');location.href='../pages/zhuce.html'</script>";
    // echo "0";
}
//关闭数据库连接
mysqli_close($link);
?>