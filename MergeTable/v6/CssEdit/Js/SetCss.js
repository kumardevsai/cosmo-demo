/*	SetCssҳ���js	*/
var diaheight = "510px";
var browser=new browserinfo;
if(browser.Version == "8.0") { diaheight = "460px"; }
if(browser.Version == "7.0") { diaheight = "460px"; }
if (browser.Version == "6.0") { diaheight = "510px"; }
dialogWidth = '610px';
dialogHeight = diaheight;
/*	����onloading�Ĵ�С	*/
function onloading()
{
	 document.getElementById("loading").style.height = document.body.offsetHeight;
     document.getElementById("loading").style.width =  document.body.offsetWidth;
}
/*���select�����ұ�ul��Ӧli����ʾ,h5��ǩ�ڵ����ݷ����仯*/
function setBoard()
{
  var arrli = document.getElementsByTagName('li');
  for(var i = 0; i< arrli.length; i++)
   {
    arrli[i].style.display = "none";
    var selindex = document.getElementById('selcate').selectedIndex;
     if(i == selindex)
     {
		arrli[i].style.display = "block";
   		document.getElementsByTagName('h5')[1].innerHTML = document.getElementById('selcate').options[document.getElementById('selcate').selectedIndex].text;
     }
   }
}
/*	���ȷ�����رմ�ģ̬���壬������ʽ����manageCssҳ��	 */
function closeDialog()
{
    window.returnValue = document.getElementById("output2").value;
    window.close();
}
/*	���ȡ�����رմ���	*/
function cancel()
{
    window.returnValue = null;
	window.close();
}
/*	�������飬��css��������ת����js��	*/
QrXPCOM.cssToJsMap = new Array;
QrXPCOM.cssToJsMap["background"]	=	"background";
QrXPCOM.cssToJsMap["background-attachment"]	=	"backgroundAttachment";
QrXPCOM.cssToJsMap["background-color"]	=	"backgroundColor";
QrXPCOM.cssToJsMap["background-image"]	=	"backgroundImage";
QrXPCOM.cssToJsMap["background-position"]	=	"backgroundPosition";
QrXPCOM.cssToJsMap["background-position-x"]	=	"backgroundPositionX";
QrXPCOM.cssToJsMap["background-position-y"]	=	"backgroundPositionY";
QrXPCOM.cssToJsMap["background-repeat"]	=	"backgroundRepeat";
QrXPCOM.cssToJsMap["behavior"]	=	"behavior";
QrXPCOM.cssToJsMap["border"]	=	"border";
QrXPCOM.cssToJsMap["border-bottom"]	=	"borderBottom";
QrXPCOM.cssToJsMap["border-bottom-color"]	=	"borderBottomColor";
QrXPCOM.cssToJsMap["border-bottom-style"]	=	"borderBottomStyle";
QrXPCOM.cssToJsMap["border-bottom-width"]	=	"borderBottomWidth";
QrXPCOM.cssToJsMap["border-color"]	=	"borderColor";
QrXPCOM.cssToJsMap["border-left"]	=	"borderLeft";
QrXPCOM.cssToJsMap["border-left-color"]	=	"borderLeftColor";
QrXPCOM.cssToJsMap["border-left-style"]	=	"borderLeftStyle";
QrXPCOM.cssToJsMap["border-left-width"]	=	"borderLeftWidth";
QrXPCOM.cssToJsMap["border-right"]	=	"borderRight";
QrXPCOM.cssToJsMap["border-right-color"]	=	"borderRightColor";
QrXPCOM.cssToJsMap["border-right-style"]	=	"borderRightStyle";
QrXPCOM.cssToJsMap["border-right-width"]	=	"borderRightWidth";
QrXPCOM.cssToJsMap["border-style"]	=	"borderStyle";
QrXPCOM.cssToJsMap["border-top"]	=	"borderTop";
QrXPCOM.cssToJsMap["border-top-color"]	=	"borderTopColor";
QrXPCOM.cssToJsMap["border-top-style"]	=	"borderTopStyle";
QrXPCOM.cssToJsMap["border-top-width"]	=	"borderTopWidth";
QrXPCOM.cssToJsMap["border-width"]	=	"borderWidth";
QrXPCOM.cssToJsMap["bottom"]	=	"bottom";
QrXPCOM.cssToJsMap["clear"]	=	"clear";
QrXPCOM.cssToJsMap["clip"]	=	"clip";
QrXPCOM.cssToJsMap["color"]	=	"color";
QrXPCOM.cssToJsMap["cursor"]	=	"cursor";
QrXPCOM.cssToJsMap["direction"]	=	"direction";
QrXPCOM.cssToJsMap["display"]	=	"display";
QrXPCOM.cssToJsMap["filter"]	=	"filter";
QrXPCOM.cssToJsMap["font"]	=	"font";
QrXPCOM.cssToJsMap["font-family"]	=	"fontFamily";
QrXPCOM.cssToJsMap["font-size"]	=	"fontSize";
QrXPCOM.cssToJsMap["font-style"]	=	"fontStyle";
QrXPCOM.cssToJsMap["font-variant"]	=	"fontVariant";
QrXPCOM.cssToJsMap["font-weight"]	=	"fontWeight";
QrXPCOM.cssToJsMap["height"]	=	"height";
QrXPCOM.cssToJsMap["layout-flow"]	=	"layoutFlow";
QrXPCOM.cssToJsMap["layout-grid"]	=	"layoutGrid";
QrXPCOM.cssToJsMap["layout-grid-char"]	=	"layoutGridChar";
QrXPCOM.cssToJsMap["layout-grid-line"]	=	"layoutGridLine";
QrXPCOM.cssToJsMap["layout-grid-mode"]	=	"layoutGridMode";
QrXPCOM.cssToJsMap["layout-grid-type"]	=	"layoutGridType";
QrXPCOM.cssToJsMap["left"]	=	"left";
QrXPCOM.cssToJsMap["letter-spacing"]	=	"letterSpacing";
QrXPCOM.cssToJsMap["line-break"]	=	"lineBreak";
QrXPCOM.cssToJsMap["line-height"]	=	"lineHeight";
QrXPCOM.cssToJsMap["margin"]	=	"margin";
QrXPCOM.cssToJsMap["margin-bottom"]	=	"marginBottom";
QrXPCOM.cssToJsMap["margin-left"]	=	"marginLeft";
QrXPCOM.cssToJsMap["margin-right"]	=	"marginRight";
QrXPCOM.cssToJsMap["margin-top"]	=	"marginTop";
QrXPCOM.cssToJsMap["overflow"]	=	"overflow";
QrXPCOM.cssToJsMap["overflow-x"]	=	"overflowX";
QrXPCOM.cssToJsMap["overflow-y"]	=	"overflowY";
QrXPCOM.cssToJsMap["padding"]	=	"padding";
QrXPCOM.cssToJsMap["padding-bottom"]	=	"paddingBottom";
QrXPCOM.cssToJsMap["padding-left"]	=	"paddingLeft";
QrXPCOM.cssToJsMap["padding-right"]	=	"paddingRight";
QrXPCOM.cssToJsMap["padding-top"]	=	"paddingTop";
QrXPCOM.cssToJsMap["page-break-after"]	=	"pageBreakAfter";
QrXPCOM.cssToJsMap["page-break-before"]	=	"pageBreakBefore";
QrXPCOM.cssToJsMap["position"]	=	"position";
QrXPCOM.cssToJsMap["right"]	=	"right";
QrXPCOM.cssToJsMap["scrollbar-3dlight-color"]	=	"scrollbar3dLightColor";
QrXPCOM.cssToJsMap["scrollbar-arrow-color"]	=	"scrollbarArrowColor";
QrXPCOM.cssToJsMap["scrollbar-base-color"]	=	"scrollbarBaseColor";
QrXPCOM.cssToJsMap["scrollbar-darkshadow-color"]	=	"scrollbarDarkShadowColor";
QrXPCOM.cssToJsMap["scrollbar-face-color"]	=	"scrollbarFaceColor";
QrXPCOM.cssToJsMap["scrollbar-highlight-color"]	=	"scrollbarHighlightColor";
QrXPCOM.cssToJsMap["scrollbar-shadow-color"]	=	"scrollbarShadowColor";
QrXPCOM.cssToJsMap["scrollbar-track-color"]	=	"scrollbarTrackColor";
QrXPCOM.cssToJsMap["float"]	=	"styleFloat";
QrXPCOM.cssToJsMap["text-align"]	=	"textAlign";
QrXPCOM.cssToJsMap["text-align-last"]	=	"textAlignLast";
QrXPCOM.cssToJsMap["text-autospace"]	=	"textAutospace";
QrXPCOM.cssToJsMap["text-decoration"]	=	"textDecoration";
QrXPCOM.cssToJsMap["text-indent"]	=	"textIndent";
QrXPCOM.cssToJsMap["text-justify"]	=	"textJustify";
QrXPCOM.cssToJsMap["text-kashida-space"]	=	"textKashidaSpace";
QrXPCOM.cssToJsMap["text-overflow"]	=	"";
QrXPCOM.cssToJsMap["text-transform"]	=	"textTransform";
QrXPCOM.cssToJsMap["text-underline-position"]	=	"textUnderlinePosition";
QrXPCOM.cssToJsMap["top"]	=	"top";
QrXPCOM.cssToJsMap["unicode-bidi"]	=	"unicodeBidi";
QrXPCOM.cssToJsMap["visibility"]	=	"visibility";
QrXPCOM.cssToJsMap["white-space"]	=	"whiteSpace";
QrXPCOM.cssToJsMap["width"]	=	"width";
QrXPCOM.cssToJsMap["word-break"]	=	"wordBreak";
QrXPCOM.cssToJsMap["word-spacing"]	=	"wordSpacing";
QrXPCOM.cssToJsMap["word-wrap"]	=	"wordWrap";
QrXPCOM.cssToJsMap["writing-mode"]	=	"writingMode";
QrXPCOM.cssToJsMap["z-index"]	=	"zIndex";
QrXPCOM.cssToJsMap["zoom"]	=	"zoom";
/*	��ʵ���ؼ���onChange����ʱִ�е��¼�	*/
var connectInstanceMap = new Array;//ʵ������
var connectInstanceOverrideMap = new Array;//���ǵ�ʵ������
var styles = new Array;
function connectCSS(obj, style, override){
	connectInstanceMap[style] = obj;
	connectInstanceOverrideMap[style] = override;
	obj.onChange = function(value){
		setTargetStyle(style, value);
	}
}
/*	��obj,objB����ʵ���ؼ���onChange����ʱִ�е��¼�	*/
function connectCSS2(obj,objB, style, override){
	connectInstanceMap[style] = new Array;
	connectInstanceMap[style][0] = obj;
	connectInstanceMap[style][1] = objB;
	connectInstanceOverrideMap[style] = override;
	obj.onChange = function(value){
		value = value + objB.get();
		setTargetStyle(style, value);
	}
	objB.onChange = function(value){
		value = obj.get() + value;
		setTargetStyle(style, value);
	}
}
/*	��ʼ����ʾ���ֵ���ʽ	*/
function initfontstyle()
{
    if(window.dialogArguments)
    {
	 	document.getElementById('target').style.cssText=window.dialogArguments;
	 	document.getElementById("output2").value = window.dialogArguments.toLowerCase();
	}
	else
	{
		 document.getElementById("output2").value="";
    }
}

