var speed = 30; // 速度
// 滚动表格
var tableScroll = function(tbname) {
	speed = speed ? parseInt(speed) : 30;
	var div = (document.getElementById(tbname).firstChild.tagName === 'text' ? document.getElementById(tbname).firstElementChild : document.getElementById(tbname).firstChild).nextSibling;
	var div_height = div.offsetHeight;
	var table = div.getElementsByTagName('table')[0];
	var append_div = document.createElement('div');
	div.appendChild(append_div);
	var count = 0;

	function appendTable() {
		// 添加一个table
		var table_clone = document.createElement('div');
		if (count > 0)
			table_clone.style.marginTop = '-1px';
		// IE下table元素的innerHTML属性只读,因此采用遍历的写法
		table_clone.innerHTML = table.outerHTML;
		count++;
		return table_clone;
	};
	append_div.appendChild(appendTable());
	append_div.style.marginTop = '-1px';
	// 内部元素总体高度要大于外部容器的高度
	while (append_div.offsetHeight + table.offsetHeight <= div_height * 2) {
		append_div.appendChild(appendTable());
	}
	// 滚动

	function scrollUp() {
		if (append_div.offsetTop - div.scrollTop <= 0)
			div.scrollTop -= (table.offsetHeight - 1);
		else
			div.scrollTop++;
	};
	var scrollInterval = setInterval(scrollUp, speed);
	div.onmouseover = function() {
		clearInterval(scrollInterval);
	};
	div.onmouseout = function() {
		scrollInterval = setInterval(scrollUp, speed);
	};
};

// 滚动容器div
var divScroll = function(divname) {
	speed = speed ? parseInt(speed) : 30;
	var outerDiv = document.createElement('div');
	var div = document.getElementById(divname);
	// 创建最外层容器div
	outerDiv.style.height = div.offsetHeight;
	outerDiv.style.width = div.offsetWidth;
	outerDiv.style.overflow = 'hidden';

	// 复制
	var cloneDiv = document.createElement('div');
	cloneDiv.innerHTML = div.innerHTML;
	outerDiv.appendChild(cloneDiv);

	// 用于滚动复制
	var cloneDiv1 = document.createElement('div');
	cloneDiv1.innerHTML = div.innerHTML;
	cloneDiv1.style.height = div.offsetHeight;
	cloneDiv1.style.width = div.offsetWidth;

	outerDiv.appendChild(cloneDiv1);

	// 移出原有div
	div.parentNode.removeChild(div);
	document.body.appendChild(outerDiv);

	// 滚动
	function scrollUp() {
		if (cloneDiv1.offsetTop - outerDiv.scrollTop <= 0)
			outerDiv.scrollTop -= (cloneDiv.offsetHeight - 1);
		else
			outerDiv.scrollTop++;
	};
	var scrollInterval = setInterval(scrollUp, speed);
	outerDiv.onmouseover = function() {
		clearInterval(scrollInterval);
	};
	outerDiv.onmouseout = function() {
		scrollInterval = setInterval(scrollUp, speed);
	};
};