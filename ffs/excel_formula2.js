/**
	excel 公式计算器
**/
var ExcelFormula = window.ExcelFormula = (function() {

	var _toString = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var _slice = Array.prototype.slice;

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

	// 错误数值返回器
	var valueException = {
		// 不是数值
		not_value: "#VALUE!",
		// 计算错误
		error: "#ERROR",
		// 0除
		div0: "#DIV0!",
		// num
		num: "#NUM!"
	};

	// 值处理
	var valueProcessor = {
		excute_error: {
			flag: false,
			value: valueException.not_value,
			message: "错误:运算错误!"
		},
		index_error: function(arg) {
			return {
				flag: false,
				value: valueException.not_value,
				message: "错误:索引" + arg + "的取值有问题!"
			};
		},
		_0_error: {
			flag: false,
			value: valueException.div0,
			message: "错误:计算值不正确，出现0运算!"
		},
		num_error: {
			flag: false,
			value: valueException.num,
			message: "错误:算数值错误!"
		}
	};

	// 消息处理器
	var messageCenter = (function() {

		// 默认
		var defaults = {
			error: "错误:",
			exception: "异常:",
			common: "提示:"
		};

		// 返回
		return {
			// 错误信息
			error: defaults.error,
			// 异常信息
			exception: defaults.exception,
			// 提示信息
			common: defaults.common,

			// 清除信息
			clear: function(type) {
				// 恢复初始值
				if (_hasOwnProperty(type))
					this[type] = defaults[type];
			},
			// 信息添加
			append: function(message, type) {
				// 信息追加
				if (_hasOwnProperty(this, type))
					this[type] += message;
			},
			// 信息返回
			response: function(type, flag) {
				if (_hasOwnProperty(type)) {
					var message = this[type];
					// 清除
					if (flag === true)
						this.clear(type);
					// 返回
					return message;
				}
			}
		};

	}());

	// 公式计算符
	var marker = {
		// 返回不大于算数值的整数
		INT: "int"
	};

	// 正则验证规则
	var regexCenter = {
		// 正数
		_int_float: /^(\d+)(\.(\d+))?$/,
		// 负数
		_int_float_minus: /^-(\d+)(\.(\d+))?$/,
		// 索引
		_index: /^(\$?([a-zA-Z]+)\$?([1-9][0-9]*))$/,
		// 普通表达式
		_exp: /^(-?\d+|-?\d+\.\d+|\$?[a-zA-Z]+\$?[1-9][0-9]*)(([\+\-\/\*](-?\d+|-?\d+\.\d+|\$?[a-zA-Z]+\$?[1-9][0-9]*)))*/,
		// 计算符号
		_token: /[\+\-\/\*]/g,
		// trunc函数的参数
		_trunc_round_ceiling: /^(-?\d+|-?\d+\.\d+|\$?[a-zA-Z]+\$?[1-9][0-9]*),(-?\d+|\$?[a-zA-Z]+\$?[1-9][0-9]*)$/,
		// 正负数
		_num: /^((-)?(\d+))(\.(\d+))?$/
	};

	// 取值
	function getNumber(arg) {
		var val;
		// 如果是正负数
		if (regexCenter._num.test(arg))
			val = arg;
		// 如果参数是下标
		else if (regexCenter._index.test(arg)) {
			// 存储的数据中对应的下标值
			var s = storage[arg.replace(/\$/g, "")];
			// 如果值存在
			if (s) {
				// 如果值是正负数
				if (regexCenter._num.test(s))
					val = s;
				else {
					// 数值不合法，无法计算
					val = valueProcessor.index_error(arg);
				}
			} else {
				// 值为空字符串表示无需计算
				val = {
					flag: true,
					value: ""
				};
			}
		}
		return val;
	};

	// 获取数值的结构
	function getNumberStruct(num) {
		if (regexCenter._num.test(num)) {
			var arr = num.toString().match(regexCenter._num);
			return {
				mark: arr[2],
				fullnum: arr[1],
				num: arr[3],
				point: arr[4],
				num_digits: arr[5]
			}
		}
	};

	function fillDigits(length, char) {
		var s = "";
		for (var i = 0; i < length; i++)
			s += char;
		return s;
	};

	/**
		假设给定的计算值有效，不需要再次验证
	**/
	var excution = (function() {

		// round 等函数的参数处理
		function roundParamsProcessor(arg, a, b, c, d) {
			// 获取参数数组
			var arr = arg.match(regexCenter._trunc_round_ceiling);

			// 需要计算的参数
			var num = arr[1];
			// 舍位参数
			var num_digits = arr[2];

			// 获取实际计算值
			if (regexCenter._num.test(num) || regexCenter._index.test(num)) {
				a.v = getNumber(num);
				if (a.v.flag !== undefined)
					return a.v;
			}

			// 获取实际计算值
			if (regexCenter._num.test(num_digits) || regexCenter._index.test(num_digits)) {
				b.v = getNumber(num_digits);
				if (b.v.flag !== undefined)
					return b.v;
			}

			// 获取数值结构
			c.v = getNumberStruct(a.v);
			d.v = getNumberStruct(b.v);
			// 舍位参数不可能为小数
			if (d.v.point !== undefined || d.v.num_digits !== undefined) {
				return valueProcessor.excute_error;
			}
		};

		// roundup or rounddown
		function roundContorller(a, b, c, d, flag) {
			// 如果进位值是负数
			if (d.v.mark === "-") {
				// 整数部分数组
				var num_arr = c.v.num.split("");
				// 无越界
				if (parseInt(d.v.num) <= c.v.num.length) {
					// 对应的进位位置为9
					num_arr[num_arr.length - d.v.num] = flag === "down" ? 0 : 9;
					c.v.num = num_arr.join("");
					// 更新对象属性
					c.v.fullnum = (c.v.mark ? c.v.mark : "") + c.v.num;
					// 更新计算值
					a.v = c.v.fullnum + (c.v.point ? c.v.point : "");
				}
			} else {
				// 小数部分
				if (c.v.point && c.v.num_digits) {
					// 小数部分数组
					var num_arr = c.v.num_digits.split("");
					// 无越界
					if (parseInt(d.v.num) <= c.v.num_digits.length - 1) {
						// 对应进位设置为9
						num_arr[d.v.num] = flag === "down" ? 0 : 9;
						c.v.num_digits = num_arr.join("");
						// 更新对象属性
						c.v.point = "." + c.v.num_digits;
						// 更新计算值
						a.v = c.v.fullnum + c.v.point;
					}
				}
			}
		};

		// round 处理函数
		function roundHandler(a, b, c, d) {
			// 计算结果
			var result;
			// 如果进位的是整数部分
			if (d.mark === "-" && d.num != 0) {
				// 获取整数部分
				var f = c.fullnum;
				// 转换为数组
				var arr_ = f.split("");
				// 如果进位长度过大
				if (parseInt(d.num) > c.num.length) {
					// 整数部分取0
					c.num = 0;
					// 小数部分设置为无效
					c.num_digits = undefined;
				} else {
					// 添加小数点
					arr_.splice(arr_.length - parseInt(d.num), 0, ".");
					// 转换为数字
					var e = new Number(arr_.join(""));
					// 换算
					c.num = e.toFixed(0).toString().replace(/-/, "").replace(/\./, "").replace(/^0*/, "") + fillDigits(e.toString().replace(/^-?\d+\./, "").length, "0");
					// 小数位无效
					c.num_digits = undefined;
				}
				// 如果整数位为0
				if (c.num === 0)
				// 结果为0
					result = 0;
				else {
					result = (c.mark ? c.mark : "") + c.num + (c.num_digits !== undefined && c.mark !== "-" ? "." + c.num_digits : "");
				}
			} else {
				// 四舍五入小数位直接操作
				result = new Number(a).toFixed(d.num);
			}
			return result;
		};

		// trunc 函数处理方法
		function truncHandler(a, b, c, d) {
			// 如果舍位为0
			if (d.num == 0) {
				// 省略小数点位
				c.num_digits = undefined;
			} else {
				// 如果舍位值是负数
				if (d.mark === "-") {
					//	如果舍位大于等于计算整数位
					if (parseInt(d.num) >= c.num.length) {
						// 计算整数位设为0
						c.num = 0;
					} else {
						// 部分整数位以0代替
						c.num = c.num.substring(0, c.num.length - parseInt(d.num)) + fillDigits(parseInt(d.num), "0");
					}
				} else {
					// 判断小数位的取舍
					if (parseInt(d.num) >= c.num_digits.length) {
						// 添加多余的小数位以0补全
						c.num_digits = c.num_digits + fillDigits(parseInt(d.num) - c.num_digits.length, "0");
					} else {
						// 截断小数位
						c.num_digits = c.num_digits.substring(0, parseInt(d.num));
					}
				}
			}

			// 返回计算值
			var result;
			// 如果计算的整数位值为0
			if (c.num === 0) {
				// 结果为0
				result = 0;
			} else
				result = (c.mark ? c.mark : "") + c.num + (c.num_digits !== undefined && c.mark !== "-" ? "." + c.num_digits : "");
			return result;
		};

		// ceiling函数处理程序
		function ceilingHandler(a, b, c, d) {
			var result;
			if (c.mark === "-") {

			} else {
				var mo = c.num % d.num;
				if (mo) {
					result = parseInt(c.num) - mo + parseInt(d.num);
				} else {
					result = c.num;
				}
			}
			return result;
		};

		return {
			/**
			返回不大于算数值的整数
			**/
			INT: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 计算值
				var val;
				// 计算结果
				var result;
				// 如果是正负数
				if (regexCenter._num.test(arg) || regexCenter._index.test(arg)) {
					val = getNumber(arg);
					if (val.flag !== undefined)
						return val;
				}
				// 计算值是个表达式
				else if (regexCenter._exp.test(arg)) {
					// 调用普通表达式计算方法
					val = this.common(arg);
					if (val.flag === false)
						return val;
					else {
						if (val.value === "")
							return val;
						else
							val = val.value.toString();
					}
				}
				if (regexCenter._num.test(val)) {
					// 如果是负数
					if (/^-/.test(val)) {
						var arr = val.match(regexCenter._int_float_minus);
						// 整数位
						var d = arr[1];
						// 小数位，包括小数点
						var c = arr[2];
						// 存储在小数位
						if (c) {
							// 小数点后有值
							if (arr[3]) {
								// 返回整数位加1取负
								result = "-" + (parseInt(d) + 1);
							} else {
								// 直接返回负数
								result = "-" + d;
							}
						} else {
							// 直接返回负数
							result = "-" + d;
						}
					} else {
						// 匹配
						var arr = val.match(regexCenter._int_float);
						// 整数部分
						result = arr[1];
					}
					return {
						flag: true,
						value: result
					};
				}
			},
			// 普通计算
			common: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 验证普通计算表达式是否正确
				if (regexCenter._exp.test(arg)) {
					// 获取表达式的计算符号
					var tokens = arg.match(regexCenter._token);
					// 获取表达式的各个计算值
					var arr = arg.split(regexCenter._token);
					// 如果表达式的第一个计算值是空字符，则表示第一个计算值是负值，按计算符号拆分造成的情况
					if (arr[0] === "") {
						// 删除第一个计算值
						arr = _slice.call(arr, 1);
						// 将第一个计算值变成负数
						arr[0] = "-" + arr[0];
					}
					// 如果计算符号的长度大于等于计算值的个数
					if (tokens.length >= arr.length) {
						// 如果第一个计算符号为-
						if (tokens[0] === "-") {
							// 截断符号组
							tokens = _slice.call(tokens, 1);
						}
					}
					// 计算值
					var digits = [];
					// 遍历原始计算值
					for (var i = 0; i < arr.length; i++) {
						// 原始计算值
						var a = arr[i];
						// 如果计算值是数字
						if (regexCenter._num.test(a) || regexCenter._index.test(a)) {
							var b = getNumber(a);
							if (b.flag !== undefined)
								return b;
							else
								digits[i] = b;
						}
					}

					// 解析后的计算表达式
					var result = "";
					// 遍历计算值
					for (var i = 0; i < digits.length; i++) {
						// 计算值
						var n = digits[i];
						// 第一个计算值不加符号
						if (i === 0 && !result) {
							// 错误值
							if (n.flag === false) {
								// 返回错误结果
								return n;
							} else {
								// 将计算值追加到表达式上
								result += n;
							}
						} else {
							// 计算值错误
							if (n.flag === false) {
								return n;
							} else {
								// 计算符号
								var token = tokens[i - 1];
								// 计算值正确
								if (n.flag === true) {
									// 空值
									if (n.value === "") {
										// 设置为0
										n = 0;
									}
								}
								// 如果计算值为0且是除法
								if (n == 0 && token === "/") {
									return valueProcessor._0_error;
								} else {
									// 追加表达式
									result += token + n;
								}
							}
						}
					}
					// 如果存在计算表达式
					if (result) {
						// 尝试使用eval计算
						try {
							return {
								flag: true,
								value: eval(result)
							};
						} catch (e) {
							return valueProcessor.excute_error;
						}

					} else {
						return {
							flag: true,
							value: ""
						};
					}

				} else {
					return valueProcessor.index_error(arg);
				}
			},
			// 将数字的小数部分截去，返回整数
			trunc: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 验证参数规则
				if (regexCenter._trunc_round_ceiling.test(arg)) {
					var a = {}, b = {}, c = {}, d = {};
					var pro = roundParamsProcessor(arg, a, b, c, d);
					if (pro)
						return pro;
					a = a.v, b = b.v, c = c.v, d = d.v;
					var result = truncHandler(a, b, c, d);
					return {
						flag: true,
						value: result
					};
				} else {
					return valueProcessor.excute_error;
				}
			},
			// 按指定位数对数值进行四舍五入
			round: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 验证参数规则
				if (regexCenter._trunc_round_ceiling.test(arg)) {
					var a = {}, b = {}, c = {}, d = {};
					var pro = roundParamsProcessor(arg, a, b, c, d);
					if (pro)
						return pro;
					a = a.v, b = b.v, c = c.v, d = d.v;
					// 计算结果
					var result = roundHandler(a, b, c, d);
					return {
						flag: true,
						value: result
					};
				} else {
					return valueProcessor.index_error(arg);
				}
			},
			// 按指定的位数向上舍入数值
			roundup: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 验证参数规则
				if (regexCenter._trunc_round_ceiling.test(arg)) {
					var a = {}, b = {}, c = {}, d = {};
					var pro = roundParamsProcessor(arg, a, b, c, d);
					if (pro)
						return pro;
					roundContorller(a, b, c, d, "up");
					a = a.v, b = b.v, c = c.v, d = d.v;
					var result = roundHandler(a, b, c, d);
					return {
						flag: true,
						value: result
					};
				} else {
					return valueProcessor.index_error(arg);
				}
			},
			rounddown: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 验证参数规则
				if (regexCenter._trunc_round_ceiling.test(arg)) {
					var a = {}, b = {}, c = {}, d = {};
					var pro = roundParamsProcessor(arg, a, b, c, d);
					if (pro)
						return pro;
					roundContorller(a, b, c, d, "down");
					a = a.v, b = b.v, c = c.v, d = d.v;
					var result = roundHandler(a, b, c, d);
					return {
						flag: true,
						value: result
					};
				} else {
					return valueProcessor.index_error(arg);
				}
			},
			ceiling: function() {
				// 取得第一个参数
				var arg = _slice.call(arguments, 0)[0].toString().toLowerCase();
				// 验证参数规则
				if (regexCenter._trunc_round_ceiling.test(arg)) {
					var a = {}, b = {}, c = {}, d = {};
					var pro = roundParamsProcessor(arg, a, b, c, d);
					if (pro)
						return pro;
					a = a.v, b = b.v, c = c.v, d = d.v;

					if (c.mark !== d.mark && d != 0)
						return valueProcessor.num_error;
					// 计算结果
					var result = ceilingHandler(a, b, c, d);
					return {
						flag: true,
						value: result
					};
				} else {
					return valueProcessor.index_error(arg);
				}
			}
		};
	}());

	return {
		updateStorage: updateStorage,
		updateStorageKV: updateStorageKV,
		INT: excution.INT,
		common: excution.common,
		trunc: excution.trunc,
		round: excution.round,
		roundup: excution.roundup,
		rounddown: excution.rounddown,
		ceiling: excution.ceiling
	};
}());