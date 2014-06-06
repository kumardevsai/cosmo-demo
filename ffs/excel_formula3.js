/**
	excel 公式计算器
**/
var ExcelFormula = window.ExcelFormula = (function() {

	"use strict";

	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	// 数据存储
	var storage;
	// 批量更新所有的数据
	var updateStorage = function updateStorage(storage_) {
		storage = storage_;
	};
	// 更新指定键的数据
	var updateOneStorage = function updateOneStorage(kv) {
		if (_hasOwnProperty.call(kv, "key") && _hasOwnProperty.call(kv, "val"))
			storage[kv.key] = kv.val;
	};

	var reg = {
		index: /([a-zA-Z]+)([1-9][0-9]*)/i,
		index_: /[a-zA-Z]+[1-9][0-9]*/ig
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
	};

	// 分解公式，去除范围表示
	function resolveIndexRange(formula) {
		return formula.replace(/((\$?([a-zA-Z]+)\$?([1-9][0-9]*)):(\$?([a-zA-Z]+)\$?([1-9][0-9]*)))/ig, function(m) {
			m = m.toUpperCase().replace(/\$/, "").split(":");
			var arr = getRange(m[0], m[1]);
			m = arr.join(",");
			return m.toUpperCase();
		});
	};

	// 带入计算公式
	function resolveformula(formula) {
		formula = formula.replace(/[\s\r\n]*/ig, "").replace(/^\=/, "").replace(/(int|trunc|round|roundup|rounddown|ceiling|floor|mround|even|odd|sum|sumif|product|sumproduct|sumsq|sumx2py2|sumx2my2|sumxmy2|subtotal|quotient|mod|abs|sign|gcd|lcm|seriessum|max|maxa|min|mina|average|averagea|count|counta|countblank)(?=\()/ig, function(m) {
			return "Formulae." + m.toUpperCase();
		});
		formula = resolveIndexRange(formula);
		formula = formula.replace(/(\$?([a-zA-Z]+)\$?([1-9][0-9]*))/ig, function(m) {
			m = m.toUpperCase().replace(/\$/g, "");
			return m;
		});
		return formula;
	};

	// 获取单元格索引
	function getIndexes(formula) {
		return formula.match(reg.index_);
	};

	// 根据单元格索引执行对应的函数
	function excute(index, flag) {
		index = index.toUpperCase();
		if (reg.index.test(index)) {
			if (index in Items)
				return Items[index].excute(flag);
		}
	};

	// 执行所有函数
	function excuteAll() {
		var arr = [];
		for (var index in Items)
			arr = arr.concat(excute(index, false));
		return arr;
	};

	// 执行处理
	function doExcute(formula) {
		if (/^\=/.test(formula)) {
			formula = resolveformula(formula);
			formula = formula.replace(reg.index_, function(m) {
				var val = storage[m.toUpperCase()].toString();
				val !== undefined ? val = val.replace(/[a-zA-Z]+\d*/ig, function(m) {
					return "\"" + m.toUpperCase() + "\"";
				}) : null;
				return val ? val : (/Formulae\.(count)/ig.test(formula) ? "" : "0");
			});
			if (/Formulae\.(count)/ig.test(formula)) {
				formula = formula.replace(/,+/g, ",").replace(/,\)/, ")");
			}
			// alert(formula);
			try {
				return {
					flag: true,
					value: eval(formula)
				};
			} catch (e) {
				return {
					flag: false,
					value: "表达式错误!"
				};
			}
		} else
			return {
				flag: true,
				value: formula
			};
	};

	// 获取属性数组
	function getPropertyArray(object) {
		var arr = [];
		for (var i in object) {
			if (_hasOwnProperty.call(object, i))
				arr.push(i);
		}
		return arr;
	};

	// 检查嵌套
	function checkCycle(index, arr) {
		var str = arr.join(",");
		if (str.indexOf(index + ",") !== -1 || str.indexOf("," + index) === str.length - index.length - 1 && str.indexOf("," + index) !== -1)
			return false;
		else {
			var flag = true;
			for (var i = 0; i < arr.length; i++) {
				var subIndex = arr[i];
				if (subIndex in Items) {
					flag = checkCycle(subIndex, getPropertyArray(Items[subIndex].subs));
				}
			}
			return flag;
		}
		return true;
	};

	// 表达式集合
	var Items = {};

	// 表达式类
	function Item(index, formula) {
		this.index = index ? index : null;
		this.formula = formula ? formula : null;
		this.subs = {};
		this.ubers = {};
	};

	// 原型
	Item.prototype = (function() {
		// 假定存在对应的index的item
		return {
			addSub: function(index) {
				this.subs[index] = Items[index];
			},
			removSub: function(index) {
				delete this.subs[index];
			},
			addUber: function(index) {
				this.ubers[index] = Items[index];
			},
			removeUber: function(index) {
				delete this.ubers[index];
			},
			add: function(arr) {
				var arr = arr || getIndexes(resolveformula(this.formula));
				if (arr && arr.length > 0) {
					for (var i = 0; i < arr.length; i++) {
						var index = arr[i].toUpperCase();
						if (!(index in Items))
							Items[index] = new Item(index);
						Items[index].addUber(this.index);
						this.addSub(index);
					}
				}
			},
			remove: function() {
				for (var i in this.subs)
					delete this.subs[i].ubers[this.index];
				var old = Items[this.index];
				delete Items[this.index];
				return old;
			},
			excute: function(flag) {
				var arr = [];
				if (this.formula) {
					var result = doExcute(this.formula);
					result.index = this.index;
					arr.push(result);
					if (result.flag === true)
						storage[this.index] = result.value;
				}
				if (flag !== false)
					arr = arr.concat(this.excuteUbers());
				return arr;
			},
			excuteUbers: function() {
				var arr = [];
				for (var index in this.ubers) {
					var result = this.ubers[index].excute();
					if (result.flag === true)
						storage[index] = result.value;
					arr = arr.concat(result);
				}
				return arr;
			}
		};
	}());

	// 设置一个表达式
	function setFormula(index, formula) {
		index = index.toUpperCase();
		if (reg.index.test(index)) {
			var item = new Item(index, formula);
			var old;
			if (index in Items) {
				old = Items[index].remove();
			}
			if (old)
				item.ubers = old.ubers;
			Items[index] = item;
			var arr = getIndexes(resolveformula(formula));
			var flag = checkExcute(index, formula, arr);
			if (flag)
				item.add(arr);
			else
				msgCenter.cycleException.add(index);
		}
	};

	// 更新表达式
	function updateFormulas(arr) {
		for (var i = 0; i < arr.length; i++) {
			var f = arr[i];
			setFormula(f.index, f.formula);
		}
		if (!msgCenter.empty())
			return {
				flag: false,
				message: msgCenter.getMsg()
			};
		else
			return {
				flag: true
			};
	};

	// 清空表达式
	function clearFormulas() {
		Items = {};
	};

	// 检查表达式
	function checkExcute(index, formula, arr) {
		if (/^=/.test(formula)) {
			return checkCycle(index, arr ? arr : getIndexes(resolveformula(formula)));
		}
		return false;
	};

	// 消息处理
	var msgCenter = {
		cycleException: {
			indexes: [],
			add: function(index) {
				this.indexes.push(index);
			},
			getMsg: function() {
				return "公式存在嵌套:" + this.indexes.join(",");
			},
			clear: function() {
				this.indexes = [];
			},
			empty: function() {
				return this.indexes.length === 0;
			}
		},
		empty: function() {
			return this.cycleException.empty();
		},
		getMsg: function() {
			return this.cycleException.getMsg();
		}
	};

	return {
		updateStorage: updateStorage,
		updateOneStorage: updateOneStorage,
		setFormula: setFormula,
		updateFormulas: updateFormulas,
		clearFormulas: clearFormulas,
		excute: excute,
		excuteAll: excuteAll,
		checkExcute: checkExcute
	};
}());