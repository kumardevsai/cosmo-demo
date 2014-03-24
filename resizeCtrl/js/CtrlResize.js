
CtrlSize.lastId = 0; // 用于标记没有id的控件，方便查找图片
CtrlSize.arrayctrl = new Array();  // 用于存放选中的控件的数组
CtrlSize.ctrlsindex = 0;           // 选中控件的数组的下标
// 改变控件大小的类
// Ctrl: 在页面onmousedown的控件
function CtrlSize(Ctrl)
{   
  	if(Ctrl.tagName == 'TD')  Ctrl = Ctrl.parentNode.parentNode.parentNode.parentNode; 
    if(Ctrl.id != '')  this.id = Ctrl.id;  // 将当前控件的id赋值给当前对象
	else { this.id = 'ctrl' + CtrlSize.lastId ++; Ctrl.id = this.id;} // 如果控件没有id，则生成id   
	CtrlSize.ctrlsindex ++;
    this.left = Ctrl.offsetLeft;  
	this.width = Ctrl.offsetWidth;
	this.top = Ctrl.offsetTop;
	this.height = Ctrl.offsetHeight;
	
	// 选中控件
	this.selectCtrl = function()
	{   
		var imgObj =  'imgObj0_' + this.id; // 当前控件上横调的图片的id
		// 如果：1、这个控件的图片不存在; 2、选择的不是拖拽大小的图片
		if(!document.getElementById(imgObj) && Ctrl.id.indexOf('imgObj') == -1)
		{   
		    var tag = false; // 控件是否为select并且size==0 的标记; false:以上条件为假
		    // 如果为select 且下拉框的 size=0 时则不生成 横纵和纵向拖拽图片
		    if (Ctrl.tagName == 'SELECT') {
		       if (Ctrl.size == 0) {
		         tag = true;
		       }
		    }
		    this.addImg(0); // 添加横拖的图片
		    if (tag == false) {
				this.addImg(1); // 添加横竖都可以拖动的图片
				this.addImg(2); // 添加纵向可以拖动的图片
		    }
		    CtrlSize.arrayctrl[CtrlSize.ctrlsindex] = Ctrl; // 将选中的控件放入CtrlSize.arrayctrl数组
		}
	}
	
	// 添加图片
	// index: 为横向、纵向、横纵图片的标记
	this.addImg = function(index)
	{   
	    imgObjid = 'imgObj' + index + '_' + this.id; // 图片的id
	    // 添加图片name属性为控件的id，用于清空控件时通过控件id查找相关图片
		var imgObj = document.createElement("<img id ='"+ imgObjid +"' name ='"+ Ctrl.id +"' src='images/dot.bmp'>");
		imgObj.style.height = "7px"; 
		imgObj.style.width  = '7px';
		imgObj.style.zIndex = '2';
		if(index == 0) //设置横向拖动图片的left和top及鼠标样式
		{   
			imgObj.style.left = this.left + this.width+"px";
			imgObj.style.top =  this.top + this.height/2 +"px";
			imgObj.style.cursor = 'w-resize';
		}
		else if(index == 1) //设置横纵向拖动图片的left和top及鼠标样式
		{
			imgObj.style.left = this.left + this.width+"px";
			imgObj.style.top =  this.top + this.height+"px";
			imgObj.style.cursor = 'nw-resize';
		}
		else // 设置纵向拖动图片的left和top及鼠标样式
		{
			imgObj.style.left = this.left + this.width/2 + "px";
			imgObj.style.top =  this.top + this.height +"px";
			imgObj.style.cursor = 'n-resize';
		}
		imgObj.style.position = "absolute"; // 设置图片的定位
		imgObj.style.display = "block"; 
		document.body.appendChild(imgObj); // 添加图片
	}
	
	// 控件移动时设置图片的位置或者图片移动时改变控件的大小
	// moveCtrl：拖动的控件或者是移动的图片
	this.ctrlMove = function(moveCtrl)
	{   
	    // moveCtrl: 控件
		if(moveCtrl.id.indexOf('imgObj') == -1)
		{	
			resetImgPos(0, moveCtrl); // 设置横向图片的位置
			resetImgPos(1, moveCtrl); // 设置横纵图片的位置
			resetImgPos(2, moveCtrl); // 设置纵向图片的位置
		}
		// moveCtrl: 改变控件大小的图片
		else
		{   
		   controlResize(moveCtrl);
		}
	}
	
	// 点击页面其他的地方，控件清空选中
	document.body.onclick = function()
	{  
	    if(event.srcElement.id == 'div1')
	    {
			clear(div1);     // 清空选中的控件
			Ctrl = null; // 将传入的Ctrl 设置为空 
		}
	}
	
	// 点击控件时页面其他的控件取消选中
	this.clearSelected = function()
	{   
		clear(this);
	}
	
	// 清空当前点中的控件
	this.clearSelf = function(obj)
	{   
		if(obj.tagName == 'TD')  obj = obj.parentNode.parentNode.parentNode.parentNode; // 如果控件为table的话，可能选中的是td，此时obj为td的table
		if(obj.tagName == 'DIV' && obj.innerHTML == '窗口拖动') obj = obj.parentNode; // 此种情况为ifame
		var img = document.getElementsByName(obj.id);
		for(var i = 0; i<img.length; i++)
		{   
			// 如果控件已经选中
			if (img[1].id.indexOf('imgObj0_') != -1) 
			{
				for(var j = img.length-1; j>= 1; j--)
				{
					if (img[j].id.indexOf('imgObj') != -1)
					{
						img[j].parentNode.removeChild(img[j]);
					}
				}
			}
		}
		// 将数组里那个控件设置为null
		for(var j = 0; j < CtrlSize.arrayctrl.length; j++)
		{   
			if (CtrlSize.arrayctrl[j] != undefined && CtrlSize.arrayctrl[j] != '') {
				if (obj.id == CtrlSize.arrayctrl[j].id) {
					CtrlSize.arrayctrl[j] = null;
				}
			}
		}
	}
}
// 控件清除选中
// obj: 当前作用的对象
function clear(obj)
{   
	if (obj) 
	{
	if(obj.tagName == 'TD')  obj = obj.parentNode.parentNode.parentNode; // 如果控件为table的话，可能选中的是td，此时obj为td的table
	if(obj.tagName == 'DIV' && obj.innerHTML == '窗口拖动') obj = obj.parentNode; // 此种情况为ifame
	var allobjs = document.all;
    if(obj.id.indexOf('imgObj') == -1) // 如果对象是控件
	{   
		for(var i = 0; i<allobjs.length; i++)
		{  
			// 当目标控件和遍历的控件的id不相等时，看那个控件是否选中，如果选中则清空选中状态
			if(allobjs[i].id != obj.id && allobjs[i] != null && allobjs[i] != undefined) 
			{
				// 找到所有加_控件名的控件
				if(allobjs[i].id != '' && allobjs[i].id != undefined && allobjs[i].id != '')
				{   
					var array = document.getElementsByName(allobjs[i].id); // 得到图片name与控件id相同的的图片的集合
					//将那3个图片删除了
					var tag = 0; // 是否删除了allobjs[i] 的标记，方便删除CtrlSize.arrayctrl里的元素
					for(var j = array.length-1; j >= 0; j--)
					{
						var temp = '_'+allobjs[i].id; 
						if(array[j].id.indexOf(temp) != -1) // 删除图片
						{  
							array[j].parentNode.removeChild(array[j]);
							tag = 1;
						}
					}
					if (tag == 1) {
						for(var j = 0; j < CtrlSize.arrayctrl.length; j++)
						{   
							if (CtrlSize.arrayctrl[j] != undefined && CtrlSize.arrayctrl[j] != '') {
								if (allobjs[i].id == CtrlSize.arrayctrl[j].id) {
									CtrlSize.arrayctrl[j] = null;
								}
							}
						}
					}	
				}
			}
		}
	    }
    }
}
// 根据传入的控件改变图片的位置
// index: 横纵图片的标记
// resizeCtrl: 传入的控件
function  resetImgPos(index, resizeCtrl)
{  
	if(resizeCtrl.id.indexOf('imgObj') == -1)
	{  
		var imgobjid = 'imgObj'+ index+"_" + resizeCtrl.id; // 得到控件对应的index标记的图片的id
		var imgObj = document.getElementById(imgobjid); // 得到图片
		var left = resizeCtrl.offsetLeft; 
		var width = resizeCtrl.offsetWidth;
		var top = resizeCtrl.offsetTop;
		var height = resizeCtrl.offsetHeight;
		if (imgObj != null && imgObj != undefined && imgObj != '') {
			if(index == 0) // 重设横向图片的位置
			{   
				imgObj.style.left = left + width+"px";
				imgObj.style.top =  top + height/2+"px";
			}
			else if(index == 1) // 重设横纵图片的位置
			{
				imgObj.style.left = left + width+"px";
				imgObj.style.top = top + height + "px";	
			}
			else // 重设纵向图片的位置
			{   
				imgObj.style.left = left + width/2 + "px";
				imgObj.style.top =  top + height+"px";
			}
		}
	}		
}

