//��Щ����Ҫд�ڵ��ô˽ű�����ҳ��
//var catalog='<%=Request.QueryString["catalog"]%>';//����Ŀ¼
//var report_name='<%=Request["report_name"]%>';//����·��
//var mainPageNum='1';//��ǰ��ҳ��
//var subPageNum='1';//��ǰ����ҳ
////��ҳ��ť״̬,���server������λ�ַ�����1111����1����Ч��0����Ч
////��һλ��ʾ����İ�ť�Ƿ���Ч���ڶ�λ���ϣ��������£���������
////�确0111����ʾ���������ҳ��ť����Ч
//var pageBtnState;

/***************�˴������Firefox***************/

var strToolbar="";
var timerID=null;
var iToolbarWidth;
strToolbar+='';

function doExport(type) {
	var url = '';
	var hdl =''; 
}

function MatrixEvent(eventTarget, eventArgument) 
{
	closeBox();
	//�����ť�Ѿ��������ˣ���ô�������
	if(pageBtnState=='00000')
	{
		return;
	}
	if(pageBtnState.substring(0,1)=='0')
    {
        if(eventArgument=='tb=left'||eventArgument=='tb=leftest')
			return;
    }
    if(pageBtnState.substring(1,2)=='0')
    {
        if(eventArgument=='tb=prev'||eventArgument=='tb=top')
            return;
    }
    if(pageBtnState.substring(2,3)=='0')
    {
        if(eventArgument=='tb=next'||eventArgument=='tb=bottom')
            return;
    }
    if(pageBtnState.substring(3,4)=='0')
    {
        if(eventArgument=='tb=right'||eventArgument=='tb=rightest')
            return;
    }
	
	//������������¼�
	if(eventArgument == 'tb=left')//��һҳ
	{
        __doPostBack('btnLeft','');
	}
	else if(eventArgument == 'tb=prev')//ǰһҳ
	{
        __doPostBack('btnPrev','');
	}
	else if(eventArgument == 'tb=next')//��һҳ
	{
        __doPostBack('btnNext','');
	}
	else if(eventArgument == 'tb=right')//��һҳ
	{
        __doPostBack('btnRight','');
	}
	else if(eventArgument == 'tb=leftest')//����ҳ
	{
        __doPostBack('btnLeftest','');
	}
	else if(eventArgument == 'tb=top')//�ҳ
	{
        __doPostBack('btnTop','');
	}
	else if(eventArgument == 'tb=bottom')//���ҳ
	{
        __doPostBack('btnBottom','');
	}
	else if(eventArgument == 'tb=rightest')//����ҳ
	{
        __doPostBack('btnRightest','');
	}
	else if(eventArgument.substr(0,11) == 'tb=pagemain')//��ת
	{
		if(pageBtnState=='0000')
		{
			return;
		}
		document.all('curmain').value =m= document.all('pagemain').value;
		if(isNaN(m))
		{
			alert('����ҳ�����Ϊ���֣�');
			return;
		}
		document.all('cursub').value =s= document.all('pagesub').value;
		if(isNaN(s))
		{
			alert('����ҳ�����Ϊ���֣�');
			return;
		}
        __doPostBack('btnGo','');
	}
	else if(eventArgument == 'tb=print')//��ӡ
	{
		var mikecatstr = window.showModalDialog("SetPrint.htm","","dialogWidth:300px;dialogHeight:229px;help:no;status:no;scrollbar:no");
        
        if(mikecatstr!=""&&mikecatstr!=null)
        __doPostBack('btnPrint',mikecatstr);
       
	}
	else if(eventArgument == 'tb=excel')//����Excel
	{
        __doPostBack('btnExcel','');
	}
	else if(eventArgument == 'tb=pdf')//����pdf
	{
        __doPostBack('btnPdf','');
	}
	else if(eventArgument == 'tb=refresh')//ˢ�±���
	{
        __doPostBack('btnRefresh','');
	}
	else if(eventArgument == 'tb=close')//�ر�
	{
        __doPostBack('btnClose','');
	} 
	else if (eventArgument == 'tb=editonline')
	{
		// �༭
		__doPostBack('btnEditOnline','');
	}   
	else if (eventArgument == 'tb=resetorder')
	{
		// ����
		__doPostBack('btnResetOrder','');
	}  
}

