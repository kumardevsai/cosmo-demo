// VBScript代码转换 ， 未完成
function TimeAdd(UTC, T) {
	var lusMinus, DST, y;
	if (T.charAt("0") === "-") {
		PlusMinus = -1;
	} else {
		PlusMinus = 1;
	}
	UTC = UTC.substring(5);
	UTC = UTC.substring(UTC.length - 4);
	y = new Date(UTC).getYear();
	TimeAdd = DateAdd("n", (parseInt(T.substring(2, 4)) * 60 + parseInt(T.substring(4, 6))) * PlusMinus, UTC);
	If Mid(T, 6, 1) = "*"
	And DateSerial(y, 4, (9 - Weekday(DateSerial(y, 4, 1)) mod 7)) <= TimeAdd And DateSerial(y, 10, 31 - Weekday(DateSerial(y, 10, 31))) >= TimeAdd Then
	if (T.substring(6, 7) === "*" && )
};

function DateAdd(strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
		case 's':
			return new Date(Date.parse(dtTmp) + (1000 * Number));
		case 'n':
			return new Date(Date.parse(dtTmp) + (60000 * Number));
		case 'h':
			return new Date(Date.parse(dtTmp) + (3600000 * Number));
		case 'd':
			return new Date(Date.parse(dtTmp) + (86400000 * Number));
		case 'w':
			return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
		case 'q':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
		case 'm':
			return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
		case 'y':
			return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
	}
}