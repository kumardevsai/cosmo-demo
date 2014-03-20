
/*	ManageCss.aspx页面的js,对CssList类的一些操作	*/

var diaheight = "550px";
var browser = new browserinfo;
if(browser.Version == "8.0") { diaheight = "530px"; }
if(browser.Version == "7.0") { diaheight = "530px"; }
if (browser.Version == "6.0") { diaheight = "560px"; }
dialogWidth = '800px';
dialogHeight = diaheight;

/*	加载所有的样式	*/
function init(){
			//var cssType = 2;
			//	将类样式添加到select
			for(var i = 0; i< parent.document.getElementById("cssIframe").contentWindow.CssList.lastid; i++)
			{
				var tag = 0;
				var name1 = parent.document.getElementById("cssIframe").contentWindow.CssList.instanceMap["CssList"+i].cssName;
				for(var j = 0; j< CssList.lastid; j++)
				{
					if(CssList.instanceMap["CssList"+j].cssName == name1)
					{   
						tag = 1;
						break;
					}
				}
				if(tag == 0)
				{
					var value1 = parent.document.getElementById("cssIframe").contentWindow.CssList.instanceMap["CssList"+i].cssValue;
					var cl = new CssList(name1,value1);
				}  
			}
			for(var i = 0; i< CssList.lastid; i++)
			{   
				if(CssList.instanceMap["CssList"+i])
				{
					Addlist(window.parent.document.getElementById('cssName'),CssList.instanceMap["CssList"+i].cssName,CssList.instanceMap["CssList"+i].cssValue);	
				}
			}
			//将页面的样式写到textarea1里
			if(window.parent.document.getElementById('cssIframe').src.indexOf("CodeView.htm") != -1)
			{
				parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value = "";
				for(var i = 0; i< CssList.lastid; i++)
				{ 
					if(CssList.instanceMap["CssList"+i] != null)
					{
						if(CssList.instanceMap["CssList"+i].cssName!="")
						{
							if(CssList.instanceMap["CssList"+i].cssValue.indexOf("}")==-1)
							{ 
								parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value += CssList.instanceMap["CssList"+i].cssName+"{"+CssList.instanceMap["CssList"+i].cssValue+"}";
								parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value +="\n";
							}
							else 
								parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value += CssList.instanceMap["CssList"+i].cssName+"{"+CssList.instanceMap["CssList"+i].cssValue;
						}
					}
				}
			}
			if(window.parent.document.getElementById('cssIframe').src.indexOf("ViewCss.htm") != -1)
			{
				window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById('contentView').innerHTML = "";
				reloadCssView();
			}
}

/*	回读connectCss.htm传过来的样式	*/
function bodyinit()
{
    document.getElementById('btncode').disabled = true;
	if(window.dialogArguments)
    {   
	 	var styleValue = window.dialogArguments;
		var tempArray = styleValue.split("}");
		for(var j = 0; j<tempArray.length; j++)
		{
			var cssName = tempArray[j].substr(0,tempArray[j].indexOf("{"));
			cssName = cssName.replace(/(^\s*)|(\s*$)/g, "");
			if(cssName != "")
			{   
				cssValue = tempArray[j].substr(tempArray[j].indexOf("{")+1,tempArray[j].length);
				var cl = new CssList(cssName,cssValue);
			}
		}
		init();
	}
}

/*	判断是否有css样式名称选择	*/
function IsSelect() {
    if (document.getElementById('cssName').selectedIndex <= -1)
        return 0;
    else
        return 1;
}
/*	 将样式添加到select	*/
function Addlist(oListbox,sName,sValue)
{
	var oOption = window.parent.document.createElement("option");
	oOption.appendChild(window.parent.document.createTextNode(sName));
	if(arguments.length == 3)
	{
		oOption.setAttribute("value",sValue);
	}
	oListbox.appendChild(oOption);
}
/*	移除列表框里的值	*/
function remove(oListbox,iIndex)
{
	oListbox.remove(iIndex);
}