var divTop ;//��ʼ�����λ��
var img;//��ʼ��ͼƬ
var toolbarExpandState = 0;//������չ��״̬��Ĭ��չ��
var timeoutT = 0;
var expanded = 0;//ȷ����ʾ

try
{
	
	if(toolbarMouseEvent == 1 && tool == "")
	{
		divTop = '-1';
		img = 'js/toolbar/img/tuding_07.gif';
		toolbarExpandState = 1;
		expanded = 1;
		setFilterBarPosition(31);
	}
	else
	{
		if(tool == '1')
		{
			divTop = '-1';
			img = 'js/toolbar/img/tuding_07.gif';
			toolbarExpandState = 1;
			expanded = 1;
			setFilterBarPosition(31);
		}
		else
		{
			/* ����ʾ������ */
			divTop = '-31';
			img = 'js/toolbar/img/tuding_05.gif';
			toolbarExpandState = 0;
			expanded = 0;
			setFilterBarPosition(0);
		}
	}
}
catch(e)
{
	divTop = '-31';
	img = 'js/toolbar/img/tuding_05.gif';
	toolbarExpandState = 0;
	expanded = 0;
}

/* ������Ϊ2ʱ:disable  �����й�������ʾ*/
if (toolbarMouseEvent != 2)
{
	strToolbar+="<div id='cridfulltoolbar' onMouseenter='mouseEnter();inMenu();' onMouseLeave='mouseLeave();closeBoxDelay();' name='cridfulltoolbar' style='top:"+divTop+"px;left:0.0px;height:32px;position:absolute;z-index:99999'>";
	strToolbar+='<table id="tbl_btn" style="width:100%;" class="crtoolbar" cellspacing=1 cellpadding=0 border=0>';
	strToolbar+="<tbody><tr nowrap id=trtoolbar ><td nowrap width='26.0px' height='27px'>&nbsp;</td>";
	
	// �༭����
	strToolbar+="<td nowrap valign=center><a name=\"editonline\" id=\"editonline\" href=\"javascript:align('left_align')\" class=clink title='�����'>";
	strToolbar+= '<img border=0 name="editImage" id="editImage"  src="js/toolbar/img/left_align.gif" align=center ';
	strToolbar+="   ><span class=cforbar align=absMiddle>&nbsp;�����</span></a></td>";
	// ������������
	strToolbar+="<td nowrap valign=center><a name=\"resetorder\" id=\"resetorder\" href=\"javascript:align('right_align')\" class=clink title='�Ҷ���'>";
	strToolbar+= '<img border=0 name="orderImage" id="orderImage"  src="js/toolbar/img/right_align.gif" align=center ';
	strToolbar+="   ><span class=cforbar>&nbsp;�Ҷ���</span></a></td>";


	// �ָ���
	

	strToolbar+="<td nowrap valign=center><a name='outputexcel' id='outputexcel' href=\"javascript:align('vertical_align')\" class=clink title='���ж���'>";
	strToolbar+='<img border=0 name="outputexcelImage" id="outputexcelImage"  src="js/toolbar/img/vertical_align.gif" alt="���ж���"  align=center ';
	strToolbar+=" ><span class=cforbar>&nbsp;���ж���</span></a></td>";
    
    strToolbar+='<td valign=center>&nbsp;<img border=0 src="js/toolbar/img/separator.gif" >&nbsp;</td>'
	strToolbar+="<td nowrap valign=center><a name='outputpdf' id='outputpdf' href=\"javascript:align('top_align') \" class=clink title='���˶���' >";
	strToolbar+='<img border=0 name="outputpdfImage" id="outputpdfImage" src="js/toolbar/img/top_align.gif" alt="���"  align=center ';
	strToolbar+=" ><span class=cforbar>&nbsp;���˶���</span></a></td>";
	
	strToolbar+="<td nowrap valign=center><a name='outputpdf' id='outputpdf' href=\"javascript:align('middle_align')\" class=clink title='�м����' >";
	strToolbar+='<img border=0 name="outputpdfImage" id="outputpdfImage" src="js/toolbar/img/middle_align.gif" alt="�м����"  align=center ';
	strToolbar+=" ><span class=cforbar>&nbsp;�м����</span></a></td>";

	// �ָ���
	strToolbar+="<td nowrap valign=center><a name='refresh' id='refresh' href=\"javascript:align('bottom_align')\" class=clink title=�ײ����� >";
	strToolbar+='<img border=0 name="refreshImage" id="refreshImage"  src="js/toolbar/img/bottom_align.gif" alt="�ײ�����"  align=center  ';
	strToolbar+=" ><span class=cforbar>&nbsp;�ײ�����</span></a></td>";


	strToolbar+='<td nowrap width="2.0px"><img onclick="openBox(this)" src="js/toolbar/img/showbox.gif" style="display:none;"></td><td nowrap width="100%"></td>';
	strToolbar+='</tr></tbody></table>';
	//���һ���㣬������ToolBar�������

	strToolbar+="<div id='divScroll' onMousedown='divScrollMouseDown()' onMouseup='divScrollMouseUp()' name='divScroll' style='top:-1px;left:0.0px;width:28px;position:absolute;DISPLAY:block;z-index:100000'>";
	strToolbar+='<table align="right" border="0" cellpadding="1" cellspacing="1" bgcolor="#E4E4EC"><tr nowrap valign=middle>';
	strToolbar+="<td nowrap valign=bottom align=right><img border=0 onclick='toolbarExpand()' name='dock' id='dock'   src='"+img+"' title='չ��/����' onmouseenter='imageEnter()' onmouseleave='imageLeave()' style='cursor:hand;'/></td>";
	strToolbar+='</tr></table>';
	strToolbar+='</div></div><div id="divMenu" style="position:absolute;DISPLAY:none;z-index:9001;" onMouseLeave="closeBoxDelay();" onmouseenter="inMenu();"></div>';

	
}


