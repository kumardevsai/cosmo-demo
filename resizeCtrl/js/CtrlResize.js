
CtrlSize.lastId = 0; // ���ڱ��û��id�Ŀؼ����������ͼƬ
CtrlSize.arrayctrl = new Array();  // ���ڴ��ѡ�еĿؼ�������
CtrlSize.ctrlsindex = 0;           // ѡ�пؼ���������±�
// �ı�ؼ���С����
// Ctrl: ��ҳ��onmousedown�Ŀؼ�
function CtrlSize(Ctrl)
{   
  	if(Ctrl.tagName == 'TD')  Ctrl = Ctrl.parentNode.parentNode.parentNode.parentNode; 
    if(Ctrl.id != '')  this.id = Ctrl.id;  // ����ǰ�ؼ���id��ֵ����ǰ����
	else { this.id = 'ctrl' + CtrlSize.lastId ++; Ctrl.id = this.id;} // ����ؼ�û��id��������id   
	CtrlSize.ctrlsindex ++;
    this.left = Ctrl.offsetLeft;  
	this.width = Ctrl.offsetWidth;
	this.top = Ctrl.offsetTop;
	this.height = Ctrl.offsetHeight;
	
	// ѡ�пؼ�
	this.selectCtrl = function()
	{   
		var imgObj =  'imgObj0_' + this.id; // ��ǰ�ؼ��Ϻ����ͼƬ��id
		// �����1������ؼ���ͼƬ������; 2��ѡ��Ĳ�����ק��С��ͼƬ
		if(!document.getElementById(imgObj) && Ctrl.id.indexOf('imgObj') == -1)
		{   
		    var tag = false; // �ؼ��Ƿ�Ϊselect����size==0 �ı��; false:��������Ϊ��
		    // ���Ϊselect ��������� size=0 ʱ������ ���ݺ�������קͼƬ
		    if (Ctrl.tagName == 'SELECT') {
		       if (Ctrl.size == 0) {
		         tag = true;
		       }
		    }
		    this.addImg(0); // ��Ӻ��ϵ�ͼƬ
		    if (tag == false) {
				this.addImg(1); // ��Ӻ����������϶���ͼƬ
				this.addImg(2); // �����������϶���ͼƬ
		    }
		    CtrlSize.arrayctrl[CtrlSize.ctrlsindex] = Ctrl; // ��ѡ�еĿؼ�����CtrlSize.arrayctrl����
		}
	}
	
	// ���ͼƬ
	// index: Ϊ�������򡢺���ͼƬ�ı��
	this.addImg = function(index)
	{   
	    imgObjid = 'imgObj' + index + '_' + this.id; // ͼƬ��id
	    // ���ͼƬname����Ϊ�ؼ���id��������տؼ�ʱͨ���ؼ�id�������ͼƬ
		var imgObj = document.createElement("<img id ='"+ imgObjid +"' name ='"+ Ctrl.id +"' src='images/dot.bmp'>");
		imgObj.style.height = "7px"; 
		imgObj.style.width  = '7px';
		imgObj.style.zIndex = '2';
		if(index == 0) //���ú����϶�ͼƬ��left��top�������ʽ
		{   
			imgObj.style.left = this.left + this.width+"px";
			imgObj.style.top =  this.top + this.height/2 +"px";
			imgObj.style.cursor = 'w-resize';
		}
		else if(index == 1) //���ú������϶�ͼƬ��left��top�������ʽ
		{
			imgObj.style.left = this.left + this.width+"px";
			imgObj.style.top =  this.top + this.height+"px";
			imgObj.style.cursor = 'nw-resize';
		}
		else // ���������϶�ͼƬ��left��top�������ʽ
		{
			imgObj.style.left = this.left + this.width/2 + "px";
			imgObj.style.top =  this.top + this.height +"px";
			imgObj.style.cursor = 'n-resize';
		}
		imgObj.style.position = "absolute"; // ����ͼƬ�Ķ�λ
		imgObj.style.display = "block"; 
		document.body.appendChild(imgObj); // ���ͼƬ
	}
	
	// �ؼ��ƶ�ʱ����ͼƬ��λ�û���ͼƬ�ƶ�ʱ�ı�ؼ��Ĵ�С
	// moveCtrl���϶��Ŀؼ��������ƶ���ͼƬ
	this.ctrlMove = function(moveCtrl)
	{   
	    // moveCtrl: �ؼ�
		if(moveCtrl.id.indexOf('imgObj') == -1)
		{	
			resetImgPos(0, moveCtrl); // ���ú���ͼƬ��λ��
			resetImgPos(1, moveCtrl); // ���ú���ͼƬ��λ��
			resetImgPos(2, moveCtrl); // ��������ͼƬ��λ��
		}
		// moveCtrl: �ı�ؼ���С��ͼƬ
		else
		{   
		   controlResize(moveCtrl);
		}
	}
	
	// ���ҳ�������ĵط����ؼ����ѡ��
	document.body.onclick = function()
	{  
	    if(event.srcElement.id == 'div1')
	    {
			clear(div1);     // ���ѡ�еĿؼ�
			Ctrl = null; // �������Ctrl ����Ϊ�� 
		}
	}
	
	// ����ؼ�ʱҳ�������Ŀؼ�ȡ��ѡ��
	this.clearSelected = function()
	{   
		clear(this);
	}
	
	// ��յ�ǰ���еĿؼ�
	this.clearSelf = function(obj)
	{   
		if(obj.tagName == 'TD')  obj = obj.parentNode.parentNode.parentNode.parentNode; // ����ؼ�Ϊtable�Ļ�������ѡ�е���td����ʱobjΪtd��table
		if(obj.tagName == 'DIV' && obj.innerHTML == '�����϶�') obj = obj.parentNode; // �������Ϊifame
		var img = document.getElementsByName(obj.id);
		for(var i = 0; i<img.length; i++)
		{   
			// ����ؼ��Ѿ�ѡ��
			if (img[1].id.indexOf('imgObj0_') != -1) 
			{
				for(var j = img.length-1; j>= 1; j--)
				{
					if (img[j].id.indexOf('imgObj') != -1)
					{
						img[j].parentNode.removeChild(img[j]);
					}
				}
			}
		}
		// ���������Ǹ��ؼ�����Ϊnull
		for(var j = 0; j < CtrlSize.arrayctrl.length; j++)
		{   
			if (CtrlSize.arrayctrl[j] != undefined && CtrlSize.arrayctrl[j] != '') {
				if (obj.id == CtrlSize.arrayctrl[j].id) {
					CtrlSize.arrayctrl[j] = null;
				}
			}
		}
	}
}
// �ؼ����ѡ��
// obj: ��ǰ���õĶ���
function clear(obj)
{   
	if (obj) 
	{
	if(obj.tagName == 'TD')  obj = obj.parentNode.parentNode.parentNode; // ����ؼ�Ϊtable�Ļ�������ѡ�е���td����ʱobjΪtd��table
	if(obj.tagName == 'DIV' && obj.innerHTML == '�����϶�') obj = obj.parentNode; // �������Ϊifame
	var allobjs = document.all;
    if(obj.id.indexOf('imgObj') == -1) // ��������ǿؼ�
	{   
		for(var i = 0; i<allobjs.length; i++)
		{  
			// ��Ŀ��ؼ��ͱ����Ŀؼ���id�����ʱ�����Ǹ��ؼ��Ƿ�ѡ�У����ѡ�������ѡ��״̬
			if(allobjs[i].id != obj.id && allobjs[i] != null && allobjs[i] != undefined) 
			{
				// �ҵ����м�_�ؼ����Ŀؼ�
				if(allobjs[i].id != '' && allobjs[i].id != undefined && allobjs[i].id != '')
				{   
					var array = document.getElementsByName(allobjs[i].id); // �õ�ͼƬname��ؼ�id��ͬ�ĵ�ͼƬ�ļ���
					//����3��ͼƬɾ����
					var tag = 0; // �Ƿ�ɾ����allobjs[i] �ı�ǣ�����ɾ��CtrlSize.arrayctrl���Ԫ��
					for(var j = array.length-1; j >= 0; j--)
					{
						var temp = '_'+allobjs[i].id; 
						if(array[j].id.indexOf(temp) != -1) // ɾ��ͼƬ
						{  
							array[j].parentNode.removeChild(array[j]);
							tag = 1;
						}
					}
					if (tag == 1) {
						for(var j = 0; j < CtrlSize.arrayctrl.length; j++)
						{   
							if (CtrlSize.arrayctrl[j] != undefined && CtrlSize.arrayctrl[j] != '') {
								if (allobjs[i].id == CtrlSize.arrayctrl[j].id) {
									CtrlSize.arrayctrl[j] = null;
								}
							}
						}
					}	
				}
			}
		}
	    }
    }
}
// ���ݴ���Ŀؼ��ı�ͼƬ��λ��
// index: ����ͼƬ�ı��
// resizeCtrl: ����Ŀؼ�
function  resetImgPos(index, resizeCtrl)
{  
	if(resizeCtrl.id.indexOf('imgObj') == -1)
	{  
		var imgobjid = 'imgObj'+ index+"_" + resizeCtrl.id; // �õ��ؼ���Ӧ��index��ǵ�ͼƬ��id
		var imgObj = document.getElementById(imgobjid); // �õ�ͼƬ
		var left = resizeCtrl.offsetLeft; 
		var width = resizeCtrl.offsetWidth;
		var top = resizeCtrl.offsetTop;
		var height = resizeCtrl.offsetHeight;
		if (imgObj != null && imgObj != undefined && imgObj != '') {
			if(index == 0) // �������ͼƬ��λ��
			{   
				imgObj.style.left = left + width+"px";
				imgObj.style.top =  top + height/2+"px";
			}
			else if(index == 1) // �������ͼƬ��λ��
			{
				imgObj.style.left = left + width+"px";
				imgObj.style.top = top + height + "px";	
			}
			else // ��������ͼƬ��λ��
			{   
				imgObj.style.left = left + width/2 + "px";
				imgObj.style.top =  top + height+"px";
			}
		}
	}		
}

