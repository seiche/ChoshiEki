<?php
	require_once 'php/Mobile_Detect.php';
	$detect = new Mobile_Detect;
	if($detect->isMobile())
		header("Location: mobile.php");

	preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);
	if (count($matches)>1){
	  $version = $matches[1];
	  if($version < 10){
		header("Location: ie.html");
	  }
	}
?>

<!--
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
-->


<!doctype html>
<html>
	<head>
		<title>Ekiden Stream</title>
		<meta charset="utf-8"/>
		<link rel="stylesheet" type="text/css" href="css/layout.css"/>
		<script type="text/javascript" 
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlStKcaF0girh_ta35h0gff3R6LnDbvKc&sensor=true">
    </script>
		<script type="text/javascript" src="js/route.js"></script>
		<script type="text/javascript" src="js/ekiden.js"></script>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-46833650-1', 'jiu.ac.jp');
		  ga('send', 'pageview');

		</script>
	</head>
	<body>
		<aside>
			<h1>銚子駅伝インターネット中継</h1>
			<div id="ustream">
				<iframe id="stream" width="100%" height="100%" src="http://www.ustream.tv/embed/16691110?ub=B3D1FF&amp;lc=B3D1FF&amp;oc=ffffff&amp;uc=ffffff&amp;v=3&amp;wmode=direct" 
				scrolling="no" frameborder="0" style="border: 0px none transparent;"></iframe>
			</div>
			<div id="twitter">
				<a class="twitter-timeline" href="https://twitter.com/ekiden_live" data-widget-id="412925988817760257">@ekiden_live からのツイート</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
		<!--
				<div class="hash">
				<p><a target="_blank" href="https://twitter.com/ekiden_live">@ekiden_liveへつぶやく</a></p>
				</div>
				<div id="tweets">
				
				</div>
				<div class="follow"></div>-->
			</div>
		</aside>
		<section id="map-canvas">
		</section>
		<div id="ranking">
			<div id="time"></div>
			<div id="minimize">
				<img src="http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/chevron-expand-icon.png" id="open"/>
				<img src="http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/chevron-icon.png" id="close"/>
			</div>
			<p id="pname"></p>
			<ul id="prank">
			</ul>
			<p id="disclaim">
				※順位情報は非公式です
			</p>
			<div class="helpbox">
				<a target="_blank" style="color: #1A3975;" href="explain.html">カメラの操作について</a>
			</div>
		</div>
	</body>
</html>