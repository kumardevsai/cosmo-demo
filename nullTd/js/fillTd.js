function eachForTable(tableId, achar) {
	var tb_div = document.getElementById(tableId);
	var table = tb_div.getElementsByTagName('table')[0];
	var tbody = table.tBodies[0];
	var mergeCols = attr(tbody, 'MergeCols').split(',');
	var max_row = parseInt(mergeCols.pop());
	for (var i = 0; i < tbody.children.length; i++) {
		for (var j = 0; j <= tbody.children[i].cells.length; j++) {
			var cell = tbody.children[i].cells[j];
			if (cell) {
				if (attr(cell, 'row') !== null && attr(cell, 'row') > max_row)
					fill(cell, achar);
			}
		}
	}
};

function fill(td, achar) {
	var html_ = td.innerHTML;
	if (html_.trim() === '')
		td.innerHTML = '<span nullFill=true><font color="blue">' + achar + '</font></span>';
};