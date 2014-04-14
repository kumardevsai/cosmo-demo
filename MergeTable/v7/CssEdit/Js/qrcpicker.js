/*
   
   ### SAMPLE ###
   
    <SCRIPT lang="JavaScript"><!--
	var cp = new QrColorPicker(defaultColor);
	cp.render();
	//--></SCRIPT>
   
   ---------------------------------------------------
	var cp = new QrColorPicker(defaultColor);   // Create new ColorPicker Object.
   
		                                 
   
	str = cp.getHTML();			         // get HTML for inserting this Pulldown;
	cp.render();				        // equals to document.write(p.getHTML());
	cp.set(value);				        // set value.
	cp.get();				            // get value.
	cp.onSelect = function(colorstr){};	// invoked when selecting color. called when mouse clicked.
	cp.onChange = function(colorstr){};	// invoked when previewing color. called every time mouse moved.
   
   ---------------------------------------------------
   <SCRIPT type="JavaScript" src="Js/qrcpicker.js"></SCRIPT>
   <SCRIPT type="JavaScript" src="Js/qrxpcom.js"></SCRIPT>
   
   link to the JavaScript code is needed for using. x
 */
 
/*QrColorPicker的构造函数*/
function QrColorPicker(_defaultColor){
	if(!_defaultColor) _defaultColor = "#FFFFFF";
	QrXPCOM.init();
	this.id = QrColorPicker.lastid++;
	this.defaultColor = _defaultColor;
	QrColorPicker.instanceMap["QrColorPicker"+this.id] = this;
}
/*设置颜色控件的html内容*/
QrColorPicker.prototype.getHTML = function(){
    if(this.id != 0 && this.id != 1)
    {
	var html = "<SPAN id=\"$pickerId\" onclick=\"javascript:void(QrColorPicker.popupPicker('$pickerId'));\"><img src=\"images/transparentpixel.gif\" width=\"1\" height=\"1\" align=\"middle\" id=\"$pickerId#color\" style=\"width:40px;height:21px;border:1px inset gray;background-color:\$defaultColor;cursor:pointer;\"/>\n<SPAN style=\"cursor:pointer;\" id=\"$pickerId#text\" title=\$defaultColor>$loadcolor</SPAN></SPAN>\n<DIV style=\"display:none; position:absolute; border:solid 1px gray;background-color:white;z-index:2;\" id=\"$pickerId#menu\"\n onmouseout=\"javascript:QrColorPicker.restoreColor('$pickerId');\" onclick=\"javascript:QrXPCOM.onPopup();\">\n\n<NOBR><IMG SRC=\"images/colorpicker.jpg\" NATURALSIZEFLAG=\"3\" BORDER=\"0\" \onMouseMove=\"javascript:QrColorPicker.setColor(event,'$pickerId');\"\onClick=\"javascript:QrColorPicker.selectColor(event,'$pickerId');\" style=\"cursor:crosshair\"\nWIDTH=\"192\" HEIGHT=\"128\" ALIGN=\"BOTTOM\"></NOBR><BR><NOBR><IMG SRC=\"images/graybar.jpg\" NATURALSIZEFLAG=\"3\" BORDER=\"0\" \nonMouseMove=\"javascript:QrColorPicker.setColor(event,'$pickerId');\"\nonClick=\"javascript:QrColorPicker.selectColor(event,'$pickerId');\" style=\"cursor:crosshair\"\nWIDTH=\"192\" HEIGHT=\"8\" ALIGN=\"BOTTOM\"></NOBR><BR>\n<NOBR><input type=\"text\" size=\"8\" id=\"$pickerId#input\" style=\"border:solid 1px gray;font-size:12pt;margin:1px;\" onkeyup=\"QrColorPicker.keyColor('$pickerId')\" value=\"$defaultColor\"/> <span style=\"cursor:hand\" onClick=\"javascript:QrColorPicker.transparent('$pickerId');\"><img src=\"images/grid.gif\" style=\"height:20px; width:20px;\" align=\"middle\" border=\"0\">transparent</span></NOBR></DIV>";
	return html.replace(/\$pickerId/g,"QrColorPicker"+this.id).replace(/\$defaultColor/g,this.defaultColor).replace(/\$loadcolor/g,this.defaultColor.substr(0,11));
    }
    else
    {
	 var html = "<SPAN id=\"$pickerId\" onclick=\"javascript:void(QrColorPicker.popupPicker('$pickerId'));\"><img src=\"images/transparentpixel.gif\" width=\"1\" height=\"1\" align=\"middle\" id=\"$pickerId#color\" style=\"width:40px;height:21px;border:1px inset gray;background-color:\$defaultColor;cursor:pointer;\"/>\n<SPAN style=\"cursor:pointer;\" id=\"$pickerId#text\">$defaultColor</SPAN></SPAN>\n<DIV style=\"display:none; position:absolute; border:solid 1px gray;background-color:white;z-index:2;\" id=\"$pickerId#menu\"\n onmouseout=\"javascript:QrColorPicker.restoreColor('$pickerId');\" onclick=\"javascript:QrXPCOM.onPopup();\">\n\n<NOBR><IMG SRC=\"images/colorpicker.jpg\" NATURALSIZEFLAG=\"3\" BORDER=\"0\" \onMouseMove=\"javascript:QrColorPicker.setColor(event,'$pickerId');\"\onClick=\"javascript:QrColorPicker.selectColor(event,'$pickerId');\" style=\"cursor:crosshair\"\nWIDTH=\"192\" HEIGHT=\"128\" ALIGN=\"BOTTOM\"></NOBR><BR><NOBR><IMG SRC=\"images/graybar.jpg\" NATURALSIZEFLAG=\"3\" BORDER=\"0\" \nonMouseMove=\"javascript:QrColorPicker.setColor(event,'$pickerId');\"\nonClick=\"javascript:QrColorPicker.selectColor(event,'$pickerId');\" style=\"cursor:crosshair\"\nWIDTH=\"192\" HEIGHT=\"8\" ALIGN=\"BOTTOM\"></NOBR><BR>\n<NOBR><input type=\"text\" size=\"8\" id=\"$pickerId#input\" style=\"border:solid 1px gray;font-size:12pt;margin:1px;\" onkeyup=\"QrColorPicker.keyColor('$pickerId')\" value=\"$defaultColor\"/> <span style=\"cursor:hand\" onClick=\"javascript:QrColorPicker.transparent('$pickerId');\"><img src=\"images/grid.gif\" style=\"height:20px; width:20px;\" align=\"middle\" border=\"0\">transparent</span></NOBR></DIV>";
	 return html.replace(/\$pickerId/g,"QrColorPicker"+this.id).replace(/\$defaultColor/g,this.defaultColor);
    }
}
/*将定义的颜色控件的内容写到页面*/
QrColorPicker.prototype.render = function(){
	document.write(this.getHTML());
}
/*定义颜色的控件set方法*/
QrColorPicker.prototype.set = function(color){
	if(QrColorPicker.instanceMap["QrColorPicker"+this.id].onChange){
		QrColorPicker.instanceMap["QrColorPicker"+this.id].onChange(color);
	}
	if(color == "") color = "transparent";
	document.getElementById("QrColorPicker"+this.id+"#input").value = color;
	document.getElementById("QrColorPicker"+this.id+"#text").innerHTML = color;
	document.getElementById("QrColorPicker"+this.id+"#color").style.background = color;
}
/*定义颜色控件的get方法*/
QrColorPicker.prototype.get = function(){
	return document.getElementById("QrColorPicker"+this.id+"#input").value;
}
//将颜色控件的初始值设为0
QrColorPicker.lastid = 0;

