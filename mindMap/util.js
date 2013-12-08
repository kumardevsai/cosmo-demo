// 异步操作类
// url:访问地址
// callback:回调函数
function Ajax(url, callback) {
	// 初始化访问对象
	var req = init();
	var ansy = false;
	if (callback != null) {
		req.onreadystatechange = processRequest;
		ansy = true;
	}

	// 初始化访问对象
	function init() {
		if (window.XMLHttpRequest)
			return new XMLHttpRequest();
		else if (window.ActiveXObject)
			return new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 访问状态
	function processRequest() {
		if (req.readyState == 4) {
			// status为0时，表示XMLHttpRequest对象尚未初始化，在chrome下不表示错误
			if (req.status == 200 || req.status == 0) {
				if (callback) {
					callback(req.responseText);
				}
			} else if (req.status == 404) {
				alert("HTTP 错误 404 - 文件或目录未找到。");
				if (callback) {
					callback("false");
				}
				return false;
			} else {
				alert("HTTP 错误");
				if (callback) {
					callback("false");
				}
				return false;
			}
		}
		if (req.readyState == 1) {
			//if(onloading) onloading();
		}
	}
	// 得到请求(异步)
	this.doGet = function() {
		req.open("GET", url, ansy);
		req.setRequestHeader("Cache-Control", "no-cache");
		req.setRequestHeader("Pragma", "no-cache");
		req.send(null);
		if (callback == null)
			return req.responseText;
	}
	// 发送请求(异步)
	this.doPost = function(body) {
		req.open("POST", url, ansy);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(body);
		if (callback == null)
			return req.responseText;
	}
}

// 通得字符串得到xml对象
// xml:xml格式的字符串
// 返回值：xml格式对象
function LoadXml(xml) {
	if (xml.indexOf('<') == -1) return null;
	if (window.ActiveXObject) {
		var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.loadXML(xml);
		var obj = xmlDoc.documentElement;
		return obj;
	} else if (window.XMLHttpRequest) {
		var oParser = new DOMParser();
		var oXmlDom = oParser.parseFromString(xml, "text/xml");
		commXmlDoc(oXmlDom.childNodes[0]);
		return oXmlDom.childNodes[0];
	}
}

// 兼容浏览器: 设置属性
// 为XML结构设置xml和text属性
function commXmlDoc(xItems) {
	var xml = '';
	if (xItems.nodeName.indexOf('#') != -1) return xItems.textContent;
	if (xItems.nodeName.indexOf('-') != -1) return xItems.textContent;
	xml = '<' + xItems.nodeName + " "
	for (var i = 0; i < xItems.attributes.length; i++) {
		var attr = xItems.attributes[i];
		xml += attr.nodeName + '="' + attr.nodeValue + '" ';
	}
	xml += '>';
	for (var m = 0; m < xItems.childNodes.length; m++) {
		xml += commXmlDoc(xItems.childNodes[m]);
	}
	xml += '</' + xItems.nodeName + ">";
	xItems.xml = xml;
	xItems.text = xItems.textContent;
	return xml;
}

// 兼容浏览器: 属性设置
function attr(obj, key, val) {
	if (val != null) {
		obj.setAttribute(key, val);
		return null;
	}
	if (obj.attributes == null)
		return null;
	if (obj.attributes[key] != null) {
		return obj.attributes[key].value;
	}
	return null;
}

//js去除空格
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.LTrim = function() {
	return this.replace(/(^\s*)/g, "");
}
String.prototype.RTrim = function() {
	return this.replace(/(\s*$)/g, "");
}

function AttachEvent(target, eventName, handler, argsObject) {
	var eventHandler = handler;
	if (argsObject) {
		eventHander = function(e) {
			handler.call(argsObject, e);
		}
	}
	eventName = eventName.replace('on', '');
	if (window.attachEvent) //IE   
		target.attachEvent("on" + eventName, eventHandler);
	else //FF   
		target.addEventListener(eventName, eventHandler, false);
}