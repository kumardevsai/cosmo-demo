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
/*�������飬���ڽ�Ӣ�ĵ�style��ȡ������*/
QrXPCOM.EnglisthToChineseMap = new Array;
QrXPCOM.EnglisthToChineseMap[""]	=	"";
QrXPCOM.EnglisthToChineseMap["center"] = "����";
QrXPCOM.EnglisthToChineseMap["crosshair"]	=	"ʮ����";
QrXPCOM.EnglisthToChineseMap["default"]	=	"Ĭ��";
QrXPCOM.EnglisthToChineseMap["pointer"]	=	"����";
QrXPCOM.EnglisthToChineseMap["move"]	=	"�ƶ�";
QrXPCOM.EnglisthToChineseMap["text"]	=	"�ı�";
QrXPCOM.EnglisthToChineseMap["wait"]	=	"�ȴ�";
QrXPCOM.EnglisthToChineseMap["help"]	=	"����";
QrXPCOM.EnglisthToChineseMap["n-resize"]	=	"���ϵ�����С";
QrXPCOM.EnglisthToChineseMap["s-resize"]	=	"���µ�����С";
QrXPCOM.EnglisthToChineseMap["w-resize"]	=	"���������С";
QrXPCOM.EnglisthToChineseMap["e-resize"]	=	"���ҵ�����С";
QrXPCOM.EnglisthToChineseMap["ne-resize"]	=	"�����Ͻǵ�����С";
QrXPCOM.EnglisthToChineseMap["nw-resize"]	=	"�����Ͻǵ�����С";
QrXPCOM.EnglisthToChineseMap["se-resize"]	=	"�����½ǵ�����С";
QrXPCOM.EnglisthToChineseMap["sw-resize"]	=	"�����½ǵ�����С";
QrXPCOM.EnglisthToChineseMap["static"]	=	"�������е�λ��";
QrXPCOM.EnglisthToChineseMap["relative"]	=	"��������ƫ����";
QrXPCOM.EnglisthToChineseMap["absolute"]	=	"����λ��";
QrXPCOM.EnglisthToChineseMap["fixed"]	=	"�̶�λ��";
QrXPCOM.EnglisthToChineseMap["visible"]	=	"�ɼ�";
QrXPCOM.EnglisthToChineseMap["hidden"]	=	"����";
QrXPCOM.EnglisthToChineseMap["none"]	=	"��";
QrXPCOM.EnglisthToChineseMap["block"]	=	"��Ϊ��Ԫ��";
QrXPCOM.EnglisthToChineseMap["inline"]	=	"��Ϊ����Ԫ��";
QrXPCOM.EnglisthToChineseMap["run-in"]	=	"����������ѡ����ʾ";
QrXPCOM.EnglisthToChineseMap["compact"]	=	"��Ԫ�ػ�����֮�ϵ�����Ԫ��";
QrXPCOM.EnglisthToChineseMap["list-item"]	=	"��Ϊ�б���ʾ";
QrXPCOM.EnglisthToChineseMap["marker"]	=	"����������֮ǰ��֮��";
QrXPCOM.EnglisthToChineseMap["capitalize"]	=	"����ĸ��д";
QrXPCOM.EnglisthToChineseMap["lowercase"]	=	"ת����Сд";
QrXPCOM.EnglisthToChineseMap["uppercase"]	=	"ת���ɴ�д";
QrXPCOM.EnglisthToChineseMap["left"]	=	"����";
QrXPCOM.EnglisthToChineseMap["right"]	=	"����";
QrXPCOM.EnglisthToChineseMap["top"]	=	"����";
QrXPCOM.EnglisthToChineseMap["left top"]	=	"����";
QrXPCOM.EnglisthToChineseMap["right bottom"]	=	"����";
QrXPCOM.EnglisthToChineseMap["30% 50%"]	=	"ˮƽ:30% ��ֱ:50%";
QrXPCOM.EnglisthToChineseMap["repeat"]	=	"ƽ��";
QrXPCOM.EnglisthToChineseMap["repeat-x"]	=	"����ƽ��";
QrXPCOM.EnglisthToChineseMap["repeat-y"]	=	"����ƽ��";
QrXPCOM.EnglisthToChineseMap["no-repeat"]	=	"��ƽ��";
QrXPCOM.EnglisthToChineseMap["fixed"]	=	"�̶�";
QrXPCOM.EnglisthToChineseMap["scroll"]	=	"������";
QrXPCOM.EnglisthToChineseMap["underline"]	=	"�»���";
QrXPCOM.EnglisthToChineseMap["overline"]	=	"�ϻ���";
QrXPCOM.EnglisthToChineseMap["underline overline"]	=	"���»���";
QrXPCOM.EnglisthToChineseMap["line-through"]	=	"ɾ����";
QrXPCOM.EnglisthToChineseMap["baseline"]	=	"Ĭ��";
QrXPCOM.EnglisthToChineseMap["top"]	=	"���˶���";
QrXPCOM.EnglisthToChineseMap["middle"]	=	"����";
QrXPCOM.EnglisthToChineseMap["bottom"]	=	"�Ͷ˶���";
QrXPCOM.EnglisthToChineseMap["text-top"]	=	"�����������";
QrXPCOM.EnglisthToChineseMap["text-bottom"]	=	"�Ͷ��������";
QrXPCOM.EnglisthToChineseMap["super"]	=	"��ֱ�����ı��ϱ�";
QrXPCOM.EnglisthToChineseMap["sub"]	=	"��ֱ�����ı��±�";
QrXPCOM.EnglisthToChineseMap["3em"]	=	"3em";
QrXPCOM.EnglisthToChineseMap["30%"]	=	"30%";
QrXPCOM.EnglisthToChineseMap["left"]	=	"���";
QrXPCOM.EnglisthToChineseMap["right"]	=	"�ұ�";
QrXPCOM.EnglisthToChineseMap["both"]	=	"�κ�һ��";
QrXPCOM.EnglisthToChineseMap["normal"]	=	"Ĭ��";
QrXPCOM.EnglisthToChineseMap["small-caps"]	=	"С�ʹ�д��ĸ";
QrXPCOM.EnglisthToChineseMap["normal"]	=	"Ĭ��";
QrXPCOM.EnglisthToChineseMap["italic"]	=	"б��";
QrXPCOM.EnglisthToChineseMap["oblique"]	=	"��б";
QrXPCOM.EnglisthToChineseMap["normal"]	=	"Ĭ��";
QrXPCOM.EnglisthToChineseMap["bold"]	=	"����";
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
QrXPCOM.EnglisthToChineseMap["solid"]	=	"ʵ�߱߿�";
QrXPCOM.EnglisthToChineseMap["double"]	=	"˫�߱߿�";
QrXPCOM.EnglisthToChineseMap["groove"]	=	"3D���۱߿�";
QrXPCOM.EnglisthToChineseMap["ridge"]	=	"3D ¢״�߿�";
QrXPCOM.EnglisthToChineseMap["inset"]	=	"3D inset �߿�";
QrXPCOM.EnglisthToChineseMap["outset"]	=	"3D outset �߿�";
QrXPCOM.EnglisthToChineseMap["dashed"]	=	"���߱߿�";
QrXPCOM.EnglisthToChineseMap["dotted"]	=	"��״�߿�";
QrXPCOM.EnglisthToChineseMap["visible"]	=	"����������";
QrXPCOM.EnglisthToChineseMap["hidden"]	=	"��������";
QrXPCOM.EnglisthToChineseMap["scroll"]	=	"ʼ��ʹ�ù�����";
QrXPCOM.EnglisthToChineseMap["auto"]	=	"��Ҫʱʹ�ù�����";
QrXPCOM.EnglisthToChineseMap["justify"] = "���˶���";
QrXPCOM.EnglisthToChineseMap["nowrap"]	=	"������";
QrXPCOM.EnglisthToChineseMap["pre"]	=	"�����հ�";
QrXPCOM.EnglisthToChineseMap["pre-wrap"]	=	"�����հ׷�����";
QrXPCOM.EnglisthToChineseMap["pre-line"]	=	"�ϲ��հ׷�����";
QrXPCOM.EnglisthToChineseMap["inherit"]	=	"�̳и�Ԫ��";
/*����QrPulldown����*/
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
/*����Ҫд��ҳ���html����*/
QrPulldown.prototype.getHTML = function(){
    this.defaultValue = this.defaultValue.replace(/"/g,"'");
	var html = "<div style=\"float:left;\"><div class=\"QrPulldown\" id=\"$pulldownId\"><input  class=\"QrPulldownInput\" value=\"$defaultValueshow\" id=\"$pulldownId#inputshow\" size=\"$defaultSize\" style="+(this.defaultSize ? ("width:" + parseInt(this.defaultSize) * 8.5 ) + "px;margin-top:0px;" : "")+" onkeyup=\"QrPulldown.onKeyup('$pulldownId');\" $NamePoint$IEPoint/><input type=\"hidden\" class=\"QrPulldownInput\" value=\"$defaultValue\" id=\"$pulldownId#input\" size=\"$defaultSize\" onkeyup=\"QrPulldown.onKeyup('$pulldownId');\" $NamePoint$IEPoint/><div id=\"$pulldownId#button\" class=\"QrPulldownButton\" onmousedown=\"QrPulldown.onClick('$pulldownId');\"><img src=\"images/pulldown-normal.gif\" align=\"top\" height=\"22\" id=\"$pulldownId#img\" onmouseover=\"QrPulldown.onButtonHover('$pulldownId');\" onmouseout=\"QrPulldown.onButtonOut('$pulldownId');\"></div></div></div>\n<DIV class=\"QrPulldownMenu\" style=\"display:none;\" id=\"$pulldownId#menu\" onclick=\"QrXPCOM.onPopup();\"><DIV style=\"margin:2px;\" id=\"$pulldownId#menuinner\">\n</DIV></DIV>";
	if(QrXPCOM.isIE()) html=html.replace(/\$IEPoint/,"style=\"margin-top:-1px\"");
	else html=html.replace(/\$IEPoint/,"");
	//����һЩ��ʽ������ʹ��ͬ�ģ�������Ҫ��ʾ��ͬ��ֵ��������if�����жϣ�ʹ����ʾ�����Ӧ������
	if(QrXPCOM.EnglisthToChineseMap[this.defaultValue])
	{ 

	     switch(this.id)
	     {
			case 12:
			{
				switch(this.defaultValue)
				{	
					case "visible":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����������";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "��������";
					break;
					case "scroll": 
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "ʼ��ʹ�ù�����";
					break;
				}
				break;
			
			}
			case 30:
			{   
				switch(this.defaultValue)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "���";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�ұ�";
					break;
					case "both":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�κ�һ��";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "������";
					break; 
				}
				break;
			}
			case 31:
			{
				switch(this.defaultValue)
				{
					case "left":
					 QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					 break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "���ϲ������ı�";
					break;
				}
				break;
			}
			case 32:
			{
				switch(this.defaultValue)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�����";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�Ҷ���";
					break;
					case "center":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					break;
					case "justify":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "���˶���";
					break;
				}
				break;
			}
			case 33:
			{
				switch(this.defaultValue)
				{
				case "top":
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "���˶���";
				break;
				case "middle":
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
				break;
				case "bottom":
				QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�Ͷ˶���";
				break;
				}
				break;
			}
			case 34:
			{
				if(this.defaultValue == "none") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "��";
				break;
			}
			case 38:
			{
				if(this.defaultValue == "none") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "��";
				break;
			}
			case 41:
			{
				switch(this.defaultValue)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					break;
					case "top":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					break;
				}
				break;
			}
			case 42:
			{
				switch(this.defaultValue)
				{
					case "scroll":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "������";
					break;
					case "fixed":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�̶�";
					break;
				}
				break;
			}
			case 43:
			{
				if(this.defaultValue == "none") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����ʾ";
				break;
			}
			case 44:
			{
				switch(this.defaultValue)
				{
					case "visible":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�ɼ�";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "����";
					break;
				}
				break;
			}
			case 45:
			{
				if(this.defaultValue == "fixed") QrXPCOM.EnglisthToChineseMap[this.defaultValue] = "�̶�λ��";
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
/* �������htmlд��ҳ���� */
QrPulldown.prototype.render = function(){
    //var ss = this.getHTML();
	document.write(this.getHTML());
}
/*����ؼ���onChange�¼���set����*/
QrPulldown.prototype.set = function(value){
	document.getElementById("QrPulldown"+this.id+"#input").value = value;
	if(QrPulldown.instanceMap["QrPulldown"+this.id].onChange){
		QrPulldown.instanceMap["QrPulldown"+this.id].onChange(value);
	}
}
/*���ÿؼ���get����*/
QrPulldown.prototype.get = function(){
	return document.getElementById("QrPulldown"+this.id+"#input").value;
}

/*���ؼ������*/
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

QrPulldown.lastid = 0;//��ʼ���ؼ���idΪ0
QrPulldown.instanceMap = new Array;//����ؼ���ʵ������
/*������뿪��ʱ������ʽ���ó���ͨ����ʽ����ִ�пؼ���onchange�¼���ȡ���ı����ֵ*/
QrPulldown.onOut = function(id, itemid){
	if(document.getElementById(itemid).className == "QrPulldownItemHover"){
		document.getElementById(itemid).className = "QrPulldownItem";
	}
	if(QrPulldown.instanceMap[id].onChange){
		QrPulldown.instanceMap[id].onChange(document.getElementById(id+"#input").value);
	}
}
/*��������ȥʱ�������ڵ���������ʽ����ִ�пؼ���onchange�¼�*/
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
/*������뿪��ťʱ���л�ͼƬ*/
QrPulldown.onButtonOut = function(id){
	document.getElementById(id+"#img").src = "images/pulldown-normal.gif";
}
/*�������ڰ�ť��ʱ���л�ͼƬ*/
QrPulldown.onButtonHover = function(id){
	document.getElementById(id+"#img").src = "images/pulldown-down.gif";
}
/*���尴ť��click�¼��������ť��������div��������ѡ�������ʽ*/
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
/*�����ı����onkeyup�¼�*/
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
/*��֤������Ƿ��Ǻ���*/
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
/*����div������onclick�¼���ִ��onchange�¼���������Щ��ʽ������Ӣ��������ͬ��������if���жϣ���Ӧ��ʾ�ɵ�ǰ��ʽ����������*/
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
					QrXPCOM.EnglisthToChineseMap[value] = "����������";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[value] = "��������";
					break;
					case "scroll":
					QrXPCOM.EnglisthToChineseMap[value] = "ʼ��ʹ�ù�����";
					break;
				}
				break;
			}
			case "QrPulldown30":
			{
				switch(value)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[value] = "���";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[value] = "�ұ�";
					break;
					case "both":
					QrXPCOM.EnglisthToChineseMap[value] = "�κ�һ��";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[value] = "������";
					break;
				}
				break;
			}
			case "QrPulldown31":
			{  
				switch(value)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
					case "none":
					QrXPCOM.EnglisthToChineseMap[value] = "���ϲ������ı�";
					break;
				}
				break;
			}
			case "QrPulldown32":
			{
				switch(value)
				{
				case "left":
				QrXPCOM.EnglisthToChineseMap[value] = "�����";
				break;
				case "right":
				QrXPCOM.EnglisthToChineseMap[value] = "�Ҷ���";
				break;
				case "center":
				QrXPCOM.EnglisthToChineseMap[value] = "����";
				break;
				case "justify":
				QrXPCOM.EnglisthToChineseMap[value] = "���˶���";
				break;
				}
				break;
			}
			case "QrPulldown33":
			{
				switch(value)
				{
					case "top":
					QrXPCOM.EnglisthToChineseMap[value] = "���˶���";
					break;
					case "middle":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
					case "bottom":
					QrXPCOM.EnglisthToChineseMap[value] = "�Ͷ˶���";
					break;
				}
				break;
			}
			case "QrPulldown34":
			{
				 if(value == "none") QrXPCOM.EnglisthToChineseMap[value] = "��";
				 break;
			}
			case "QrPulldown37":
			{
				 if(value == "none") QrXPCOM.EnglisthToChineseMap[value] = "��";
				 break;
			}
			case "QrPulldown41":
			{
				switch(value)
				{
					case "left":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
					case "right":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
					case "top":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
				}
				break;
			}
	        case "QrPulldown42":
			{
				switch(value)
				{
					case "scroll":
					QrXPCOM.EnglisthToChineseMap[value] = "������";
					break;
					case "fixed":
					QrXPCOM.EnglisthToChineseMap[value] = "�̶�";
					break;
				}
				break;
		    }	
	        case "QrPulldown43":
			{
				if(value == "none") QrXPCOM.EnglisthToChineseMap[value] = "����ʾ";
				break;
			 }
			case "QrPulldown44":
			{
				switch(value)
				{
					case "visible":
					QrXPCOM.EnglisthToChineseMap[value] = "�ɼ�";
					break;
					case "hidden":
					QrXPCOM.EnglisthToChineseMap[value] = "����";
					break;
				}
				break;
			}
			case  "QrPulldown45":
			{
				if(value == "fixed") QrXPCOM.EnglisthToChineseMap[value] = "�̶�λ��";
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