// ͼƬmoveingʱ�����ؼ��Ĵ�С������ͼƬλ�÷����仯
// imgobj: �϶���С��ͼƬ
function controlResize(imgobj)
{   
	var resizeobjid = '';
	var resizeobj = null;
	if(imgobj.id.indexOf('imgObj0_')!= -1)  // �����϶�
	{   
	    resizeobjid =  imgobj.id.replace('imgObj0_','');
	    resizeobj = document.getElementById(resizeobjid);
	    imgSet(resizeobj); 
	    if(imgobj.offsetLeft - resizeobj.offsetLeft>0)  // ����Ҫ�ı�Ŀؼ��Ŀ�ȴ���0
		{   
		    var tem = false;
		    if(resizeobj.childNodes.length == 2) // ���ñ�������iframe��������div�Ŀ��
		    {  
		        if (resizeobj.childNodes[1].tagName == 'TABLE' || resizeobj.childNodes[1].tagName == 'IFRAME') {
					controlWidthSet(resizeobj.childNodes[1],resizeobj,imgobj); 
					tem = true;
					 }
			    if (resizeobj.childNodes[0].data == '[����Div�������]') // ����div����Ŀ��
			    {
			        controlWidthSet(resizeobj,resizeobj,imgobj); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3) // �������ݱ�Ŀ��
		    {  
				controlWidthSet(resizeobj.childNodes[2],resizeobj,imgobj); 
				tem = true;
		    }
		    else //��ͨ�ؼ�
		    {
			   if (tem == false) {
			        controlWidthSet(resizeobj,resizeobj,imgobj); 
			   }
			}
		}
		else // ���С��0�ˣ���ͼƬ���϶�
		{   
			imgobj.style.left =  resizeobj.offsetLeft + resizeobj.offsetWidth+"px"; 
		}
	    resetImgPos(1, resizeobj); // �ı����ͼƬ��λ��
		resetImgPos(2, resizeobj); // �ı�����ͼƬ��λ��
	}
	if(imgobj.id.indexOf('imgObj1_') != -1) // �����϶�
	{   
	    resizeobjid =  imgobj.id.replace('imgObj1_','');
	    resizeobj = document.getElementById(resizeobjid);
	    imgSet(resizeobj);
	    if(imgobj.offsetLeft - resizeobj.offsetLeft >0) // ����
		{   
			var tem = false;
			if(resizeobj.childNodes.length == 2)  // ���ò��ֱ�������iframe�Ŀ��
		    {   
		        if (resizeobj.childNodes[1].tagName == 'TABLE' || resizeobj.childNodes[1].tagName == 'IFRAME') {
					controlWidthSet(resizeobj.childNodes[1],resizeobj,imgobj);
					tem = true;
				}
				if (resizeobj.childNodes[0].data == '[����Div�������]') // ����div����Ŀ��
				{
			        controlWidthSet(resizeobj,resizeobj,imgobj); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3) // �������ݱ�Ŀ��
		    {  
				controlWidthSet(resizeobj.childNodes[2],resizeobj,imgobj); 
				tem = true;
		    }
		    else // ��ͨ�ؼ�
		    {
			    if (tem == false) {
			     controlWidthSet(resizeobj,resizeobj,imgobj); 
			    }
			}
		}
		else 
		{
			imgobj.style.left =  resizeobj.offsetLeft + resizeobj.offsetWidth+"px";
		}
		if(imgobj.offsetTop - resizeobj.offsetTop>0) // ����
		{   
		    var tem = false;
			if(resizeobj.childNodes.length == 2) // �������ݱ�ĸ߶�
		    {  
		        if(resizeobj.childNodes[1].tagName == 'TABLE') 
		        {     
					 controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,1);
					 tem = true;
				}
				if(resizeobj.childNodes[1].tagName == 'IFRAME') // ����iframe�ĸ߶�
		        {
					 controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,2);
					 tem = true;
				}
				if (resizeobj.childNodes[0].data == '[����Div�������]') // ����div����ĸ߶�
				{
			        controlHeightSet(resizeobj,resizeobj,imgobj,4); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3) // ���ò��ֱ��ĸ߶�
		    {   
		        if(resizeobj.childNodes[2].tagName == 'TABLE') 
		        {   
					controlHeightSet(resizeobj.childNodes[2],resizeobj,imgobj,3);
					tem = true;
				}
		    }
		    else
		    {
				if (tem == false) { // ��ͨ�ؼ�
				   controlHeightSet(resizeobj,resizeobj,imgobj);   
				} 
			}
		}
		else 
		{
			imgobj.style.top = resizeobj.offsetTop + resizeobj.offsetHeight +"px";
		}
		resetImgPos(0, resizeobj); // �ı����ͼƬ��λ��
		resetImgPos(2, resizeobj); // �ı�����ͼƬ��λ��
	}
	if(imgobj.id.indexOf('imgObj2_') != -1) // �����϶�
	{   
	    resizeobjid =  imgobj.id.replace('imgObj2_','');
	    resizeobj = document.getElementById(resizeobjid);
	    imgSet(resizeobj);
	    if(imgobj.offsetTop - resizeobj.offsetTop > 0) 
		{   
			var tem = false;
			if(resizeobj.childNodes.length == 2)
		    {   
		        if(resizeobj.childNodes[1].tagName == 'TABLE') // �������ݱ�ĸ߶�
		        {   
					controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,1);
					tem = true;
				}
				if (resizeobj.childNodes[1].tagName == 'IFRAME') // ����Iframe�ĸ߶�
				{ 
				    controlHeightSet(resizeobj.childNodes[1],resizeobj,imgobj,2);
				    tem = true;
				}
				if (resizeobj.childNodes[0].data == '[����Div�������]')  // ����div����ĸ߶�
				{
			        controlHeightSet(resizeobj,resizeobj,imgobj,4); 
			        tem = true;
			    }
		    }
		    if(resizeobj.childNodes.length == 3)  // �����������ĸ߶�
		    {   
		        if(resizeobj.childNodes[2].tagName == 'TABLE') 
		        {   
					controlHeightSet(resizeobj.childNodes[2],resizeobj,imgobj,3);
					tem = true;
				}
		    }
		    else 
		    {
				if (tem == false) { //��ͨ�ؼ�
				    controlHeightSet(resizeobj,resizeobj,imgobj);   
				}
			}
		}
		else // ���С��20�ˣ���ͼƬ���϶�
		{   
			imgobj.style.top = resizeobj.offsetTop + resizeobj.offsetHeight +"px";
		}
		resetImgPos(0, resizeobj); // �ı����ͼƬ��λ��
		resetImgPos(1, resizeobj); // �ı����ͼƬ��λ��
	}
}