/*	������ʾ�����������ʽ,����css��ʽ�ַ���д��strcss�ַ�������ֵ������output2��	*/
function setTargetStyle(style, value){ 
  var strcss = document.getElementById("output2").value;
    if (strcss) { 
        var array=strcss.split(';');
	    for(var i=0; i<array.length; i++)
		{    
            array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
            var temparray = array[i].split(':');
            for(var j = 0; j<temparray.length; j++)
            {
				temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
            }
            array[i] = temparray.join(":");
            var str1 = "margin";
            var len1 = str1.length;
            if(array[i].indexOf(str1) != -1)
            {
                 tag1 = array[i].indexOf(str1);
				if(array[i].charAt(tag1-1)!='-' && array[i].charAt(tag1+len1)==":" && array[i].charAt(tag1-1)!=":" && array[i].charAt(tag1+len1) != '-' )
				{   
					var array1 = array[i].split(':');
					var value1 = array1[1].split(' ');
					array1[1] = "";
					for(var m = 0; m<value1.length; m++)
					{   
						if(value1[m] == "")
						 value1[m] = '';
						 else
						 array1[1] += value1[m]+" ";
					}
					value1 = array1[1].split(' ');
					if(value1.length > 2)
					{   
						var strtop = "";
						var strright = "";
						var strbottom = ""
						var strleft = "";
						if(value1[0] != " " && value1[0] != undefined)
						{   
					        var re = /[a-zA-Z]/;
				 		    var arrMathes = value1[0].match(re);
						    if(arrMathes != null)
							strtop = "margin-top:"+value1[0];
							else
							strtop = "margin-top:"+value1[0]+"px";
						}
						if(value1[1] != " " && value1[1] != undefined)
						{
						    var re = /[a-zA-Z]/;
				 		    var arrMathes = value1[1].match(re);
						    if(arrMathes != null)
							strright = "margin-right:" + value1[1];
							else
							strright = "margin-right:" + value1[1]+"px";
						}
						if(value1[2] != " " && value1[2] != undefined)
						{   
						    var re = /[a-zA-Z]/;
				 		    var arrMathes = value1[2].match(re);
						    if(arrMathes != null)
							strbottom = "margin-bottom:" + value1[2];
							else
							strbottom = "margin-bottom:" + value1[2]+"px";
						}
						if(value1[3] != "" && value1[3] != undefined)
						{
						    var re = /[a-zA-Z]/;
				 		    var arrMathes = value1[3].match(re);
						    if(arrMathes != null)
							strleft = "margin-left:" + value1[3];
							else
							strleft = "margin-left:" + value1[3]+"px";
						}
						array[i] = strtop+ ";"+ strright+ ";" +strbottom+ ";" + strleft;
					}
				}
			}
	    }
	   strcss = array.join(";");
	}
  if(style!="" && value!="")
  {
	try{ 
	     document.getElementById("target").style[QrXPCOM.cssToJsMap[style]] = value;
         var temptag = 0;
    	  if (strcss) { 
              var array=strcss.split(';');
			  for(var i=0; i<array.length; i++)
			  {     
			    	var templen=style.length;
			    	var tag=array[i].indexOf(style);
					if(tag!=-1)
					{
				 		if(array[i].charAt(tag-1)!='-' && array[i].charAt(tag+templen)==":" && array[i].charAt(tag-1)!=":" && array[i].charAt(tag+templen) != '-' )
				 		{
				 	 		var temp=array[i].indexOf(":");
				  			var re=array[i].substr(temp+1,array[i].length);
				  			re = value;
				  			array[i] = [style,re].join(":");
				  			temptag = 1;
				 		}
					}
					//border�����
					if(tag == -1)
					{   //��ֳ�����ѭ������ַ������Ƿ������Щ��ʽ��2.�����������style-+����ʽ������Щȥ����setʣ�µ�ֵ(�ã��ָ������Ƿ����style�����
					     //�������滻������px֮��ģ��������滻��ʣ�µģ�ֱ���滻���������������join��������replace��)
						var tempstr = "border;border-top;border-rigth;border-left;border-bottom";
						var temparray = tempstr.split(';');
						var last = "";
						for(j = 0; j<temparray.length; j++)
						{
							if(array[i].indexOf(temparray[j]) != -1)
							{   
							   var stylearr = style.split('-');
							   for(var m = 0; m<stylearr.length; m++)
							   {
								   if(m == stylearr.length-1)
								   {
										last = stylearr[m];
								   }
							   }
							   temstyle = style.replace("-"+last,'');
							   var temtag = array[i].indexOf(temstyle);
							   var templen1 = temstyle.length; 
							   //����Ƿ������ʽ
							   if(temtag != -1)
							   {
									if(array[i].charAt(temtag-1)!='-' && array[i].charAt(temtag+templen1)==":" && array[i].charAt(temtag-1)!=":" && array[i].charAt(temtag+templen1) != '-')
									{
									//�����Ǽ������ĸ�����ʽ���Ǹ�����ɫ�Ϳ�ȣ�Ȼ�����ʽ��������
									var arr1 = array[i].split(':');
									var cssValue = arr1[1].split(' ');
									var str1 = "none;solid;double;groove;ridge;inset;outset;dashed;dotted";
									var strarr1= str1.split(';');
									var str2 = "px;pt;em;ex;pc;cm;mm;in;%";
									var strarr2 = str2.split(';');
									//�߿���ʽ
									if(style.indexOf("style") != -1)
									{ 
										for(var k = 0; k<cssValue.length; k++)
										{
											for(l = 0; l<strarr1.length; l++)
											{ 
											  if(cssValue[k].indexOf(strarr1[l]) != -1)
											  {  
												cssValue[k] = value;
												temptag = 1;
												break;
											  }
											}
										}
										if(temptag == 0)
										{
											cssValue[cssValue.length] = value;
										}
									}
									//�߿���
									if(style.indexOf("width") != -1)
									{   
										for(var k = 0; k<cssValue.length; k++)
										{
											for(l = 0; l<strarr2.length; l++)
											{
												if(cssValue[k].indexOf(strarr2[l]) != -1)
												{    
													cssValue[k] = value;
													temptag = 1;
													break;
												}
											}
										}
										if(temptag == 0)
										{
											cssValue[cssValue.length] = value;
										}
									}
									//�����ɫ
									if(style.indexOf("color") != -1)
									{  
										for(var k = 0; k<cssValue.length; k++)
										{   
											var tag1 = 0;
											var tag2 = 0;
											for(l = 0; l<strarr1.length; l++)
											{
												if(cssValue[k].indexOf(strarr1[l]) != -1)
												{  
													tag1 = 1;
													break;
												}
											}
											for(l = 0; l<strarr2.length; l++)
											{
												if(cssValue[k].indexOf(strarr2[l]) != -1)
												{
													tag2 = 1;
													break;
												}
										    }
										    if(tag1 == 0 && tag2 == 0)
										    {
												cssValue[k] = value;
												temptag = 1;
												break;
											}
										}
										if(temptag == 0)
										{
											cssValue[cssValue.length] = value;
										}
									}
									//����ʽ���ӳ�����,�滻����ǰ����ʽ
									arr1[1] = cssValue.join(' ');
									var temp = array[i].indexOf(":");
				  					var re = array[i].substr(temp+1,array[i].length);
				  					re = arr1[1];
				  					array[i] = [temstyle,re].join(":");
				  					temptag = 1;
				  					break;
							  }
							 }//temtag != -1�����
							}
						}
					}
					if(temptag == 1)
					{
						break;
					}
					// ���˽��� �ǵ�����temptag=1
			  }
			  strcss = array.join(";");
			  if (temptag == 0) {
			      if(styles[style])
				  {
				     styles[style].replace(styles[style],value);
				  }
				  else
				  {
				     styles[style] = value;
				  }
              }
			 
            }
            else {
			     if(styles[style])
				 {
				   styles[style].replace(styles[style],value);
				 }
				 else
				 {
                   styles[style] = value;
				 }
            }
	 }
	 catch(e){ 
	    document.getElementById("target").style[QrXPCOM.cssToJsMap[style]] = "";
		styles[style] = null;
		if (strcss.charAt(strcss.length-1) == ';') {
              strcss = strcss.substr(0, strcss.length - 1);
         }
		if(strcss.indexOf(style) != -1)
		 {
		      var array=strcss.split(';');
			  for(var i=0; i<array.length; i++)
			  {
			  	  var templen=style.length;
			      var tag=array[i].indexOf(style);
				  if(tag!=-1)
				  {
				 	  if(array[i].charAt(tag-1)!='-' && array[i].charAt(tag+templen)==":" && array[i].charAt(tag-1)!=":" && array[i].charAt(tag+templen) != '-')
					  {
					    if(strcss.charAt(strcss.indexOf(array[i])+array[i].length) == ";")
						  strcss = strcss.replace(array[i]+";","");
						else
						  strcss = strcss.replace(array[i],"");
				 	  }
				  }
			  }
		  }
		if(strcss.indexOf(style) == -1)
		{  
		     var array=strcss.split(';');
			 for(var i=0; i<array.length; i++)
			 {   
			    //var tempstr = "border;border-top;border-rigth;border-left;border-bottom";
			    var tempstr = "border;border-top;border-rigth;border-left;border-bottom;margin";
				var temparray = tempstr.split(';');
				var last = "";
				for(j = 0; j<temparray.length; j++)
			    {
					if(array[i].indexOf(temparray[j]) != -1)
					{   
						var stylearr = style.split('-');
						for(var m = 0; m<stylearr.length; m++)
					    {
							if(m == stylearr.length-1)
							{
								last = stylearr[m];
						    }
					    }
					    temstyle = style.replace("-"+last,'');
						var temtag = array[i].indexOf(temstyle);
						if(temtag != -1)
						{
						var templen1 = temstyle.length; 
						//����Ƿ������ʽ
						if(array[i].charAt(temtag-1)!='-' && array[i].charAt(temtag+templen1)==":" && array[i].charAt(temtag-1)!=":" && array[i].charAt(temtag+templen1) != '-')
						{
							//�����Ǽ������ĸ�����ʽ���Ǹ�����ɫ�Ϳ�ȣ�Ȼ�����ʽ��������
							  var tag1 = 0;
							  var tag2 = 0;
							  //��¼��ɫ����������±�
							  var tag3 = 0;
							  var arr1 = array[i].split(':');
							  var cssValue = arr1[1].split(' ');
							  var str1 = "none;solid;double;groove;ridge;inset;outset;dashed;dotted";
							  var strarr1= str1.split(';');
							  var str2 = "px;pt;em;ex;pc;cm;mm;in;%";
							  var strarr2 = str2.split(';');
							  //�߿���ʽ
							    if(style.indexOf("style") != -1)
							    { 
									for(var k = 0; k<cssValue.length; k++)
									{
										for(l = 0; l<strarr1.length; l++)
										{ 
										  if(cssValue[k].indexOf(strarr1[l]) != -1)
										  {  
											cssValue[k] = "";
											tag3 = k;
											tag1 = 1;
											temptag = 1;
											break;
										  }
									    }
									 }
							     }
								//�߿���
								if(style.indexOf("width") != -1)
								{   
									for(var k = 0; k<cssValue.length; k++)
									{
									    for(l = 0; l<strarr2.length; l++)
										{
											if(cssValue[k].indexOf(strarr2[l]) != -1)
											{   
											   cssValue[k] = "";
											   tag3 = k;
											   tag2 = 1;
											   temptag = 1;
											   break;
											 }
									    }
								    }
							     }
								//�����ɫ
								if(style.indexOf("color") != -1)
								{   
									for(var k = 0; k<cssValue.length; k++)
									{
										if(tag1 == 0 && tag2 == 0)
										{
											if( k == tag3)
											{
												cssValue[k] = "";
												temptag = 1;
												break;
											}
										}
								    }
								}
								if(style.indexOf("margin") != -1)
								{    
									if(style.indexOf("top") != -1)
									{
									    if(cssValue.length >0)
									    {  
											cssValue[0] = " ";
										}
									}
									else if(style.indexOf("right") != -1)
									{
									    if(cssValue.length>1)
									    {
											cssValue[1] = "";
										}
									}
									else if(style.indexOf("bottom") != -1)
									{
										if(cssValue.length>2)
										{
											cssValue[2] = "";
										}
									}
									else
									{
										if(cssValue.length>3)
										{
											cssValue[3] = "";
										}
									}
									
								}
								//����ʽ���ӳ�����,�滻����ǰ����ʽ��δʵ�֣�
								if(cssValue.length > 0)
								{
									arr1[1] = cssValue.join(' ');
									var temp = array[i].indexOf(":");
				  					var re = array[i].substr(temp+1,array[i].length);
				  					re = arr1[1];
				  					array[i] = [temstyle,re].join(":");
				  					temptag = 1;
				  					break;
				  				}
				  				if(cssValue.length == 0)
				  				{
				  					array[i] = "";
				  				}
							  }
							}
						  }
						}//border�����
						strcss = array.join(";");
			   }
		  }
	 }
	for(var st in styles){
	    if (strcss) {
	         strcss = strcss.replace(/(^\s*)|(\s*$)/g, "");
		     if(strcss.charAt(strcss.length-1) == ";")
			   { if(styles[st]) strcss += st + ":" + styles[st] + "; ";}
			  else
			  { 
			    strcss +=";" 
				if(styles[st]) strcss += st + ":" + styles[st] + "; ";
			  }   
	     }
	    else 
		if(styles[st]) strcss += st + ":" + styles[st] + "; ";
	}
	document.getElementById("output2").value = strcss;
	styles[style]=null;
  }
  if(style!="" && value=="")
  {
     
	try{ 
	     document.getElementById("target").style[QrXPCOM.cssToJsMap[style]] = value;
         var temptag = 0;
     	 if (strcss) {
              var array=strcss.split(';');
			  for(var i=0; i<array.length; i++)
			  {
			    	var templen=style.length;
			    	var tag=array[i].indexOf(style);
					if(tag!=-1)
					{
				 		if(array[i].charAt(tag-1)!='-' && array[i].charAt(tag+templen)==":" && array[i].charAt(tag-1)!=":" && array[i].charAt(tag+templen) != '-')
				 		{
				  			//strcss=strcss.replace(array[i]+";","");
				  			array[i] = "";
				  			temptag=1;
						}
					}
					if(tag == -1)
					{
						//����������ӵ�
						var tempstr = "border;border-top;border-rigth;border-left;border-bottom";
						var temparray = tempstr.split(';');
						var last = "";
						for(j = 0; j<temparray.length; j++)
						{
							if(array[i].indexOf(temparray[j]) != -1)
							{   
								var stylearr = style.split('-');
								for(var m = 0; m<stylearr.length; m++)
								{
									if(m == stylearr.length-1)
									{
										last = stylearr[m];
									}
								}
							    temstyle = style.replace("-"+last,'');
								var temtag = array[i].indexOf(temstyle);
								if(temtag != -1)
								{
								var templen1 = temstyle.length;
								if(array[i].charAt(temtag-1)!='-' && array[i].charAt(temtag+templen1)==":" && array[i].charAt(temtag-1)!=":" && array[i].charAt(temtag+templen1) != '-')
								{
									//�����Ǽ������ĸ�����ʽ���Ǹ�����ɫ�Ϳ�ȣ�Ȼ�����ʽ��������
									var tag1 = 0;
									var tag2 = 0;
									//��¼��ɫ����������±�
									var tag3 = 0;
									var arr1 = array[i].split(':');
									var cssValue = arr1[1].split(' ');
									var str1 = "none;solid;double;groove;ridge;inset;outset;dashed;dotted";
								    var strarr1= str1.split(';');
									var str2 = "px;pt;em;ex;pc;cm;mm;in;%";
									var strarr2 = str2.split(';');
									//�߿���ʽ
									if(style.indexOf("style") != -1)
									{ 
										for(var k = 0; k<cssValue.length; k++)
										{
											for(l = 0; l<strarr1.length; l++)
											{ 
												if(cssValue[k].indexOf(strarr1[l]) != -1)
												{  
													cssValue[k] = "";
													tag3 = k;
													tag1 = 1;
													temptag = 1;
													break;
												}
											}
										}
									}
									//�߿���
									if(style.indexOf("width") != -1)
									{   
										for(var k = 0; k<cssValue.length; k++)
										{
											for(l = 0; l<strarr2.length; l++)
											{
												if(cssValue[k].indexOf(strarr2[l]) != -1)
												{   
													cssValue[k] = "";
													tag3 = k;
													tag2 = 1;
													temptag = 1;
													break;
												}
											}
										}
									}
									//�����ɫ
									if(style.indexOf("color") != -1)
									{   
										for(var k = 0; k<cssValue.length; k++)
										{
											if(tag1 == 0 && tag2 == 0)
											{
												if( k == tag3)
												{
													cssValue[k] = "";
													temptag = 1;
													break;
												}
											}
										}
									}
									//����ʽ���ӳ�����,�滻����ǰ����ʽ��δʵ�֣�
									arr1[1] = cssValue.join(' ');
									var temp = array[i].indexOf(":");
				  					var re = array[i].substr(temp+1,array[i].length);
				  					re = arr1[1];
				  					array[i] = [temstyle,re].join(":");
				  					temptag = 1;
				  					break;
							  }
							}
							}
						}
						strcss  = "";
						for(var a = 0; a<array.length; a++)
						{
							if(array[a]!= "")
							{
							   strcss +=  array[a]+";";
							}
							else
							{
								strcss += "";
						    }
					    }
					//����������ӵ�
					}
			  }
			  if (temptag == 0) {
			      if(styles[style])
				  {
				     styles[style].replace(styles[style],value);
				  }
				  else
				  {
				     styles[style] = value;
				  }
              }
			 
         }
        else {
			 if(styles[style])
			 {
				 styles[style].replace(styles[style],value);
			 }
			else
			{
                styles[style] = value;
			}
        }
	 }
	 catch(e){
	    document.getElementById("target").style[QrXPCOM.cssToJsMap[style]] = "";
		styles[style] = null;
		if(strcss.indexOf(style) != -1)
		 {
		      var array=strcss.split(';');
			  for(var i=0; i<array.length; i++)
			  {
			  	var templen = style.length;
			  	var tag=array[i].indexOf(style);
				if(tag!=-1)
				{
					if(array[i].charAt(tag-1)!='-' && array[i].charAt(tag+templen)==":" && array[i].charAt(tag-1)!=":" && array[i].charAt(tag+templen) != '-')
					{
				    	var re=array[i];
				    	strcss = strcss.replace(re+";","");
				  	}
				}
			 }
		 }
	 }
	document.getElementById("output2").value = strcss;
	styles[style]=null;
  }
}
/*	�˷����������һЩ���ֵĵ�λ�������б����	*/
function createTaniComponent(def){
	if(!def) def = "px";
	var tan = new QrPulldown(def,3);
	tan.render();
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> px = pixels","px");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> pt = 1/72in","pt");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> em = font-size","em");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> ex = x-height of font","ex");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> pc = 12pt","pc");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> cm","cm");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> mm","mm");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> in","in");
	tan.addItem("<img src='images/transparentpixel.gif' style='width:15px;height:15px;' align='middle'/> %","%");
	return tan;
}

