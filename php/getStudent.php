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
 *
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
	
	$sql = "SELECT student.name, school.name, rank.rank
	FROM rank,school,student 
	WHERE rank.point=$max AND school.id=rank.school 
	AND student.school=school.id AND student.point=rank.point
	ORDER BY rank.rank ASC";
	
	$result = mysql_query($sql);
	if(!$result) die(mysql_error());
	$json = "{\"point\":\"$point\",\"data\":[";
	$i = 0;
	while($row = mysql_fetch_array($result)){
		//print_r($row) . "<br>";
		if($i) $json .= ',';
		$rank = $row['rank'];
		$school = $row['name'];
		$name = $row[0];
		$json .= "{\"rank\":$rank,\"school\":\"$school\",\"name\":\"$name\"}";
		$i++;
	}
	$json .= "]}";
	echo $json;
?>
