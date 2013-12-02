'use strict';

// 初始化body
function initBody() {
	AttachEvent(document.body, 'dragstart', function() {
		return false;
	}, false);
	AttachEvent(document.body, 'contextmenu', function() {
		return false;
	}, false);
	AttachEvent(document.body, 'selectstart', function() {
		return false;
	}, false);
	AttachEvent(document.body, 'select', function() {
		document.selection.empty();
	}, false);
	AttachEvent(document.body, 'copy', function() {
		document.selection.empty();
	}, false);
	AttachEvent(document.body, 'beforecopy', function() {
		return false;
	}, false);
	AttachEvent(document.body, 'mouseup', function() {
		document.selection.empty();
	}, false);
	AttachEvent(document.body, 'keyup', keyBoardMove, false);

	AttachEvent(window, 'resize', function() {
		if (def.isMaxed === false)
			setMaxView(true);
	}, false);
};

// 初始化组件
function initComponents() {
	// 工具栏
	var layer = document.createElement('div');
	layer.className = 'view-layer';
	// 创建表格
	var table = document.createElement('table');
	table.cellpadding = 0;
	table.cellspacing = 0;
	table.style.border = '0';

	var tbody = document.createElement('tbody');

	tbody.appendChild(createComponentRow(['', {
		className: 'view-icons view-up',
		title: '向上',
		attach: {
			name: 'click',
			func: function() {
				clickMove('up');
			}
		}
	}, '']));
	tbody.appendChild(createComponentRow([{
		className: 'view-icons view-left',
		title: '向左',
		attach: {
			name: 'click',
			func: function() {
				clickMove('left');
			}
		}
	}, {
		className: 'view-icons view-zoom',
		title: '屏幕大小 shift 9',
		attach: {
			name: 'click',
			func: function() {
				featsize();
			}
		}
	}, {
		className: 'view-icons view-right',
		title: '向右',
		attach: {
			name: 'click',
			func: function() {
				clickMove('right');
			}
		}
	}]));
	tbody.appendChild(createComponentRow(['', {
		className: 'view-icons view-down',
		title: '向下',
		attach: {
			name: 'click',
			func: function() {
				clickMove('down');
			}
		}
	}, '']));
	tbody.appendChild(createComponentRow(['', {
		className: 'view-icons view-zoomin',
		title: '放大 shift +',
		attach: {
			name: 'click',
			func: function() {
				bigit();
			}
		}
	}, '']));
	tbody.appendChild(createComponentRow(['', {
		className: 'view-icons view-zoomout',
		title: '缩小 shift -',
		attach: {
			name: 'click',
			func: function() {
				smallit();
			}
		}
	}, '']));
	tbody.appendChild(createComponentRow(['', {
		className: 'view-icons view-max',
		title: '实际大小 shift 0',
		attach: {
			name: 'click',
			func: function() {
				realsize();
			}
		}
	}, '']));
	table.appendChild(tbody);
	layer.appendChild(table);
	document.body.appendChild(layer);
	return layer;
};

// 创建组件行
function createComponentRow(arr, refer) {
	var tr = document.createElement('tr');
	for (var i = 0; i < arr.length; i++) {
		tr.appendChild(createComponetCell(arr[i]));
	}
	if (refer)
		refer.appendChild(tr);
	return tr;
};

// 创建单个组件
function createComponetCell(obj, refer) {
	var td = document.createElement('td');
	if (obj === '')
		return td;
	var div = document.createElement('div');
	if (obj.className)
		div.className = obj.className;
	if (obj.title)
		div.title = obj.title;
	if (obj.attach)
		AttachEvent(div, obj.attach.name, obj.attach.func, false);
	td.appendChild(div);
	if (refer)
		refer.appendChild(td);
	return td;
};

function initImage(imgid) {

	initBody();
	initComponents();
	initPics();

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

	if (document.all) {
		var imgele = document.getElementById(imgid);
		imgele.style.display = 'none';
		var imgHide = document.getElementById('img_hide');
		imgHide.src = imgele.src;
		var imgView = document.getElementById('img_view');
		imgView.style.display = 'none';
		imgView.src = imgele.src;
		imgView.onload = function() {
			// ie下第一次加载，图片显示的很小 是否应该添加onload给imgHide
			setMaxView(true);
			imgView.style.display = '';
		};
	} else
		var intervalImg = setInterval(function() {
			var imgele = document.getElementById(imgid);
			if (imgele !== null) {
				imgele.style.display = 'none';
				var img = new Image();
				img.src = imgele.src;
				img.onload = function() {
					var imgHide = document.getElementById('img_hide');
					imgHide.src = imgele.src;
					imgHide.onload = function() {
						var imgView = document.getElementById('img_view');
						imgView.style.display = 'none';
						imgView.src = imgele.src;
						imgView.onload = function() {
							setMaxView(true);
							imgView.style.display = '';
							clearInterval(intervalImg);
						};
					};
				};
			}
		}, 10);
};

function initPics() {
	var picHide = document.createElement('div');
	picHide.className = 'pic-hide';
	var imgHide = document.createElement('img');
	imgHide.style.border = '0';
	imgHide.id = 'img_hide';
	picHide.appendChild(imgHide);

	var picView = document.createElement('div');
	picView.className = 'pic-view';
	picView.id = 'pic_view';
	var imgView = document.createElement('img');
	imgView.id = 'img_view';
	imgView.className = 'pic-view-img';
	picView.appendChild(imgView);
	document.body.appendChild(picHide);
	document.body.appendChild(picView);
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
	isMaxed: false
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