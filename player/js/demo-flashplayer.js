if (window.attachEvent)
	window.attachEvent('onload', addPlay);
else if (window.addEventListener)
	window.addEventListener('load', addPlay, false);

function addPlay() {
	var inter = setInterval(function() {
		var div = document.getElementById('divcon0');
		if (div) {

			var config = {
				filename: '../../FileAccess.aspx?FileName=/reports/suppot_proc/player/media/1.mp3'
			};
			div.innerHTML = '<OBJECT id="theTurePlayerID" classid="D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0">'
							+'<param name=quality value=High>'
							+'<param name="_cx" value="12383">'
							+'<param name="_cy" value="1588">'
							+'<param name="FlashVars" value>'
							+'<param name="Src" ref value="'+ config.filename +'">'
							+'<param name="WMode" value="Window">'
							+'<param name="Play" value="false">'
							+'<param name="Loop" value="false">'
							+'<param name="SAlign" value>'
							+'<param name="Align" value>'
							+'<param name="Menu" value="true">'
							+'<param name="Base" value>'
							+'<param name="AllowScriptAccess" value="always">'
							+'<param name="Scale" value="ShowAll">'
							+'<param name="DeviceFont" value="0">'
							+'<param name="EmbedMovie" value="0">'
							+'<param name="BGColor" value>'
							+'<param name="SWRemote" value>'
							+'<param name="MovieData" value>'
							+'<embed pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" src="http://p.you.video.sina.com.cn/swf/bokePlayer20140107_V4_1_42_34.swf" width="640" height="516" id="myMovie" name="myMovie" allownetworking="all" allowscriptaccess="always" wmode="transparent" allowfullscreen="true" quality="high" bgcolor="#000000" flashvars="container=myflashBox;pid=478;tid=;autoLoad=1;as=1;lightBtn=1;popBtn=1;wideBtn=1;tj=0;head=0;share=1;oldApi=0;continuePlayer=1;actlogActive=1;realfull=1;moz=1">'
							+'</embed>'
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