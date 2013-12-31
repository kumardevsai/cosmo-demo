<!----

/*-----------------------------------------------------------
鼠标右键菜单 1.0 Designed By Stroll  e-mail: csy-163@163.com



--------------------------------------------------------------*/

//---------------  有关数据 -----------------//

var IconList = new Array();   // icon图片 集合， 下标从 1 开始
	IconList[1] = new Image();
	IconList[1].src = "images/edit.gif";
	IconList[2] = new Image();
	IconList[2].src = "images/edit.gif";
	IconList[3] = new Image();
	IconList[3].src = "images/edit.gif";	
	IconList[4] = new Image();
	IconList[4].src = "images/edit.gif";	

//----------------  检测变量 菜单的显示隐藏就靠它了！！！  ------------------//	

var JustMenuID = "";
var SubMenuList = new Array();
var NowSubMenu = "";	
var mouseCanSound = true;	  //---------------------------  声音开关 ------  声音开关 ------------------//
var menuSpeed     =  50;   //---------- 菜单显示速度 ------------//
var alphaStep     =  30;   //---------- Alpaha 变化 度 -----------//
	
//------------- 构建 主菜单 对象 -------------//

function MouseMenu(objName)
{
	this.id  	 = "Menu_"+objName;
	this.obj 	 = objName;
	this.length  = 0;
	
	
	this.addMenu = addMenu;
	this.addLink = addLink;
	this.addHR   = addHR;	
	
	JustMenuID = this.id;
	
	document.body.insertAdjacentHTML('beforeEnd','<table id="'+this.id+'" border="0" cellspacing="0" cellpadding="0" style="top: 0; left: 0; display: none; filter:Alpha(Opacity=0);z-index:999" class="menutable" onmousedown=event.cancelBubble=true; onmouseup=event.cancelBubble=true></table>');
}

//----------- 构建 子菜单 对象 -------------//

function SubMenu(objName,objID)
{
	this.obj = objName;
	this.id  = objID;

	this.addMenu = addMenu;
	this.addLink = addLink;
	this.addHR   = addHR;

	this.length  = 0;
}


//-------------- 生成 菜单 makeMenu 方法 -----------//
function makeMenu(subID,oldID,word,icon,url,target,thetitle)
{
	var thelink = '';
	if(icon&&icon!="")
	{
		icon = '<img border="0" src="'+IconList[icon].src+'">';
	}
	else
	{
		icon = '';
	}
	
	if(!thetitle||thetitle=="")
	{
		thetitle = '';
	}
	
	if(url&&url!="")
	{
		thelink += '<a class="menua" href="'+url+'" ';  // 防止页面里定义a标签样式，改变菜单里的样式，加类样式a
		
		if(target&&target!="")
		{
			thelink += '  ';
			thelink += 'target="'+target+'" '
		}
		
		thelink += '></a>';
	}
	
	var Oobj = document.getElementById(oldID);
	Oobj.insertRow();
	
	with(Oobj.rows(Oobj.rows.length-1))
	{
		id 			= "tr"+subID;
		className	= "menutrout";
		
		title       = thetitle;

	}
	
	eventObj = "tr"+subID;
	
	eval('AttachEvent('+eventObj+',"onmouseover",MtrOver('+eventObj+'))');	
	eval('AttachEvent('+eventObj+',"onclick",MtrClick('+eventObj+'))');	
	var trObj = eval(eventObj);

	for(i=0;i<4;i++)
	{
		trObj.insertCell(-1);
	}

	with(Oobj.rows(Oobj.rows.length-1))
	{
		cells[0].className = "menutd0";
		cells[0].innerHTML = icon;

		//cells(1).innerHTML = thelink+'<nobr class=indentWord>'+word+'</nobr>';
		//cells(1).className = "indentWord"
		cells[1].innerHTML = thelink+word;
		cells[2].className = "menutd1";
		cells[2].innerHTML = "4";
		
		cells[3].className = "menutd2";
		cells[3].innerText = " ";
		
	}	
	
	document.body.insertAdjacentHTML('beforeEnd','<table id="'+subID+'" border="0" cellspacing="0" cellpadding="0" style="top: 0; left: 0; display: none; filter:Alpha(Opacity=0);" class="menutable" onmousedown=event.cancelBubble=true; onmouseup=event.cancelBubble=true></table>');
}


