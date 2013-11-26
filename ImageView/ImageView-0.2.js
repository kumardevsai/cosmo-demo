'use strict';
var imgname = '16220441-1-63F2.jpg';
AttachEvent(window, 'load', function() {
	initImage(imgname);
}, false);
AttachEvent(window, 'resize', function() {
	if (def.isMaxed === false)
		setMaxView(true);
}, false);

function initImage(imgsrc) {
	AttachEvent(document.getElementById('pic_view'), 'mouseout', function() {
		def.drag = 0
	}, false);
	AttachEvent(document.getElementById('pic_view'), 'mouseover', function() {
		def.drag = 1
	}, false);
	// 鼠标滚轮缩放
	if (document.addEventListener) {
		document.addEventListener('DOMMouseScroll', scrollScale, false);
	}
	window.onmousewheel = document.onmousewheel = scrollScale;

	AttachEvent(document.body, 'keyup', keyBoardMove, false);

	//test
	var img = new Image();
	img.src = imgsrc;
	img.onload = function() {
		var imgHide = document.getElementById('img_hide');
		imgHide.src = img.src;
		var imgView = document.getElementById('img_view');
		imgView.src = img.src;
		setMaxView(true);
	};
};
var def = {
	drag: 0,
	nTY: 0,
	nTX: 0,
	nn6: document.getElementById && !document.all,
	isDrag: false,
	y: 0,
	x: 0,
	oDragObj: null,
	isMoved: false,
	isScaled: false,
	isMaxed: false,
};

// 键盘移动图片
function keyBoardMove(e) {
	e = e || window.event;
	var keyCode = e.keyCode;
	if (e.shiftKey === true) {
		preventDefault(e);
		switch (keyCode) {
			// +
			case 187:
				bigit();
				break;
				// -
			case 189:
				smallit();
				break;
				// 0
			case 48:
				realsize();
				break;
				// 9
			case 57:
				featsize();
				break;
			default:
				break;
		}
	}
	switch (keyCode) {
		case 37:
			clickMove('left');
			break;
		case 38:
			clickMove('up');
			break;
		case 39:
			clickMove('right');
			break;
		case 40:
			clickMove('down');
			break;
		default:
			break;
	}
};


