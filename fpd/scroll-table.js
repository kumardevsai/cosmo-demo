var speed = 30; // 速度
// 滚动表格    不间断滚动
var tableScroll = function(tbname, sp) 
{
	speed = speed ? parseInt(speed) : 30;
	// 内部表格高度不足自动补全进行滚动
	sp = sp ? sp : false;
	var div = (document.getElementById(tbname).firstChild.tagName === 'text' ? document.getElementById(tbname).firstElementChild : document.getElementById(tbname).firstChild).nextSibling;
	var div_height = div.offsetHeight;
	var table = div.getElementsByTagName('table')[0];
	var append_div = document.createElement('div');
	div.appendChild(append_div);
	var count = 0;

	function appendTable() 
	{
		// 添加一个table
		var table_clone = document.createElement('div');
		if (count > 0)
			table_clone.style.marginTop = '-1px';
		// IE下table元素的innerHTML属性只读,因此采用遍历的写法
		table_clone.innerHTML = table.outerHTML;
		count++;
		return table_clone;
	};
	if (table.offsetHeight > div_height || sp === true) 
	{
		append_div.appendChild(appendTable());
		append_div.style.marginTop = '-1px';
	}
	// 内部元素总体高度要大于外部容器的高度
	if (sp === true) 
	{
		while (append_div.offsetHeight + table.offsetHeight <= div_height * 2) 
		{
			append_div.appendChild(appendTable());
		}
	}
	// 滚动
	function scrollUp() 
	{
		if (append_div.offsetTop - div.scrollTop <= 0)
			div.scrollTop -= (table.offsetHeight - 1);
		else
			div.scrollTop++;
	};
	var scrollInterval = setInterval(scrollUp, speed);
	div.onmouseover = function() 
	{
		clearInterval(scrollInterval);
	};
	div.onmouseout = function() 
	{
		scrollInterval = setInterval(scrollUp, speed);
	};
};

// 滚动容器div   使用table布局
var divScroll = function(divname, direction) {
	speed = speed ? parseInt(speed) : 30;
	direction = direction ? direction : 'up'; //or left
	var outerDiv = document.createElement('div');
	var div = document.getElementById(divname);
	// 创建最外层容器div
	outerDiv.style.height = div.offsetHeight;
	outerDiv.style.width = div.offsetWidth;
	outerDiv.style.overflow = 'hidden';
	outerDiv.style.top = div.style.top;
	outerDiv.style.left = div.style.left;
	outerDiv.style.position = 'absolute';

	// 复制
	var cloneDiv = document.createElement('div');
	cloneDiv.innerHTML = div.innerHTML;
	cloneDiv.style.height = div.offsetHeight;
	cloneDiv.style.width = div.offsetWidth;
	cloneDiv.style.overflow = div.style.overflow;

	// 用于滚动复制
	var cloneDiv1 = document.createElement('div');
	cloneDiv1.innerHTML = div.innerHTML;
	cloneDiv1.style.height = div.offsetHeight;
	cloneDiv1.style.width = div.offsetWidth;
	cloneDiv1.style.overflow = div.style.overflow;

	if (direction === 'up') {
		outerDiv.appendChild(cloneDiv);
		outerDiv.appendChild(cloneDiv1);
	} else if (direction === 'left') {
		var innerTable = document.createElement('table');
		var tbody = document.createElement('tbody');
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		var td_ = document.createElement('td');
		tbody.appendChild(tr);
		innerTable.appendChild(tbody);
		td.appendChild(cloneDiv);
		tr.appendChild(td);
		td_.appendChild(cloneDiv1);
		tr.appendChild(td_);
		// 修改table容器的样式
		innerTable.style.width = div.offsetWidth * 2;
		innerTable.style.height = div.offsetHeight;
		innerTable.align = 'left';
		innerTable.cellpadding = '0';
		innerTable.cellspacing = '0';
		innerTable.style.border = 'none';
		innerTable.style.borderCollapse = 'collapse';
		div.parentNode.removeChild(div);
	}
	// 移出原有div
	div.parentNode.removeChild(div);
	document.body.appendChild(outerDiv);
	// 滚动
	function scroll_() {
		if (direction === 'up') {
			if (cloneDiv1.offsetTop - outerDiv.scrollTop <= 0)
				outerDiv.scrollTop -= (cloneDiv.offsetHeight - 1);
			else
				outerDiv.scrollTop++;
		} else if (direction === 'left') {
			if (cloneDiv1.offsetWidth - outerDiv.scrollLeft <= 0)
				outerDiv.scrollLeft -= (cloneDiv.offsetWidth - 1);
			else
				outerDiv.scrollLeft++;
		}
	};
	var scrollInterval = setInterval(scroll_, speed);
	outerDiv.onmouseover = function() {
		clearInterval(scrollInterval);
	};
	outerDiv.onmouseout = function() {
		scrollInterval = setInterval(scroll_, speed);
	};
};

// 滚动容器div  使用div布局
var divScroll = function(divname, direction) 
{
	speed = speed ? parseInt(speed) : 30;
	direction = direction ? direction : 'up'; //or left
	var outerDiv = document.createElement('div');
	var div = document.getElementById(divname);
	// 创建最外层容器div
	outerDiv.style.height = div.offsetHeight;
	outerDiv.style.width = div.style.width ? parseInt(div.style.width) : div.offsetWidth;
	outerDiv.style.overflow = 'hidden';
	outerDiv.style.top = div.style.top;
	outerDiv.style.left = div.style.left;
	outerDiv.style.position = 'absolute';

	// 复制
	var cloneDiv = document.createElement('div');
	cloneDiv.innerHTML = div.innerHTML;
	cloneDiv.style.height = div.offsetHeight;
	cloneDiv.style.width = div.offsetWidth;
	cloneDiv.style.overflow = div.style.overflow;

	// 用于滚动复制
	var cloneDiv1 = cloneDiv.cloneNode(true);

	if (direction === 'up') 
	{
		outerDiv.appendChild(cloneDiv);
		outerDiv.appendChild(cloneDiv1);
	} 
	else if (direction === 'left') 
	{
		var innerDiv = document.createElement('div');
		outerDiv.appendChild(innerDiv);
		innerDiv.appendChild(cloneDiv);
		innerDiv.appendChild(cloneDiv1);
		// 修改table容器的样式
		innerDiv.style.width = div.offsetWidth * 2;
		innerDiv.style.height = div.offsetHeight;
		cloneDiv.style.styleFloat = 'left';
		cloneDiv1.style.styleFloat = 'left';
		div.parentNode.removeChild(div);
	}
	// 移出原有div
	div.parentNode.removeChild(div);
	document.body.appendChild(outerDiv);
	// 滚动
	function scroll_() 
	{
		if (direction === 'up') 
		{
			if (cloneDiv1.offsetTop - outerDiv.scrollTop <= 0)
				outerDiv.scrollTop -= (cloneDiv.offsetHeight - 1);
			else
				outerDiv.scrollTop++;
		} 
		else if (direction === 'left') 
		{
			if (cloneDiv1.offsetWidth - outerDiv.scrollLeft <= 0)
				outerDiv.scrollLeft -= (cloneDiv.offsetWidth - 1);
			else
				outerDiv.scrollLeft++;
		}
	};
	var scrollInterval = setInterval(scroll_, speed);
	outerDiv.onmouseover = function() 
	{
		clearInterval(scrollInterval);
	};
	outerDiv.onmouseout = function() 
	{
		scrollInterval = setInterval(scroll_, speed);
	};
};