var pageBtnState = '111111';
function initToolBar()
{
	/* δ���ù�����ʱ�����Բ����г�ʼ�� maxian */
	if (strToolbar == "")
	{
		return;
	}
	document.getElementById('divToolbar').innerHTML = strToolbar;
	
}
//���ⷭҳ��iframe��չ���Ĺ�������
function adjustTableMain()
{
	var div = document.getElementById('cridfulltoolbar');
	var table = document.getElementById('tableMain');
	if(divTop == '-1' && table.height==1)
	{
		table.height = 31;
	}
}

//��ʾ�����ع�����
function toolbarExpand()
{
	clearTimeout(timeoutT);
	var table = document.getElementById('tableMain');
	var div = document.getElementById('cridfulltoolbar');
	var toolbarState = document.getElementById('toolbar');//����״̬�Ŀؼ�
	var toolbarCurLeft=GetOffsetLocation(div).offsetLeft;
	var objP = getToobarPosi();
    if(expanded == 0)
    {
        toolbarSetPace(toolbarCurLeft, objP.y-1, 5);
        setFilterBarPosition(objP.y + 31);
        toolbarExpandState = 1;
        expanded = 1;
        document.dock.src = 'js/toolbar/img/tuding_07.gif';
        try
        {
			table.height = div.clientHeight;//Ϊ���Եø����ա�
			toolbarState.value = '1';
			getToolBar();
        }
        catch(e)
        {}
    }
    else
    {
        toolbarSetPace(toolbarCurLeft, objP.y - 31, 5); 
        setFilterBarPosition(objP.y + 0);
        toolbarExpandState = 0;
        expanded = 0;
        document.dock.src = 'js/toolbar/img/tuding_05.gif';
        try
        {
			table.height = '1';
			toolbarState.value = '0';
			getToolBar();
        }
        catch(e)
        {}
    }
}
function setFilterBarPosition(y,ix)
{
	try
	{	
		 if(pfmaster != null)
		 {
			var x = (ix == null?pfmaster.curLeft:ix);
			setPace('pfmaster',x ,y, 1);
		 }
	}
	catch(err){}
}
function mouseEnter()
{
	clearTimeout(timeoutT);
	if(toolbarExpandState == 0 && expanded == 0)
	{
		var objP = getToobarPosi();
		var toolbarCurLeft = objP.x;
		var toolbarCurTop = objP.y;
		toolbarSetPace(toolbarCurLeft, toolbarCurTop-1, 5);
		toolbarExpandState = 1;
	}
}

function mouseClose()
{
	if(document.getElementById('divMenu').style.display=="none")
	{
		if(toolbarExpandState == 1 && expanded == 0)
		{
			var div = document.getElementById('cridfulltoolbar');
			var objP = GetOffsetLocation(div);
			var toolbarCurLeft=objP.offsetLeft; 
			var toolbarCurTop = objP.offsetTop;
			toolbarSetPace(toolbarCurLeft, toolbarCurTop-30, 5); 
			toolbarExpandState = 0;
			setCookie("toobarswitch","0");
		}
	}
}

