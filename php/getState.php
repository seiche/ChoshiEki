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
	$sql = "SELECT switch,checkpoint FROM camera ORDER BY id ASC";
	$result = mysql_query($sql);
	if(!$result) die(mysql_error());
	$json = '[';
	while($row = mysql_fetch_array($result)){
		$state = $row['switch'];
		$check = $row['checkpoint'];
		$json .= "{\"state\":$state,\"check\":$check},";
	}
	$json = substr($json, 0, -1) . "]";
	echo $json;
	
?>