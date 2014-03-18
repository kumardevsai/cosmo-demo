

/*	css��ʽ�ĺ���	*/
function CssList(_cssName,_cssValue)
{
	// ��ʽ
	this.cssName = _cssName;
	
	// css��ʽ�ַ���
	this.cssValue = _cssValue;
	
	// ��ʶ��(Ψһ��ID)
	this.id = CssList.lastid++;
	
	CssList.instanceMap["CssList" + this.id] = this;
}

//��ʼ��css��ʽ��idΪ0
CssList.lastid = 0;

//����css��ʽ��ʵ������
CssList.instanceMap = new Array;

// �����ַ����õ�csslist�ṹ
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

// ����������������ݰ�
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