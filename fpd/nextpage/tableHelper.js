var nextPageHelper = (function() {

	var tableContainer;

	// 绑定表格容器
	function bindTable(tbContainer) {
		tableContainer = tbContainer;
	};

	// 初始化
	function init(options) {
		bindTable(options.tableContainer);
	};

	function readXmlObjAttrs(xmlobj, flag) {
		var row_num, page_all_num;
		var page_size = attr(tableContainer, 'PageSize') == null ? "" : attr(tableContainer, 'PageSize');
		if (xmlobj.attributes.getNamedItem('Row'))
			row_num = xmlobj.attributes.getNamedItem('Row').value;
		if (flag === false) {
			page_size = row_num;
			attr(tableContainer, "PageSize", row_num);
		}
		attr(tableContainer, "RowCount", row_num);

		// 计算得到总页数
		if (row_num != "" && page_size != "") {
			page_all_num = Math.floor(parseInt(row_num) / parseInt(page_size));
			if (parseInt(row_num) / parseInt(page_size) != page_all_num) {
				page_all_num = page_all_num + 1;
			}
		}
		attr(tableContainer, "PageAllNum", page_all_num);
		if (flag === false) {
			attr(tableContainer, 'PageNum', 1);
		} else {
			if (attr(tableContainer, 'PageNum') == null) {
				attr(tableContainer, 'PageNum', 1);
			} else
				attr(tableContainer, 'PageNum', Number(attr(tableContainer, 'PageNum')) + 1);
		}
	};

	// 下一页
	function next(flag) {
		if (checkNext()) {
			var url = "Server/DataAccess.aspx?objpath=" + escape(Request.QueryString["objpath"]) + "&command=query" + "&DataSource=" + attr(tableContainer, 'DataSource') + "&PageSize=" + (flag === false ? "" : attr(tableContainer, 'PageSize')) + "&Page=" + (flag === false ? 1 : (attr(tableContainer, 'PageNum') == null ? 1 : parseInt(attr(tableContainer, 'PageNum')) + 1)) + "&LineSize=" + (attr(tableContainer, 'LineSize') == null ? 1 : attr(tableContainer, 'LineSize')) + "&sortfield=" + SortListObj.ToString() + "&temp=" + Math.random();
			new Ajax(
				url,
				function(xml) {
					if (xml.indexOf("错误:") != -1) {
						alert(xml);
						return false;
					}
					var xmlobj = LoadXml(xml);
					var objdiv = CreateTable(xmlobj, tableContainer);
					appendNext(objdiv, flag);
					readXmlObjAttrs(xmlobj, flag);
				}
			).doPost(pdfobj.Param.ToXml());
		}
	};

	function nextAll() {
		if (checkNext())
			next(false);
	};

	function checkNext() {
		var page_size = parseInt(attr(tableContainer, "RowCount")) - parseInt(attr(tableContainer, "PageNum")) * parseInt(attr(tableContainer, "PageSize"));
		if (page_size > 0)
			return true;
		else
			return false;
	};

	// 下一页显示
	function appendNext(objdiv, flag) {
		var trs = objdiv.children[0].tBodies[0].children;
		var i = 0,
			j = 0
			len = trs.length,
			tbody_ = tableContainer.children[1].children[0].tBodies[0];
		if (flag === false)
			i = j = tbody_.children.length;
		for (i; i < len; i++) {
			if (trs[j])
				tbody_.appendChild(trs[j]);
		}
	};

	return {
		init: init,
		next: next,
		nextAll: nextAll
	};
}());