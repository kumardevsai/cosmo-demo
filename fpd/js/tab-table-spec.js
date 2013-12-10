// 生成标签行
/**
 * 把源对象的属性扩展到目标对象
 * @method setTabLinks
 * @param divId 标签容器id
 * @param direction 标签方向  有四个值  top left botton right
 * @param defaultIndex 默认打开的标签
 * @param clearAStyle  清楚自由页面设置超链接的样式  可选值true false
 * @param showMouseOver 是否显示鼠标移动到、鼠标按下时候的事件及样式 默认false
 * @param autoWdith 是否自动填充父元素的宽度，默认为true，根据标签最宽字符进行设置
 */
function setTabLinks(divId, direction, defaultIndex, clearAStyle, showMouseOver, autoWidth) {
	// 标签计数器加1
	tabDef.tabNum++;
	// 获取外部div容器
	var container = document.getElementById(divId);
	// 超练级数量
	var c_chld_length = container.children.length;
	if (c_chld_length <= 0)
		return;
	// 默认标签方向
	var direct_ = tabDef.defaultDirection;
	if (checkAvialiableString(direction))
		direct_ = direction;
	// 缓存标签信息
	tabDef.tabDirections['tab_' + tabDef.tabNum] = direct_;
	var links = [];
	for (var i = 0; i < c_chld_length; i++) {
		var a_link = container.children[i];
		// 获取转换后的标签
		var link = getOneTabLink(a_link, clearAStyle, 'tab_' + tabDef.tabNum, direct_, autoWidth);
		// 替换节点
		if (a_link.replaceNode)
			a_link.replaceNode(link);
		else
			a_link.parentNode.replaceChild(link, a_link);
		links.push(link);
		AttachEvent(link.firstChild, 'click', setTabLinkActived, false);
		// 显示标签浮动效果
		if (showMouseOver === true) {
			AttachEvent(link.firstChild, 'mousedown', setTabLinkMouseOver, false);
			AttachEvent(link.firstChild, 'mouseover', setTabLinkMouseOver, false);
			AttachEvent(link.firstChild, 'mouseout', setTabLinkMouseOut, false);
		}
		// 默认激活一个标签
		if (defaultIndex !== undefined && defaultIndex === i)
			link.firstChild.click();
	}
	// 设置单个标签的样式
	if (autoWidth === true && (direct_ === 'left' || direct_ === 'right')) {
		var maxWidth = 0;
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			if (link.offsetWidth) {
				if (maxWidth < link.offsetWidth)
					maxWidth = link.offsetWidth;
				if (maxWidth > link.offsetWidth)
					links[i].style.width = maxWidth + 'px';
			}
		}
	}
};

// 创建一个标签
function getOneTabLink(a_link, clearAStyle, tab, direction, autoWidth) {
	var link = document.createElement('div');
	// 设置左、右侧标签的最外层样式，主要是设置宽度
	link.className = 'link-outer-' + direction;
	var a_clone = a_link.cloneNode(true);
	// 清楚自由页面默认设置的超链接样式，替换为css文件的样式
	if (clearAStyle === true)
		a_clone.style.cssText = ''
	link.appendChild(a_clone);
	// 设置所属的tab组
	link.setAttribute('ownTab', tab);
	// 显示普通标签样式
	setOneTabLinkNormally(link);
	return link;
};

// 激活标签样式
function setOneTabLinkActived(link) {
	// 激活
	setTabLinkStyle(link, 'active');
};

// 恢复标签样式
function setOneTabLinkNormally(link) {
	setTabLinkStyle(link, 'normal');
};

// 激活一个标签，恢复一个标签样式
function setTabLinkActived(e) {
	var link = getEventTabLink(e);
	// 如果点击的标签已被激活，则返回
	if (link == tabDef.activedTabLink)
		return;
	// 激活当前点击的标签
	setOneTabLinkActived(link);
	if (tabDef.activedTabLink)
	// 原有已经被激活的标签恢复为默认样坏死
		setOneTabLinkNormally(tabDef.activedTabLink);
	tabDef.activedTabLink = link;
	// 打开页面
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
	setTabLinkStyle(link, 'normal');
};

// 获取事件触发时的标签元素
function getEventTabLink(e) {
	e = window.event ? window.event : e;
	var link = e.srcElement ? e.srcElement : e.target;
	if (link.tagName.toLowerCase() === 'a')
		return link.parentNode;
	return link;
};

// 标签定义
var tabDef = {
	activedTabLink: null,
	classPrefix: {
		top: 'link-outer-top',
		left: 'link-outer-left',
		bottom: 'link-outer-bottom',
		right: 'link-outer-right'
	},
	// 默认标签显示的方向
	defaultDirection: 'top',
	// 标签组数量
	tabNum: 0,
	// 标签方向信息
	tabDirections: []
};

// 获取一个有效的字符串
function checkAvialiableString(str) {
	if (typeof str === 'string')
		return str !== undefined && str !== null && str !== '';
	else
		return false;
};

// 设置标签的样式
function setTabLinkStyle(link, sty) {
	if (sty) {
		// 获取标签class前缀
		var prefix = tabDef.classPrefix[tabDef.tabDirections[link.getAttribute('ownTab')]];
		link.className = prefix + ' ' + prefix + '-' + sty;
	}
};

// 执行鼠标点击操作
function openTabLink(link) {
	link.firstChild.click();
};