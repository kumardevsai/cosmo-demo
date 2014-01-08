if (window.attachEvent)
	window.attachEvent('onload', addPlay);
else if (window.addEventListener)
	window.addEventListener('load', addPlay, false);

function addPlay() {
	var inter = setInterval(function() {
		var div = document.getElementById('divcon0');
		if (div) {

			var config = {
				filename: '../../FileAccess.aspx?FileName=/reports/suppot_proc/播放器/media/1.mp3'
			};

			var player_object = document.createElement('object');
			player_object.id = 'theTurePlayerID';
			player_object.setAttribute('classid', 'CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6');
			player_object.style.cssText = 'width:100%;height:100%;';
			player_object.setAttribute('volumn', 50);
			// for chrome but doesn't work
			player_object.setAttribute('data', config.filename);

			player_object.appendChild(createPlayerObjectParam('URL', config.filename));
			player_object.appendChild(createPlayerObjectParam('rate', 1));
			player_object.appendChild(createPlayerObjectParam('balance', 0));
			player_object.appendChild(createPlayerObjectParam('currentPosition', '39.3594724'));
			player_object.appendChild(createPlayerObjectParam('defaultFrame', ''));
			player_object.appendChild(createPlayerObjectParam('playCount', 1));
			player_object.appendChild(createPlayerObjectParam('autoStart', 0));
			player_object.appendChild(createPlayerObjectParam('currentMarker', 0));
			player_object.appendChild(createPlayerObjectParam('invokeURLs', -1));
			player_object.appendChild(createPlayerObjectParam('baseURL', ''));
			player_object.appendChild(createPlayerObjectParam('volume', 50));
			player_object.appendChild(createPlayerObjectParam('mute', 0));
			player_object.appendChild(createPlayerObjectParam('uiMode', 'full'));
			player_object.appendChild(createPlayerObjectParam('stretchToFit', -1));
			player_object.appendChild(createPlayerObjectParam('windowlessVideo', 0));
			player_object.appendChild(createPlayerObjectParam('enabled', -1));
			player_object.appendChild(createPlayerObjectParam('enableContextMenu', -1));
			player_object.appendChild(createPlayerObjectParam('fullScreen', 0));
			player_object.appendChild(createPlayerObjectParam('SAMIStyle', ''));
			player_object.appendChild(createPlayerObjectParam('SAMILang', ''));
			player_object.appendChild(createPlayerObjectParam('SAMIFilename', ''));
			player_object.appendChild(createPlayerObjectParam('captioningID', ''));
			player_object.appendChild(createPlayerObjectParam('enableErrorDialogs', 0));
			player_object.appendChild(createPlayerObjectParam('_cx', 14076));
			player_object.appendChild(createPlayerObjectParam('_cy', 10451));
			player_object.appendChild(createPlayerObjectParam('autoplay', false));

			div.appendChild(player_object);
			clearInterval(inter);
		}
	}, 10);
};

function createPlayerObjectParam(name, value) {
	var param = document.createElement('param');
	param.setAttribute('name', name);
	param.setAttribute('value', value);
	return param;
};

function configParams(options) {

};