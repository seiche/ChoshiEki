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
	$sql = "SELECT switch FROM stream_car WHERE id=1";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$state = $row['switch'];
	$sql = "SELECT lat,lon FROM stream ORDER BY id DESC";
	$result = mysql_query($sql);
	if(!$result) die(mysql_error());
	$row = mysql_fetch_array($result);
	$lat = $row['lat']; $lon = $row['lon'];
	echo "{\"state\":$state,\"lat\":$lat,\"lon\":$lon}";
?>