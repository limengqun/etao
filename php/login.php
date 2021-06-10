<?php
include "./datas.php";
//获取传入的数据
$u=$_GET['username'];
$p=$_GET['pass2'];

$sql="select * from etaouser where name='$u' and pass='$p'";
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//判断当前结果集中是否有数据
if($row=mysqli_fetch_row($result)){
    echo "1";
}else{
    echo "0";
}
//关闭数据库连接
mysqli_close($link);
?>