<?php
	require('connect.php');
	$sql = "SELECT point FROM rank ORDER BY point DESC LIMIT 1";
	$result = mysql_query($sql);
	if(!$result) die(mysql_error());
	$max = mysql_fetch_array($result);
	echo $max['point'];
?>