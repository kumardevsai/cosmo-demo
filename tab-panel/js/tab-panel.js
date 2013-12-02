var setMxwTabPanel = function(controlGroups, frameId) {
	var setTabStyle = function(tabId, direction) {
		var tab = document.getElementById(tabId);
		if (tab)
			tab.style.cssText += getTabStyleRules(direction);
	};
	if (Object.prototype.toString.call(controlGroups) === '[object Array]') {
		for (var i = 0; i < controlGroups.length; i++) {
			var tabDef = controlGroups[i];
			setTabStyle(tabDef.tabId, tabDef.direction);
		}
	} else
		setTabStyle(controlGroups.tabId, controlGroups.direction); // 省去判断object
};

var tabStyleRules = {
	left: function() {
		return 'float:left;margin-left:0px;';
	},
	top: function() {
		return 'margin-bottom:0px;';
	},
	right: function() {
		return 'float:right;margin-right:0px;';
	},
	bottom: function() {
		return 'margin-top:0px;'
	}
};

var getTabDefRules = function(tabDef) {
	var stys = tabDef.direction;
	stys = stys === '' ? ['left', 'top'] : stys.split(' ');
	if (stys.length === 1) {
		switch (stys[0]) {
			case 'left' || 'right':
				stys.push('top');
				break;
			case 'top':
				stys.push('left');
				break;
			case 'bottom':
				stys.push('right');
				break;
			default:
				break;
		}
	}
	return stys;
};

var getTabStyleRules = function(tabDef) {
	var stys = getDirectionDefRules(tabDef);
	var styles = '';
	for (var i = 0; i < stys.length; i++) {
		styles += directionStyleRules[stys[i]] ? directionStyleRules[stys[i]] : '';
	}
	return styles;
};

var getTabListStyleRules = function(tabdef) {

};



if (window.attachEvent)
	window.attachEvent('onload', setTab);
else if (window.addEventListener)
	window.addEventListener('load', setTab, false);

function setTab() {
	setMxwTabPanel([{
		tabId: divcon1,
		direction: 'bottom right'
	}, {
		tabId: 'divcon4',
		direction: 'top'
	}, {
		tabId: 'divcon5',
		direction: 'left'
	}, {
		tabId: 'divcon51',
		direction: 'right'
	}], 'iframe5');
};