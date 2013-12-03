// 生成标签行
function setTabLinks(divId, direction, defaultIndex) {
	var container = document.getElementById(divId);
	var c_chld_length = container.children.length;
	if (c_chld_length <= 0)
		return;
	if (checkAvialiableString(direction))
		tabDef.direction = direction;
	for (var i = 0; i < c_chld_length; i++) {
		var a_link = container.children[i]
		var link = getOneTabLink(a_link);
		a_link.replaceNode(a_link, link);
		AttachEvent(link, 'click', setTabLinkActived, false);
		AttachEvent(link, 'mousedown', setTabLinkMouseOver, false);
		AttachEvent(link, 'mouseover', setTabLinkMouseOver, false);
		AttachEvent(link, 'mouseout', setTabLinkMouseOut, false);
	}
};

// 创建一个标签
function getOneTabLink(a_link) {
	var link = document.createElement('div');
	var c = document.createElement('div');
	var l = document.createElement('div');
	var r = document.createElement('div');
	c.appendChild(a_link);
	link.appendChild(l);
	link.appendChild(c);
	link.appendChild(r);
	setOneTabLinkNormally(link);
	return link;
};

// 激活标签样式
function setOneTabLinkActived(link) {
	setTabLinkStyle(link, 'active');
};

// 恢复标签样式
function setOneTabLinkNormally(link) {
	setTabLinkStyle(link, 'normal');
};

// 激活一个标签，恢复一个标签样式
function setTabLinkActived(e) {
	var link = getEventTabLink(e);
	if (link == tabDef.activedTabLink)
		return;
	setOneTabLinkActived(link);
	if (tabDef.activedTabLink)
		setOneTabLinkNormally(tabDef.activedTabLink);
	tabDef.activedTabLink = link;
	openTabLink(link);
};

// 设置普通标签鼠标滑过的样式
function setTabLinkMouseOver(e) {
	var link = getEventTabLink(e);
	if (link == tabDef.activedTabLink)
		return;
	setTabLinkStyle(link, 'mouseover');
};

// 设置普通标签鼠标滑出的样式
function setTabLinkMouseOut(e) {
	var link = getEventTabLink(e);
	if (link == tabDef.activedTabLink)
		return;
	setTabLinkStyle(link, 'mouseout');
};

// 获取事件触发时的标签元素
function getEventTabLink(e) {
	e = window.event ? window.event : e;
	var link = e.srcElement ? e.srcElement : e.target;
	return link;
};

// 标签定义
var tabDef = {
	activedTabLink: null,
	classPrefix: {
		top: 'link-top',
		left: 'link-left',
		bottom: 'link-bottom',
		right: 'link-right'
	},
	direction: 'top'
};

// 获取一个有效的字符串
var checkAvialiableString(str) {
	if (typeof str === 'string')
		return str !== undefined && str !== null && str !== '';
	else
		return false;
};

// 获取标签的不同部分 ， 兼容写法
function getLinkObj(link) {
	var l = link.firstChild;
	var c = l.nextSibling;
	var r = link.lastChild;
	return {
		l: l,
		c: c,
		r: c
	};
};

// 设置标签的样式
function setTabLinkStyle(link, sty) {
	if (sty) {
		var prefix = tabDef.classPrefix[tabDef.direction];
		var linkObj = getLinkObj(link);
		link.className = prefix + '-' + sty;
		linkObj.l = prefix + '-' + sty + '-l link-l';
		linkObj.c = prefix + '-' + sty + '-c link-c';
		linkObj.r = prefix + '-' + sty + '-r link-r';
	}
};

// 执行鼠标点击操作
function openTabLink(link) {
	var linkObj = getLinkObj(link);
	linkObj.c.firstChild.click();
};