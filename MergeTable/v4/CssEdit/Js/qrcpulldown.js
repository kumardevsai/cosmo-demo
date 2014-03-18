/*
   
   ### SAMPLE ###
   
   <SCRIPT lang="JavaScript"><!--
   var pl = new QrPulldown();
   pl.addItem("item1","item1value");
   pl.addItem("item2","item2value");
   pl.addItem("item3","item3value");
   pl.render();
   //--></SCRIPT>
   
   ---------------------------------------------------
   var p = new QrPulldown(_defaultValue, _defaultSize, _name);
   
   		// Create QrPulldown Object. Any parameters may not be specified.
   		// <input value="_defaultValue" size="_defaultSize" name="_name"/>
   		
   
   str = p.getHTML();		// get HTML for inserting this Pulldown;
   p.render();				// equals to document.write(p.getHTML());
   p.set(value);			// set value.
   p.get();					// get value.
   p.addItem(html,value);	// add new Item for this pulldown
   
   
   ---------------------------------------------------
   <SCRIPT lang="JavaScript" src="Js/qrcpulldown.js"></SCRIPT>
   <SCRIPT lang="JavaScript" src="Js/qrxpcom.js"></SCRIPT>
   <link rel="stylesheet" type="text/css" href="qrx/qrpulldown.css">
   
   link to BOTH the JavaScript code AND the CSS style sheet is needed for using.
 */