/*	��ʼ��������ɫ	*/
function getcsscolor(color) {
            var args = window.dialogArguments;
            if(args != "" && args != undefined)
            {
            if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
            args = args.toLowerCase();
			var tag = args.indexOf(color);
            if (tag != -1) {
                var array = args.split(";");
                var len = array.length;
                  for (var i = 0; i < len; i++) {
                    array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					var templen = temparray.length;
					for(var j = 0; j<templen; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[i] = temparray.join(":");
                    var temptag = array[i].indexOf(color);
					if(temptag != -1){
					    if(array[i].charAt(temptag-1) != '-')
					    {
					  	 	 var initcolor=array[i].substr(array[i].indexOf(":")+1,array[i].length);
					 		 //return initcolor.substr(0,7);
					 		 return initcolor;
						}
                    }
				 }
			  return "#000000";
		   }
		   else
		   {
		      return "#000000";
		   }
		}
		else return "#000000";	
  }
  /*		��ʼ���������߿���ɫ	*/
 function getcolor(color) {
            var args = window.dialogArguments;
            if(args != "" && args != undefined){
            if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
            args = args.toLowerCase();
			var tag = args.indexOf(color);
            if (tag != -1) 
			{
			  var array=args.split(";");
			  var len = array.length;
		      for(var i = 0; i<len;i++)
			  {
			    array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
				var temparray = array[i].split(':');
				var templen = temparray.length;
				for(var j = 0; j<templen; j++)
				{
					temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
				}
				array[i] = temparray.join(":");
			    if(array[i].indexOf(color)!=-1)
				{
				   var bginitcolor=array[i].substr(array[i].indexOf(":")+1,array[i].length);
				   //return bginitcolor.substr(0,8);
				   return bginitcolor;
				}
			  }	   
		     }
		    if(tag == -1)
		    {
				if(color != "background-color")
				{
					color = color.replace("-color","");
					var str = getArgs();
					var array = str.split(';');
					for(var i = 0; i<array.length; i++)
					{   var tag3 = 0;
						if(array[i].indexOf(color) != -1)
						{
						var temptag = array[i].indexOf(color);
						if(array[i].charAt(temptag-1) != '-'&& array[i].charAt(color.length) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(color.length) == ":")
						{
							var tempstr1 = "px;pt;em;ex;pc;cm;mm;in;%";
							var strArray1= tempstr1.split(";");
							var tempstr2 = "none;solid;double;groove;ridge;inset;outset;dashed;dotted";
							var strArray2 = tempstr2.split(';');
							var tem = array[i].split(':');
							cssValue = tem[1].split(' ');
							//�ÿո����Էֿ����鿴�Ƿ�����ɫ����
							for(var j = 0; j<cssValue.length; j++)
							{  
							    var tag1 =0;
							    var tag2 = 0;
							    if(cssValue[j] != "")
							    {
									for(var k = 0; k<strArray1.length;k++)
									{
										if(cssValue[j].indexOf(strArray1[k]) != -1)
										{
											tag1 = 1;
											break;
										}
									}
									for(var k = 0; k<strArray2.length; k++)
									{
										if(cssValue[j].indexOf(strArray2[k]) != -1)
										{
											tag2 = 1;
											break;
										}
									}
									if(tag1 == 0 && tag2 == 0)
									{
										tag3 = 1;
										//return cssValue[j].substr(0,8);
										return cssValue[j];
									}
								}
							}
						}
					  }
					}
					if(tag3 == 0)
					{
						return "transparent";
					}			  		 
				}
				else
				{
				return "transparent";
				}
		    }
		    //else��tagΪ-1 �����
			else
			{
				return "transparent";
			}
		}
		else return "transparent";
      }
/*	������������ʽ�ַ���	*/
function getArgs()
{
	var args = window.dialogArguments;
	if(args != "" && args != undefined){
        if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
	args = args.toLowerCase();
	var array=args.split(";");
	var len = array.length;
    for(var i = 0; i<len;i++){
	   array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
	   var temparray = array[i].split(':');
	   var templen = temparray.length;
	   for(var j = 0; j<templen; j++)
	   {
		  temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
	   }
	   array[i] = temparray.join(":");
	        var str1 = "margin";
            var len1 = str1.length;
            if(array[i].indexOf(str1) != -1)
            {
                 tag1 = array[i].indexOf(str1);
				if(array[i].charAt(tag1-1)!='-' && array[i].charAt(tag1+len1)==":" && array[i].charAt(tag1-1)!=":" && array[i].charAt(tag1+len1) != '-' )
				{
					var array1 = array[i].split(':');
					var value1 = array1[1].split(' ');
					array1[1] = "";
					for(var m = 0; m<value1.length; m++)
					{   
						if(value1[m] == "")
						 value1[m] = '';
						 else
						 array1[1] += value1[m]+" ";
					}
					value1 = array1[1].split(' ');
					if(value1.length > 2)
					{
						var strtop = "";
						var strright = "";
						var strbottom = ""
						var strleft = "";
						if(value1[0] != " ")
						{
							strtop = "margin-top:"+value1[0];
						}
						if(value1[1] != " ")
						{
							strright = "margin-right:" + value1[1];
						}
						if(value1[2] != " ")
						{
							strbottom = "margin-bottom:" + value1[2];
						}
						if(value1[3] != " ")
						{
							strleft = "margin-left:" + value1[3];
						}
						array[i] = strtop+ ";"+ strright+ ";" + strbottom+ ";" + strleft;
					}
				}
			}
	}
	args = array.join(";");
	}
	return args;
}
/*	��ʼ��border��padding��margin�������ҵĿ�ȼ����ֵ��иߡ��ı�������ֵ�����ֵļ�ࡢ��ĸ�ļ��	*/
function getbordercomwidth(comwidth)
{          
        var args = window.dialogArguments;
		if(args != "" && args != undefined){
        if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
		args = args.toLowerCase();
		var array=args.split(";");
		var len = array.length;
		for(var i = 0; i<len;i++){
			array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
			var temparray = array[i].split(':');
			var templen = temparray.length;
			for(var j = 0; j<templen; j++)
			{
				temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
			}
			array[i] = temparray.join(":");
	        var str1 = "margin";
            var len1 = str1.length;
            if(array[i].indexOf(str1) != -1)
            {
                 tag1 = array[i].indexOf(str1);
				if(array[i].charAt(tag1-1)!='-' && array[i].charAt(tag1+len1)==":" && array[i].charAt(tag1-1)!=":" && array[i].charAt(tag1+len1) != '-' )
				{
					var array1 = array[i].split(':');
					var value1 = array1[1].split(' ');
					array1[1] = "";
					for(var m = 0; m<value1.length; m++)
					{   
						if(value1[m] == "")
						 value1[m] = '';
						 else
						 array1[1] += value1[m]+" ";
					}
					value1 = array1[1].split(' ');
					if(value1.length >2)
					{   
						var strtop = "";
						var strright = "";
						var strbottom = ""
						var strleft = "";
						if(value1[0] != " ")
						{
							strtop = "margin-top:"+value1[0];
						}
						if(value1[1] != " ")
						{
							strright = "margin-right:" + value1[1];
						}
						if(value1[2] != " ")
						{
							strbottom = "margin-bottom:" + value1[2];
						}
						if(value1[3] != " ")
						{
							strleft = "margin-left:" + value1[3];
						}
						array[i] = strtop+ ";"+ strright+ ";" + strbottom+ ";" + strleft;
				    }
				}
			}
		}
		args = array.join(";");
			var tag = args.indexOf(comwidth);
			//�����ʽ�ַ����ﺬ�д���������ʽʱ
            if (tag != -1){
			 	 var array=args.split(";");
			 	 var len = array.length;
			     for(var i = 0; i<len;i++){
			        array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					var templen = temparray.length;
					for(var j = 0; j<templen; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[i] = temparray.join(":");
					var temptag = array[i].indexOf(comwidth);
			  	 	if(temptag != -1)
			  		 { 
						 if(array[i].charAt(temptag-1) != '-'&&array[i].charAt(comwidth.length) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(comwidth.length) == ":")			  		 
					     {  
							var borderwidth=array[i].substr(array[i].indexOf(":")+1,array[i].length);
							var re = /.*\d/;
				 			var arrMathes = borderwidth.match(re);
				 			if(arrMathes != null)
				 			{ return arrMathes[0];}
				 		}
			   	 	}
			 	 }
              }
              //ss{BORDER-RIGHT: #000084 1px solid;}������
              else
              {   
				  var strcss = getArgs();
				  var array = strcss.split(';');
				  for(var i = 0; i<array.length; i++)
				  {
					    var last = "";
						var arrayCom = comwidth.split('-');
						for(var j = 0; j<arrayCom.length; j++)
						{
							if(j == arrayCom.length-1)
							{	
								last = arrayCom[j];
							}
						}
						if(strcss.indexOf(comwidth.substr(0,comwidth.indexOf('last')-1)) != -1)
						{	
						   var comwidth1 = comwidth.substr(0,comwidth.indexOf(last)-1);
						}
						var temptag = array[i].indexOf(comwidth1);
			  	 		if(temptag != -1)
			  			{ 
							if(array[i].charAt(temptag-1) != '-'&&array[i].charAt(comwidth1.length) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(comwidth1.length) == ":")			  		 
							{  
								    var temValue = array[i].split(':');
								    if(comwidth1 != "margin" && comwidth1 !="padding")//�������margin��padding�����
								    {
										var listStyle = temValue[1].split(" ");
										for(var m = 0; m<listStyle.length; m++)
										{
											var tempstr = "px;pt;em;ex;pc;cm;mm;in;%";
											var unitArray = tempstr.split(';');
											for(var k= 0; k< unitArray.length; k++)
											{
												if(listStyle[m].indexOf(unitArray[k]) != -1)
												{
													var borderwidth=listStyle[m].substr(listStyle[m].indexOf(" ")+1,listStyle[m].length);
													var re = /.*\d/;
				 									var arrMathes = borderwidth.match(re);
				 									if(arrMathes != null)
				 									{   
				 										return arrMathes[0];
				 									}
												}
											}
										}
									}
									else//�������margin��padding�����
									{
										if(comwidth.indexOf("top") != -1)
										{   
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[0];
											if(listStyle.length >1)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{   
				 									return arrMathes[0];
				 								}
				 							}
										}
										else if(comwidth.indexOf("right") != -1)
										{
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[1];
											if(listStyle.length>1)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{  
				 									return arrMathes[0];
				 								}
				 							}
										}
									   else  if(comwidth.indexOf("bottom") != -1)
										{   
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[2];
											if(listStyle.length>2)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{   
				 									return arrMathes[0];
				 								}
				 							}
										}
										//left
										else
										{  
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[3];
											if(listStyle.length>3)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{  
				 									return arrMathes[0];
				 								}
				 							}
				 							
										}
									}
								}
							}
						}
              }//����
		}
	    else return "";
}
/*	��ʼ��border��padding��margin�������ҵĿ�ȼ����ֵ��иߡ��ı�������ֵ�����ֵļ�ࡢ��ĸ�ļ��ĵ�λ�����漰����*/
function getbordercomwidthunit(comwidth)
{
            var args = window.dialogArguments;
			if(args != "" && args != undefined){
				if (args.charAt(args.length - 1) == ';') {
					args = args.substr(0, args.length - 1);
				}
			args = args.toLowerCase();
			var array=args.split(";");
			var len = array.length;
			for(var i = 0; i<len;i++){
				array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
				var temparray = array[i].split(':');
				var templen = temparray.length;
				for(var j = 0; j<templen; j++)
				{
					temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
				}
				array[i] = temparray.join(":");
				var str1 = "margin";
				var len1 = str1.length;
				if(array[i].indexOf(str1) != -1)
				{
					 tag1 = array[i].indexOf(str1);
					if(array[i].charAt(tag1-1)!='-' && array[i].charAt(tag1+len1)==":" && array[i].charAt(tag1-1)!=":" && array[i].charAt(tag1+len1) != '-' )
					{
						var array1 = array[i].split(':');
						var value1 = array1[1].split(' ');
						array1[1] = "";
						for(var mj = 0; m<value1.length; m++)
						{   
							if(value1[m] == "")
							value1[m] = '';
							else
							array1[1] += value1[m]+" ";
						}
						value1 = array1[1].split(' ');
						if(value1.length > 2)
						{
							var strtop = "";
							var strright = "";
							var strbottom = ""
							var strleft = "";
							if(value1[0] != " ")
							{
								strtop = "margin-top:"+value1[0];
							}
							if(value1[1] != " ")
							{
								strright = "margin-right:" + value1[1];
							}
							if(value1[2] != " ")
							{
								strbottom = "margin-bottom:" + value1[2];
							}
							if(value1[3] != " ")
							{
								strleft = "margin-left:" + value1[3];
							}
							array[i] = strtop+ ";"+ strright+ ";" + strbottom+ ";" + strleft;
						}
					}
				}
			}
			args = array.join(";");
			var tag = args.indexOf(comwidth);
			//�������������ʽ�ַ�������comwidth��ʽ�Ļ�
            if (tag != -1){
				var array=args.split(";");
				var len = array.length;
			 	for(var i = 0; i< len;i++){
			 		array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					var templen = temparray.length;
					for(var j = 0; j<templen; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[i] = temparray.join(":");
			  	 	var temptag = array[i].indexOf(comwidth);
			   		if(temptag != -1)
			   		{   
			   			if(array[i].charAt(temptag-1) != '-'&&array[i].charAt(comwidth.length) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(comwidth.length) == ":")			  		 
					    {  
							if(array[i].indexOf(" ") != -1)
							{
								var listStyle = new Array();
								listStyle = array[i].split(" ");
								for(var m = 0; m<listStyle.length; m++)
								{
									var tempstr = "px;pt;em;ex;pc;cm;mm;in;%";
									var unitArray = tempstr.split(';');
									for(var k = 0; k< unitArray.length; k++)
									{
										if(listStyle[m].indexOf(unitArray[k]) != -1)
										{
											var borderwidth=listStyle[m].substr(listStyle[m].indexOf(" ")+1,listStyle[m].length);
											var re = /.*\d/;
				 							var arrMathes = borderwidth.match(re);
				 							if(arrMathes != null)
				 							{   
				 								 widthunit = borderwidth.substr(arrMathes[0].length,listStyle[m].length);
				 								 return widthunit;
				 							}
										}
									}
								}
							}
							else
							{   
			      				var temp = array[i].indexOf(":"); 
				  				var widthuint=array[i].substr(temp+1,array[i].length);
				  				var re = /.*\d/;
				  				var arrMathes = widthuint.match(re);
				  				if(arrMathes != null)
				  				{	
				  					widthunit = widthuint.substr(arrMathes[0].length,array[i].length);
				  					return widthunit;
				  				}
				  			}
				  		}
			   		}
			 	}
            }
            if(tag == -1)
            {
                var strcss = getArgs();
				  var array = strcss.split(';');
				  for(var i = 0; i<array.length; i++)
				  {
					if(array[i].indexOf(" ") != -1)
					{
					    var last = "";
						var arrayCom = comwidth.split('-');
						for(var j = 0; j<arrayCom.length; j++)
						{
							if(j == arrayCom.length-1)
							{	
								last = arrayCom[j];
							}
						}
						if(strcss.indexOf(comwidth.substr(0,comwidth.indexOf('last')-1)) != -1)
						{	
						   var comwidth1 = comwidth.substr(0,comwidth.indexOf(last)-1);
						}
						var temptag = array[i].indexOf(comwidth1);
			  	 		if(temptag != -1)
			  			{ 
							if(array[i].charAt(temptag-1) != '-'&&array[i].charAt(comwidth1.length) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(comwidth1.length) == ":")			  		 
							{  
								if(array[i].indexOf(" ") != -1)
								{   
								    var temValue = array[i].split(':');
								    if(comwidth1 != "margin" && comwidth1 !="padding")//�������margin��padding�����
								    {
										var listStyle = temValue[1].split(" ");
										for(var m = 0; m<listStyle.length; m++)
										{
											var tempstr = "px;pt;em;ex;pc;cm;mm;in;%";
											var unitArray = tempstr.split(';');
											for(var k = 0; k< unitArray.length; k++)
											{
												if(listStyle[m].indexOf(unitArray[k]) != -1)
												{
													var borderwidth=listStyle[m].substr(listStyle[m].indexOf(" ")+1,listStyle[m].length);
													var re = /.*\d/;
				 									var arrMathes = borderwidth.match(re);
				 									if(arrMathes != null)
				 									{  
				 										return borderwidth.substr(arrMathes[0].length,listStyle[m].length);
				 									}
												}
											}
										}
									}
									else//�������margin��padding�����
									{  
										if(comwidth.indexOf("top") != -1)
										{   
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[0];
											if(borderwidth)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{   
				 									return borderwidth.substr(arrMathes[0].length,listStyle[0].length);
				 								}
				 							}
										}
										else if(comwidth.indexOf("right") != -1)
										{
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[1];
											if(listStyle.length>2)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{   
				 									return borderwidth.substr(arrMathes[0].length,listStyle[1].length);
				 								}
				 							}
										}
										//left
										else if(comwidth.indexOf("bottom") != -1)
										{
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[2];
											if(listStyle.length>2)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{   
				 									return borderwidth.substr(arrMathes[0].length,listStyle[2].length);
				 								}
				 							}
										}
										else
										{  //��
											var listStyle = temValue[1].split(" ");
											var borderwidth = listStyle[3];
											if(listStyle.length>3)
											{
												var re = /.*\d/;
				 								var arrMathes = borderwidth.match(re);
				 								if(arrMathes != null)
				 								{   
				 									return borderwidth.substr(arrMathes[0].length,listStyle[3].length);
				 								}
				 							}
										}//over
									}
								}
							}
						}
					}
				 }	
              }
		}
		/*if(comwidth == "line-height")
			    return "%";
		if(comwidth == "text-indent")
			    return "em";*/
	    //else return "px";
	    return "px";
}
/*	��ʼ���߿���ʽ��������������塢�������塢���ִ�ϸ��������ʽ�����ֱ�����������ԡ��������ԡ�ˮƽ���С���ֱ���С��ı����Ρ��ı�ת��������ͼƬ���������졢������λ���������ԡ���ʾ���ԡ��Ƿ�ɼ�����Դ��λ�����	*/
 function getborderstyle(borderstyle)
 {          
            var args = window.dialogArguments;
            if(args != "" && args != undefined){
            if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
            args = args.toLowerCase();
            
			var tag = args.indexOf(borderstyle);
            if (tag != -1){
				var array=args.split(";");
				var len = array.length;
			 	for(var i = 0; i< len;i++){
			 		array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					var templen = temparray.length;
					for(var j = 0; j<templen; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[i] = temparray.join(":");
			   		var temptag = array[i].indexOf(borderstyle);
			   		if(temptag!= -1)
			   		{
					 	var stylevalue = array[i].substr(temptag+borderstyle.length+1,temptag+array[i].length);
					 	return stylevalue;
			    	}
				}
			}
			if(tag == -1)
			{
				if(borderstyle.indexOf("border") != -1)
				{
					borderstyle = borderstyle.replace('-style','');
					var str = getArgs();
				    var array = str.split(';');
				    for(var i = 0; i< array.length; i++)
				    {
						if(array[i].indexOf(borderstyle) != -1)
						{   
							var temptag = array[i].indexOf(borderstyle);
							if(array[i].charAt(temptag-1) != '-'&& array[i].charAt(borderstyle.length) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(borderstyle.length) == ":")
							{
								var tempstr = "none;solid;double;groove;ridge;inset;outset;dashed;dotted";
								var cssValue = array[i].split(":");
								var valueArray = cssValue[1].split(' ');
								for(var j = 0; j<valueArray.length; j++)
								{  
									if(valueArray[j] != "")
									{
									  if(tempstr.indexOf(valueArray[j]) != -1)
									  {
										return valueArray[j];
									  }
									}
								}
							}
						}
				    }
				}
			}
			else
			{
				return "";
			}
		}
 }
 
 /*	��ʼ��width,padding,margin����ֵ	*/
function getallset(allset) {
            var args = window.dialogArguments;
            if(args != "" && args != undefined){
            if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
            args = args.toLowerCase();
			var tag = args.indexOf(allset);
            if (tag != -1) {
                var array = args.split(";");
                var len = array.length;
               for (var i = 0; i <len; i++) {
                   	array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					var templen = temparray.length;
					for(var j = 0; j<templen; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
				   array[i] = temparray.join(":");
                   var temptag = array[i].indexOf(allset);
				   var templength = allset.length;
				   if(temptag != -1)
				   {
					  if(array[i].charAt(temptag-1) != '-'&&array[i].charAt(templength) != '-' && array[i].charAt(temptag - 1) != ':' && array[i].charAt(templength) == ":")
					   {     
					         var initnum=array[i].substr(array[i].indexOf(":")+1,array[i].length);
							 var re = /.*\d/;
							 var arrMathes = initnum.match(re);
							 if(arrMathes != null)
					         { 
								if(arrMathes[0].indexOf(' ') == -1)
								 return arrMathes[0];
								else
								{
								   return ""; 
								}
					         }
					   }
					}
                  }
			return "";
             }
	    return "";
	   }
 }
/*	width,padding,margin��λ��ʼ��	*/
function getwidthunitset(allset) {
            var args = window.dialogArguments;
            if(args != "" && args != undefined){
            if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
            args = args.toLowerCase();
			var tag = args.indexOf(allset);
            if (tag != -1) {
                var array = args.split(";");
                var len = array.length;
               for (var i = 0; i <len; i++) {
				  	array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					var templen = temparray.length;
					for(var j = 0; j<templen; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
				   array[i] = temparray.join(":");
                   var temptag = array[i].indexOf(allset);
				   var templength = allset.length;
				   if(temptag!=-1)
				   {
					 if(array[i].charAt(temptag-1) != '-' && array[i].charAt(templength) != '-' &&array[i].charAt(templength) == ':' &&	array[i].charAt(temptag - 1) != ':')
				     {
					 	var temp = array[i].indexOf(":");
					  	var widthunit=array[i].substr(temp+1,array[i].length);
					  	var re = /.*\d/;
					  	var arrMathes = widthunit.match(re);
					  	if(arrMathes != null)
					   	{	
					   		widthunit = widthunit.substr(arrMathes[0].length,array[i].length);
					  		return widthunit;
					  	}
					 }
				   }
                 }
				 return "px";
             }
           return "px";
          }
}
/*	��ʼ��position��Դ��λ	*/
function getposition(positionset) {
            var args = window.dialogArguments;
            if(args != "" && args != undefined){
            if (args.charAt(args.length - 1) == ';') {
                args = args.substr(0, args.length - 1);
            }
            args = args.toLowerCase();
			var tag = args.indexOf(positionset);
            if (tag != -1) {
                var array = args.split(";");
                var len = array.length;
                for (var i = 0; i <len; i++) {
				   	array[i] = array[i].replace(/(^\s*)|(\s*$)/g, "");
					var temparray = array[i].split(':');
					for(var j = 0; j<temparray.length; j++)
					{
						temparray[j] = temparray[j].replace(/(^\s*)|(\s*$)/g, "");
					}
					array[i] = temparray.join(":");
                   var temptag = array[i].indexOf(positionset);
				   var templength = positionset.length;
				   if(temptag != -1)
				   {
					  if(array[i].charAt(temptag-1) != '-' && array[i].charAt(templength) != '-'&& array[i].charAt(temptag - 1) !=':'
						&&array[i].charAt(templength) == ':')
					   {
					          var setposition=array[i].substr(array[i].indexOf(":")+1,array[i].length);
					         return setposition;
					   }
					}
                  }
			    return "";
            }
	       return "";
	    }
 }