// 图片moveing时触发控件的大小和其他图片位置发生变化
// imgobj: 拖动大小的图片
function controlResize(imgobj)
{   
	var resizeobjid = '';
	var resizeobj = null;
	if(imgobj.id.indexOf('imgObj0_')!= -1)  // 横向拖动
	{   
	    resizeobjid =  imgobj.id.replace('imgObj0_','');
	    resizeobj = document.getElementById(resizeobjid);
	    imgSet(resizeobj); 
	    if(imgobj.offsetLeft - resizeobj.offsetLeft>0)  // 设置要改变的控件的宽度大于0
		{   
		    var tem = false;
		    if(resizeobj.childNodes.length == 2) // 设置表格或者是iframe，或容器div的宽度
		    {  
		        if (resizeobj.childNodes[1].tagName == 'TABLE' || resizeobj.childNodes[1].tagName == 'IFRAME') {
					controlWidthSet(resizeobj.childNodes[1],resizeobj,imgobj); 
					tem = true;
					 }
			    if (resizeobj.childNodes[0].data == '[容器Div组件分组]') // 设置div组件的宽度
			    {
			        controlWidthSet(resizeobj,resizeobj,imgobj); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3) // 设置数据表的宽度
		    {  
				controlWidthSet(resizeobj.childNodes[2],resizeobj,imgobj); 
				tem = true;
		    }
		    else //普通控件
		    {
			   if (tem == false) {
			        controlWidthSet(resizeobj,resizeobj,imgobj); 
			   }
			}
		}
		else // 如果小于0了，则图片不拖动
		{   
			imgobj.style.left =  resizeobj.offsetLeft + resizeobj.offsetWidth+"px"; 
		}
	    resetImgPos(1, resizeobj); // 改变横向图片的位置
		resetImgPos(2, resizeobj); // 改变纵向图片的位置
	}
	if(imgobj.id.indexOf('imgObj1_') != -1) // 横纵拖动
	{   
	    resizeobjid =  imgobj.id.replace('imgObj1_','');
	    resizeobj = document.getElementById(resizeobjid);
	    imgSet(resizeobj);
	    if(imgobj.offsetLeft - resizeobj.offsetLeft >0) // 横向
		{   
			var tem = false;
			if(resizeobj.childNodes.length == 2)  // 设置布局表格或者是iframe的宽度
		    {   
		        if (resizeobj.childNodes[1].tagName == 'TABLE' || resizeobj.childNodes[1].tagName == 'IFRAME') {
					controlWidthSet(resizeobj.childNodes[1],resizeobj,imgobj);
					tem = true;
				}
				if (resizeobj.childNodes[0].data == '[容器Div组件分组]') // 设置div组件的宽度
				{
			        controlWidthSet(resizeobj,resizeobj,imgobj); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3) // 设置数据表的宽度
		    {  
				controlWidthSet(resizeobj.childNodes[2],resizeobj,imgobj); 
				tem = true;
		    }
		    else // 普通控件
		    {
			    if (tem == false) {
			     controlWidthSet(resizeobj,resizeobj,imgobj); 
			    }
			}
		}
		else 
		{
			imgobj.style.left =  resizeobj.offsetLeft + resizeobj.offsetWidth+"px";
		}
		if(imgobj.offsetTop - resizeobj.offsetTop>0) // 纵向
		{   
		    var tem = false;
			if(resizeobj.childNodes.length == 2) // 设置数据表的高度
		    {  
		        if(resizeobj.childNodes[1].tagName == 'TABLE') 
		        {     
					 controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,1);
					 tem = true;
				}
				if(resizeobj.childNodes[1].tagName == 'IFRAME') // 设置iframe的高度
		        {
					 controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,2);
					 tem = true;
				}
				if (resizeobj.childNodes[0].data == '[容器Div组件分组]') // 设置div组件的高度
				{
			        controlHeightSet(resizeobj,resizeobj,imgobj,4); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3) // 设置布局表格的高度
		    {   
		        if(resizeobj.childNodes[2].tagName == 'TABLE') 
		        {   
					controlHeightSet(resizeobj.childNodes[2],resizeobj,imgobj,3);
					tem = true;
				}
		    }
		    else
		    {
				if (tem == false) { // 普通控件
				   controlHeightSet(resizeobj,resizeobj,imgobj);   
				} 
			}
		}
		else 
		{
			imgobj.style.top = resizeobj.offsetTop + resizeobj.offsetHeight +"px";
		}
		resetImgPos(0, resizeobj); // 改变横向图片的位置
		resetImgPos(2, resizeobj); // 改变纵向图片的位置
	}
	if(imgobj.id.indexOf('imgObj2_') != -1) // 纵向拖动
	{   
	    resizeobjid =  imgobj.id.replace('imgObj2_','');
	    resizeobj = document.getElementById(resizeobjid);
	    imgSet(resizeobj);
	    if(imgobj.offsetTop - resizeobj.offsetTop > 0) 
		{   
			var tem = false;
			if(resizeobj.childNodes.length == 2)
		    {   
		        if(resizeobj.childNodes[1].tagName == 'TABLE') // 设置数据表的高度
		        {   
					controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,1);
					tem = true;
				}
				if (resizeobj.childNodes[1].tagName == 'IFRAME') // 设置Iframe的高度
				{ 
				    controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,2);
				    tem = true;
				}
				if (resizeobj.childNodes[0].data == '[容器Div组件分组]')  // 设置div组件的高度
				{
			        controlHeightSet(resizeobj,resizeobj,imgobj,4); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3)  // 设置容器表格的高度
		    {   
		        if(resizeobj.childNodes[2].tagName == 'TABLE') 
		        {   
					controlHeightSet(resizeobj.childNodes[2],resizeobj,imgobj,3);
					tem = true;
				}
		    }
		    else 
		    {
				if (tem == false) { //普通控件
				    controlHeightSet(resizeobj,resizeobj,imgobj);   
				}
			}
		}
		else // 如果小于20了，则图片不拖动
		{   
			imgobj.style.top = resizeobj.offsetTop + resizeobj.offsetHeight +"px";
		}
		resetImgPos(0, resizeobj); // 改变横向图片的位置
		resetImgPos(1, resizeobj); // 改变横纵图片的位置
	}
}