/*定义数组，用于将英文的style读取成中文*/
QrXPCOM.EnglisthToChineseMap = new Array;
QrXPCOM.EnglisthToChineseMap[""]	=	"";
QrXPCOM.EnglisthToChineseMap["center"] = "居中";
QrXPCOM.EnglisthToChineseMap["crosshair"]	=	"十字线";
QrXPCOM.EnglisthToChineseMap["default"]	=	"默认";
QrXPCOM.EnglisthToChineseMap["pointer"]	=	"手形";
QrXPCOM.EnglisthToChineseMap["move"]	=	"移动";
QrXPCOM.EnglisthToChineseMap["text"]	=	"文本";
QrXPCOM.EnglisthToChineseMap["wait"]	=	"等待";
QrXPCOM.EnglisthToChineseMap["help"]	=	"帮助";
QrXPCOM.EnglisthToChineseMap["n-resize"]	=	"向上调整大小";
QrXPCOM.EnglisthToChineseMap["s-resize"]	=	"向下调整大小";
QrXPCOM.EnglisthToChineseMap["w-resize"]	=	"向左调整大小";
QrXPCOM.EnglisthToChineseMap["e-resize"]	=	"向右调整大小";
QrXPCOM.EnglisthToChineseMap["ne-resize"]	=	"向右上角调整大小";
QrXPCOM.EnglisthToChineseMap["nw-resize"]	=	"向左上角调整大小";
QrXPCOM.EnglisthToChineseMap["se-resize"]	=	"向右下角调整大小";
QrXPCOM.EnglisthToChineseMap["sw-resize"]	=	"向左下角调整大小";
QrXPCOM.EnglisthToChineseMap["static"]	=	"正常流中的位置";
QrXPCOM.EnglisthToChineseMap["relative"]	=	"正常流的偏移量";
QrXPCOM.EnglisthToChineseMap["absolute"]	=	"绝对位置";
QrXPCOM.EnglisthToChineseMap["fixed"]	=	"固定位置";
QrXPCOM.EnglisthToChineseMap["visible"]	=	"可见";
QrXPCOM.EnglisthToChineseMap["hidden"]	=	"隐藏";
QrXPCOM.EnglisthToChineseMap["none"]	=	"无";
QrXPCOM.EnglisthToChineseMap["block"]	=	"作为块元素";
QrXPCOM.EnglisthToChineseMap["inline"]	=	"作为内流元素";
QrXPCOM.EnglisthToChineseMap["run-in"]	=	"根据上下文选择显示";
QrXPCOM.EnglisthToChineseMap["compact"]	=	"块元素或内容之上的内流元素";
QrXPCOM.EnglisthToChineseMap["list-item"]	=	"作为列表显示";
QrXPCOM.EnglisthToChineseMap["marker"]	=	"在容器对象之前或之后";
QrXPCOM.EnglisthToChineseMap["capitalize"]	=	"首字母大写";
QrXPCOM.EnglisthToChineseMap["lowercase"]	=	"转换成小写";
QrXPCOM.EnglisthToChineseMap["uppercase"]	=	"转换成大写";
QrXPCOM.EnglisthToChineseMap["left"]	=	"靠左";
QrXPCOM.EnglisthToChineseMap["right"]	=	"靠右";
QrXPCOM.EnglisthToChineseMap["top"]	=	"靠上";
QrXPCOM.EnglisthToChineseMap["left top"]	=	"左上";
QrXPCOM.EnglisthToChineseMap["right bottom"]	=	"右下";
QrXPCOM.EnglisthToChineseMap["30% 50%"]	=	"水平:30% 垂直:50%";
QrXPCOM.EnglisthToChineseMap["repeat"]	=	"平铺";
QrXPCOM.EnglisthToChineseMap["repeat-x"]	=	"横向平铺";
QrXPCOM.EnglisthToChineseMap["repeat-y"]	=	"纵向平铺";
QrXPCOM.EnglisthToChineseMap["no-repeat"]	=	"不平铺";
QrXPCOM.EnglisthToChineseMap["fixed"]	=	"固定";
QrXPCOM.EnglisthToChineseMap["scroll"]	=	"滚动条";
QrXPCOM.EnglisthToChineseMap["underline"]	=	"下划线";
QrXPCOM.EnglisthToChineseMap["overline"]	=	"上划线";
QrXPCOM.EnglisthToChineseMap["underline overline"]	=	"上下划线";
QrXPCOM.EnglisthToChineseMap["line-through"]	=	"删除线";
QrXPCOM.EnglisthToChineseMap["baseline"]	=	"默认";
QrXPCOM.EnglisthToChineseMap["top"]	=	"顶端对齐";
QrXPCOM.EnglisthToChineseMap["middle"]	=	"居中";
QrXPCOM.EnglisthToChineseMap["bottom"]	=	"低端对齐";
QrXPCOM.EnglisthToChineseMap["text-top"]	=	"顶端字体对齐";
QrXPCOM.EnglisthToChineseMap["text-bottom"]	=	"低端字体对齐";
QrXPCOM.EnglisthToChineseMap["super"]	=	"垂直对齐文本上标";
QrXPCOM.EnglisthToChineseMap["sub"]	=	"垂直对齐文本下标";
QrXPCOM.EnglisthToChineseMap["3em"]	=	"3em";
QrXPCOM.EnglisthToChineseMap["30%"]	=	"30%";
QrXPCOM.EnglisthToChineseMap["left"]	=	"左边";
QrXPCOM.EnglisthToChineseMap["right"]	=	"右边";
QrXPCOM.EnglisthToChineseMap["both"]	=	"任何一边";
QrXPCOM.EnglisthToChineseMap["normal"]	=	"默认";
QrXPCOM.EnglisthToChineseMap["small-caps"]	=	"小型大写字母";
QrXPCOM.EnglisthToChineseMap["normal"]	=	"默认";
QrXPCOM.EnglisthToChineseMap["italic"]	=	"斜体";
QrXPCOM.EnglisthToChineseMap["oblique"]	=	"倾斜";
QrXPCOM.EnglisthToChineseMap["normal"]	=	"默认";
QrXPCOM.EnglisthToChineseMap["bold"]	=	"粗体";
QrXPCOM.EnglisthToChineseMap["600"]	=	"600";
QrXPCOM.EnglisthToChineseMap["900"]	=	"900";
QrXPCOM.EnglisthToChineseMap["9pt"]	=	"9pt";
QrXPCOM.EnglisthToChineseMap["10pt"]	=	"10pt";
QrXPCOM.EnglisthToChineseMap["12pt"]	=	"12pt";
QrXPCOM.EnglisthToChineseMap["14pt"]	=	"14pt";
QrXPCOM.EnglisthToChineseMap["16pt"]	=	"16pt";
QrXPCOM.EnglisthToChineseMap["xx-small"]	=	"xx-small";
QrXPCOM.EnglisthToChineseMap["x-small"]	=	"x-small";
QrXPCOM.EnglisthToChineseMap["small"]	=	"small";
QrXPCOM.EnglisthToChineseMap["large"]	=	"large";
QrXPCOM.EnglisthToChineseMap["x-large"]	=	"x-large";
QrXPCOM.EnglisthToChineseMap["xx-large"]	=	"xx-large";
QrXPCOM.EnglisthToChineseMap["px"]	=	"px";
QrXPCOM.EnglisthToChineseMap["pt"]	=	"pt";
QrXPCOM.EnglisthToChineseMap["em"]	=	"em";
QrXPCOM.EnglisthToChineseMap["ex"]	=	"ex";
QrXPCOM.EnglisthToChineseMap["pc"]	=	"pc";
QrXPCOM.EnglisthToChineseMap["cm"]	=	"cm";
QrXPCOM.EnglisthToChineseMap["mm"]	=	"mm";
QrXPCOM.EnglisthToChineseMap["top"]	=	"top";
QrXPCOM.EnglisthToChineseMap["in"]	=	"in";
QrXPCOM.EnglisthToChineseMap["%"]	=	"%";
QrXPCOM.EnglisthToChineseMap["solid"]	=	"实线边框";
QrXPCOM.EnglisthToChineseMap["double"]	=	"双线边框";
QrXPCOM.EnglisthToChineseMap["groove"]	=	"3D凹槽边框";
QrXPCOM.EnglisthToChineseMap["ridge"]	=	"3D 垄状边框";
QrXPCOM.EnglisthToChineseMap["inset"]	=	"3D inset 边框";
QrXPCOM.EnglisthToChineseMap["outset"]	=	"3D outset 边框";
QrXPCOM.EnglisthToChineseMap["dashed"]	=	"虚线边框";
QrXPCOM.EnglisthToChineseMap["dotted"]	=	"点状边框";
QrXPCOM.EnglisthToChineseMap["visible"]	=	"不剪切内容";
QrXPCOM.EnglisthToChineseMap["hidden"]	=	"剪切内容";
QrXPCOM.EnglisthToChineseMap["scroll"]	=	"始终使用滚动条";
QrXPCOM.EnglisthToChineseMap["auto"]	=	"需要时使用滚动条";
QrXPCOM.EnglisthToChineseMap["justify"] = "两端对齐";
QrXPCOM.EnglisthToChineseMap["nowrap"]	=	"不换行";
QrXPCOM.EnglisthToChineseMap["pre"]	=	"保留空白";
QrXPCOM.EnglisthToChineseMap["pre-wrap"]	=	"保留空白符换行";
QrXPCOM.EnglisthToChineseMap["pre-line"]	=	"合并空白符换行";
QrXPCOM.EnglisthToChineseMap["inherit"]	=	"继承父元素";
/*定义QrPulldown函数*/
function QrPulldown(_defaultValue, _defaultSize, _Name){
	if(!_defaultValue) _defaultValue = "";
	if(!_defaultSize)  _defaultSize  = "16";
	if(!_Name)  _Name  = " name=\""+_Name+"\" ";
	else _Name = "";
	
	QrXPCOM.init();
	this.itemLastId = 0;
	this.id = QrPulldown.lastid++;
	this.itemHtml = "";
	this.defaultValue = _defaultValue;
	this.defaultSize  = _defaultSize;
	this.name = _Name;
	
	QrPulldown.instanceMap["QrPulldown"+this.id] = this;
}
/*定义要写到页面的html内容*/
QrPulldown.prototype.getHTML = function(){
    this.defaultValue = this.defaultValue.replace(/"/g,"'");
	var html = "<div style=\"float:left;\"><div class=\"QrPulldown\" id=\"$pulldownId\"><input  class=\"QrPulldownInput\" value=\"$defaultValueshow\" id=\"$pulldownId#inputshow\" size=\"$defaultSize\" style="+(this.defaultSize ? ("width:" + parseInt(this.defaultSize) * 8.5 ) + "px;margin-top:0px;" : "")+" onkeyup=\"QrPulldown.onKeyup('$pulldownId');\" $NamePoint$IEPoint/><input type=\"hidden\" class=\"QrPulldownInput\" value=\"$defaultValue\" id=\"$pulldownId#input\" size=\"$defaultSize\" onkeyup=\"QrPulldown.onKeyup('$pulldownId');\" $NamePoint$IEPoint/><div id=\"$pulldownId#button\" class=\"QrPulldownButton\" onmousedown=\"QrPulldown.onClick('$pulldownId');\"><img src=\"images/pulldown-normal.gif\" align=\"top\" height=\"22\" id=\"$pulldownId#img\" onmouseover=\"QrPulldown.onButtonHover('$pulldownId');\" onmouseout=\"QrPulldown.onButtonOut('$pulldownId');\"></div></div></div>\n<DIV class=\"QrPulldownMenu\" style=\"display:none;\" id=\"$pulldownId#menu\" onclick=\"QrXPCOM.onPopup();\"><DIV style=\"margin:2px;\" id=\"$pulldownId#menuinner\">\n</DIV></DIV>";
	if(QrXPCOM.isIE()) html=html.replace(/\$IEPoint/,"style=\"margin-top:-1px\"");
	else html=html.replace(/\$IEPoint/,"");
	//由于一些样式的属性使相同的，但是需要显示不同的值，所以用if做下判断，使其显示成相对应的中文
	if(QrXPCOM.EnglisthToChineseMap[this.defaultValue])
	{ 

	     switch(this.id)
	     {
			case 12:
			{
				switch(this.defaultValue)
				{	
					case "visible":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "不剪切内容";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "剪切内容";
					break;
					case "scroll": 
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "始终使用滚动条";
					break;
				}
				break;
			
			}
			case 30:
			{   
				switch(this.defaultValue)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "左边";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "右边";
					break;
					case "both":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "任何一边";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "不允许";
					break; 
				}
				break;
			}
			case 31:
			{
				switch(this.defaultValue)
				{
					case "left":
					 QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "靠左";
					 break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "靠右";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "边上不允许文本";
					break;
				}
				break;
			}
			case 32:
			{
				switch(this.defaultValue)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "左对齐";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "右对齐";
					break;
					case "center":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "居中";
					break;
					case "justify":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "两端对齐";
					break;
				}
				break;
			}
			case 33:
			{
				switch(this.defaultValue)
				{
				case "top":
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "顶端对齐";
				break;
				case "middle":
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "居中";
				break;
				case "bottom":
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "低端对齐";
				break;
				}
				break;
			}
			case 34:
			{
				if(this.defaultValue == "none") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "无";
				break;
			}
			case 38:
			{
				if(this.defaultValue == "none") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "无";
				break;
			}
			case 41:
			{
				switch(this.defaultValue)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "靠左";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "靠右";
					break;
					case "top":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "靠上";
					break;
				}
				break;
			}
			case 42:
			{
				switch(this.defaultValue)
				{
					case "scroll":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "滚动条";
					break;
					case "fixed":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "固定";
					break;
				}
				break;
			}
			case 43:
			{
				if(this.defaultValue == "none") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "不显示";
				break;
			}
			case 44:
			{
				switch(this.defaultValue)
				{
					case "visible":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "可见";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "隐藏";
					break;
				}
				break;
			}
			case 45:
			{
				if(this.defaultValue == "fixed") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "固定位置";
				break;
			}
			default:
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = QrXPCOM.EnglisthToChineseMap[this.defaultValue];
				break;
		}
	}
  else
	{ QrXPCOM.EnglisthToChineseMap[this.defaultValue] = this.defaultValue;}
	  /*return html.replace(/\$defaultValueshow/g,QrXPCOM.EnglisthToChineseMap[this.defaultValue]) 
	            .replace(/\$pulldownId/g,"QrPulldown"+this.id)
			    .replace(/\$defaultSize/g,this.defaultSize)
			    .replace(/\$defaultValue/g,this.defaultValue)
			    .replace(/\$NamePoint/g,this.name);*/
	       html = html.replace(/\$defaultValueshow/g,QrXPCOM.EnglisthToChineseMap[this.defaultValue]);
	       html = html.replace(/\$pulldownId/g,"QrPulldown"+this.id);
		   html = html.replace(/\$defaultSize/g,this.defaultSize);
		   html = html.replace(/\$defaultValue/g,this.defaultValue);
		   html = html.replace(/\$NamePoint/g,this.name);
		   return html;
				
}
/* 将定义的html写到页面上 */
QrPulldown.prototype.render = function(){
    //var ss = this.getHTML();
	document.write(this.getHTML());
}
/*定义控件的onChange事件的set方法*/
QrPulldown.prototype.set = function(value){
	document.getElementById("QrPulldown"+this.id+"#input").value = value;
	if(QrPulldown.instanceMap["QrPulldown"+this.id].onChange){
		QrPulldown.instanceMap["QrPulldown"+this.id].onChange(value);
	}
}
/*设置控件的get方法*/
QrPulldown.prototype.get = function(){
	return document.getElementById("QrPulldown"+this.id+"#input").value;
}

