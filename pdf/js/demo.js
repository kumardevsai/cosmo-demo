function init_pdf() {
	var pdf_one = document.getElementById("pdf_one");
	var obj = pdf_one.object;
	if (window.attachEvent) {
		document.getElementById("print_pdf").attachEvent('onclick', function() {
			obj.Print();
		});
		document.getElementById("print_pdf_all").attachEvent('onclick', function() {
			obj.PrintAll();
		});
		/**
		document.getElementById("print_pdf_allFit").attachEvent('onclick', function() {
			obj.printAllFit(true);
		});
		**/
		document.getElementById("print_pdf_getVersions").attachEvent('onclick', function() {
			alert(obj.GetVersions());
		});
		document.getElementById("print_pdf_goBackwardStack").attachEvent('onclick', function() {
			obj.goBackwardStack()
		});
		document.getElementById("print_pdf_goForwardStack").attachEvent('onclick', function() {
			obj.goBackwardStack()
		});
		document.getElementById("print_pdf_gotoFirstPage").attachEvent('onclick', function() {
			obj.gotoFirstPage()
		});
		document.getElementById("print_pdf_gotoNextPage").attachEvent('onclick', function() {
			obj.gotoNextPage()
		});
		document.getElementById("print_pdf_gotoPreviousPage").attachEvent('onclick', function() {
			obj.gotoPreviousPage()
		});
		/**
		document.getElementById("print_pdf_setCurrentHighlight").attachEvent('onclick', function() {
			obj.setCurrentHighlight(255, 255, 255, 1);
		});
		**/
		var print_pdf_setShowScrollBars = document.getElementById("print_pdf_setShowScrollBars");
		print_pdf_setShowScrollBars.attachEvent('onclick', function() {
			if (print_pdf_setShowScrollBars.getAttribute("sts") === 'on') {
				obj.setShowScrollBars(false);
				print_pdf_setShowScrollBars.setAttribute("sts", 'off');
				print_pdf_setShowScrollBars.value = '显示滚动条';
			} else {
				obj.setShowScrollBars(true);
				print_pdf_setShowScrollBars.setAttribute("sts", 'on');
				print_pdf_setShowScrollBars.value = '隐藏滚动条';
			}
		});
		var print_pdf_setShowToolBar = document.getElementById("print_pdf_setShowToolBar");
		print_pdf_setShowToolBar.attachEvent('onclick', function() {
			if (print_pdf_setShowToolBar.getAttribute('sts') === 'on') {
				obj.setShowToolBar(false);
				print_pdf_setShowToolBar.setAttribute('sts', 'off');
				print_pdf_setShowToolBar.value = '显示工具栏';
			} else {
				obj.setShowToolBar(true);
				print_pdf_setShowToolBar.setAttribute('sts', 'on');
				print_pdf_setShowToolBar.value = '隐藏工具栏';
			}
		});
	}
};

function checkAdobeAcrobatWebkit() {
	var flag = false;
	var plugins = navigator.plugins;
	if (plugins && plugins.length > 0) {
		for (var i = 0, len = plugins.length; i < len; i++) {
			var p = plugins[i];
			if (p.name.toLowerCase().indexOf("adobe acrobat")) {
				flag = true;
				break;
			}
		}
	}
	return flag;
};

function checkAdobeArcobatIE() {
	if (window.ActiveXObject) {
		var ac;
		try {
			ac = new ActiveXObject("AcroPDF.PDF");
			if (!ac) {
				try {
					ac = new ActiveXObject("PDF.PdfCtrl");
					if (!ac)
						return false;
					else
						return true;
				} catch (e) {}
			} else
				return true;
		} catch (e1) {}
	}
};

function checkAdobeArcobat() {
	return checkAdobeArcobatIE() || checkAdobeAcrobatWebkit();
};

if (checkAdobeArcobat())
	init_pdf();
else
	alert("您的浏览器不支持PDF文件预览，请安装 Adobe Reader");