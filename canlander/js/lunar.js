function getaFormatDate(date, weekFormat) {
	var today;
	if (date)
		today = date;
	else
		today = new Date();
	return {
		year: today.getFullYear(),
		month: today.getMonth() + 1,
		day: today.getUTCDate(),
		week: function() {
			var day = today.getDay();
			if (weekFormat === true) {
				switch (day) {
					case 0:
						return '星期日';
					case 1:
						return '星期一';
					case 2:
						return '星期二';
					case 3:
						return '星期三';
					case 4:
						return '星期四';
					case 5:
						return '星期五';
					case 6:
						return '星期六';
				}
			} else
				return day;
		}
	};
};

var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
	return (m >> n) & 1;
}

function e2c() {
	TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
	var total, m, n, k;
	var isEnd = false;
	var tmp = TheDate.getYear();
	if (tmp < 1900) {
		tmp += 1900;
	}
	total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

	if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
		total++;
	}
	for (m = 0;; m++) {
		k = (CalendarData[m] < 0xfff) ? 11 : 12;
		for (n = k; n >= 0; n--) {
			if (total <= 29 + GetBit(CalendarData[m], n)) {
				isEnd = true;
				break;
			}
			total = total - 29 - GetBit(CalendarData[m], n);
		}
		if (isEnd) break;
	}
	cYear = 1921 + m;
	cMonth = k - n + 1;
	cDay = total;
	if (k == 12) {
		if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth = 1 - cMonth;
		}
		if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth--;
		}
	}
}

function GetcDateString_Y() {
	var tmp = "";
	tmp += tgString.charAt((cYear - 4) % 10);
	tmp += dzString.charAt((cYear - 4) % 12);
	/**
	tmp += "(";
	tmp += sx.charAt((cYear - 4) % 12);
	tmp += ") ";
	**/
	tmp += "年";
	return tmp;
}

function GetcDateString_M_D() {
	var tmp = "";
	if (cMonth < 1) {
		tmp += "(闰)";
		tmp += monString.charAt(-cMonth - 1);
	} else {
		tmp += monString.charAt(cMonth - 1);
	}
	tmp += "月";
	tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	if (cDay % 10 != 0 || cDay == 10) {
		tmp += numString.charAt((cDay - 1) % 10);
	}
	return tmp;
};

function GetLunarDay(solarYear, solarMonth, solarDay) {
	//solarYear = solarYear<1900?(1900+solarYear):solarYear;
	if (solarYear < 1921 || solarYear > 2020) {
		return "";
	} else {
		solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
		e2c(solarYear, solarMonth, solarDay);
		return {
			year: GetcDateString_Y(),
			month_day: GetcDateString_M_D()
		};
	}
}

var D = new Date();
var yy = D.getFullYear();
var mm = D.getMonth() + 1;
var dd = D.getDate();
var ww = D.getDay();
var ss = parseInt(D.getTime() / 1000);
if (yy < 100) yy = "19" + yy;

function GetCNDate() {
	return GetLunarDay(yy, mm, dd);
}


(function(){
	var today = getaFormatDate(null, true);
	document.write("<table border='0' style='font-size: 8pt; font-family:Tahoma;border:1px solid #0099ff;' cellspacing='0' width='90'  height='110' cellpadding='0'");
	document.write("<tr><td align='center' style='border: 1 solid #0099ff;padding-top:4px'><b><font color=#3366cc>" + today.year + "年" + today.month + "月</font><br><span style='font-family: Arial Black;font-size:18pt;color:#FF0000'>" + today.day + "</span><br><br><span style='FONT-SIZE: 10.5pt;color:#000000'>");
	document.write(today.week() + "</span><br>" + "<hr width='60' ></b><font color=#666666>");
	var lunar_ymd = GetCNDate();
	document.write(lunar_ymd.year + "<br>" + lunar_ymd.month_day + "</td></tr></table>");
}());