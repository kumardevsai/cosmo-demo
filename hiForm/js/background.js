var load = function(tabId) {
	var memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new CookieStorage();
	if (memory['autoCatch'] !== 'false') {
		chrome.tabs.get(tabId, function(tab) {
			var url = tab.url.toLowerCase();
			if (memory['isFilterParams'] === 'true') {
				if (url.indexOf('?') !== -1)
					url = url.substring(0, url.indexOf('?'));
				else
					url = url;
			}
			openDatabase(function() {
				fetchListByHttpIndex(url, function(item) {
					chrome.tabs.executeScript(tabId, {
						file: 'js/query.js',
						allFrames: true,
						runAt: "document_end"
					}, function(result) {
						chrome.tabs.sendMessage(tabId, {
							http: item.http.toLowerCase(),
							username: item.username,
							password: item.password,
							usernameBindId: item.usernameBindId,
							passwordBindId: item.passwordBindId
						}, function(response) {});
					});
				});
			});
		});
	}
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	var tabId = activeInfo.tabId;
	load(tabId);
});
chrome.tabs.onUpdated.addListener(function(tabId) {
	load(tabId);
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	chrome.browserAction.setPopup({
		popup: '../hiform.html'
	});
});