/*给控件添加项*/
QrPulldown.prototype.addItem = function (html,value){
	var thisid = this.itemLastId++;
	var cashhtml = "<DIV class=\"QrPulldownItem\" id=\"$pulldownId#item$itemId\" onmouseover=\"QrPulldown.onHover('$pulldownId', '$pulldownId#item$itemId', '$value');\" onmouseout=\"QrPulldown.onOut('$pulldownId', '$pulldownId#item$itemId');\" onclick=\"QrPulldown.onSelect('$pulldownId','$value');\">$html</DIV>";
	cashhtml = cashhtml.replace(/\$pulldownId/g,"QrPulldown"+this.id).replace(/\$itemId/g,thisid).replace(/\$html/g,html).replace(/\$value/g,value);
	var selectvalue = document.getElementById("QrPulldown"+this.id+"#input").value;
	if(selectvalue == value)
	{
	 re ="class=\"QrPulldownItem\"";
	 last = "class=\"QrPulldownItemHover\"";
	 cashhtml = cashhtml.replace(re,last);	
	}
	this.itemHtml += cashhtml;
	document.getElementById("QrPulldown"+this.id+"#menuinner").innerHTML = this.itemHtml;   
}

QrPulldown.lastid = 0;//初始化控件的id为0
QrPulldown.instanceMap = new Array;//定义控件的实例数组
/*当鼠标离开项时将其样式设置成普通的样式，并执行控件的onchange事件，取到文本框的值*/
QrPulldown.onOut = function(id, itemid){
	if(document.getElementById(itemid).className == "QrPulldownItemHover"){
		document.getElementById(itemid).className = "QrPulldownItem";
	}
	if(QrPulldown.instanceMap[id].onChange){
		QrPulldown.instanceMap[id].onChange(document.getElementById(id+"#input").value);
	}
}
/*当鼠标放上去时，给所在的项设置样式，并执行控件的onchange事件*/
QrPulldown.onHover = function(id, itemid, value){
	var selectvalue = document.getElementById(id+"#input").value;
	if(selectvalue)
	{
	  if(selectvalue != value)
	  { 
			 var oDiv = document.getElementById(id+"#menuinner");
			  for (var i = 0; i < oDiv.childNodes.length; i++) {
				     if(oDiv.childNodes[i].className == "QrPulldownItemHover")
					  {
						   oDiv.childNodes[i].className = "QrPulldownItem";
					  }
			  }
	    }	 
	 }
	if(document.getElementById(itemid).className == "QrPulldownItem"){
	  document.getElementById(itemid).className = "QrPulldownItemHover";
	   }
	if(QrPulldown.instanceMap[id].onChange){
	  QrPulldown.instanceMap[id].onChange(value);
	  }
}
/*当鼠标离开按钮时，切换图片*/
QrPulldown.onButtonOut = function(id){
	document.getElementById(id+"#img").src = "images/pulldown-normal.gif";
}
/*当鼠标放在按钮上时，切换图片*/
QrPulldown.onButtonHover = function(id){
	document.getElementById(id+"#img").src = "images/pulldown-down.gif";
}
/*定义按钮的click事件，点击按钮弹出下拉div，并设置选中项的样式*/
QrPulldown.onClick = function(id){
	var p = QrXPCOM.getDivPointComplete(document.getElementById(id));
	var r = QrXPCOM.getDivSize(document.getElementById(id));
	if(QrXPCOM.isIE()){ QrXPCOM.setDivPoint(document.getElementById(id+"#menu"), p.x-180, p.y-16);
	}
	else QrXPCOM.setDivPoint(document.getElementById(id+"#menu"), p.x-200, p.y-12);
    document.getElementById(id+"#menu").style.display = "";
	QrXPCOM.onPopup(document.getElementById(id+"#menu"));
	 var selectvalue = document.getElementById(id+"#inputshow").value;
	 var oDiv = document.getElementById(id+"#menuinner");
			  for (var i = 0; i < oDiv.childNodes.length; i++) {
				     if(selectvalue == "px") selectvalue = "px = pixels";
					 if(selectvalue == "pt") selectvalue = "pt = 1/72in";
					 if(selectvalue == "em") selectvalue = "em = font-size";
					 if(selectvalue == "ex") selectvalue = "ex = x-height of font";
					 if(selectvalue == "pc") selectvalue = "pc = 12pt";
				     if(oDiv.childNodes[i].innerText.replace(/(^\s*)|(\s*$)/g, "") == selectvalue)
					  {
						   oDiv.childNodes[i].className = "QrPulldownItemHover";
					  }
			  }
}
/*定义文本框的onkeyup事件*/
QrPulldown.onKeyup = function(id){
	if(QrPulldown.instanceMap[id].onChange){
	   var temp1 = document.getElementById(id+"#input").value;
	   var temp2 = document.getElementById(id+"#inputshow").value;
	   if(id == "QrPulldown23")
	   {
		   if(QrPulldown.instanceMap[id].onChange){
		     QrPulldown.instanceMap[id].onChange(document.getElementById(id+"#inputshow").value);
	     }
	   }
	   else
	   {
	   if(!checkchinese(temp2))
	   {
	   		if(QrXPCOM.EnglisthToChineseMap[temp1] != temp2)
	   		{  
       		   QrPulldown.instanceMap[id].onChange("");
	   		}
	   }
	  else
	  {
		if(QrPulldown.instanceMap[id].onChange){
		  QrPulldown.instanceMap[id].onChange(document.getElementById(id+"#inputshow").value);
	     }
	   }
	 }
	} 
}
/*验证输入的是否是汉字*/
function checkchinese(chinesecharacter){
	var str=chinesecharacter;
	var Expression=/[^\u4E00-\u9FA5]/; 
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
		return true;
	}
	else{
		return false;
	}
} 
/*定义div里的项的onclick事件，执行onchange事件，由于有些样式的属性英文名称相同，所以用if做判断，对应显示成当前样式的中文名称*/
QrPulldown.onSelect = function(id, value){
	
	if(QrXPCOM.EnglisthToChineseMap[value])
	{ 
	   switch(id)
	   {
			case "QrPulldown12":
			{
				switch(value)
				{
					case "visible":
					QrXPCOM.EnglisthToChineseMap[value] = "不剪切内容";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[value] = "剪切内容";
					break;
					case "scroll":
					QrXPCOM.EnglisthToChineseMap[value] = "始终使用滚动条";
					break;
				}
				break;
			}
			case "QrPulldown30":
			{
				switch(value)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[value] = "左边";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[value] = "右边";
					break;
					case "both":
					QrXPCOM.EnglisthToChineseMap[value] = "任何一边";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[value] = "不允许";
					break;
				}
				break;
			}
			case "QrPulldown31":
			{  
				switch(value)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[value] = "靠左";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[value] = "靠右";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[value] = "边上不允许文本";
					break;
				}
				break;
			}
			case "QrPulldown32":
			{
				switch(value)
				{
				case "left":
				QrXPCOM.EnglisthToChineseMap[value] = "左对齐";
				break;
				case "right":
				QrXPCOM.EnglisthToChineseMap[value] = "右对齐";
				break;
				case "center":
				QrXPCOM.EnglisthToChineseMap[value] = "居中";
				break;
				case "justify":
				QrXPCOM.EnglisthToChineseMap[value] = "两端对齐";
				break;
				}
				break;
			}
			case "QrPulldown33":
			{
				switch(value)
				{
					case "top":
					QrXPCOM.EnglisthToChineseMap[value] = "顶端对齐";
					break;
					case "middle":
					QrXPCOM.EnglisthToChineseMap[value] = "居中";
					break;
					case "bottom":
					QrXPCOM.EnglisthToChineseMap[value] = "低端对齐";
					break;
				}
				break;
			}
			case "QrPulldown34":
			{
				 if(value == "none") QrXPCOM.EnglisthToChineseMap[value] = "无";
				 break;
			}
			case "QrPulldown37":
			{
				 if(value == "none") QrXPCOM.EnglisthToChineseMap[value] = "无";
				 break;
			}
			case "QrPulldown41":
			{
				switch(value)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[value] = "靠左";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[value] = "靠右";
					break;
					case "top":
					QrXPCOM.EnglisthToChineseMap[value] = "靠上";
					break;
				}
				break;
			}
	        case "QrPulldown42":
			{
				switch(value)
				{
					case "scroll":
					QrXPCOM.EnglisthToChineseMap[value] = "滚动条";
					break;
					case "fixed":
					QrXPCOM.EnglisthToChineseMap[value] = "固定";
					break;
				}
				break;
		    }	
	        case "QrPulldown43":
			{
				if(value == "none") QrXPCOM.EnglisthToChineseMap[value] = "不显示";
				break;
			 }
			case "QrPulldown44":
			{
				switch(value)
				{
					case "visible":
					QrXPCOM.EnglisthToChineseMap[value] = "可见";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[value] = "隐藏";
					break;
				}
				break;
			}
			case  "QrPulldown45":
			{
				if(value == "fixed") QrXPCOM.EnglisthToChineseMap[value] = "固定位置";
				break;
			 }
			default:
			{
				QrXPCOM.EnglisthToChineseMap[value] = QrXPCOM.EnglisthToChineseMap[value];
				break;
			}
	     }
	}
	else
	{ QrXPCOM.EnglisthToChineseMap[value] = value;}
	document.getElementById(id+"#input").value = value;
	document.getElementById(id+"#inputshow").value=QrXPCOM.EnglisthToChineseMap[value];
	document.getElementById(id+"#menu").style.display = "none";
	
	if(QrPulldown.instanceMap[id].onSelect){
		QrPulldown.instanceMap[id].onSelect(value);
	}
	if(QrPulldown.instanceMap[id].onChange){
		QrPulldown.instanceMap[id].onChange(value);
	}
}