// 阻止默认事件触发及冒泡
function preventDefault(e) {
	if (e.preventDefault)
		e.preventDefault();
	else
		e.returnValue = false;
	if (e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
};


// 鼠标滚轮缩放
function scrollScale(e) {
	e = e || window.event;
	var delta;
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox') === -1)
		delta = e.wheelDelta;
	else
		delta = e.detail;
	if (delta > 0)
		bigit(1.05);
	else
		smallit(1.05);
};

// 鼠标拖动
function moveMouse(e) {
	if (def.isDrag) {
		if (def.oDragObj) {
			def.oDragObj.style.top = (def.nn6 ? def.nTY + e.clientY - def.y : def.nTY + event.clientY - def.y) + "px";
			def.oDragObj.style.left = (def.nn6 ? def.nTX + e.clientX - def.x : def.nTX + event.clientX - def.x) + "px";
			def.oDragObj.style.cursor = 'pointer';
		}
		def.isMoved = true;
		return false;
	}
}

// 初始鼠标拖动
function initDrag(e) {
	var oDragHandle = def.nn6 ? e.target : event.srcElement;
	var topElement = "HTML";
	while (oDragHandle.tagName != topElement && oDragHandle.className != "pic-view") {
		oDragHandle = def.nn6 ? oDragHandle.parentNode : oDragHandle.parentElement;
	}
	if (oDragHandle.className == "pic-view") {
		def.isDrag = true;
		def.oDragObj = oDragHandle;
		def.nTY = parseInt(def.oDragObj.style.top + 0);
		def.y = def.nn6 ? e.clientY : event.clientY;
		def.nTX = parseInt(def.oDragObj.style.left + 0);
		def.x = def.nn6 ? e.clientX : event.clientX;
		document.onmousemove = moveMouse;
		return false;
	}
}
// 鼠标按下初始拖动
document.onmousedown = initDrag;
// 鼠标抬起恢复效果
document.onmouseup = function() {
	def.isDrag = false;
	if (def.oDragObj)
		def.oDragObj.style.cursor = 'default';
};

// 点击按钮工具进行移动
function clickMove(s) {
	var picView = document.getElementById('pic_view');
	if (s == "up") {
		picView.style.top = parseInt(picView.style.top ? picView.style.top : 0) + 40 + 'px';
	} else if (s == "down") {
		picView.style.top = parseInt(picView.style.top ? picView.style.top : 0) - 40 + 'px';
	} else if (s == "left") {
		picView.style.left = parseInt(picView.style.left ? picView.style.left : 0) + 40 + 'px';
	} else if (s == "right") {
		picView.style.left = parseInt(picView.style.left ? picView.style.left : 0) - 40 + 'px';
	}
	def.isMoved = true;
}

// 缩小
function smallit(times) {
	times = times ? times : 1.1;
	var imgView = document.getElementById('img_view');
	var height1 = imgView.offsetHeight;
	var width1 = imgView.offsetWidth;
	imgView.style.height = height1 / times + 'px';
	imgView.style.width = width1 / times + 'px';
	def.isScaled = true;
}

// 放大
function bigit(times) {
	times = times ? times : 1.1;
	var imgView = document.getElementById('img_view');
	var height1 = imgView.offsetHeight;
	var width1 = imgView.offsetWidth;
	imgView.style.height = height1 * times + 'px';
	imgView.style.width = width1 * times + 'px';
	def.isScaled = true;
}

// 重置为图片实际尺寸
function realsize() {
	setMaxView(false);
}

// 重置页面大小
function featsize() {
	def.isMoved = false;
	def.isScaled = false;
	setMaxView(true, true);
}

// 事件兼容
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

// 设置图片缩放
function setMaxView(flag, redraw) {
	var imgHide = document.getElementById('img_hide');
	var imgView = document.getElementById('img_view');
	var picView = imgView.parentElement;
	// body尺寸
	var body_height = document.body.offsetHeight;
	var body_width = document.body.offsetWidth;
	// 控制大小
	if (flag === true) {
		if (def.isMoved === false && def.isScaled === false || redraw === true) {
			var size = getObjSize({
				width: imgHide.offsetWidth,
				height: imgHide.offsetHeight
			}, {
				width: body_width,
				height: body_height
			});
			imgView.style.height = size.height + 'px';
			imgView.style.width = size.width + 'px';
			picView.style.left = (body_width - size.width) / 2 + 'px';
			picView.style.top = (body_height - size.height) / 2 + 'px';
			def.isMaxed = false;
		}
	} else {
		if (body_width <= imgHide.offsetWidth)
			picView.style.left = 0;
		else
			picView.style.left = (body_width - imgHide.offsetWidth) / 2 + 'px';
		if (body_height <= imgHide.offsetHeight)
			picView.style.top = 0;
		else
			picView.style.top = (body_height - imgHide.offsetHeight) / 2 + 'px';
		imgView.style.height = imgHide.offsetHeight + 'px';
		imgView.style.width = imgHide.offsetWidth + 'px';
		def.isMaxed = true;
	}
};

// 获取填充大小
function getObjSize(obj, ref) {
	var obj_ = cloneObj(obj);
	if (obj.width > obj.height) {
		if (obj.width > ref.width)
			obj.width = ref.width;
		obj.height = (obj.width / obj_.width) * obj.height;
		if (obj.height > ref.height)
			obj.height = ref.height;
		obj.width = (obj.height / obj_.height) * obj_.width;
	} else {
		if (obj.height > ref.height)
			obj.height = ref.height;
		obj.width = (obj.height / obj_.height) * obj.width;
		if (obj.width > ref.width)
			obj.width = ref.width;
		obj.height = (obj.width / obj_.width) * obj_.height;
	}
	return obj;
};


// 复制对象
function cloneObj(obj) {
	var obj_ = {};
	for (var i in obj) {
		if (obj.hasOwnProperty(i))
			obj_[i] = obj[i];
	}
	return obj_;
};