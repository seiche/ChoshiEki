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

<!DOCTYPE html>
<html>
<head>
<link href="favicon.ico" rel="icon" type="image/x-icon" />
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css">
<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
<script src="http://code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
<script type="text/javascript" 
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlStKcaF0girh_ta35h0gff3R6LnDbvKc&sensor=true">
</script>
<script type="text/javascript" src="js/route.js"></script>
<script type="text/javascript" src="js/mobile.js"></script>
<meta name="viewport" content="width=device-width, user-scalable=no">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46833650-1', 'jiu.ac.jp');
  ga('send', 'pageview');

</script>
<style>
	table *{
		text-align: left !important;
	}
</style>
<meta charset="utf-8"/>
</head>
<body>

<div data-role="page" id="one" data-theme="b">
  <div data-role="header" data-theme="b">
    <h1>銚子駅伝</h1>
  </div>
	
	<div data-role="content" id="content"　data-theme="c">
		<iframe id="stream" width="100%" src="http://www.ustream.tv/embed/16691110?ub=B3D1FF&amp;lc=B3D1FF&amp;oc=ffffff&amp;uc=ffffff&amp;v=3&amp;wmode=direct" 
				scrolling="no" frameborder="0" style="border: 0px none transparent;"></iframe>
		<br>
		
		<div id="time"></div>
	</div>
	<div data-role="content" id="content"　data-theme="c">
		<div data-role="header" data-theme="b">
		<h1>中継所順位情報:</h1>
		</div>
		<div data-role="collapsible-set" data-theme="c" data-content-theme="d">
		<div data-role="collapsible" id="check1" value="1">
			<h3>名洗中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point1">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check2"  value="2">
			<h3>銚子市魚協外川支所中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point2">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check3" value="3">
			<h3>千葉科学大学中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point3">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check4" value="4">
			<h3>地球の丸く見える丘中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point4">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check5" value="5">
			<h3>犬吠埼灯台中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point5">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check6" value="6">
			<h3>黒生中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point6">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check7" value="7">
			<h3>川口神社中継所</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point7">
			</tbody>
		</table>
		</div>
		<div data-role="collapsible" id="check8" value="8">
			<h3>ゴール市役所前</h3>
			<table width="100%" class="table-stroke">
			<thead text-align="left">
			<tr>
			<th><b>順位</b></th>
			<th><b>学校名</b></th>
			<th><b>選手名</b></th>
			</tr>
			</thead>
			<tbody id="point8">
			</tbody>
		</table>
		</div>
	</div>
	</div>
	<div data-role="content" id="content"　data-theme="c">
	
	<div id="map-canvas" style="width:100%;height:300px;"></div>
  </div>
  <a href="#popup" data-role="button" data-rel="dialog">地図について</a>
  <div data-role="footer" data-theme="b">
	<h2>&nbsp;</h2>
  </div>
</div>

<div data-role="page" id="popup">

	<div data-role="header" data-theme="b">
		<h1>Dialog</h1>
	</div><!-- /header -->

	<div data-role="content" data-theme="c">	
		<h2>地図の説明</h2>
		<p>先頭ランナーの位置と中継所を、アイコンで表示しています。通過
中の中継所アイコンは赤に変わります。各中継所の順位情報は、上のリストを
押せば表示されます。 ※順位情報は非公式です。</p>		
		<p><a href="#one" data-rel="back" data-role="button" data-inline="true" data-icon="back">ページに戻る</a></p>	
	</div><!-- /content -->
</div><!-- /page popup -->

 
</body>

</html>