// ���ÿؼ��Ŀ��
// resizectrlnode�� ʵ����Ҫ���õĿؼ��Ľڵ�
// resizeobj��Ҫ�ı�Ŀؼ�
// imgobj: �϶���С��ͼƬ
// tag: �ؼ�������(1:���ݱ�; 2:iframe; 3:�������; 4:����div; 0:����)
function controlHeightSet(resizectrlnode,resizeobj,imgobj,tag)
{   
    var num1 = 0;
    var num2 = 0;
    if (tag == 1) { num1= 112;num2 = 26; }          // ���ݱ�
    else if (tag == 2) {    num1= 13; num2 = 13;  } // iframe
    else if (tag == 3) {	num1= 55; num2 = 15;  } // �������
    else if (tag == 4) {    num1= 15; num2 = 0;  }  // ����div
    else { num1= 0; num2 = 0; }
	if (imgobj.offsetTop - resizeobj.offsetTop>num1) {
		resizectrlnode.style.height = imgobj.offsetTop - resizeobj.offsetTop -num2 +"px";
	}
	else // ���С��num1����ͼƬ���϶�
	{   
		imgobj.style.top = resizeobj.offsetTop + resizeobj.offsetHeight +"px";
	}
}

// ������ؼ��ĸ߶�
// resizectrlnode�� ʵ����Ҫ���õĿؼ��Ľڵ�
// resizeobj��Ҫ�ı�Ŀؼ�
// imgobj: �϶���С��ͼƬ
function controlWidthSet(resizectrlnode,resizeobj,imgobj)
{   
    var compareNum = 0;
    var tag = 0;
	if (resizectrlnode.tagName =='TABLE') compareNum = 300;
    else if (resizectrlnode.tagName =='IFRAME')  compareNum = 47;
    else if (resizectrlnode.tagName =='DIV')  compareNum = 98;
    else if(resizectrlnode.type == 'file')    compareNum = 60;
    else compareNum= 0;
	if (imgobj.offsetLeft - resizeobj.offsetLeft>compareNum) {
		resizectrlnode.style.width = imgobj.offsetLeft - resizeobj.offsetLeft +"px";
	}
	else // ���С��compareNum�ˣ���ͼƬ���϶�
	{   
		imgobj.style.left =  resizeobj.offsetLeft + resizeobj.offsetWidth+"px"; 
	}
}

