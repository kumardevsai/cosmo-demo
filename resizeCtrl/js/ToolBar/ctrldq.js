// ���ö���ķ���
// aligntype: ����ķ�ʽ
function align(aligntype)
{   
    var CtrlSize = window.parent.frames["main"].CtrlSize; //CtrlSize��
	var len = CtrlSize.arrayctrl.length; // �м����ؼ�ѡ�еı��
    var aligntext = ""; // �����λ�ã���һ��ѡ�е������λ��
    for(var i = 0; i<=len; i++)
    {   
        var cs = CtrlSize.arrayctrl[i]; // ����ǰ��������Ķ���ֵ��cs
		if (cs != undefined && cs != null && cs != '') {
		     switch(aligntype) {
		     case 'left_align': // �����
				if (aligntext == "") {
					aligntext =cs.offsetLeft;
				}
				else
				{
					cs.style.left =aligntext; 
				}
		     	break;
		     case 'vertical_align':  // ��ֱ���ж���
		        if (aligntext == "") {
					aligntext = cs.offsetLeft + cs.offsetWidth/2;
				}
				else
				{   
					cs.style.left = aligntext - cs.offsetWidth/2;
				}
		     	break;
		     case 'right_align':  // �Ҷ���
		        if (aligntext == "") {
					aligntext = cs.offsetLeft + cs.offsetWidth;
				}
				else
				{   
					cs.style.left = aligntext - cs.offsetWidth;
				}
		     	break;
		     case 'top_align':  //���˶���
		        if (aligntext == "") {
					aligntext = cs.offsetTop;
				}
				else
				{   
					cs.style.top = aligntext;
				}
				break;
			  case 'middle_align':  // ˮƽ���ж���
		         if (aligntext == "") {
					aligntext = cs.offsetTop + cs.offsetHeight/2;
				 }
				 else
				 {   
					cs.style.top = aligntext - cs.offsetHeight/2;
				 }
				break;
			  case 'bottom_align':  // �ײ�����
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
			    window.parent.frames["main"].resetImgPos(j,cs); // ����������϶���С��ͼƬ��λ��
			}
	   } 
    }
}