/*	删除样式	*/
function CssDelete() {
    if (IsSelect() == 0) {
        alert('没有选择项!');
        return;
    }
    else{
		if(confirm('确定删除此样式?'))
		{
		    for(var i = parent.CssList.lastid-1; i>-1; i--)
			{   
				parent.CssList.instanceMap["CssList"+i]= null;
				parent.CssList.lastid--;
			}
			for(var i =parent.document.getElementById("cssIframe").contentWindow.CssList.lastid-1; i>-1; i--)
			{
				parent.document.getElementById("cssIframe").contentWindow.CssList.instanceMap["CssList"+i]= null;
				parent.document.getElementById("cssIframe").contentWindow.CssList.lastid--;
			}
			remove(document.getElementById('cssName'),document.getElementById('cssName').selectedIndex);
			for(var i = 0; i<document.getElementById('cssName').length; i++)
			{   
				var cssName = document.getElementById('cssName').options[i].text;
                var cssValue = document.getElementById('cssName').options[i].value;
                var cl = new CssList(cssName,cssValue);
			}
			if(window.parent.document.getElementById('cssIframe').src.indexOf("CodeView.htm") != -1)
		    {
				window.parent.document.getElementById('checkchange').value = 1;
				parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value =""; 
				for(var i = 0; i< CssList.lastid; i++)
				{ 
					if(CssList.instanceMap["CssList"+i] != null)
					{
						if(CssList.instanceMap["CssList"+i].cssName!="")
						{
							if(CssList.instanceMap["CssList"+i].cssValue.indexOf("}")==-1)
							{ 
								parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value += CssList.instanceMap["CssList"+i].cssName+"{"+CssList.instanceMap["CssList"+i].cssValue+"}";
								parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value +="\n";
							}
							else
								parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value += CssList.instanceMap["CssList"+i].cssName+"{"+CssList.instanceMap["CssList"+i].cssValue;
						}
					}
				}
			}
			if(window.parent.document.getElementById('cssIframe').src.indexOf("ViewCss.htm") != -1)	
			{   
				//删除代码设置
				window.parent.document.getElementById('checkhtmlchange').value = 1;
				 window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById('contentView').innerHTML = "";
				  var html ="<div class=\"top\"><span style=\"font-size:14px;font-family:宋体;font-weight:bold; line-height:10px;\">样式名称</span><span style=\"font-size:14px;font-family:宋体;font-weight:bold; margin-left:50px; line-height:10px;\">预览区域</span><hr size=\"1\" class=\"hr\"></div>";
				  for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
				  {           
					var cssName1 = window.parent.document.getElementById('cssName').options[i].text;
					var cssValue = window.parent.document.getElementById('cssName').options[i].value;
					var array = cssValue.split(';');
					for(var j = 0; j<array.length; j++)
					{
						array[j] = array[j].replace(/(^\s*)|(\s*$)/g, "");
						var array1 = array[j].split(':');
						for(var k = 0; k<array1.length; k++)
						{
							array1[k] = array1[k].replace(/(^\s*)|(\s*$)/g, "");
						}
						array[j] = array1.join(":");
						if(array[j].indexOf("position:absolute")!= -1)
						{
							array[j] = "";
						}
					}
					cssValue = array.join(";");
					html += "<div class=\"item\"><div style=\"float:left;\">"+cssName1+"</div><div style=\""+cssValue+"margin-left:50px; float:left;\">演示文字</div></div>";
				}
				window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById('contentView').innerHTML = html;
				window.parent.document.getElementById('cssHtmlContent').value = html;
			}
		}
	 }
}


/*	点击添加按钮弹出添加样式名称的层	*/
function OpenSetCssName() {
	 // IE下解决selCssName位移bug
	 document.getElementById("selCssName").className = document.getElementById("selCssName").className ; 
     document.getElementById("textCssName").value = "";
     document.getElementById("cssName").style.visibility = "hidden";
     document.getElementById("bgstyleName").style.height = document.body.clientHeight;
     document.getElementById("bgstyleName").style.width =  document.body.clientWidth;
     document.getElementById('bgstyleName').style.display = "block";
     document.getElementById('styleName').style.display = "block";
     document.getElementById('textCssName').focus();
     setRadioValue('RadioGroup',1);
}