function mouseLeave()
{
	timeoutT = setTimeout('mouseClose()',1000);
	//��ӹ������ƶ��¼�
}

function imageEnter()
{
	if(expanded == 0)
	{
        document.dock.src = 'js/toolbar/img/tuding_03.gif';
	}
}

function imageLeave()
{
	if(expanded == 0)
	{
        document.dock.src = 'js/toolbar/img/tuding_05.gif';
	}
}

function toolbarMoveAlong(paceLeft, paceTop, fromLeft, fromTop)
{
    var toolbarmaster = document.getElementById('cridfulltoolbar');
	clearTimeout(toolbarmaster.timer);
	
	var left = toolbarmaster.style.left;
	left = left.replace("px","");
	left = parseInt(left,10);
	
	var top = toolbarmaster.style.top;
	top = top.replace("px","");
	top = parseInt(top,10);
	
	if(left != fromLeft)
	{
		if((Math.max(left, fromLeft) - Math.min(left, fromLeft)) < paceLeft)
		{
		    left = fromLeft;
		}
		else if(left < fromLeft)
		{
		    left = left + paceLeft;
		}
		else if(left > fromLeft)
		{
		    left = left - paceLeft;
		}
		
	}
	if(top != fromTop)
	{
        if((Math.max(top, fromTop) - Math.min(top, fromTop)) < paceTop)
        {
            top = fromTop;
        }
		else if(top < fromTop)
		{
		    top = top + paceTop;
		}
		else if(top > fromTop)
		{
		    top = top - paceTop;
		}
		
	}
	
    toolbarmaster.style.left = left+'px';
    toolbarmaster.style.top = top+'px';
	toolbarmaster.timer=setTimeout('toolbarMoveAlong('+paceLeft+','+paceTop+','+fromLeft+','+fromTop+')',30);
}

function toolbarSetPace(fromLeft, fromTop, motionSpeed)
{
	if (document.getElementById('cridfulltoolbar') == null)
	{
		return;
	}
	var toolbarmaster = document.getElementById('cridfulltoolbar');
	
	var left = toolbarmaster.style.left;
	left = left.replace("px","");
	left = parseInt(left,10);
	var gapLeft = (Math.max(left, fromLeft) - Math.min(left, fromLeft))/motionSpeed;
	var top = toolbarmaster.style.top;
	top = top.replace("px","");
	top = parseInt(top,10);
	var gapTop = (Math.max(top, fromTop) - Math.min(top, fromTop))/motionSpeed;
	toolbarMoveAlong( gapLeft, gapTop, fromLeft, fromTop);
}
function menuMoveAlong(paceLeft, paceTop, fromLeft, fromTop)
{
    var menumaster = document.getElementById('divMenu');
	clearTimeout(menumaster.timer);
	
	var left = menumaster.style.left;
	left = left.replace("px","");
	left = parseInt(left,10);
	
	var top = menumaster.style.top;
	top = top.replace("px","");
	top = parseInt(top,10);
	
	if(left != fromLeft)
	{
		if((Math.max(left, fromLeft) - Math.min(left, fromLeft)) < paceLeft)
		{
		    left = fromLeft;
		}
		else if(left < fromLeft)
		{
		    left = left + paceLeft;
		}
		else if(left > fromLeft)
		{
		    left = left - paceLeft;
		}
	}
	if(top != fromTop)
	{
        if((Math.max(top, fromTop) - Math.min(top, fromTop)) < paceTop)
        {
            top = fromTop;
        }
		else if(top < fromTop)
		{
		    top = top + paceTop;
		}
		else if(top > fromTop)
		{
		    top = top - paceTop;
		}
	}
    menumaster.style.left = left+'px';
    menumaster.style.top = top+'px';
	menumaster.timer=setTimeout('menuMoveAlong('+paceLeft+','+paceTop+','+fromLeft+','+fromTop+')',30);
}
function menurSetPace(fromLeft, fromTop, motionSpeed)
{
	var menumaster = document.getElementById('divMenu');
	if(menumaster.style.display=="none")
	{
		return;
	}
	var left = menumaster.style.left;
	left = left.replace("px","");
	left = parseInt(left,10);
	var gapLeft = (Math.max(left, fromLeft) - Math.min(left, fromLeft))/motionSpeed;
	var top = menumaster.style.top;
	top = top.replace("px","");
	top = parseInt(top,10);
	var gapTop = (Math.max(top, fromTop) - Math.min(top, fromTop))/motionSpeed;
	toolbarMoveAlong( gapLeft, gapTop, fromLeft, fromTop);
}
//******************������λ��********************
function mouseMove(ev)
{
	ev= ev || window.event;
	var mousePos = mouseCoords(ev);
	
	//�빤�������
	if(mousePos.y <= 0)
	{
		try
		{
			mouseEnter();
		}
		catch(e)
		{
		}
	}
}

