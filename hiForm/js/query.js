chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (document.getElementById(request.usernameBindId))
		document.getElementById(request.usernameBindId).value = request.username;
	if (document.getElementById(request.passwordBindId))
		document.getElementById(request.passwordBindId).value = request.password;
});