//---------------- 生成连接 makeLink 方法 ------------//
function makeLink(subID,oldID,word,icon,url,target,thetitle)
{
	var thelink = '';
	
	if(icon&&icon!="")
	{
		icon = '<img border="0" src="'+IconList[icon].src+'">';
	}
	else
	{
		icon = '';
	}
	
	if(!thetitle||thetitle=="")
	{
		thetitle = '';
	}
	
	
	if(url&&url!="")
	{
		thelink += '<a class="menua" href="'+url+'" ';  // 防止页面里定义a标签样式，改变菜单里的样式，加类样式a
		
		if(target&&target!="")
		{
			thelink += '  ';
			thelink += 'target="'+target+'" '
		}
		
		thelink += '></a>';
	}
	
	var Oobj = document.getElementById(oldID);
	
	Oobj.insertRow(-1);

	with(Oobj.rows[Oobj.rows.length-1])
	{
		id 			= "tr"+subID;
		className	= "menutrout";		
		title       = thetitle;
	}
	
	eventObj = "tr"+subID;
	
	eval('AttachEvent('+eventObj+',"onmouseover",LtrOver('+eventObj+'))');	
	eval('AttachEvent('+eventObj+',"onmouseout",LtrOut('+eventObj+'))');		
	eval('AttachEvent('+eventObj+',"onclick",MtrClick('+eventObj+'))');	
	var trObj = eval(eventObj);

	for(i=0;i<4;i++)
	{
		trObj.insertCell(-1);
	}

	with(Oobj.rows[Oobj.rows.length-1])
	{
		cells[0].className = "menutd0";
		cells[0].innerHTML = icon;

		cells[1].className = "menutdtxt";
		//cells(1).innerHTML = thelink+'<nobr class=indentWord>'+word+'</nobr>';
		cells[1].innerHTML = thelink+word;

		cells[2].className = "linktd1";
		cells[2].innerText = " ";
		
		cells[3].className = "menutd2";
		cells[3].innerText = " ";
		
		
		
	}	

}


//-------------- 菜单对象 addMenu 方法 ------------//
function addMenu(word,icon,url,target,title)
{
	var subID    = this.id + "_" + this.length;
	var subObj  = this.obj+"["+this.length+"]";
	
	var oldID   = this.id;
	
	eval(subObj+"= new SubMenu('"+subObj+"','"+subID+"')");
	
	 makeMenu(subID,oldID,word,icon,url,target,title);
	 
	 this.length++;
	
}


//------------- 菜单对象 addLink 方法 -------------//
function addLink(word,icon,url,target,title)
{
	var subID    = this.id + "_" + this.length;
	var oldID  = this.id;
	
	 makeLink(subID,oldID,word,icon,url,target,title);
	 
	 this.length++;	
}

//------------ 菜单对象 addHR 方法 -----------------//
function addHR()
{
	var oldID = this.id;

	var Oobj = document.getElementById(oldID);
	
	Oobj.insertRow();
	
	Oobj.rows(Oobj.rows.length-1).insertCell();

	with(Oobj.rows(Oobj.rows.length-1))
	{
		cells(0).colSpan= 4;
		cells(0).insertAdjacentHTML('beforeEnd','<hr class="menuhr" size="1" width="95%">');		
	}	
	
}


//--------- MtrOver(obj)-------------------//
function MtrOver(obj)
{   
	return sub_over;
	
	function sub_over()
	{
		var sonid = obj.id.substring(2,obj.id.length);
		
		var topobj = obj.parentElement.parentElement; 
		
		NowSubMenu = topobj.id;
		
		if(obj.className=="menutrout")
		{
			mouseWave();
		}		
		
		HideMenu(1);		
		
		SubMenuList[returnIndex(NowSubMenu)] = NowSubMenu;

		ShowTheMenu(sonid,MPreturn(sonid))		
		
		SubMenuList[returnIndex(obj.id)] = sonid;
		
		if(topobj.oldTR)
		{ 
			eval(topobj.oldTR+'.className = "menutrout"'); 
		} 
		obj.className = "menutrin"; 
		topobj.oldTR = obj.id; 
	}
}

//--------- LtrOver(obj)-------------------//
function LtrOver(obj)
{
	return sub_over;
	
	function sub_over()
	{   
		var topobj = obj.parentElement.parentElement; 

		NowSubMenu = topobj.id;
		
		HideMenu(1);
		
		SubMenuList[returnIndex(NowSubMenu)] = NowSubMenu;
				
		if(topobj.oldTR)
		{ 
			eval(topobj.oldTR+'.className = "menutrout"'); 
		} 
        
		obj.className = "menutrin"; 
        // 由于css样式可能设置td的背景色，为了防止tr背景失效，设置td背景色
        for(var i = 0; i<obj.childNodes.length; i++)
        {
			obj.childNodes[i].style.backgroundColor = "#1a71e6";
        }
        obj.childNodes[1].style.color = "#ffffff"; // 由于css样式可能设置td的字体颜色，为了防止tr字体颜色失效，设置td字体颜色
		topobj.oldTR = obj.id; 

	}
}

