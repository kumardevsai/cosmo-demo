window.onload = function() {

	window.addEventListener("resize", resizeMap, false);
	document.getElementById("sbtn0").addEventListener("click", function(e) {
		utils.preventDefault(e);
		placeSearch();
	}, false);
	document.getElementById("sbtn1").addEventListener("click", function(e) {
		utils.preventDefault(e);
		getCurrentPosition();
	}, false);

	mapInit();
	resizeMap();

	$("#show_result_error").leanModal();
	$("#show_loading").leanModal();

};

function resizeMap() {
	var gaodemap = document.getElementById("gaodemap");
	var height_ = document.body.clientHeight;
	gaodemap.style.height = height_ - 70 + "px";

	document.getElementById("result").style.height = height_ - 70 + "px";
};

var mapObj;
var marker = new Array();
var markers = new Array();
var windowsArr = new Array();
var marker_;
var poiArray;
//基本地图加载  
function mapInit() {
	mapObj = new AMap.Map("gaodemap");

	mapObj.plugin('AMap.Geolocation', function() {
		geolocation = new AMap.Geolocation({
			enableHighAccuracy: true, //是否使用高精度定位，默认:true  
			timeout: 10000, //超过10秒后停止定位，默认：无穷大  
			maximumAge: 0, //定位结果缓存0毫秒，默认：0  
			convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true  
			showButton: true, //显示定位按钮，默认：true  
			buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角  
			buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)  
			showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true  
			showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true  
			panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true  
			zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false  
		});
		mapObj.addControl(geolocation);
		AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息  
		AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息  
	});
};


/* 
 *获取当前位置信息
 */
function getCurrentPosition() {
	geolocation.getCurrentPosition();
};
/* 
 *监控当前位置并获取当前位置信息
 */
function watchPosition() {
	geolocation.watchPosition();
};
/* 
 *解析定位结果
 */
function onComplete(data) {
	geocodeFromPosition(data);
};
/* 
 *解析定位错误信息
 */
function onError(data) {
	var str = '<p>定位失败!';
	str += '错误信息：'
	switch (data.info) {
		case 'PERMISSION_DENIED':
			str += '<font color="red">浏览器阻止了定位操作</font>';
			break;
		case 'POSITION_UNAVAILBLE':
			str += '<font color="red">无法获得当前位置</font>';
			break;
		case 'TIMEOUT':
			str += '<font color="red">定位超时</font>';
			break;
		default:
			str += '<font color="red">未知错误</font>';
			break;
	}
	str += '</p>';
	document.getElementById("result_error").innerHTML = str;
	$("#show_result_error").click();
};

function placeSearch() {
	var MSearch;
	mapObj.plugin(["AMap.PlaceSearch"], function() {
		MSearch = new AMap.PlaceSearch({ //构造地点查询类  
			pageSize: 10,
			pageIndex: 1
		});
		AMap.event.addListener(MSearch, "complete", keywordSearch_CallBack); //返回地点查询结果  
		MSearch.search(document.getElementById("searchplace").value); //关键字查询  
	});
};
//添加marker&infowindow      
function addmarker(i, d) {
	var lngX = d.location.getLng();
	var latY = d.location.getLat();
	var markerOption = {
		map: mapObj,
		icon: "http://webapi.amap.com/images/" + (i + 1) + ".png",
		position: new AMap.LngLat(lngX, latY)
	};
	var mar = new AMap.Marker(markerOption);
	markers.push(mar);
	marker.push(new AMap.LngLat(lngX, latY));

	var infoWindow = new AMap.InfoWindow({
		content: "<h3><font color=\"#00a6ac\">&nbsp;&nbsp;" + (i + 1) + ". " + d.name + "</font></h3>" + TipContents(d.type, d.address, d.tel),
		size: new AMap.Size(300, 0),
		autoMove: true,
		offset: new AMap.Pixel(0, -30)
	});
	windowsArr.push(infoWindow);
	var aa = function(e) {
		infoWindow.open(mapObj, mar.getPosition());
	};
	AMap.event.addListener(mar, "click", aa);
};
//回调函数  
function keywordSearch_CallBack(data) {
	var poiArr = data.poiList.pois;
	showSearchResult(poiArr);
};

function showSearchResult(poiArr) {
	clearMaker();
	poiArray = poiArr;
	var resultStr = "";
	var resultCount = poiArr.length;
	if (resultCount === 0) {
		document.getElementById("result_error").innerHTML = "<p>没有结果,请重新搜索或定位!</p>";
		$("#show_result_error").click();
		return;
	}
	for (var i = 0; i < resultCount; i++) {
		resultStr += "<div id='divid" + (i + 1) + "' onmouseover='openMarkerTipById1(" + i + ",this)' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\"><table style=\"width:100%;\"><tr><td style='width:50px;'><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" + "<td><h5><font color=\"#00a6ac\">名称: " + poiArr[i].name + "</font></h5>";
		resultStr += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel) + "</td><td valign='middle' align='center' style='width:80px;'><span class='select_span' onclick='selectPosition(" + i + ")'>选择</span></td></tr></table></div>";
		addmarker(i, poiArr[i]);
	}
	mapObj.setFitView();
	document.getElementById("result").innerHTML = resultStr;
};

function TipContents(type, address, tel) { //窗体内容  
	if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
		type = "暂无";
	}
	/**
		if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
			address = "暂无";
		}
		if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
			tel = "暂无";
		}
	**/
	var str = "&nbsp;&nbsp;地址：" + address;
	return str;
};

function openMarkerTipById1(pointid, thiss) { //根据id 打开搜索结果点tip  
	thiss.style.background = '#CAE1FF';
	windowsArr[pointid].open(mapObj, marker[pointid]);
};

function onmouseout_MarkerStyle(pointid, thiss) { //鼠标移开后点样式恢复  
	thiss.style.background = "";
};

function clearMaker() {
	for (var i = 0; i < markers.length; i++) {
		var a = markers[i];
		a.setMap(null);
	}
	markers = new Array();
};

function geocodeFromPosition(data) {
	var lnglatXY = new AMap.LngLat(data.position.getLng(), data.position.getLat());
	geocoder(lnglatXY);
};

function geocoder(lnglatXY) {
	if (marker_)
		marker_.setMap(null);
	var MGeocoder;
	//加载地理编码插件  
	mapObj.plugin(["AMap.Geocoder"], function() {
		MGeocoder = new AMap.Geocoder({
			radius: 100,
			extensions: "all"
		});
		//返回地理编码结果   
		AMap.event.addListener(MGeocoder, "complete", function(data) {
			if (data.info === "OK" && data.type === "complete")
				showSearchResult(data.regeocode.pois);
			else {
				document.getElementById("result_error").innerHTML = "<p>当前定位错误!</p>";
				$("#show_result_error").click();
			}
		});
		//逆地理编码  
		MGeocoder.getAddress(lnglatXY);
	});
	//加点  
	marker_ = new AMap.Marker({
		map: mapObj,
		icon: new AMap.Icon({
			image: "http://api.amap.com/Public/images/js/mark.png",
			size: new AMap.Size(58, 30),
			imageOffset: new AMap.Pixel(-32, -0)
		}),
		position: lnglatXY,
		offset: new AMap.Pixel(-5, -30)
	});
	mapObj.setFitView();
};

function selectPosition(i){
	var pos = poiArray[i];
	if(pos)
	{
		
	}
};