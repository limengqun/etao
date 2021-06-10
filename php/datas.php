<?php
header("content-type:text/html;charset=utf-8");
//连接数据库
$link=mysqli_connect("localhost","root",'',"lmq");

//设置编码
mysqli_set_charset($link,"utf8");

?>