QrColorPicker.instanceMap = new Array;
QrColorPicker.restorePool = new Array;
/*设置当单击transparent时设设置颜色*/
QrColorPicker.transparent= function(id){
	QrColorPicker.instanceMap[id].set("transparent");
	document.getElementById(id+"#menu").style.display = "none";
	if(QrColorPicker.instanceMap[id].onChange){
		QrColorPicker.instanceMap[id].onChange("transparent");
	}
}

/*弹出拾色器*/
QrColorPicker.popupPicker= function(id){
	var pop = document.getElementById(id);
	var p = QrXPCOM.getDivPointComplete(pop);
	QrXPCOM.setDivPoint(document.getElementById(id+"#menu"), p.x-127, p.y-17);//设置弹出的拾色器的位置
	
	document.getElementById(id+"#menu").style.display = "";
	QrXPCOM.onPopup(document.getElementById(id+"#menu"));//弹出拾色器
}
/*设置选取的颜色*/
QrColorPicker.setColor = function(event,id){
	if(!QrColorPicker.restorePool[id]) QrColorPicker.restorePool[id] = document.getElementById(id+"#input").value;
	
	var d = QrXPCOM.getMousePoint(event,document.getElementById(id+"#menu"));
	var picked = QrColorPicker.colorpicker(d.x,d.y).toUpperCase();
	
	document.getElementById(id+"#input").value = picked;
	document.getElementById(id+"#text").innerHTML = picked;
	document.getElementById(id+"#color").style.background = picked;
	if(QrColorPicker.instanceMap[id].onChange){
		QrColorPicker.instanceMap[id].onChange(picked);
	}
	return picked;
};

