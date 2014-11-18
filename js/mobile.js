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

var map;
document.addEventListener('DOMContentLoaded', function(event){
	
	document.getElementById('stream').style.height = window.innerWidth * 0.8 + "px";
	document.getElementById('map-canvas').style.height = window.innerWidth * 0.8 + "px";
	
	var start = false;
	var mapOptions = {
		center: new google.maps.LatLng(35.721, 140.848),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		minZoom: 13,
		maxZoom: 18,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		draggable: false
	};
	
	map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	var polyline = new google.maps.Polyline({path:path, strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2});
	polyline.setMap(map);
	var polyline = new google.maps.Polyline({path:missingPart, strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2});
	polyline.setMap(map);
	

	(function(){
		var ajax = new XMLHttpRequest();
			
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var points = JSON.parse(ajax.responseText);
				delete ajax;
				var markers = new Array();
				for(var i = 0; i < points.length; i++){
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(points[i].lat, points[i].lon),
						map: map,
						title: points[i].name,
						icon : "css/check-off.png"
					});
					markers[i] = marker;
				}
				setInterval(function(){
					if(start)
						markers[0].setIcon('css/check-on.png');
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 4 && ajax.status == 200){
							if(ajax.responseText != ''){
								var point = parseInt(ajax.responseText);
								for(var i = 0; i <= point; i++)
									markers[i].setIcon('css/check-on.png');
							}
							delete ajax;
						}
					}
					ajax.open('GET','php/getLast.php',true);
					ajax.send();
				},10000);
				
			}
		}
		
		ajax.open('GET', 'php/getChecks.php', true);
		ajax.send();
	})();
	
	(function(){
		var ajax = new XMLHttpRequest();
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var json = JSON.parse(ajax.responseText);
				delete ajax;
				var car = new google.maps.Marker({
					position: new google.maps.LatLng(json.lat, json.lon),
					map: map,
					title: "中継車",
					icon: 'css/runner.png'
				});
				var state = json.state;
				if(!state)
					document.getElementById('stream').setAttribute('src', 'http://www.ustream.tv/embed/16559803');
				
			setInterval(function(){
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 4 && ajax.status == 200){
							var json = JSON.parse(ajax.responseText);
							delete ajax;
							car.setPosition(new google.maps.LatLng(json.lat, json.lon));
							if(state != json.state){
								state = json.state;
								if(state)
									document.getElementById('stream').setAttribute('src', 'http://www.ustream.tv/embed/16691110');
								else
									document.getElementById('stream').setAttribute('src', 'http://www.ustream.tv/embed/16691073');
							}
						}
					}
					ajax.open('GET', 'php/getCoords.php', true);
					ajax.send();
				}, 3000);
			}
		}
		
		ajax.open('GET', 'php/getCoords.php', true);
		ajax.send();
	})();

	//var choshi = new Date("12 January 2014, 10:00:00").getTime();
	var choshi = 1389488400000;
	function setTime(){
		var div = document.getElementById('time');
		var now = Date.now();
		var count = (now-choshi);
		delete now;
		if(count < 0){
			count*=-1;
			count = Math.floor(count/1000);
			var days = Math.floor(count/86400);
			var hours = Math.floor((count/3600)-(days*24));
			var minutes = Math.floor((count/60)-(days*1440)-(hours*60));
			var seconds = Math.floor(count-(days*86400)-(hours*3600)-(minutes*60));
			div.innerHTML = "開始まで: " + days + "日" + hours + "時間" + minutes + "分" + seconds + "秒";
		}else{
			start = true;
			count = Math.floor(count/1000);
			var days = Math.floor(count/86400);
			var hours = Math.floor((count/3600)-(days*24));
			var minutes = Math.floor((count/60)-(days*1440)-(hours*60));
			var seconds = Math.floor(count-(days*86400)-(hours*3600)-(minutes*60));
			div.innerHTML = "開始してから: "+ hours + "時間" + minutes + "分" + seconds + "秒";
		}
	}
	setInterval(setTime, 1000);
	setTime();
	
	
	for(var i = 1; i <= 8; i++){
		$('#check'+i).bind('expand', function () {
			var checkpoint = this.getAttribute('value');
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					try{
						var json = JSON.parse(ajax.responseText);
						delete ajax;
					}catch(e){
						
						$('#point'+checkpoint).html( "<li>通過順未定</li>" );
						$('#point'+checkpoint).listview( "refresh" );	
					}
					var string = "";
					for(var i = 0; i < json.data.length; i++){
						if(json.data[i].school != ""){
							var name = json.data[i].name;
							var cut = name.indexOf('年');
							name = name.substr(0, cut-2);
							string += "<tr>";
							string += "<td>"+json.data[i].rank+"</td>";
							string += "<td>"+json.data[i].school+"</td>";
							string += "<td>"+name+"</td>";
							string += "</tr>";					
						}
					}
					$('#point'+checkpoint).html( string );
					//$('#point'+checkpoint).table( "refresh" );
					//$('#check'+checkpoint).collapsibleset( "refresh" );
				}
			}
			ajax.open('GET', 'php/getStudent.php?point='+checkpoint, true);
			ajax.send();
		});
	}
});
