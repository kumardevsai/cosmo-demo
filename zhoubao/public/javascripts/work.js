(function() {
	var templateBtn;
	window.onload = Inits;

	function Inits() {
		templateBtn = document.getElementById("templateBtn");
		AttachEvent(templateBtn, "click", collapseTemplateTree, false);
	};

	function collapseTemplateTree() {

	};
}());