/*	弹出SetCss.htm页面的方法 */
function OpenDialog(val) {
    window.parent.document.getElementById('checkchange').value = 1;//新
	cssName = val.replace(/(^\s*)|(\s*$)/g, "");
    value = window.showModalDialog('SetCss.htm','',"dialogHeight:460px;dialogWidth:620px;help:no;status:no;scrollbar:no");
    if (value != null)
	{   
		var cl = new CssList(cssName,value);
	}
	document.getElementById("cssName").options.length = 0;
	init();
}
/*	点击添加样式名称层里的确定按钮，判断名称是否为空，不为空弹出setCss页面 */
function closeSetCssName()
{    
	    var cssName = document.getElementById("textCssName").value;
	    if(cssName == "")
	    {
			alert("请输入样式的名称!");
			document.getElementById("textCssName").select();
			return;
	    }
	    else
	    {
			var radioValue =getRadioValue('RadioGroup'); 
			switch(radioValue)
			{
				case "1":
				{
					if(cssName.indexOf('.') != -1)
					{
						if(cssName.indexOf('.') != 0)
						{
							alert('类名称必须以字母或句点开头。不可以包含空格或其他标点符号。');
							return;
						}
					}
					else
					{
			    		cssName = "." + cssName;
					}
					break;
			    }	
	         }
			OpenDialog(cssName);
			document.getElementById("cssName").style.visibility = "visible";
			document.getElementById('bgstyleName').style.display = "none";
			document.getElementById('styleName').style.display = "none";
		}
}

/*点击取消，关闭窗体*/
function cancel()
{
	window.returnValue = null;
	window.close();
}
/*	点击取消，关闭弹出设置css样式名称的层*/
function cancelSetCssName()
{
	document.getElementById("textCssName").value="";
	document.getElementById("cssName").style.visibility = "visible";
	document.getElementById('bgstyleName').style.display = "none";
	document.getElementById('styleName').style.display = "none";
}

/* Textarea1的onChange事件 */
function CodeChange()
{      
		for(var i = CssList.lastid-1; i>-1; i--)
		{   
			CssList.instanceMap["CssList"+i]= null;
			CssList.lastid--;
		}
		for(var i = parent.CssList.lastid-1; i>-1; i-- ) 
        {
			parent.CssList.instanceMap["CssList"+i]= null;
			parent.CssList.lastid--;
        }
		var styleValue = parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value;
		var tempArray = styleValue.split("}");
		for(var j = 0; j<tempArray.length; j++)
		{
			var cssName = tempArray[j].substr(0,tempArray[j].indexOf("{"));
			cssName = cssName.replace(/(^\s*)|(\s*$)/g, "");
			if(cssName != "")
			{       
				cssValue = tempArray[j].substr(tempArray[j].indexOf("{")+1,tempArray[j].length);
				var cl = new CssList(cssName,cssValue);
			}
		}
		window.parent.document.getElementById('cssName').options.length = 0; 
		init();
}

/* 点击修改弹出SetCss页面 */
function OpenDialogM() {
    if (IsSelect() == 0) {
        alert('没有选择项!');
        return;
    }
    window.parent.document.getElementById('checkchange').value = 1;//新
	var styleName = document.getElementById('cssName').options[document.getElementById('cssName').selectedIndex].text;
	var index = document.getElementById('cssName').selectedIndex;
	var styleStr = document.getElementById('cssName').value;
	styleName = styleName.replace(/\n/g,"");
	value = window.showModalDialog('SetCss.htm', styleStr, 'dialogHeight:460px;dialogWidth:620px;help:no;status:no;scrollbar:no');
	if (value != null) { 
	     for(var i = 0; i< CssList.lastid; i++)
		 {   
		   if(CssList.instanceMap["CssList"+i])
		   {
		     if(CssList.instanceMap["CssList"+i].cssName !="")
		     {
				if(CssList.instanceMap["CssList"+i].cssName == styleName)
				{   
					CssList.instanceMap["CssList"+i].cssValue = value;
 				}
 			 }
 		   }
		}
		for(var i = 0; i<window.parent.document.getElementById("cssIframe").contentWindow.CssList.lastid; i++)
		{
			if(window.parent.document.getElementById("cssIframe").contentWindow.CssList.instanceMap["CssList"+i].cssName != "")
			{
				if(window.parent.document.getElementById("cssIframe").contentWindow.CssList.instanceMap["CssList"+i].cssName == styleName)
				{   
					window.parent.document.getElementById("cssIframe").contentWindow.CssList.instanceMap["CssList"+i].cssValue = value;
 				}
			}
		}
		document.getElementById("cssName").options.length = 0;
		init();	
		document.getElementById("cssName").selectedIndex = index;
	}
}

/*	点击确定回到connectCss.htm页面	*/
function CloseManageCss()
{   
	var temReturnValue = ""; 
	if(window.parent.document.getElementById('cssIframe').src.indexOf("CodeView.htm") != -1)
    {  
         CodeChange();
         temReturnValue = window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value;
    }
    else
    {
		 for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
		 {
			var name = window.parent.document.getElementById('cssName').options[i].text;
			var value = window.parent.document.getElementById('cssName').options[i].value;
			temReturnValue += name+"{" +value+"}";
		    temReturnValue +="\n";
		 }
    }
	 window.returnValue = temReturnValue;
	 window.close();
}