/*设置onkeyup时选取的颜色*/
QrColorPicker.keyColor = function(id){
	try{
		document.getElementById(id+"#color").style.background = document.getElementById(id+"#input").value;
		QrColorPicker.restorePool[id] = document.getElementById(id+"#input").value;
		document.getElementById(id+"#text").innerHTML = QrColorPicker.restorePool[id];
	}catch(e){}
};

/*当拾色器被单击时的，执行控件的onchange事件*/
QrColorPicker.selectColor = function(event,id){
	var picked = QrColorPicker.setColor(event,id);
	
	document.getElementById(id+"#menu").style.display = "none";
	QrColorPicker.restorePool[id] = picked;
	if(QrColorPicker.instanceMap[id].onSelect){
		QrColorPicker.instanceMap[id].onSelect(picked);
	}
};
/*定义鼠标离开拾色器是保存颜色*/
QrColorPicker.restoreColor = function(id){
	if(QrColorPicker.restorePool[id]){
		document.getElementById(id+"#input").value = QrColorPicker.restorePool[id];
		if(id == "QrColorPicker0" || id== "QrColorPicker1")//当为字体颜色和背景颜色时，颜色全部显示
			document.getElementById(id+"#text").innerHTML = QrColorPicker.restorePool[id];
		else//边框时截取
		  document.getElementById(id+"#text").innerHTML = QrColorPicker.restorePool[id].substr(0,11);
		try{
		   document.getElementById(id+"#color").style.background = QrColorPicker.restorePool[id];
		  }
		catch(e){
		 }
		if(QrColorPicker.instanceMap[id].onChange){
			QrColorPicker.instanceMap[id].onChange(QrColorPicker.restorePool[id]);
		}
		QrColorPicker.restorePool[id] = null;
	}
};
/*颜色设置*/
QrColorPicker.colorpicker = function(prtX,prtY){
	var colorR = 0;
	var colorG = 0;
	var colorB = 0;
	
	if(prtX < 32){
		colorR = 256;
		colorG = prtX * 8;
		colorB = 1;
	}
	if(prtX >= 32 && prtX < 64){
		colorR = 256 - (prtX - 32 ) * 8;
		colorG = 256;
		colorB = 1;
	}
	if(prtX >= 64 && prtX < 96){
		colorR = 1;
		colorG = 256;
		colorB = (prtX - 64) * 8;
	}
	if(prtX >= 96 && prtX < 128){
		colorR = 1;
		colorG = 256 - (prtX - 96) * 8;
		colorB = 256;
	}
	if(prtX >= 128 && prtX < 160){
		colorR = (prtX - 128) * 8;
		colorG = 1;
		colorB = 256;
	}
	if(prtX >= 160){
		colorR = 256;
		colorG = 1;
		colorB = 256 - (prtX - 160) * 8;
	}
	
	if(prtY < 64){
		colorR = colorR + (256 - colorR) * (64 - prtY) / 64;
		colorG = colorG + (256 - colorG) * (64 - prtY) / 64;
		colorB = colorB + (256 - colorB) * (64 - prtY) / 64;
	}
	if(prtY > 64 && prtY <= 128){
		colorR = colorR - colorR * (prtY - 64) / 64;
		colorG = colorG - colorG * (prtY - 64) / 64;
		colorB = colorB - colorB * (prtY - 64) / 64;
	}
	if(prtY > 128){
		colorR = 256 - ( prtX / 192 * 256 );
		colorG = 256 - ( prtX / 192 * 256 );
		colorB = 256 - ( prtX / 192 * 256 );
	}
	
	colorR = parseInt(colorR);
	colorG = parseInt(colorG);
	colorB = parseInt(colorB);
	
	if(colorR >= 256){
		colorR = 255;
	}
	if(colorG >= 256){
		colorG = 255;
	}
	if(colorB >= 256){
		colorB = 255;
	}
	
	colorR = colorR.toString(16);
	colorG = colorG.toString(16);
	colorB = colorB.toString(16);
	
	if(colorR.length < 2){
	colorR = 0 + colorR;
	}
	if(colorG.length < 2){
	colorG = 0 + colorG;
	}
	if(colorB.length < 2){
	colorB = 0 + colorB;
	}
	
	return "#" + colorR + colorG + colorB;
}