// �������Ŀؼ���ͼƬ������ͼƬ��ť�Ļ�������ͼƬ�Ĵ�С����ֹ��ק�����д�С�����仯
// resizeControl�� Ҫ���õ�ͼƬ
function imgSet(resizeControl)
{
	var width = resizeControl.offsetWidth;   // ��¼�ؼ���width�� ��ֹ�߶ȸı�ʱwidth�Զ������仯
    var height = resizeControl.offsetHeight; // ��¼�ؼ���height����ֹ��ȸı�ʱheight�Զ������仯
	// ��ʱCtrlΪ�ؼ�������ؼ���ͼƬ������ͼƬ��ť�����������͸�
	if(resizeControl.tagName == 'IMG' || resizeControl.type == 'image')  
	{
		resizeControl.style.width = width;
		resizeControl.style.height = height; 
	}
}

// �ƶ�һ��ؼ�
// obj: Ҫ�ı�Ķ���
// x: x�᷽��ı�Ĵ�С
// y: y�᷽��ı�Ĵ�С
function moveCtrls(obj,x,y)
{   
	obj.style.left = obj.offsetLeft + x;
	obj.style.top = obj.offsetTop + y;
    resetImgPos(0, obj);
    resetImgPos(1, obj);
    resetImgPos(2, obj);
}




