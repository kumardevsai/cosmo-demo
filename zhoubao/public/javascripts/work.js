(function() {
	var menuLeft = document.getElementById('cbp-spmenu-s1'),
		body = document.body;
	var collapsePanel = document.getElementById("collapsePanel");
	var collpase = function() {
		return function() {
			showLeftPanel();
		};
	};

	function hideLeftPanel() {
		classie.toggle(showLeft, 'disabled');
	};

	function showLeftPanel() {
		classie.toggle(menuLeft, 'cbp-spmenu-open');
	};

	showLeftPanel();

	utils.AttachEvent(collapsePanel, "click", collpase(), false);
}());