/**
	excel 公式计算器
**/
var ExcelFormula = window.ExcelFormula = (function() {

	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	// 数据存储
	var storage;
	// 批量更新所有的数据
	var updateStorage = function updateStorage(storage_) {
		storage = storage_;
	};
	// 更新指定键的数据
	var updateStorageKV = function updateStorageKV(kv) {
		if (_hasOwnProperty(kv, "key") && _hasOwnProperty(kv, "value"))
			storage[kv.key] = kv.value;
	};

	var reg = {
		index: /([a-zA-Z]+)([1-9][0-9]*)/
	};

	// 根据参数范围获取参数数组
	function getRange(start, end) {
		var arr = [];
		var obj = getAdaptRange(start, end);
		start = obj.start;
		end = obj.end;
		start = start.match(reg.index);
		end = end.match(reg.index);
		for (var i = start[2]; i <= end[2]; i++) {
			var c1 = TableUtils.char2Num(start[1]);
			var c2 = TableUtils.char2Num(end[1]);
			if (c1 <= c2) {
				for (var j = c1; j <= c2; j++) {
					arr.push(TableUtils.num2Char(j) + i);
				}
			} else {
				for (var j = c2; j <= c1; j++) {
					arr.push(TableUtils.num2Char(j) + i);
				}
			}
		}
		return arr;
	};

	// 取得适合的范围
	function getAdaptRange(start, end) {
		var a, b, c, d;
		start = start.match(reg.index);
		end = end.match(reg.index);
		if (start[2] < end[2]) {
			b = start[2];
			d = end[2];
		} else {
			b = end[2];
			d = start[2];
		}
		var e = TableUtils.char2Num(start[1]),
			f = TableUtils.char2Num(end[1]);
		if (e < f) {
			a = TableUtils.num2Char(e);
			c = TableUtils.num2Char(f);
		} else {
			a = TableUtils.num2Char(f);
			c = TableUtils.num2Char(e);
		}
		return {
			start: a + b,
			end: c + d
		};
	}

	function excute(fmla) {
		if (/^\=/.test(fmla)) {
			fmla = fmla.replace(/[\s\r\n]*/ig, "").replace(/^\=/, "").replace(/(int|trunc|round|roundup|rounddown|ceiling|floor|mround|even|odd|sum|sumif|product|sumproduct|sumsq|sumx2py2|sumx2my2|sumxmy2|subtotal|quotient|mod|abs|sign|gcd|lcm|seriessum|max|maxa|min|mina|average|averagea|count|counta|countblank)(?=\()/ig, function(m) {
				return "Formulae." + m.toUpperCase();
			}).replace(/((\$?([a-zA-Z]+)\$?([1-9][0-9]*)):(\$?([a-zA-Z]+)\$?([1-9][0-9]*)))/ig, function(m) {
				m = m.toUpperCase().replace(/\$/, "").split(":");
				var arr = getRange(m[0], m[1]);
				if (/Formulae\.(sum)/ig.test(fmla))
					m = arr.join("+");
				else
					m = arr.join(",");
				return m.toLowerCase();
			});
			fmla = fmla.replace(/(\$?([a-zA-Z]+)\$?([1-9][0-9]*))/ig, function(m) {
				m = m.replace(/\$/, "");
				var val = storage[m.replace(/\$/g, "")];
				val !== undefined ? val = val.replace(/[a-zA-Z]+\d*/ig, function(m) {
					return "\"" + m + "\"";
				}) : null;
				return val !== undefined ? val : (/Formulae\.(count)/ig.test(fmla) ? "" : "0");
			});
			if (/Formulae\.(count)/ig.test(fmla)) {
				fmla = fmla.replace(/,+/g, ",").replace(/,\)/, ")");
			}
			alert(fmla);
			try {
				return {
					flag: true,
					value: eval(fmla)
				};
			} catch (e) {
				return {
					flag: false,
					value: "错误：表达式错误!"
				};
			}
		} else
			return {
				flag: true,
				value: fmla
			};
	};

	return {
		updateStorage: updateStorage,
		updateStorageKV: updateStorageKV,
		excute: excute
	};
}());