function mouseCoords(ev)
{
	if(ev.pageX || ev.pageY)
	{
		return {x:ev.pageX, y:ev.pageY};
	}
	return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,	
			y:ev.clientY + document.body.scrollTop  - document.body.clientTop};
}

document.onmousemove = mouseMove;

function getToolBar()
{
	try
	{
		var obj = document.getElementById('toolbar');
		tool = obj.value;
	}
	catch(e)
	{
	}
}
function setDivScrollPosition(l)
{
	var visibaleWidth=document.body.offsetWidth-46;
	var obj=document.getElementById('divScroll');
	if(isNaN(l))
	{
		obj.style.left=visibaleWidth+'px';
	}
	else
	{
		obj.style.left=l+GetOffsetLocation(obj).offsetLeft;
	}
}
function getDivScrollLeftestPosition()
{
	var leftest=970-document.body.clientWidth;
	return leftest;
}
function GetAbsoluteLocation(element)
{
	if(arguments.length!=1||element==null)
	{
		return null;
	}
	var offsetTop   =element.offsetTop;
	var offsetLeft  =element.offsetLeft;
	var offsetWidth =element.offsetWidth;
	var offsetHeight=element.offsetHeight;
	while(element=element.offsetParent)
	{
		offsetTop+=element.offsetTop;
		offsetLeft+=element.offsetLeft;
	}
	return {absoluteTop: offsetTop,
			absoluteLeft:offsetLeft,
			offsetWidth: offsetWidth,
			offsetHeight:offsetHeight};
}
function GetOffsetLocation(element)
{
	if(arguments.length!=1||element==null)
	{
		return null;
	}
	var offsetTop   =element.offsetTop;
	var offsetLeft  =element.offsetLeft;
	var offsetWidth =element.offsetWidth;
	var offsetHeight=element.offsetHeight;
	
	return {offsetTop: offsetTop,
			offsetLeft:offsetLeft,
			offsetWidth: offsetWidth,
			offsetHeight:offsetHeight};
}
function getPs(o)
{
	var obj = GetAbsoluteLocation(o);
	return obj.absoluteLeft+obj.offsetWidth;
}
function divScrollMouseDown()
{}
function divScrollMouseUp()
{}
function LeftMouseDown()
{
	var t=document.getElementById('cridfulltoolbar');
	iToolbarWidth=GetOffsetLocation(t).offsetWidth;
	l=t.style.left;
	l=l.replace('px','');
	l=parseInt(l);
	if(l<-getDivScrollLeftestPosition())
	{
		myClearTime();
		return;
	}
	t.style.left=(l-100)+'px';
	setDivScrollPosition(100);
	try
	{
		
		if(timerID!=null)
			myClearTime();
		timerID=window.setTimeout("LeftMouseDown()",300);
	}
	catch(e)
	{}
}
function RightMouseDown()
{
	var t=document.getElementById('cridfulltoolbar');
	l=t.style.left;
	l=l.replace('px','');
	l=parseInt(l);
	l=l+100;
	if(l>0)
	{
		myClearTime();
		return;
	}
	t.style.left=l+'px';
	setDivScrollPosition(-100);
	try
	{
		if(timerID!=null)
			myClearTime();
		timerID=window.setTimeout("RightMouseDown()",300);
	}
	catch(e){}
}
function myClearTime()
{
	try
	{
		window.clearTimeout(timerID);
	}
	catch(e)
	{
	}
}
function scrollClick()
{}
var objTr;
var btnBox = new Array();
function inputBox()
{
	if(objTr.children.length <5)
	{
		return;
	}
	objTr.children[objTr.children.length-2].children[0].style.display='block';
	var index = objTr.children.length-3;
	var str = objTr.children[index].innerHTML;
	btnBox.push(str);
	objTr.deleteCell(index);
}
function outputBox()
{
	if(btnBox.length==0)
	{
		return;
	}
	var str = btnBox.pop();
	var c = objTr.insertCell(objTr.children.length-2);
	c.innerHTML = str;
	if(btnBox.length == 0)
	{
		objTr.children[objTr.children.length-2].children[0].style.display='none';
	}
}
function openBox(o)
{
	var tbOpen = '<table width=132px cellspacing=0 style="BORDER-BOTTOM:black 1px solid" cellpadding=0 border=0><tr colspan=3><td background=black></td></tr>';
	var tbClose = '</table>';
	var menuText ='';
	for(var c=btnBox.length-1;c>-1;c--)
	{
		if(btnBox[c].indexOf("separator.gif") > -1)
		{
			continue;
		}
		menuText +="<tr onmouseover='trMenu(this,1)' onmouseout='trMenu(this,2)' class=ctdmenuo ><td width=1px bgcolor='black'><td>" 
		+ btnBox[c].replace(/onMouseO/g,'').replace(/onmouseo/i,'').replace('cforbar','cformenu').replace(/\/btn_/g,'/_btn_')
		+"<td width=1px bgcolor=black></td></tr>";
	}
	var menuDiv = document.getElementById('divMenu');
	
	var div = document.getElementById('cridfulltoolbar');
	var objP = GetOffsetLocation(div);
	
	menuDiv.style.left=(event.clientX-110 + objP.offsetLeft) +'px';
	menuDiv.style.top=(o.offsetTop+o.offsetHeight+2 + objP.offsetTop) + 'px';
	menuDiv.style.display="block";
	menuDiv.innerHTML = tbOpen + menuText + tbClose;
	
	if(document.body.clientHeight < menuDiv.offsetHeight)
	{
		var h = document.body.clientHeight;
		var upDiv = '<div onmouseenter="onHMenuUp(this)" onMouseLeave="onHStop(this)" style="width:132px;height:15px;position:absolute;z-index:10001;">'+
			'<table width=100% bgcolor="#e4e4ec"  style="cursor:hand;BORDER-left:black 1px solid;border-right:black 1px solid;border-bottom:inset 1px '+'#B6BDD2'+'"><tr><td style="line-height:12px;background-repeat:no-repeat;background-position:center;"'+
			' background="js/toolbar/img/menu_up.gif" width=100% >&nbsp;</td></tr></table></div>'+
			'<div id=menuct style="height:'+((h-76)<0?66:(h-50))+'px;position:absolute;z-index:9100;OVERFLOW-Y: hidden;">';
		
		var downDiv = '</div><div onmouseenter="onHMenuDown(this)" onMouseLeave="onHStop(this)" style="top:'+((h-76)<0?60:(h-54))
			+'px;position:absolute;z-index:10001;width:132px;height:12px;cursor:hand;">'+
			'<table width=100% bgcolor="#e4e4ec"  style="BORDER-bottom:black 1px solid;BORDER-left:black 1px solid;border-right:black 1px solid;border-top:1px solid '+'#B6BDD2'+'"><tr><td style="line-height:12px;background-repeat:no-repeat;background-position:center;"'+
			' background="js/toolbar/img/menu_dn.gif" width=100% >&nbsp;</td></tr></table></div>';
		menuDiv.innerHTML = upDiv + tbOpen +
			"<tr bgcolor=black><td colspan=3 style='ling-height:12px'>&nbsp;</td></tr>"+ 
			menuText + "<tr bgcolor='#e4e4ec'><td bgcolor=black><td height=22px><td bgcolor=black></tr>"+ 
			tbClose + downDiv ;
	}
	
}
var HMenuTime;

