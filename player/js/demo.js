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
			div.innerHTML = '<OBJECT id="theTurePlayerID" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="100%" height="100%" volume="50">'
							+'<PARAM NAME="URL" VALUE="'+ config.filename +'">'
							+'<PARAM NAME="FileName" VALUE="'+ config.filename +'">'
							+'<PARAM NAME="rate" VALUE="1">'
							+'<PARAM NAME="balance" VALUE="0">'
							+'<PARAM NAME="currentPosition" VALUE="39.3594724">'
							+'<PARAM NAME="defaultFrame" VALUE="">'
							+'<PARAM NAME="playCount" VALUE="1">'
							+'<PARAM NAME="autoStart" VALUE="0">'
							+'<PARAM NAME="currentMarker" VALUE="0">'
							+'<PARAM NAME="invokeURLs" VALUE="-1">'
							+'<PARAM NAME="baseURL" VALUE="">'
							+'<PARAM NAME="volume" VALUE="50">'
							+'<PARAM NAME="mute" VALUE="0">'
							+'<PARAM NAME="uiMode" VALUE="full">'
							+'<PARAM NAME="stretchToFit" VALUE="-1">'
							+'<PARAM NAME="windowlessVideo" VALUE="0">'
							+'<PARAM NAME="enabled" VALUE="-1">'
							+'<PARAM NAME="enableContextMenu" VALUE="-1">'
							+'<PARAM NAME="fullScreen" VALUE="0">'
							+'<PARAM NAME="SAMIStyle" VALUE="">'
							+'<PARAM NAME="SAMILang" VALUE="">'
							+'<PARAM NAME="SAMIFilename" VALUE="">'
							+'<PARAM NAME="captioningID" VALUE="">'
							+'<PARAM NAME="enableErrorDialogs" VALUE="0">'
							+'<PARAM NAME="_cx" VALUE="14076">'
							+'<PARAM NAME="_cy" VALUE="10451">'
							+'<embed src="'+ config.filename +'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" ></embed>'
							+'</OBJECT>';
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