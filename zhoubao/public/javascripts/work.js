(function() {
	var newHolderBtn;
	window.onload = Inits;

	function Inits() {
		newHolderBtn = document.getElementById("newHolderBtn");
		AttachEvent(newHolderBtn , "click" , newHolder , false);
	};

	function newHolder(){
		
	};

}());