// 设置控件的宽度
// resizectrlnode： 实际中要设置的控件的节点
// resizeobj：要改变的控件
// imgobj: 拖动大小的图片
// tag: 控件的类型(1:数据表; 2:iframe; 3:容器表格; 4:容器div; 0:其它)
function controlHeightSet(resizectrlnode,resizeobj,imgobj,tag)
{   
    var num1 = 0;
    var num2 = 0;
    if (tag == 1) { num1= 112;num2 = 26; }          // 数据表
    else if (tag == 2) {    num1= 13; num2 = 13;  } // iframe
    else if (tag == 3) {	num1= 55; num2 = 15;  } // 容器表格
    else if (tag == 4) {    num1= 15; num2 = 0;  }  // 容器div
    else { num1= 0; num2 = 0; }
	if (imgobj.offsetTop - resizeobj.offsetTop>num1) {
		resizectrlnode.style.height = imgobj.offsetTop - resizeobj.offsetTop -num2 +"px";
	}
	else // 如果小于num1，则图片不拖动
	{   
		imgobj.style.top = resizeobj.offsetTop + resizeobj.offsetHeight +"px";
	}
}

// 设置组控件的高度
// resizectrlnode： 实际中要设置的控件的节点
// resizeobj：要改变的控件
// imgobj: 拖动大小的图片
function controlWidthSet(resizectrlnode,resizeobj,imgobj)
{   
    var compareNum = 0;
    var tag = 0;
	if (resizectrlnode.tagName =='TABLE') compareNum = 300;
    else if (resizectrlnode.tagName =='IFRAME')  compareNum = 47;
    else if (resizectrlnode.tagName =='DIV')  compareNum = 98;
    else if(resizectrlnode.type == 'file')    compareNum = 60;
    else compareNum= 0;
	if (imgobj.offsetLeft - resizeobj.offsetLeft>compareNum) {
		resizectrlnode.style.width = imgobj.offsetLeft - resizeobj.offsetLeft +"px";
	}
	else // 如果小于compareNum了，则图片不拖动
	{   
		imgobj.style.left =  resizeobj.offsetLeft + resizeobj.offsetWidth+"px"; 
	}
}

// 如果传入的控件是图片或者是图片按钮的话，设置图片的大小，防止拖拽过程中大小发生变化
// resizeControl： 要设置的图片
function imgSet(resizeControl)
{
	var width = resizeControl.offsetWidth;   // 记录控件的width， 防止高度改变时width自动发生变化
    var height = resizeControl.offsetHeight; // 记录控件的height，防止宽度改变时height自动发生变化
	// 此时Ctrl为控件，如果控件是图片或者是图片按钮，则设置其宽和高
	if(resizeControl.tagName == 'IMG' || resizeControl.type == 'image')  
	{
		resizeControl.style.width = width;
		resizeControl.style.height = height; 
	}
}

// 移动一组控件
// obj: 要改变的对象
// x: x轴方向改变的大小
// y: y轴方向改变的大小
function moveCtrls(obj,x,y)
{   
	obj.style.left = obj.offsetLeft + x;
	obj.style.top = obj.offsetTop + y;
    resetImgPos(0, obj);
    resetImgPos(1, obj);
    resetImgPos(2, obj);
}