function onHMenuUp()
{
	
	var obj = document.getElementById('menuct');
	if(obj.scrollTop>10)
	{
		obj.scrollTop-=10;
	}
	else if(obj.scrollTop > 0)
	{
		obj.scrollTop=0;
	}
	else
	{
		return;
	}
	HMenuTime = setTimeout("onHMenuUp()",300);
}
function onHMenuDown()
{
	var obj = document.getElementById('menuct');
	var h = obj.scrollHeight-obj.clientHeight;
	if(h>10)
	{
		obj.scrollTop+=10;
	}
	else if(h>0)
	{
		return;
	}
	HMenuTime = setTimeout("onHMenuDown()",300);
}
function onHStop()
{
	if(HMenuTime);
	{
		clearTimeout(HMenuTime);
	}
}
function trMenu(o,p)
{
	if(p==1)
	{
		o.className="ctdmenuh";
	}
	else if(p==2)
	{
		o.className = "ctdmenuo";
	}
}
function closeBox()
{
	document.getElementById('divMenu').style.display="none";
	flagInMenu = false;
	mouseClose();
}
var flagInMenu = false;
function closeBoxDelay()
{
	flagInMenu = false;
	setTimeout("mayCloseBox()",1000);
}
function mayCloseBox()
{
	if(!flagInMenu)
	{
		closeBox();
	}
}
function inMenu()
{
	flagInMenu = true;
}
var arrP;
var arrV;
var objTblBtn;
var objTds;
var pLen;
function initButtonMenu()
{
	arrP = new Array();
	arrV = new Array();
	
	/* δ���ù�����ʱ�����Բ����г�ʼ�� maxian */
	if (strToolbar == "")
	{
		return;
	}
	objTr = document.getElementById('trtoolbar');
	objTblBtn = document.getElementById('tbl_btn');
	objTds = objTblBtn.rows[0].children;
	for(var i = 0;i<objTds.length-2;i++)
	{
		arrP.push(getPs(objTds[i]));
		arrV.push(true);
	}
	arrP.push(arrP[arrP.length-1]+20);
	arrV.push(true);
	arrP.push(2000);
	pLen = arrP.length-1;
}
function autoHidden()
{
	w = document.body.clientWidth;
	var b = true;
	for(var c=0;c<pLen;c++)
	{
		if(arrV[c] && w >= arrP[c] && w <arrP[c+1])
		{
			initArrV(c+1,true);
			hiddenBtn(c+1);
			hiddenSpar(c);
			b=false;
			break;
		}
	}
	if(b && w <arrP[pLen])
	{
		for(var c=pLen-1;c>-1;c--)
		{
			if(!arrV[c] && w >= arrP[c] && w <arrP[c+1])
			{
				initArrV(c+1,true);
				hiddenBtn(c+1);
				hiddenSpar(c);
				b=false;
				break;
			}
		}
	}
}
function hiddenSpar(c)
{
}
function initArrV(count,bool)
{
	var i = 0;
	for(;i<count&&i<arrV.length;i++)
	{
		arrV[i] = bool;
	}
	for(;i<arrV.length;i++)
	{
		arrV[i] = !bool;
	}
}
function hiddenBtn(count)
{
	while(btnBox.length>0)
	{
		outputBox();
	}
	for(var bc=pLen-count;bc>0;bc--)
	{
		inputBox();
	}
	
}
function CheckBtnBox()
{
	autoHidden();
	setTimeout("CheckBtnBox()",500);
}
function onToolbarScroll(px,py)
{
	var x = (px==null?document.body.scrollLeft:px);
	var y = (py==null?document.body.scrollTop:py);
	if(expanded == 1)//��������ʾ
	{
		toolbarSetPace(x, --y, 1);
	}
	else
	{
		y-=31;
		toolbarSetPace(x, y, 1);
	}
	var w = document.body.clientWidth;
	if (document.getElementById('cridfulltoolbar') != null)
	{
		document.getElementById('cridfulltoolbar').style.width=w;
	}
}
//����������ʱ�������λ��
function getToobarPosi()
{
	//
	//var objP = GetOffsetLocation(div);
	var toolbarCurLeft=document.body.scrollLeft;//objP.offsetLeft;
	var toolbarCurTop =document.body.scrollTop;
	return new function (){this.x=toolbarCurLeft;this.y=toolbarCurTop;};
}
/* ��ֹ���ع�����ʱ��ͼƬû������������ */
var btnMenuLoadCount = 0;
var btnMenuLoadHandle = null;
function onButtonMenuLoad()
{
	if(btnMenuLoadCount > 20)
	{
		btnMenuLoadHandle = null;
		CheckBtnBox();
		return;
	}
	if(document.readyState !='complete')
	{
		btnMenuLoadCount++;
		btnMenuLoadHandle = setTimeout("onButtonMenuLoad()",500);
		return;
	}
	CheckBtnBox();
}