/*	打开ManageCss.htm页面，传回来的值返回到引用界面	*/
/*  无用可以去掉 测试页使用*/
function OpenManageCss()
{
    var diaheight = "570px";
	var content = document.getElementById('TextareaCss').value;
	cssValue = window.showModalDialog('ManageCss.htm', content, 'dialogWidth:800px;dialogHeight:'+diaheight+';help:no;status:no;scrollbar:no');
	if (cssValue)
	{   
		 document.getElementById('TextareaCss').value="";
         document.getElementById("TextareaCss").value = cssValue;
	}
}
function check()
{
	window.parent.document.getElementById('checkchange').value = 1;
}
/*	从 Iframe 里打开viewcss页面 */		
function viewCss()
{  
	window.parent.document.getElementById('cssContent').value = window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value;
	document.getElementById('cssIframe').src = "ViewCss.htm";
	document.getElementById('btnview').disabled = true;
	document.getElementById('btncode').disabled = false;
}
/*	从Iframe 里打开CodeView页面	*/
function openCodeView()
{   
	window.parent.document.getElementById('checkchange').value = 0;
	document.getElementById('cssIframe').src = "CodeView.htm";
	document.getElementById('btncode').disabled = true;
	document.getElementById('btnview').disabled = false;
}
/*	CodeView.htm的body的onload事件初始化CodeView.htm页面	*/
function codeViewInit()
{   
	var tag1 = window.parent.document.getElementById('checkhtmlchange').value;
	if(tag1 == 1)
	{
		for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
		{
			parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value += window.parent.document.getElementById('cssName').options[i].text+"{"+window.parent.document.getElementById('cssName').options[i].value+"}";
			parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value +="\n";
			_name = window.parent.document.getElementById('cssName').options[i].text;
			_value = window.parent.document.getElementById('cssName').options[i].value;
			var cl = new CssList(_name,_value);
		}
	}
	else
	{
		parent.document.getElementById("cssIframe").contentWindow.document.getElementById("Textarea1").value = window.parent.document.getElementById('cssContent').value;
		for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
		{
			_name = window.parent.document.getElementById('cssName').options[i].text;
			_value = window.parent.document.getElementById('cssName').options[i].value;
			var cl = new CssList(_name,_value);
		}
	}
	window.parent.document.getElementById('checkhtmlchange').value = 0;
}	
/*	切换到预览时ViewCss.htm页面生成的html	*/
function initview()
{ 
   var temptag = window.parent.document.getElementById('checkchange').value;
   if(window.parent.document.getElementById('cssHtmlContent').value != "")
   {
		if(temptag == 1)
		{
			var html ="<div class=\"top\"><span style=\"font-size:14px;font-family:宋体;font-weight:bold; line-height:10px;\">样式名称</span><span style=\"font-size:14px;font-family:宋体;font-weight:bold; margin-left:50px; line-height:10px;\">预览区域</span><hr size=\"1\" class=\"hr\"></div>";
			html +="<div style=\"height:340px;width:484px;overflow:auto;\">"
			for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
			{           
				var cssName1 = window.parent.document.getElementById('cssName').options[i].text;
				var cssValue1 = window.parent.document.getElementById('cssName').options[i].value;
				var array = cssValue1.split(';');
				for(var j = 0; j<array.length; j++)
				{
					array[j] = array[j].replace(/(^\s*)|(\s*$)/g, "");
					var array1 = array[j].split(':');
					for(var k = 0; k<array1.length; k++)
					{
						array1[k] = array1[k].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[j] = array1.join(":");
					if(array[j].toLowerCase().indexOf("position:absolute")!= -1)
					{
						array[j] = "";
					}
				}
				cssValue = array.join(";");
				var cl = new CssList(cssName1,cssValue1);
				var cssValue2 = cssValue.replace(/"/g,'');
				html += "<div class=\"item\"><div style=\"float:left;\">"+cssName1+"</div><div style=\""+cssValue2+"margin-left:50px; float:left;\">演示文字</div></div>";
			 }
			html +="</div>";
			window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById('contentView').innerHTML = html;
			window.parent.document.getElementById('cssHtmlContent').value = html;
			}
			else
			{
				for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
				{           
					var cssName1 = window.parent.document.getElementById('cssName').options[i].text;
					var cssValue1 = window.parent.document.getElementById('cssName').options[i].value;
					var array = cssValue1.split(';');
					for(var j = 0; j<array.length; j++)
					{
						array[j] = array[j].replace(/(^\s*)|(\s*$)/g, "");
						var array1 = array[j].split(':');
						for(var k = 0; k<array1.length; k++)
						{
							array1[k] = array1[k].replace(/(^\s*)|(\s*$)/g, "");
						}
						array[j] = array1.join(":");
						if(array[j].toLowerCase().indexOf("position:absolute")!= -1)
						{
							array[j] = "";
						}
					}
					cssValue = array.join(";");
					var cl = new CssList(cssName1,cssValue1);
				}
				window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById('contentView').innerHTML = window.parent.document.getElementById('cssHtmlContent').value;
			}
		}
   else
   {
		var html ="<div class=\"top\"><span style=\"font-size:14px;font-family:宋体;font-weight:bold; line-height:10px;\">样式名称</span><span style=\"font-size:14px;font-family:宋体;font-weight:bold; margin-left:50px; line-height:10px;\">预览区域</span><hr size=\"1\" class=\"hr\"></div>";
			html +="<div style=\"height:340px;width:484px;overflow:auto;\">"
			for(var i = 0; i<window.parent.document.getElementById('cssName').options.length; i++)
			{           
				var cssName1 = window.parent.document.getElementById('cssName').options[i].text;
				var cssValue1 = window.parent.document.getElementById('cssName').options[i].value;
				var array = cssValue1.split(';');
				for(var j = 0; j<array.length; j++)
				{
					array[j] = array[j].replace(/(^\s*)|(\s*$)/g, "");
					var array1 = array[j].split(':');
					for(var k = 0; k<array1.length; k++)
					{
						array1[k] = array1[k].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[j] = array1.join(":");
					if(array[j].toLowerCase().indexOf("position:absolute")!= -1)
					{
						array[j] = "";
					}
				}
				cssValue = array.join(";");
				var cl = new CssList(cssName1,cssValue1);
				var cssValue2 = cssValue.replace(/"/g,'');
				html += "<div class=\"item\"><div style=\"float:left;\">"+cssName1+"</div><div style=\""+cssValue2+"margin-left:50px; float:left;\">演示文字</div></div>";
			 }
			html +="</div>";
			window.parent.document.getElementById("cssIframe").contentWindow.document.getElementById('contentView').innerHTML = html;
			window.parent.document.getElementById('cssHtmlContent').value = html;
   }
}	
/*	 点击添加修改完成后初始化ViewCss页面	 */
function reloadCssView()
{   
    window.parent.document.getElementById('checkhtmlchange').value = 1;//新
   	for(var i = CssList.lastid-1; i>-1; i--)
	{   
		CssList.instanceMap["CssList"+i]= null;
		CssList.lastid--;
	}
   initview();
}
/*  添加link   */
function add_link(seleobj, strtxt, strvalue)
{    
	if (strvalue == null)return;
	seleobj.options[seleobj.options.length] = new Option(strtxt,strvalue,false,true);
	
}
/* 添加项到selCssName(给select加载html标签) */
function loadlable()
{
    var obj = document.getElementById('selCssName');
    add_link(obj,'a','a');
    add_link(obj, 'abbr', 'abbr');
    add_link(obj,'acronym','acronym');
    add_link(obj, 'address', 'address');
    add_link(obj,'applet','applet');
    add_link(obj, 'area', 'area');
    add_link(obj,'b','b');
    add_link(obj, 'base', 'base');
    add_link(obj,'basefont','basefont');
    add_link(obj, 'bdo', 'bdo');
    add_link(obj,'big','big');
    add_link(obj, 'blockquote', 'blockquote');
	add_link(obj,'body','body');
    add_link(obj, 'br', 'br');
    add_link(obj,'button','button');
    add_link(obj, 'caption', 'caption');
    add_link(obj,'center','center');
    add_link(obj, 'cite', 'cite');
    add_link(obj,'code','code');
    add_link(obj, 'col', 'col');
    add_link(obj,'colgroup','colgroup');
    add_link(obj, 'dd', 'dd');
    add_link(obj,'del','del');
    add_link(obj, 'dfn', 'dfn');
    add_link(obj,'div','div');
    add_link(obj, 'dl', 'dl');
    add_link(obj,'dt','dt');
    add_link(obj, 'em', 'em');
	add_link(obj,'fieldset','fieldset');
    add_link(obj, 'font', 'font');
    add_link(obj,'form','form');
    add_link(obj, 'frame', 'frame');
    add_link(obj,'frameset','frameset');
    add_link(obj, 'h1', 'h1');
    add_link(obj,'h2','h2');
    add_link(obj, 'h3', 'h3');
    add_link(obj,'h4','h4');
    add_link(obj, 'h5', 'h5');
    add_link(obj,'h6','h6');
    add_link(obj, 'head', 'head');
    add_link(obj,'hr','hr');
    add_link(obj, 'html', 'html');
    add_link(obj,'i','i');
    add_link(obj, 'iframe', 'iframe');
    add_link(obj,'img','img');
    add_link(obj, 'input', 'input');
	add_link(obj,'ins','ins');
    add_link(obj, 'isindex', 'isindex');
    add_link(obj,'kbd','kbd');
    add_link(obj, 'label', 'label');
    add_link(obj,'legend','legend');
    add_link(obj, 'li', 'li');
    add_link(obj,'link','link');
    add_link(obj, 'map', 'map');
    add_link(obj,'menu','menu');
    add_link(obj, 'meta', 'meta');
    add_link(obj,'noframes','noframes');
    add_link(obj, 'noscript', 'noscript');
    add_link(obj,'object','object');
    add_link(obj, 'ol', 'ol');
	add_link(obj,'optgroup','optgroup');
    add_link(obj, 'option', 'option');
    add_link(obj,'p','p');
    add_link(obj, 'param', 'param');
    add_link(obj,'pre','pre');
    add_link(obj, 'q', 'q');
    add_link(obj,'s','s');
    add_link(obj, 'samp', 'samp');
    add_link(obj,'script','script');
    add_link(obj, 'noscript', 'noscript');
    add_link(obj,'select','select');
    add_link(obj, 'small', 'small');
	add_link(obj,'span','span');
    add_link(obj, 'strike', 'strike');
    add_link(obj,'strong','strong');
    add_link(obj, 'style', 'style');
    add_link(obj,'sub','sub');
    add_link(obj, 'sup', 'sup');
    add_link(obj,'table','table');
    add_link(obj, 'tbody', 'tbody');
    add_link(obj,'td','td');
    add_link(obj, 'textarea', 'textarea');
    add_link(obj,'tfoot','tfoot');
    add_link(obj, 'th', 'th');
    add_link(obj,'thead','thead');
    add_link(obj, 'title', 'title');
    add_link(obj,'tr','tr');
    add_link(obj, 'tt', 'tt');
	add_link(obj,'u','u');
    add_link(obj, 'ul', 'ul');
    add_link(obj,'var ','var ');
}
function loadlabeltop()
{
    var obj = document.getElementById('selCssName');
	add_link(obj,'a:link ','a:link');
	add_link(obj,'a:visited','a:visited');
    add_link(obj,'a:hover','a:hover');
	add_link(obj,'a:active','a:active');
	add_link(obj,'#','#');
}
/*获取单选按钮的值*/
function getRadioValue(name) {
    var radioes = document.getElementsByName(name);
    for (var i = 0; i < radioes.length; i++) {
        if (radioes[i].checked) {
            return radioes[i].value;
        }
    }
    return "";
}
/*	设置单选按钮的值 */
function setRadioValue(name, value) {
    radios = document.getElementsByName(name);
    for (i = 0; i < radios.length; i++) {
        if (radios[i].value == value) {
            radios[i].checked = true;
            break;
        }
    }
    radioClick();
}
/* radiogroup点击事件   */
function radioClick()
{  
	if(getRadioValue('RadioGroup') == "2")
	{   
	    document.getElementById('selCssName').options.length = 0;
		loadlable();
		document.getElementById('selCssName').options[12].selected = true;
	}
	else if(getRadioValue('RadioGroup') == "3")
	{
	    document.getElementById('selCssName').options.length = 0;
		loadlabeltop();
		
	}
	else
	{  
	    document.getElementById('selCssName').options.length = 0;
    }
    document.getElementById('textCssName').value ='';
}
/*  selCssName的单击事件  */
function selCssNameClick()
{   
	if(document.getElementById('selCssName').options.length>0)
	{
	  var index = document.getElementById('selCssName').selectedIndex;
	  document.getElementById('textCssName').value = document.getElementById('selCssName').options[index].value;
	}
}
