var MSONumberFormatter = window.MSONumberFormatter = (function(win, global) {
	var reg = {
		base: { // 正整数字符
			_int: /^\d+$/,
			// -整数
			_int_minus: /^-\d+$/,
			// 正浮点
			_float: /^\d+\.\d+$/,
			// 负浮点
			_float_minus: /^-\d+\.\d+$/,
			// 普通字符
			_string: /^\w+/,
			// 空字符
			_empty: /^$/,
			// -符号
			_minus: /-/,
			// 任意字符
			_any: /.*/
		},
		mso: {
			/**
				”G/通用格式”：以常规的数字显示，相当于”分类”列表中的”常规”选项。
				例：代码：”G/通用格式”。10显示为10；10.1显示为10.1。
			**/
			_G: /^G/,
			/**
				“#”：数字占位符。只显有意义的零而不显示无意义的零。小数点后数字如大于”#”的数量，则按”#”的位数四舍五入。
				例：代码：”###.##”,12.1显示为12.10;12.1263显示为：12.13
			**/
			_DP: /^#*(\.#+)?$/,
			/**
				”0”：数字占位符。如果单元格的内容大于占位符，则显示实际数字，如果小于点位符的数量，则用0补足。
				例：代码：”00000”。1234567显示为1234567；123显示为00123
				代码：”00.000”。100.14显示为100.140；1.1显示为01.100
			**/
			_D0: /^0*(\.0+)?$/,
			/**
				”@”：文本占位符，如果只使用单个@，作用是引用原始文本，
				要在输入数字数据之后自动添加文本，使用自定义格式为：”文本内容”@；要在输入数字数据之前自动添加文本，使用自定义格式为：@”文本内容”。@符号的位置决定了Excel输入的数字数据相对于添加文本的位置。
				如果使用多个@，则可以重复文本。
				例：代码”；”集团”@”部”“，财务显示为：集团财务部
				代码”；@@@“，财务显示为：财务财务财务
			**/
			_W_AT: /^(".*")?@+(".*")?$/,
			/**
				”，”：千位分隔符
				例：代码” #,###“，12000显示为：12,000
			**/
			_K: /^#{1,}(,###)*$/,
			/**
				“%”：百分比。
				例：代码“#%”。“0.1”显示为“10%”
			**/
			_PS: /^#+(.#*)?%$/,
			/**
				“%”：百分比。
				例：代码“000.00%”。“0.1”显示为“100.00%”
			**/
			_P0: /^0+(.0*)?%/,
			/**
				货币
			**/
			_MONEY: /^(￥|\$)(#+(,#+)?)(0+(\.0+)?);(\[Red\]|-)?(￥|\$)(#+(,#+)?)(0+(\.0+)?)$/,
			/**
				会计 格式  _ * #,##0_ ;_ * -#,##0_ ;_ * "-"??_ ;_ @_ 
 			**/
			_FFS_0: /^\s*_*\s*\**\s*(#+(,#+)?)(0+(\.0+)?)\s*_*\s*;\s*_*\s*\**\s*(-)(#+(,#+)?)(0+(\.0+)?)\s*_*\s*;\s*_*\s*\**\s*\"(.*)\"\?*_*\s*;\s*_*\s*@\s*_*\s*$/,
			/**
				数字带小数点和千分符
			**/
			_ND: /^#+(.#*)0(\.0*)/
		}
	};

	var validation = (function() {
		var group = {
			"_G": "_int _int_minus _float _float_minus",
			"_DP": "_int _int_minus _float _float_minus",
			"_D0": "_int _int_minus _float _float_minus",
			"_W_AT": "_any",
			"_K": "_int _int_minus",
			"_PS": "_int _int_minus _float _float_minus",
			"_P0": "_int _int_minus _float _float_minus",
			"_MONEY": "_int _int_minus _float _float_minus",
			"_FFS_0": "_int _int_minus _float _float_minus",
			"_ND": "_int _int_minus _float _float_minus"
		};
		return {
			match: function(val, formation) {
				for (var i in group) {
					if (reg.mso[i].test(formation)) {
						var _key = group[i].split(" ");
						var len = _key.length;
						var j = 0;
						for (j; j < len; j++) {
							if (reg.base[_key[j]].test(val)) {
								return {
									r: true,
									m: {
										mso: i,
										base: _key[j]
									}
								};
							}
						}
					}
				}
				return {
					r: false,
					m: null
				};
			}
		};
	}());

	// 获取数据值的类型
	function getValType(val) {
		for (var i in reg.base) {
			if (reg.base[i].test(val))
				return i;
		}
		return null;
	};

	// 执行函数
	var excution = {
		// 返回原始的数据格式值
		_G: function(val, formation) {
			return val;
		},
		// 返回进位的数值
		_DP: function(val, formation) {
			// 小数点保留位数
			var decimalDigits = formation.split(".")[1] ? formation.split(".")[1].length : 0;
			return new Number(val).toFixed(decimalDigits);
		},
		// 返回以0补位的值
		_D0: function(val, formation) {
			var varry = val.split(".");
			var p = varry[0];
			// 获取小数点后的数值
			var l = varry[1];
			// 整数位数
			var intDigits = formation.split(".")[0].length;
			// 小数点位数
			var decimalDigits = formation.split(".")[1] ? formation.split(".")[1].length : 0;

			var s1;
			var s2;

			if (p.length >= intDigits)
				s1 = p;
			else
				s1 = fillDigits(intDigits - p.length, "0") + p;

			if (decimalDigits !== 0) {
				// 如果数值存在
				if (l) {
					// 数值长度小于保留位数
					if (l.length < decimalDigits) {
						// 用0补位
						s2 = l + fillDigits(decimalDigits - l.length, "0");
					}
					// 数值长度大于保留位
					else if (l.length > decimalDigits) {
						/**
						// 需要进位的数值大于5
						if (parseInt(l.charAt(decimalDigits)) >= 5) {
							// 进位操作
							var d = l.charAt(decimalDigits - 1);
							s2 = l.substring(0, decimalDigits - 1) + (parseInt(d) + 1);
						} else {
							s2 = l.substring(0, decimalDigits);
						}
						**/
						// 使用函数计算，如果小数末尾0，则自动省略，所以这里我们要重新条用此方法，在小数末尾追加0
						return this._D0(Formulae.ROUNDUP(val, decimalDigits).toString(), formation);
					} else
						s2 = l;
				} else {
					// 填充小数位
					s2 = fillDigits(decimalDigits, "0");
				}
			}
			if (s2 === undefined)
				return s1;
			else {
				return s1 + "." + s2;
			}
		},
		// @
		_W_AT: function(val, formation) {
			return formation.replace(/"/g, "").replace(/@/g, val);
		},
		// 千分符
		_K: function(val, formation) {
			if (formation.indexOf(",") === -1)
				return val;
			else {
				var arr = val.split("").reverse();
				for (var i = 0; i < arr.length; i++) {
					if (/\d/.test(arr[i])) {
						if (i !== 0 && i % 3 === 0)
							arr[i] = arr[i] + ",";
					}
				}
				arr = arr.reverse();
				return arr.join("");
			}
		},
		// #.##%
		_PS: function(val, formation) {
			// 小数点位数
			var decimalDigits = formation.split(".")[1] ? formation.split(".")[1].length - 1 : 0;
			var s = new Number(val).toFixed(decimalDigits + 2);
			s = s * 100;
			if (reg.base._int.test(s) || reg.base._int_minus.test(s))
				return s + "%";
			else {
				s = new Number(s).toFixed(decimalDigits);
				s = s.replace(/0*$/g, "");
				if (/\.$/.test(s))
					s = s.substring(0, s.length - 1);
				return s + "%";
			}
		},
		// 0.00%
		_P0: function(val, formation) {
			// 小数点位数
			var decimalDigits = formation.split(".")[1] ? formation.split(".")[1].length - 1 : 0;
			var s = new Number(val).toFixed(decimalDigits + 2);
			s = s * 100;
			s = new Number(s).toFixed(decimalDigits);
			// 整数位数
			var intDigits = formation.split(".")[0].length;

			var a = s.split(".")[0];
			var b = s.split(".")[1];
			if (a.length < intDigits)
				a = fillDigits(intDigits - a.length, "0") + a;
			if (b)
				return a + "." + b + "%";
			else
				return a;
		},
		// 货币
		_MONEY: function(val, formation) {
			/**
			0: "$#,##0.0000;[Red]$#,##0.0000"
			1: "$"
			2: "#,##"
			3: ",##"
			4: "0.0000"
			5: ".0000"
			6: "[Red]"
			7: "$"
			8: "#,##"
			9: ",##"
			10: "0.0000"
			11: ".0000"
			index: 0
			input: "$#,##0.0000;[Red]$#,##0.0000"
			**/
			var m = formation.match(reg.mso._MONEY);
			var decimalDigits = m[5] ? m[5].length - 1 : 0;
			var marker = m[1];
			var s = new Number(val).toFixed(decimalDigits);
			var flag = true;
			if (m[6] === "-")
				flag = false;
			if (flag === false)
				s = s.substring(1);
			var p = s.split(".")[0];
			var c = s.split(".")[1];
			var arr = p.split("").reverse();
			for (var i = 0; i < arr.length; i++) {
				if (/\d/.test(arr[i])) {
					if (i !== 0 && i % 3 === 0)
						arr[i] = arr[i] + ",";
				}
			}
			arr = arr.reverse();
			var d;
			if (c)
				d = arr.join("") + "." + c;
			else
				d = arr.join("");
			d = m[7] + d;
			// 正负符号
			if (flag === false)
				d = "-" + d;
			return d;
		},
		_FFS_0: function(val, formation) {
			/**
			0: " _ * #,##0_ ;_ * -#,##0_ ;_ * "-"??_ ;_ @_ "
			1: "#,##"
			2: ",##"
			3: "0"
			4: undefined
			5: "-"
			6: "#,##"
			7: ",##"
			8: "0"
			9: undefined
			10: "-"
			index: 0
			input: " _ * #,##0_ ;_ * -#,##0_ ;_ * "-"??_ ;_ @_ "
			**/
			var m = formation.match(reg.mso._FFS_0);
			if (val == 0)
				return m[10];
			else {
				var decimalDigits = m[4] ? m[4].length - 1 : 0;
				var s = new Number(val).toFixed(decimalDigits);
				var flag = true;
				if (/^-\d+/.test(s))
					flag = false;
				if (flag === false)
					s = s.substring(1);
				var p = s.split(".")[0];
				var c = s.split(".")[1];
				var arr = p.split("").reverse();
				for (var i = 0; i < arr.length; i++) {
					if (/\d/.test(arr[i])) {
						if (i !== 0 && i % 3 === 0)
							arr[i] = arr[i] + ",";
					}
				}
				arr = arr.reverse();
				if (c)
					d = arr.join("") + "." + c;
				else
					d = arr.join("");
				// 正负符号
				if (flag === false)
					d = "-" + d;
				return d;
			}
		},
		_ND: function(val, formation) {
			var m = formation.match(reg.mso._ND);
			val = this._D0(val, formation.match(/0(\.0+)?/)[0]);
			val = this._K(val.split(/\./)[0], "#,###") + "." + val.split(/\./)[1];
			return val;
		}
	};

	function fillDigits(length, char) {
		var s = "";
		for (var i = 0; i < length; i++)
			s += char;
		return s;
	}

	// 格式化数据
	function format(val, formation) {
		var _val = val;
		var flag = false;
		var result = validation.match(val, formation);
		if (result.r === true) {
			if (result.m !== null) {
				_val = excution[result.m.mso](val, formation);
				flag = true;
			} else
				flag = false;
		}
		return {
			val: _val,
			flag: flag
		};
	};
	return {
		format: format
	};
}(window, this));