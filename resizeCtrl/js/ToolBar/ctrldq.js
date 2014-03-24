// 设置对齐的方法
// aligntype: 对齐的方式
function align(aligntype)
{   
    var CtrlSize = window.parent.frames["main"].CtrlSize; //CtrlSize类
	var len = CtrlSize.arrayctrl.length; // 有几个控件选中的标记
    var aligntext = ""; // 对齐的位置，第一个选中的组件的位置
    for(var i = 0; i<=len; i++)
    {   
        var cs = CtrlSize.arrayctrl[i]; // 将当前的数组里的对象赋值给cs
		if (cs != undefined && cs != null && cs != '') {
		     switch(aligntype) {
		     case 'left_align': // 左对齐
				if (aligntext == "") {
					aligntext =cs.offsetLeft;
				}
				else
				{
					cs.style.left =aligntext; 
				}
		     	break;
		     case 'vertical_align':  // 垂直居中对齐
		        if (aligntext == "") {
					aligntext = cs.offsetLeft + cs.offsetWidth/2;
				}
				else
				{   
					cs.style.left = aligntext - cs.offsetWidth/2;
				}
		     	break;
		     case 'right_align':  // 右对齐
		        if (aligntext == "") {
					aligntext = cs.offsetLeft + cs.offsetWidth;
				}
				else
				{   
					cs.style.left = aligntext - cs.offsetWidth;
				}
		     	break;
		     case 'top_align':  //顶端对齐
		        if (aligntext == "") {
					aligntext = cs.offsetTop;
				}
				else
				{   
					cs.style.top = aligntext;
				}
				break;
			  case 'middle_align':  // 水平居中对齐
		         if (aligntext == "") {
					aligntext = cs.offsetTop + cs.offsetHeight/2;
				 }
				 else
				 {   
					cs.style.top = aligntext - cs.offsetHeight/2;
				 }
				break;
			  case 'bottom_align':  // 底部对齐
		          if (aligntext == "") {
					aligntext = cs.offsetTop + cs.offsetHeight;
				  }
				  else
				  {   
					cs.style.top = aligntext - cs.offsetHeight;
				  }
				break;
		    }
		    for(var j = 0; j<=2; j++)
			{   
			    window.parent.frames["main"].resetImgPos(j,cs); // 对齐后设置拖动大小的图片的位置
			}
	   } 
    }
}