//--------- LtrOut(obj)-------------------//
function LtrOut(obj)
{
	return sub_out;
	
	function sub_out()
	{  
		var topobj = obj.parentElement.parentElement; 
		
		obj.className = "menutrout"; 
		
		// 由于css样式可能设置td的背景色，为了防止tr背景失效，设置td背景色
	    for(var i = 0; i<obj.childNodes.length; i++)
	    {
			obj.childNodes[i].style.backgroundColor = "#ffffff";
	    }
	    obj.childNodes[1].style.color = "#000000";  // 由于页面可能设置td的color，为了防止tr的color失效，设置td字体颜色
		topobj.oldTR = false; 
	}
}

//----------MtrClick(obj)-----------------//

function MtrClick(obj)
{
	return sub_click;
	
	function sub_click()
	{
		if(document.all)
		{
		    if(obj.cells[1].all.tags("A").length>0)
		    {   
			    obj.cells[1].all.tags("A")[0].click();
		    }	
        }
        else
        {
            if(obj.cells[1].getElementsByTagName("A").length>0)
		    {   
			    obj.cells[1].getElementsByTagName("A")[0].click();
		    }	
        }
	}
}


//---------- returnIndex(str)--------------//

function returnIndex(str)
{
	return (str.split("_").length-3)
}


//---------ShowTheMenu(obj,num)-----------------//

function ShowTheMenu(obj,num)
{ 
	var topobj = eval(obj.substring(0,obj.length-2));
	
	var trobj  = eval("tr"+obj);
	
	var obj = eval(obj);
	
	if(num==0)
	{
		with(obj.style)
		{
			pixelLeft = topobj.style.pixelLeft +topobj.offsetWidth;
			pixelTop  = topobj.style.pixelTop + trobj.offsetTop;
		}
	}
	if(num==1)
	{
		with(obj.style)
		{
			pixelLeft = topobj.style.pixelLeft + topobj.offsetWidth;
			pixelTop  = topobj.style.pixelTop  + trobj.offsetTop + trobj.offsetHeight - obj.offsetHeight;
		}
	}
	if(num==2)
	{
		with(obj.style)
		{
			pixelLeft = topobj.style.pixelLeft -  obj.offsetWidth;
			pixelTop  = topobj.style.pixelTop + trobj.offsetTop;
		}	
	}
	if(num==3)
	{
		with(obj.style)
		{
			pixelLeft = topobj.style.pixelLeft -  obj.offsetWidth;
			pixelTop  = topobj.style.pixelTop  + trobj.offsetTop + trobj.offsetHeight - obj.offsetHeight;
		}	
	}
	
	obj.style.display  = ""; 
	if(obj.alphaing)
	{
		clearInterval(obj.alphaing);
	}
	
	obj.alphaing = setInterval("menu_alpha_up("+obj.id+","+alphaStep+")",menuSpeed);	
}

//----------HideMenu(num)-------------------//

/*----------------------
var SubMenuList = new Array();

var NowSubMenu = "";	

---------------------*/

function HideMenu(num)
{
	var thenowMenu = "";
	
	var obj = null;
	
	if(num==1)
	{
		thenowMenu = NowSubMenu
	}
	
	
	
	for(i=SubMenuList.length-1;i>=0;i--)
	{
		if(SubMenuList[i]&&SubMenuList[i]!=thenowMenu)
		{
			
			obj = eval(SubMenuList[i]);
			
			if(obj.alphaing)
			{
				clearInterval(obj.alphaing);
			}	

			obj.alphaing = setInterval("menu_alpha_down("+obj.id+","+alphaStep+")",menuSpeed);
			
			obj.style.display = "none";	
			
			eval("tr"+SubMenuList[i]).className = "menutrout";
						
			SubMenuList[i] = null;	
		}
		else
		{
			if(SubMenuList[i]==thenowMenu)
			{
				return;
			}
		}
	}
	
	NowSubMenu = "";
}




//-----------MainMenuPosition return()------------//

function MMPreturn(evt)
{
	var obj = eval(JustMenuID);
	
	var x = evt.clientX;
	var y = evt.clientY;
	
	var judgerX = x + obj.offsetWidth;
	var judgerY = y + obj.offsetHeight;

	var px = 0;
	var py = 0;
    if(judgerX>document.documentElement.clientWidth)
    {
	    px = 2;
    }
    if(judgerY>document.documentElement.clientHeight)
    {
	    py = 1;
    }
		
	return (px+py);
}

//-----------MenuPosition return(obj)--------------//

