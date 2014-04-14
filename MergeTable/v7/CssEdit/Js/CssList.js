

/*	css样式的函数	*/
function CssList(_cssName,_cssValue)
{
	// 样式
	this.cssName = _cssName;
	
	// css样式字符串
	this.cssValue = _cssValue;
	
	// 标识符(唯一的ID)
	this.id = CssList.lastid++;
	
	CssList.instanceMap["CssList" + this.id] = this;
}

//初始化css样式的id为0
CssList.lastid = 0;

//定义css样式的实例数组
CssList.instanceMap = new Array;

// 根据字符串得到csslist结构
function LoadCssList(css_txt)
{
	CssList.lastid = 0;
	var tempArray = css_txt.split("}");
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
}

// 传入下拉框进行数据绑定
function BindSelect(obj)
{
	for(var i = 0; i< CssList.lastid; i++)
	{
		var txt = CssList.instanceMap["CssList" + i].cssName
		if (txt.substring(0,1) == ".")
		{
			txt = txt.replace(".", "");
			obj.options[obj.options.length] = new Option(txt,txt,true,true);
		}
	}
}

function BindCssOption()
{
	var opt = "";
	for(var i = 0; i< CssList.lastid; i++)
	{
		var txt = CssList.instanceMap["CssList" + i].cssName
		
		if (txt.substring(0,1) == ".")
		{
			txt = txt.replace(".", "");
			opt += '<option value="' + txt + '" >' + txt + '</option>';
		}
	}
	return opt;
}