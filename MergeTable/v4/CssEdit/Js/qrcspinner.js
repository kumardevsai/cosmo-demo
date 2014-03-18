/*
   
   ### SAMPLE ###
   
   <SCRIPT lang="JavaScript"><!--
   var pl = new QrSpinner();
   pl.render();
   //--></SCRIPT>
   
   ---------------------------------------------------
   var p = new QrSpinner(_defaultValue, _defaultSize, _name);
   
   		// Create QrPulldown Object. Any parameters may not be specified.
   		// <input value="_defaultValue" size="_defaultSize" name="_name"/>
   		
   
   str = p.getHTML();		// get HTML for inserting this Pulldown;
   p.render();				// equals to document.write(p.getHTML());
   p.set(value);			// set value.
   p.get();					// get value.
   
   ---------------------------------------------------
   <SCRIPT lang="JavaScript" src="Js/qrcspinner.js"></SCRIPT>
   <SCRIPT lang="JavaScript" src="Js/qrxpcom.js"></SCRIPT>
   
   link to the JavaScript code is needed for using.
 */
/*定义微调控件的函数*/
function QrSpinner(_defaultValue, _defaultSize, _Name){
	if(!_defaultValue) _defaultValue = "";
	if(!_defaultSize)  _defaultSize  = "4";
	if(!_Name)  _Name  = " name=\""+_Name+"\" ";
	else _Name = "";
	
	this.id = QrSpinner.lastId++;
	this.defaultValue = _defaultValue;
	this.defaultSize  = _defaultSize;
	this.name = _Name;
	
	QrSpinner.instanceMap["QrSpinner"+this.id] = this;
}
/*定义微调控件要显示在页面的html内容*/
QrSpinner.prototype.getHTML = function(){
	var html =  "<div style=\"padding:0px;margin-top:0px;float:left;\"><input id=\"$spinnerId#input\" style=\"height:22px;border:#7F9DB9 double 1px; padding-left:2px;float:left;line-height:22px;vertical-align:middle;"+(this.defaultSize ? ("width:" + parseInt(this.defaultSize) * 8.5 ) + "px" : "")+"$IEPoint\" size=\"$defaultSize\" value=\"$defaultValue\" onkeyup=\"QrSpinner.onKeyup('$spinnerId')\" $NamePoint/><div style=\"margin-left:2px;z-index:0;float:left;\"><img src=\"images/spinner-normal.gif\" align=\"top\" height=\"22\" id=\"$spinnerId#button\" onmousemove=\"QrSpinner.onHover(event,'$spinnerId')\" onmouseout=\"QrSpinner.onOut(event,'$spinnerId')\" onmousedown=\"QrSpinner.onDown(event,'$spinnerId')\"></div></div>";
	if(QrXPCOM.isIE()) html=html.replace(/\$IEPoint/,"margin-top:-1px;");
	else html=html.replace(/\$IEPoint/,"");
	  return html.replace(/\$spinnerId/g,"QrSpinner"+this.id)
			      .replace(/\$defaultSize/g,this.defaultSize)
			      .replace(/\$defaultValue/g,this.defaultValue)
			      .replace(/\$NamePoint/g,this.name);
}
/*将html内容写到页面*/
QrSpinner.prototype.render = function(){
	document.write(this.getHTML());
}
/*定义QrSpinner类的set方法，定义控件的onchange方法*/
QrSpinner.prototype.set = function(value){
	document.getElementById("QrSpinner"+this.id+"#input").value = value;
	if(QrSpinner.instanceMap["QrSpinner"+this.id].onChange){
		QrSpinner.instanceMap["QrSpinner"+this.id].onChange(value);
	}
}
/*定义QrSpinner类的get方法，得到微调控件的值为input的value*/
QrSpinner.prototype.get = function(){
	return document.getElementById("QrSpinner"+this.id+"#input").value;
}
//将微调控件的id初始化为0
QrSpinner.lastId = 0;
//定义微调控件的实例数组
QrSpinner.instanceMap = new Array;
/*设置当鼠标放上去时切换图片*/
QrSpinner.onHover = function(e, id){
	var p = QrXPCOM.getMousePoint(e);
	var d = QrXPCOM.getDivPointComplete(document.getElementById(id+"#button"));
	if((p.y - d.y)<6){
		document.getElementById(id+"#button").src = "images/spinner-updown.gif";
	}
	if((p.y - d.y)>6){
		document.getElementById(id+"#button").src = "images/spinner-downdown.gif";
	}
}
/*设置当鼠标离开图片时切换图片*/
QrSpinner.onOut = function(e, id){
	document.getElementById(id+"#button").src = "images/spinner-normal.gif";
}

/*input的onkeyup事件，取到input的值，执行实例对象的onChange*/
QrSpinner.onKeyup = function(id){
	if(QrSpinner.instanceMap[id].onChange){
		QrSpinner.instanceMap[id].onChange(document.getElementById(id+"#input").value);
	}
}
/*定义图片的onmousedown事件*/
QrSpinner.onDown = function(e, id){
	var p = QrXPCOM.getMousePoint(e);
	var d = QrXPCOM.getDivPointComplete(document.getElementById(id+"#button"));
	
	var v = parseInt(document.getElementById(id+"#input").value);
	if(!v) v = 0;
	if((p.y - d.y)<6){
		document.getElementById(id+"#input").value = ++v;
	}
	if((p.y - d.y)>6){
		document.getElementById(id+"#input").value = --v;
	}
	if(QrSpinner.instanceMap[id].onChange){
		QrSpinner.instanceMap[id].onChange(v);
	}
}