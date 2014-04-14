/*-------------QrXPCOM��һЩ��������-----------------*/
/*���������˵������뷵��*/
QrXPCOM.init = function(){
	if(QrXPCOM.inited) return;
	QrXPCOM.documentBodyOnClickOld = document.body.onclick;
	document.body.onclick = function(event){
		if(QrXPCOM.documentBodyOnClickOld) QrXPCOM.documentBodyOnClickOld();
		id="id5";
		if(QrXPCOM.popupblock == false && QrXPCOM.popup){
			QrXPCOM.popup.style.display = "none";
		}else{
			QrXPCOM.popupblock = false;
		}
	}
	QrXPCOM.inited = true;
}

/*�����˵��Ƿ���ʾ�ı�־*/
QrXPCOM.popupblock;

/*���������˵��Ƿ���ʾ*/
QrXPCOM.onPopup = function(popup){
	if(popup){
	        if(QrXPCOM.popup && QrXPCOM.popup != popup) QrXPCOM.popup.style.display = "none";
		QrXPCOM.popup = popup;
	}
	QrXPCOM.popupblock = true;
}

/*����QrXPCOM����*/
function QrXPCOM(){}

/*���õ�ǰ����λ��*/
function QrPoint(_x,_y){
	this.x = _x;
	this.y = _y;
}

/*���ÿؼ��Ĵ�С�ߴ�*/
function QrDimension(_width,_height){
	this.width = _width;
	this.height = _height;
}

/*�ж��Ƿ���IE*/
QrXPCOM.isIE = function(){
	return window.ActiveXObject;
}

/*�õ���ǰ����λ��*/
QrXPCOM.getMousePoint = function(e,div){
	if(div){
		var da = QrXPCOM.getMousePoint(e);
		var db = QrXPCOM.getDivPointComplete(div);
		return new QrPoint(da.x-db.x,da.y-db.y);
	}
	
	if(QrXPCOM.isIE()){
		var p = QrXPCOM.getDivPointComplete(event.srcElement);
		return new QrPoint(p.x+ event.offsetX,p.y + event.offsetY);
	}else{
		return new QrPoint(e.pageX,e.pageY);
	//var p = QrXPCOM.getDivPointComplete(e.target) ; 
	//return new QrPoint(p.x+ e.layerX,p.y + e.layerY);
	}
}

/*����div��λ��*/
QrXPCOM.setDivPoint = function(div, x, y){
	div.style.top  = y + "px";
	div.style.left = x + "px";
}

/*�õ�div��λ��*/
QrXPCOM.getDivPointComplete = function(div){
	if(div.style && (div.style.position == "absolute" || div.style.position == "relative")){
		return new QrPoint(div.offsetLeft+1, div.offsetTop+1);
	}else if(div.offsetParent){
		var d = QrXPCOM.getDivPointComplete(div.offsetParent);
		return new QrPoint(d.x+div.offsetLeft, d.y+div.offsetTop);
	}else{
		return new QrPoint(0,0);
	}
}
QrXPCOM.getDivPointComplete = function(div)
{
	var x = 0 ;
	var y = 0 ; 
	for(var d = div ; d != null ; d = d.offsetParent)
	{
		x += parseInt(d.offsetLeft) ; 
		y += parseInt(d.offsetTop) ; 
	}
	for(var d = div.parentNode ; d != null && d.nodeType == 1 ; d = d.parentNode)
	{
		x -= parseInt(d.scrollLeft) ; 
		y -= parseInt(d.scrollTop) ; 
	}
	return new QrPoint(x , y);
}


/*�õ�div�Ĵ�С*/
QrXPCOM.getDivSize = function(div){
	if(QrXPCOM.isIE()){
		return new QrDimension(div.offsetWidth,div.offsetHeight);
	}else{
		return new QrDimension(div.offsetWidth-2,div.offsetHeight-2);
	}
}
/*����div�Ĵ�С*/
QrXPCOM.setDivSize = function(div, x, y){
	div.style.width  = x + "px";
	div.style.height = y + "px";
}
/*�õ���ǰbody�Ĵ�С*/
QrXPCOM.getBodySize = function(){
	return new QrDimension(document.body.clientWidth,document.body.clientHeight);
}