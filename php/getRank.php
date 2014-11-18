<?php
/*
 * Copyright (C) 2013 WSD
 *      http://www.wsd.co.jp
 *	By Benjamin Collins
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

	require('connect.php');
	
	if(isset($_GET['point'])){
		$max = $_GET['point'];
	}else{
		$sql = "SELECT point FROM rank ORDER BY point DESC LIMIT 1";
		$result = mysql_query($sql);
		if(!$result) die(mysql_error());
		$max = mysql_fetch_array($result);
		$max = $max['point'];
	}
	
	$subsql = "SELECT name FROM point WHERE id=$max";
	$subresult = mysql_query($subsql);
	if(!$subresult) die(mysql_error());
	$point = mysql_fetch_array($subresult);
	$point = $point['name'];
	
	$json = "{\"point\":\"$point\",\"data\":[";
	
	$sql = "SELECT * FROM rank WHERE point=$max  ORDER BY rank ASC";
	$result = mysql_query($sql);
	if(!$result) die(mysql_error());
	while($row = mysql_fetch_array($result)){
		$id = $row['school'];
		
		$subsql = "SELECT name FROM school WHERE id=$id";
		$subresult = mysql_query($subsql);
		if(!$subresult) die(mysql_error());
		$name = mysql_fetch_array($subresult);
		$name = $name['name'];
		
		$rank = $row['rank'];
		$json .= "{\"rank\":$rank,\"school\":\"$name\"},";
	}
	$json = substr($json, 0, -1) . "]}";
	echo $json;

?>