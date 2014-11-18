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
 
 function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
  
function setInterface(){
	var twitterHeight = window.innerHeight - 34 - window.innerHeight*0.44;
	document.getElementById('twitter').style.height =  twitterHeight + "px";
	//document.getElementById('tweets').style.height =  twitterHeight - 38 + "px";
	if(typeof map != 'undefined')
	map.setCenter(new google.maps.LatLng(35.721, 140.848));
	var widget = document.getElementById('twitter-widget-0');
	if(!widget)
		setTimeout(setInterface, 3000);
	else{
		widget.width = window.innerWidth * 0.4 + "px";
		widget.height = twitterHeight + "px";
	}
}

document.addEventListener('DOMContentLoaded', function(event){

	setInterface();
	window.addEventListener('resize', setInterface, true);
	
	var mapOptions = {
		center: new google.maps.LatLng(35.721, 140.848),
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		scrollwheel: true,
		minZoom: 12,
		maxZoom: 18,
		draggable: true,
		zoomControl: true,
		zoomControlOptions : {
			position : google.maps.ControlPosition.TOP_LEFT
			//style : google.maps.ZoomControlStyle.SMALL
		}
	};
	
	map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	var polyline = new google.maps.Polyline({path:path, strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2});
	polyline.setMap(map);
	var polyline = new google.maps.Polyline({path:missingPart, strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2});
	polyline.setMap(map);
	
	google.maps.event.addListener(map, 'click', function(e){
		console.log(e.latLng.toString());
	});
	
	var open = true;
	document.getElementById('minimize').addEventListener('click', function(e){
		if(open){
			open = false;
			document.getElementById('pname').style.display = 'none';
			document.getElementById('prank').style.display = 'none';
			document.getElementById('disclaim').style.display = 'none';
			document.getElementById('open').style.display = 'block';
			document.getElementById('close').style.display = 'none';
		}else{
			open = true;
			document.getElementById('pname').style.display = 'block';
			document.getElementById('prank').style.display = 'block';
			document.getElementById('disclaim').style.display = 'block';
			document.getElementById('open').style.display = 'none';
			document.getElementById('close').style.display = 'block';
		}
	});
	/*
	(function(){
		var ajax = new XMLHttpRequest();
			
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var points = JSON.parse(ajax.responseText);
				delete ajax;
				for(var i = 0; i < points.length; i++){
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(points[i].lat, points[i].lon),
						map: map,
						title: points[i].name,
						icon : "http://icons.iconarchive.com/icons/position-relative/social-2/24/slashdot-icon.png"
					});
				}
				getCamera();
			}
		}
		
		ajax.open('GET', 'php/getChecks.php', true);
		ajax.send();
	})();
	*/
	
	var activeCamera;
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
				activeCamera = car;
				car.setZIndex(9999);
				car.state = json.state;
				google.maps.event.addListener(car, 'click', function(){
					activeCamera = this;
					if(this.state)
						document.getElementById('stream').setAttribute('src', 'http://www.ustream.tv/embed/16691110');
					else
						document.getElementById('stream').setAttribute('src', 'http://www.ustream.tv/embed/16691073');
				});
				
				setInterval(function(){
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 4 && ajax.status == 200){
							var json = JSON.parse(ajax.responseText);
							delete ajax;
							car.setPosition(new google.maps.LatLng(json.lat, json.lon));
							car.state = json.state;
						}
					}
					ajax.open('GET', 'php/getCoords.php', true);
					ajax.send();
				/*fd*/
				}, 30000);
			}
		}
		
		ajax.open('GET', 'php/getCoords.php', true);
		ajax.send();
	})();
	
	(function(){
		var ajax = new XMLHttpRequest();
		var infowindow = new google.maps.InfoWindow({ content: 'heya' });
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var cameras = JSON.parse(ajax.responseText);
				delete ajax;
				for(var i = 0; i < cameras.length; i++){
					var url = cameras[i].url;
					var initIcon = 'css/';

					if(i == 0)
						initIcon += 'arrow.png';
					else if(i == cameras.length - 1)
						initIcon += 'start.png';
					else if(cameras[i].check && cameras[i].state)
						initIcon += 'check-on.png';
					else if(cameras[i].check && !cameras[i].state)
						initIcon += 'check-off.png';
					else if(cameras[i].state)
						initIcon += 'camera-on.png';
					else
						initIcon += 'camera-off.png';
					
					var state = cameras[i].state;
					var check = cameras[i].check;
					
					cameras[i] = new google.maps.Marker({
						position: new google.maps.LatLng(cameras[i].lat, cameras[i].lon),
						map: map,
						title: cameras[i].name,
						icon : initIcon
					});
					
					if(state)
						cameras[i].on = true;
					else
						cameras[i].on = false;
					
					if(check && i != 0)
						cameras[i].check = check;
					else
						cameras[i].check = 0;
					
					cameras[i].url = url;
					if(i == 4)
						console.log(cameras[i]);
					google.maps.event.addListener(cameras[i], 'click', function(){
						infowindow.close();
						if(this.on){
							document.getElementById('stream').setAttribute('src', this.url);
							console.log(this.url);
							activeCamera = this;
							//console.log(activeCamera);
						}else if(this.check){
							var mark = this;
							var num = this.check;
							console.log(mark);
							var ajax = new XMLHttpRequest();
							ajax.onreadystatechange = function(){
								if(ajax.readyState == 4 && ajax.status == 200){
									try{
										var json = JSON.parse(ajax.responseText);
										delete ajax;
									}catch(e){
										return;
									}
									
									var string = "<b>["+num+"] "+json.point + "</b>";
									string += "<div style='width:180px;min-height: 100px;'>";
									for(var i = 0; i < json.data.length; i++){
										if(json.data[i].school != "")
										string += "<li style='list-style-type: none'>"+json.data[i].rank + ")&nbsp;" + json.data[i].school+"</li>";
									}
									string += "</div>";
									infowindow.content = string;
									infowindow.open(map,mark);  
								}
							}
							ajax.open('GET', 'php/getRank.php?point='+this.check, true);
							ajax.send();
						}
					});
				}
				
				setInterval(function(){
					var ajax = new XMLHttpRequest();
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 4 && ajax.status == 200){
							var state = JSON.parse(ajax.responseText);
							delete ajax;
							for(var i = 0; i < cameras.length; i++){
								if(state[i].state){
									cameras[i].on = true;
									if(!state[i].check)
										cameras[i].setIcon('css/camera-on.png');
									else if(i != 0 && i != cameras.length -1)
										cameras[i].setIcon('css/check-on.png');
								}else{
									cameras[i].on = false;
									if(activeCamera == cameras[i]){
										console.log("called");
										for(var k = 0; k < cameras.length; k++){
											if(cameras[k].on){
												activeCamera = cameras[k];
												document.getElementById('stream').setAttribute('src', cameras[k].url);
											}
										}
									}									
									if(!state[i].check)
										cameras[i].setIcon('css/camera-off.png');
									else if(i != 0 && i != cameras.length -1)
										cameras[i].setIcon('css/check-off.png');
								}
							}
							delete state;
						}
					}
					ajax.open('GET', 'php/getState.php', true);
					ajax.send();
				/*fd*/
				}, 30000);
			}
		}
		
		ajax.open('GET', 'php/getCamera.php', true);
		ajax.send();
	})();
	
	(function getRank(){
		var ajax = new XMLHttpRequest();
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var json;
				try{
					json = JSON.parse(ajax.responseText);
					delete ajax;
				}catch(e){
					document.getElementById('pname').innerHTML = '順位情報未定';
					//document.getElementById('disclaim').style.display = 'none';
					/*fd*/
					setTimeout(getRank, 3000);
					return;
				}
				document.getElementById('pname').innerHTML = json.point;
				var string = "";
				for(var i = 0; i < json.data.length; i++)
					string += "<li>"+json.data[i].rank + ")&nbsp;" + json.data[i].school+"<br>"+json.data[i].name+"</li>";
				document.getElementById('prank').innerHTML = string;
				/*fd*/
				setTimeout(getRank, 30000);
			}
		}
		
		ajax.open('GET', 'php/getStudent.php', true);
		ajax.send();
	})();

	//var choshi = new Date("11 January 2014, 21:30:00").getTime();
	//console.log(choshi);
	var choshi = 1389493800000;
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
			div.innerHTML = "銚子駅伝開始まで:<br> " + days + "日" + hours + "時間" + minutes + "分" + seconds + "秒";
		}else{
			count = Math.floor(count/1000);
			var days = Math.floor(count/86400);
			var hours = Math.floor((count/3600)-(days*24));
			var minutes = Math.floor((count/60)-(days*1440)-(hours*60));
			var seconds = Math.floor(count-(days*86400)-(hours*3600)-(minutes*60));
			if(hours < 10)
				hours  = "0" + hours;
			if(minutes < 10)
				minutes  = "0" + minutes;
			if(seconds < 10)
				seconds  = "0" + seconds;
			div.innerHTML = "<span style='font-size: 16px'>銚子駅伝経過時間</span><br> "+ hours + ":" + minutes + ":" + seconds;
		}
	}
	
	setInterval(setTime, 1000);
	setTime();
	
	/*
	(function(){
		var ids = new Array();
		
		function addTweet(msg, user){
			var div = document.getElementById('tweets');
			var li = document.createElement('li');
			var p = document.createElement('span');
			li.innerHTML  = msg;
			p.innerHTML = user;
			li.appendChild(p);
			div.appendChild(li);
			div.scrollTop = div.scrollHeight;
		}
		
		function getTweets(){
			var ajax = new XMLHttpRequest();
			
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					var tweets = JSON.parse(ajax.responseText);
					delete ajax;
					
					for(var i = 0; i < tweets.length; i++){
						if(ids.indexOf(tweets[i].id) != -1)
							continue;
						
						ids.push(tweets[i].id);
						addTweet(tweets[i].text, '@'+tweets[i].user.screen_name);
					}
				}
			}
			
			ajax.open('GET', 'php/getTwitter.php', true);
			ajax.send();
		}
		
		getTweets();
		setInterval(getTweets, 10000);
	})();
	*/
	 if(isIE()){
		var ieString = "<div style='width:240px; min-height: 80px;'>インターネット・エクスプローラーでは最新情報が更新されません。順位情報とトップランナーの位置を確認したい場合は、ページをリロードして下さい。本ページの閲覧には、<a target='_blank' href='https://www.google.com/intl/ja/chrome/browser/'>Google Chrome</a> あるいは <a target='_blank' href='http://www.mozilla.jp/'>Firefox</a> を推奨します。'</div>";
		var ieWindow = new google.maps.InfoWindow({ content: ieString });
		var iecon = new google.maps.Marker({
			position: new google.maps.LatLng(35.721, 140.848),
			map: map,
			title: "IE ヘルプ",
			icon : "http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/32/Browsers-Ie-icon.png"
		});
		ieWindow.open(map,iecon); 
		google.maps.event.addListener(iecon, 'click', function(){
			ieWindow.open(map,iecon); 
		});
	}else{
		var ieString = "<div style='width:240px; min-height: 80px; font-size: 15px; font-family: Meiryo; padding-top: 4px;'>カメラ<img style='height: 16px;' src=\"http://maku-cam2.jiu.ac.jp/~ekiden/css/camera-on.png\" />や、チェックポイント<img style='height: 16px;' src=\"http://maku-cam2.jiu.ac.jp/~ekiden/css/check-on.png\" />をクリックすると、中継画面がクリックした地点の映像に切り替わります。</div>";
		var ieWindow = new google.maps.InfoWindow({ content: ieString });
		var iecon = new google.maps.Marker({
			position: new google.maps.LatLng(35.721, 140.848),
			draggable:true,
			map: map,
			title: "ページヘルプ",
			icon : "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/32/Actions-help-about-icon.png"
		});
		ieWindow.open(map,iecon); 
		google.maps.event.addListener(iecon, 'click', function(){
			ieWindow.open(map,iecon); 
		});
		setTimeout(function(){
			ieWindow.close();
		}, 20000);
	}
	
});
