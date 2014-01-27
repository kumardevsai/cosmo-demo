var pdf_obj;

function init_pdf() {
	if (window.attachEvent) {
		document.getElementById("print_pdf").attachEvent('onclick', function() {
			pdf_obj.Print();
		});
		document.getElementById("print_pdf_all").attachEvent('onclick', function() {
			pdf_obj.PrintAll();
		});
		/**
		document.getElementById("print_pdf_allFit").attachEvent('onclick', function() {
			pdf_obj.printAllFit(true);
		});
		**/
		document.getElementById("print_pdf_getVersions").attachEvent('onclick', function() {
			alert(pdf_obj.GetVersions());
		});
		document.getElementById("print_pdf_goBackwardStack").attachEvent('onclick', function() {
			pdf_obj.goBackwardStack()
		});
		document.getElementById("print_pdf_goForwardStack").attachEvent('onclick', function() {
			pdf_obj.goBackwardStack()
		});
		document.getElementById("print_pdf_gotoFirstPage").attachEvent('onclick', function() {
			pdf_obj.gotoFirstPage()
		});
		document.getElementById("print_pdf_gotoNextPage").attachEvent('onclick', function() {
			pdf_obj.gotoNextPage()
		});
		document.getElementById("print_pdf_gotoPreviousPage").attachEvent('onclick', function() {
			pdf_obj.gotoPreviousPage()
		});
		/**
		document.getElementById("print_pdf_setCurrentHighlight").attachEvent('onclick', function() {
			pdf_obj.setCurrentHighlight(255, 255, 255, 1);
		});
		**/
		var print_pdf_setShowScrollBars = document.getElementById("print_pdf_setShowScrollBars");
		print_pdf_setShowScrollBars.attachEvent('onclick', function() {
			if (print_pdf_setShowScrollBars.getAttribute("sts") === 'on') {
				pdf_obj.setShowScrollBars(false);
				print_pdf_setShowScrollBars.setAttribute("sts", 'off');
				print_pdf_setShowScrollBars.value = '显示滚动条';
			} else {
				pdf_obj.setShowScrollBars(true);
				print_pdf_setShowScrollBars.setAttribute("sts", 'on');
				print_pdf_setShowScrollBars.value = '隐藏滚动条';
			}
		});
		var print_pdf_setShowToolBar = document.getElementById("print_pdf_setShowToolBar");
		print_pdf_setShowToolBar.attachEvent('onclick', function() {
			if (print_pdf_setShowToolBar.getAttribute('sts') === 'on') {
				pdf_obj.setShowToolBar(false);
				print_pdf_setShowToolBar.setAttribute('sts', 'off');
				print_pdf_setShowToolBar.value = '显示工具栏';
			} else {
				pdf_obj.setShowToolBar(true);
				print_pdf_setShowToolBar.setAttribute('sts', 'on');
				print_pdf_setShowToolBar.value = '隐藏工具栏';
			}
		});

		// 预览按钮
		document.getElementById('pdf_view').attachEvent('onclick', function() {
			var file = document.getElementById('pdf_file');
			if (file.value) {
				// 获取iframe
				var win = document.getElementById('pdf_iframe').contentWindow;
				var pdf_one = win.document.getElementById('pdf_one');
				pdf_obj = pdf_one.object;
				/**
					pdf_obj.loadFile(file.value);
				**/
				pdf_obj.src = file.value;
				/**
					TODO 探查pdf文件资源是否已经下载完成
				**/
				setTimeout(function() {
					pdf_obj.Print();
				}, 500);
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