function MPreturn(obj)
{
	var topobj = eval(obj.substring(0,obj.length-2));
	
	var trobj  = eval("tr"+obj);
	
	var x = topobj.style.pixelLeft + topobj.offsetWidth;
	var y = topobj.style.pixelTop  + trobj.offsetTop;

	obj = eval(obj);
	
	var judgerY =  obj.offsetHeight + y;
	var judgerX =  obj.offsetWidth  + x;
	
	var py = 0;
	var px = 0;
	
	if(judgerY>=document.body.clientHeight)
	{
		py = 1;
	}
	
	if(judgerX>= document.body.clientWidth)
	{
		px = 2;
	} 
			
	return (px+py);
}

//-----------mouseWave()-------------//

function mouseWave()
{
	if(mouseCanSound)
	{
		//theBS.src= "sound/sound.wav";
	}	
}

//----------- menu_alpha_down -------//

function menu_alpha_down(obj,num)
{      
		var obj = eval(obj);
		// 区分 IE 火狐
		if(document.all)
		{
		    if(obj.filters.Alpha.Opacity > 0 )
		    {
			    obj.filters.Alpha.Opacity -= num;
		    }	
		    else
		    {	
			    clearInterval(obj.alphaing);
			    obj.filters.Alpha.Opacity = 0;
			    obj.alphaing = false;
			    obj.style.display = "none";
		    }	
		}
		else
		{   
		    if(obj.style.opacity > 0 )
		    {
			    obj.style.opacity -= num/100;
		    }	
		    else
		    {	
			    clearInterval(obj.alphaing);
			    obj.style.opacity = 0;
			    obj.alphaing = false;	
			    obj.style.display = "none";
		    }	
		}
}


//------------ menu_alpha_up --------//

function menu_alpha_up(obj,num)
{
		var obj = eval(obj);
		// 区分 IE 火狐
		if(document.all)
		{
		    if(obj.filters.Alpha.Opacity<100)
			    obj.filters.Alpha.Opacity += num;
		    else
		    {	
			    clearInterval(obj.alphaing);
			    obj.filters.Alpha.Opacity = 100;
			    obj.alphaing = false;
		    }	
		}
		else
		{
		    if(obj.style.opacity<1)
		    {
			    obj.style.opacity = parseFloat(obj.style.opacity) + parseFloat(num/100);
			}
		    else
		    {
			    clearInterval(obj.alphaing);
			    obj.style.opacity = 1;
			    obj.alphaing = false;
		    }	
		}
		
}


//----------- IE ContextMenu -----------------//
document.oncontextmenu = function()
{   
	return false;
}


//----------- IE Mouseup ----------------//

function contextmenuonmouseup(evt)
{  
	var evt = evt || event;
    var docleft = document.body.scrollLeft||document.documentElement.scrollLeft;
    var doctop = document.body.scrollTop||document.documentElement.scrollTop;
	if(evt.button==2)
	{
	
		HideMenu(0);
		
		var pixelLeft = 0 ; 
		var pixelTop = 0 ;
		var obj = eval(JustMenuID)
		
	
			obj.style.display = "none";
			if(obj.alphaing)
			{
				clearInterval(obj.alphaing);
			}
			if(document.all){ obj.filters.Alpha.Opacity = 0;} // IE
			else obj.style.opacity = 0; // ff
			var judger = MMPreturn(evt);
			
			if(judger==0)
			{
					pixelLeft = evt.clientX + docleft;
					pixelTop  = evt.clientY + doctop;
			}
			if(judger==1)
			{
					pixelLeft = evt.clientX + docleft;
					pixelTop  = evt.clientY - obj.offsetHeight + doctop;
			}
			if(judger==2)
			{
					pixelLeft = evt.clientX - obj.offsetWidth + docleft;
					pixelTop  = evt.clientY + doctop;
			}
			if(judger==3)
			{
					pixelLeft = evt.clientX - obj.offsetWidth + docleft;
					pixelTop  = evt.clientY - obj.offsetHeight + doctop;
			}
			obj.style.left = pixelLeft + "px";
			obj.style.top = pixelTop + "px"; 
			mouseWave();
						
			obj.style.display = "";
			obj.alphaing = setInterval("menu_alpha_up("+obj.id+","+alphaStep+")",menuSpeed);
	}
}

//---------- IE MouseDown --------------//

function contextmenuonmousedown(evt)
{  
	var evt = evt || event;
	if(evt.button == 1 || evt.button == 0)
	{
		HideMenuAll();
	}
}

function HideMenuAll()
{  
	HideMenu(1);
	var obj = eval(JustMenuID);
	if(obj.alphaing)
	{
		clearInterval(obj.alphaing);
	}
	
	obj.alphaing = setInterval("menu_alpha_down("+obj.id+","+alphaStep+")",menuSpeed);
}
//----->