var SearchGroup = (function() {

	var defaults = {
		template: "<ul class='dp-ul dp-ul-normal'>{<li value='{value}' class='dp-li dp-li-normal'>{text}</li>}*</ul>"
	};

	function setDefaults(options) {
		for (var i in options) {
			if (options.hasOwnProperty(i) && defaults.hasOwnProperty(i))
				defaults[i] = options[i];
		}
	};

	var regExps = {
		templateItem: /<(\.*)>\*/
	};

	function SearchInput(id, text) {
		this.id = id ? id : "";
		this.text = text ? text : "";
		this.opts = [];
		this.showed = false;
	};

	SearchInput.prototype = (function() {
		return {
			setOpts: function(opts) {
				this.opts = opts;
			},
			addOpt: function(opt) {
				this.opts.push(opt);
			},
			search: function(keyword) {
				var reg = new RegExp("^" + (keyword !== undefined ? keyword : this.text) + "");
				var arr = [],
					i = 0,
					len = this.opts.length;
				for (i; i < len; i++) {
					var op = this.opts[i];
					if (reg.test(op.value))
						arr.push(op);
				}
				return arr;
			},
			hideDropDown: function() {
				if (searchInputDropDowns[this.id])
					searchInputDropDowns[this.id].style.display = "none";
				this.showed = false;
			},
			showDropDown: function() {
				if (searchInputDropDowns[this.id])
					searchInputDropDowns[this.id].style.display = "";
				this.showed = true;
			}
		};
	}());

	var searchInputs = {};
	var searchInputElements = {};
	var searchInputSelectElements = {};
	var searchInputDropDowns = {};

	function bindOptList(sel) {
		var si = new SearchInput(sel.id);
		si.setOpts(getOpts(sel));
		searchInputs[sel.id] = si;
	};

	function Opt(value, text) {
		this.value = value ? value : "";
		this.text = text ? text : "";
		this.showed = false;
	};

	Opt.prototype = (function(){
		return {
			show : function(){
				
			}
		};
	}());

	function getOpts(sel) {
		var i = 0,
			len = sel.options.length,
			arr = [];
		for (i; i < len; i++) {
			var op = sel.options[i];
			arr.push(new Opt(op.value, op.innerHTML));
		}
		return arr;
	};

	var searchHelper = function(searchInput, input) {
		return function() {
			searchInput.text = input.value;
			var arr = searchInput.search();
		};
	};

	function createSearch(sel, input) {
		var id = sel.id;
		if (!searchInputs[id]) {
			bindOptList(sel);
			searchInputElements[id] = input;
			searchInputSelectElements[id] = sel;
			searchInputDropDowns[id] = createDropDown(searchInputs[id]);
			AttachEvent(input, "keyup", searchHelper(searchInputs[id], input), false);
		}
	};

	function updateInputText(id, text) {
		if (searchInputs[id])
			searchInputs[id].text = text;
	};

	function createDropDown(searchInput) {
		var itemTemplate = defaults.template.match(regExps.templateItem);
		var temp = document.createElement("div");
		temp.innerHTML = defaults.template.replace(regExps.templateItem, "");
		var ul = temp.children[0];
		var arr = searchInput.opts,
			i = 0,
			len = arr.length,
			str;
		for (i; i < len; i++) {
			var op = arr[i];
			str += itemTemplate.replace(/\{value\}/, op.value).replace(/\{text\}/, op.text);
		}
		ul.innerHTML = str;
	};

	return {
		createSearch: createSearch,
		updateInputText: updateInputText,
		setDefaults: setDefaults
	};
}());