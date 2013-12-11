var topAdTitme2 = 15;
var topAdTitme3;

function topAdFun() {
	$('.topAd').animate({
		height: 0
	}, "fast");
	$('.tpAdd2').animate({
		height: 33
	}, "fast");
	if ($(window).scrollTop() > 33) {
		$('.navDiv').animate({
			top: 0
		}, "fast");
	} else {
		$('.navDiv').animate({
			top: 33
		}, "fast");
	}
}

function topAdTimeFun() {
	if (topAdTitme2 >= 0) {
		topAdTitme2--;
		$('.topAd').find('.close').find('span').html(topAdTitme2);
	}
}
//--
var clientTime;
var icoTop = new Array();
var icoTopImg = new Array();

function clientImg() {
	$('.Client').find('.imgDiv').find('.ico').each(function(i) {
		if (i < $('.Client').find('.imgDiv').find('.ico').length - 1) {
			icoTopImg[i].animate({
				top: icoTop[i] - parseInt(5 * Math.random()) - 1
			}, 800, function() {
				icoTopImg[i].animate({
					top: icoTop[i]
				}, 500);
			});
		} else {
			icoTopImg[i].animate({
				top: icoTop[i] - 2
			}, 800, function() {
				icoTopImg[i].animate({
					top: icoTop[i]
				}, 500, function() {
					clientImg();
				});
			});
		}
	})
}
//--
var newsListNow = 0;

function newsListFun() {
	$('.newsList').find('.btnDiv').animate({
		left: ($(window).width() - 980) / 2
	}, 500);
	$('.newsList').find('.listDiv').width($(window).width());
	$('.newsList').find('.listDiv').css('padding-left', ($(window).width() - 980) / 2 + 167);
	$('.newShow').animate({
		left: ($(window).width() - 980) / 2 + 167
	}, 500);
}

function newsListFun2(a) {
	$('.newsList').find('.listDiv').animate({
		scrollLeft: $('.newsList').find('.listDiv').scrollLeft() + a
	}, 500);
	$('.newsList').find('.list').removeClass('listNow');
	$('.newsList').find('.list').eq(newsListNow).addClass('listNow');
	$('.newsList').find('.list').eq(newsListNow + 1).addClass('listNow');
}
//--
function NetworkFastFun() {
	$('.NetworkFast').animate({
		right: ($(window).width() - 980) / 2
	}, 500);
}
//--
function aboutFastFun() {
	$('.aboutFast').animate({
		right: ($(window).width() - 980) / 2 - 95
	}, 500);
}
//--
function ProgramFastFun() {
	$('.ProgramFast').animate({
		right: ($(window).width() - 980) / 2 - 95
	}, 500);
}
//--
function caseBtnFun() {
	$('.caseBtn').animate({
		left: ($(window).width() - 980) / 2
	}, 500);
}
//--
var imgScrollNum2 = new Array();
for (i = 0; i < 50; i++) {
	imgScrollNum2[i] = 0;
}

function imgScrollRight2(a, b, c, d) {
	a.stop();
	if (imgScrollNum2[d] < b) {
		imgScrollNum2[d]++;
		a.animate({
			scrollLeft: imgScrollNum2[d] * c
		}, "slow");
	}
}

function imgScrollLeft2(a, b, c, d) {
	a.stop();
	if (imgScrollNum2[d] > 0) {
		imgScrollNum2[d]--;
		a.animate({
			scrollLeft: imgScrollNum2[d] * c
		}, "slow");
	}
}
//--
function caseSideFun() {
	$('.caseSide').animate({
		right: ($(window).width() - 980) / 2
	}, 500);
	$('.caseShowBtn').animate({
		right: ($(window).width() - 980) / 2 + 53
	}, 500);
}
//--	
function Vertical_scrollFun(a) {
	a.jscroll({
		W: "5px",
		BgUrl: "url(image/Vertical_scrollBg1.gif)"
		//,Bg:"#eee"
		,
		Bar: {
			Bd: {
				Out: "none",
				Hover: "none"
			},
			Bg: {
				Out: "-5px -0px repeat-y",
				Hover: "-5px -0px repeat-y",
				Focus: "-5px -0px repeat-y"
			}
		},
		Btn: {
			btn: false,
			uBg: {
				Out: "-0px -0px repeat-y",
				Hover: "-0px -0px repeat-y",
				Focus: "-0px -0px repeat-y"
			},
			dBg: {
				Out: "none",
				Hover: "none",
				Focus: "none"
			}
		},
		Fn: function() {}
	});
}
//--
var indexFlashNow = 0;

function indexFlash_fun() {
	$('.indexFlash').find('.list').find('li').eq(indexFlashNow).fadeOut("slow");
	$('.indexFlash').find('.btnDiv').find('li').fadeTo(100, 0.3);
	if (indexFlashNow < $('.indexFlash').find('.list').find('li').length - 1) {
		indexFlashNow++;
	} else {
		indexFlashNow = 0;
	}
	$('.indexFlash').find('.btnDiv').find('li').eq(indexFlashNow).fadeTo(100, 1);
	$('.indexFlash').find('.list').find('li').eq(indexFlashNow).fadeIn("slow");
}
//--获取url参数	
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}