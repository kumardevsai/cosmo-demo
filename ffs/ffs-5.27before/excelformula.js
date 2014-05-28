/**
    TODO 
    1.嵌套检查不完全
    2.函数检查不严格
    3.代码优化
**/
var ExcelFormula = window.ExcelFormula = (function() {

    // toString
    var _toString = Object.prototype.toString;
    // 数据存储
    var storage;
    // 其他表达式
    var _other = "OTHER";

    // 验证规则
    var reg = {
        // 验证表达式
        formula: {
            SUM: /^=SUM\(.*\)$/i,
            AVERAGE: /^=AVERAGE\(.*\)$/i,
            MAX: /^=MAX\(.*\)$/i,
            MIN: /^=MIN\(.*\)$/i,
            COUNT: /^=COUNT\(.*\)$/i,
            // round表达式验证规则
            ROUND: /^=ROUND\((\d+|\d+\.\d*|[a-zA-Z]+[1-9][0-9]*),\d+\)$/i,
            // 直接计算表达式验证规则
            OTHER: /^=(\d+|\d+\.\d*|[a-zA-Z]+[1-9][0-9]*)([+-/\*](\d+|\d+\.\d*|[a-zA-Z]+[1-9][0-9]*))*\d*$/i
        },
        // 验证表达式名称
        name: /^=(SUM|AVERAGE|MAX|MIN|COUNT|ROUND)/i,
        // 验证表达式参数
        params: /\(.*\)$/,
        // 验证参数标签
        tag: /^[a-zA-Z]+[1-9][0-9]*$/i,
        // 验证一组参数
        tagRange: /^[a-zA-Z]+[1-9][0-9]*:[a-zA-Z]+[1-9][0-9]*$/i,
        // 数学符号
        token: /[+-/\*]/gi,
        // 数字
        number: /\d+|\d+\.\d+/
    };

    // 批量更新所有的数据
    function updateStorage(stor) {
        storage = stor;
    };

    // 更新指定键的数据
    function updateOneStorage(stor) {
        storage[stor.key] = stor.val;
    };

    // 检查表达式
    function checkFormula(formula) {
        var flag = false;
        for (var i in reg.formula) {
            if (reg.formula[i].test(formula))
                flag = true;
        }
        if (flag == false)
        {
            //alert("公式不正确或不支持!");
        }
        return flag;
    };

    // 获取表达式名称
    function getFormulaName(formula) {
        var arr = formula.match(reg.name);
        if (arr && arr.length > 0)
            return arr[1];
        else
            return null;
    };

    // 获取表达式参数
    function getFormulaParams(formula) {
        var name = getFormulaName(formula);
        var v = null;
        if (name) {
            var arr = formula.match(reg.params);
            if (arr.length > 0)
                v = arr[0].substring(1, arr[0].length - 1);
        } else
            v = formula.substring(1);
        return v;
    };

    // 获取表达式参数列表
    function getFormulaParamsList(params, flag) {
        var list = [];
        if (flag == true)
            params = params.replace(reg.token, ",");
        var arr = params.split(",");
        for (var i = 0; i < arr.length; i++) {
            if (reg.tagRange.test(arr[i])) {
                var b = arr[i].split(":");
                list = list.concat(getRange(b[0], b[1]));
            } else
                list.push(arr[i]);
        }
        return list;
    };

    // 根据单元格的索引执行对应的函数
    function excute(key, formula) {
        if (formula === "") {} else {
            if (checkFormula(formula)) {
                var params = getFormulaParams(formula);
                var name = getFormulaName(formula);
                name = name ? name : _other;
                var list = getFormulaParamsList(params, name == _other);
                if (name === _other)
                    return Caculation[name](list, getTokens(formula));
                else
                    return Caculation[name](list);
            }
        }
    };

    // 获取标点符号的数组
    function getTokens(formula) {
        var arr = [];
        if (formula)
            arr = formula.match(reg.token);
        arr = arr ? arr : [];
        return arr;
    };

    // 检查表达式是否存爱嵌套
    function checkExcute(key, formula) {
        if (checkFormula(formula)) {
            if (checkNest(formula, key)) {
                alert("公式存在嵌套!");
                return false;
            } else
                return true;
        }
    };

    // 根据参数范围获取参数数组
    function getRange(start, end) {
        var arr = [];
        var obj1 = TableUtils.getTagObj(start);
        var obj2 = TableUtils.getTagObj(end);
        for (var i = obj1.row; i <= obj2.row; i++) {
            var c1 = TableUtils.char2Num(obj1.col);
            var c2 = TableUtils.char2Num(obj2.col);
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

    // 表达式类
    function Formula(name, expression) {
        this.name = name ? name : null;
        this.expression = expression ? expression : null;
        this.items = [];
        this.formulas = {};
    };

    // 表达式原型
    Formula.prototype = (function() {
        return {
            addItem: function(item) {
                item.formulas[this.name] = this;
                var flag = true;
                for (var i in this.items) {
                    if (this.items[i].name == item.name) {
                        flag = false;
                        this.items[i] = item;
                        break;
                    }
                }
                if (flag == true)
                    this.items.push(item);
            }
        };
    }());

    // 检查参数
    function checkParam(expression, key) {
        if (!expression)
            return false;
        var params = getFormulaParams(expression);
        var name = getFormulaName(expression);
        var list = getFormulaParamsList(params, name == _other);
        if (TableUtils.isInArray(list, key))
            return true;
        else
            return false;
    };

    // 嵌套检查
    function checkNest(expression, key) {
        var flag = false;
        if (expression) {
            flag = checkParam(expression, key);
            if (flag == false) {
                var params = getFormulaParams(expression);
                var name = getFormulaName(expression);
                name = name ? name : _other;
                var list = getFormulaParamsList(params, name == _other);
                for (var i = 0; i < list.length; i++) {
                    if (itemMap[list[i]] !== undefined) {
                        var item = itemMap[list[i]];
                        flag = checkParam(item.expression, key);
                        if (flag == false) {
                            for (var j = 0; j < item.items.length; j++) {
                                flag = checkParam(item.items[j].expression, key);
                                if (flag == false)
                                    flag = checkNest(item.items[j].expression, item.items[j].name);
                            }
                        }
                    }
                }
            }
        }
        return flag;
    };

    // 函数表
    var formulaMap = {
        SUM: {},
        AVERAGE: {},
        MAX: {},
        MIN: {},
        COUNT: {},
        ROUND: {},
        OTHER: {},
        find: function(key) {
            return this.SUM[key] || this.AVERAGE[key] || this.MAX[key] || this.MIN[key] || this.COUNT[key] || this.ROUND[key] || this.OTHER[key];
        },
        clear: function() {
            this.SUM = {};
            this.AVERAGE = {};
            this.MAX = {};
            this.MIN = {};
            this.COUNT = {};
            this.ROUND = {};
            this.OTHER = {};
        }
    };

    // 表达式集合
    var itemMap = {};

    // 函数计算
    var Caculation = {
        SUM: function(params) {
            var t = 0;
            for (var i = 0; i < params.length; i++) {
                if (reg.tag.test(params[i])) {
                    if (TableUtils.canbeNumber(params[i]))
                        t += TableUtils.toNumber(params[i]);
                    else {
                        if (storage[params[i]]) {
                            if (TableUtils.canbeNumber(storage[params[i]]))
                                t += TableUtils.toNumber(storage[params[i]]);
                        }
                    }
                } else {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t += TableUtils.toNumber(params[i]);
                    }
                }
            }
            return t;
        },
        AVERAGE: function(params) {
            var t = 0;
            var n = 0;
            for (var i = 0; i < params.length; i++) {
                if (reg.tag.test(params[i])) {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t += TableUtils.toNumber(params[i]);
                        n++;
                    } else {
                        if (storage[params[i]]) {
                            if (TableUtils.canbeNumber(storage[params[i]], false)) {
                                t += TableUtils.toNumber(storage[params[i]], false);
                                n++;
                            }
                        }
                    }
                } else {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t += TableUtils.toNumber(params[i], false);
                        n++;
                    }
                }
            }
            return n > 0 ? (t / n) : "";
        },
        MAX: function(params) {
            var t = 0;
            for (var i = 0; i < params.length; i++) {
                if (reg.tag.test(params[i])) {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        if (t < TableUtils.toNumber(params[i]))
                            t = TableUtils.toNumber(params[i]);
                    } else {
                        if (storage[params[i]]) {
                            if (TableUtils.canbeNumber(storage[params[i]], false)) {
                                if (t < TableUtils.toNumber(storage[params[i]], false))
                                    t = TableUtils.toNumber(storage[params[i]], false);
                            }
                        }
                    }
                } else {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        if (t < TableUtils.toNumber(params[i], false))
                            t = TableUtils.toNumber(params[i], false);
                    }
                }
            }
            return t;
        },
        MIN: function(params) {
            var t = "";
            for (var i = 0; i < params.length; i++) {
                if (reg.tag.test(params[i])) {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        if (t == "" || t > TableUtils.toNumber(params[i]))
                            t = TableUtils.toNumber(params[i]);
                    } else {
                        if (storage[params[i]]) {
                            if (TableUtils.canbeNumber(storage[params[i]], false)) {
                                if (t == "" || t > TableUtils.toNumber(storage[params[i]], false))
                                    t = TableUtils.toNumber(storage[params[i]], false);
                            }
                        }
                    }
                } else {
                    if (TableUtils.canbeNumber(params[i], false)) {
                        if (t > TableUtils.toNumber(params[i], false))
                            t = TableUtils.toNumber(params[i], false);
                    }
                }
            }
            return t;
        },
        // 计数函数
        COUNT: function(params) {
            // 初始值为0
            var t = 0;
            // 遍历参数列表
            for (var i = 0; i < params.length; i++) {
                // 如果匹配为索引
                if (reg.tag.test(params[i])) {
                    // 值可以转换为数字
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t++;
                    } else {
                        // 如果对应的索引有值
                        if (storage[params[i]]) {
                            // 值可以转换为数字
                            if (TableUtils.canbeNumber(storage[params[i]], false)) {
                                t++;
                            }
                        }
                    }
                } else {
                    // 值可以转换为数字
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t++;
                    }
                }
            }
            return t;
        },
        // round()
        ROUND: function(params) {
            // 第一个参数为值
            var num = params[0];
            // 如果匹配为索引
            if (reg.tag.test(num)) {
                // 如果对应的索引有值
                if (storage[num]) {
                    // 值可以转换为数字
                    if (reg.number.test(storage[num]))
                        num = storage[num];
                    else
                        num = 0;
                } else
                    num = 0;
            }
            // round
            return new Number(num).toFixed(params[1]);
        },
        OTHER: function(params, tokens) {
            var str = "";
            // 遍历参数
            for (var i = 0; i < params.length; i++) {
                // 第一个参数后面不添加运算符号
                if (i == 0) {
                    // 如果匹配索引
                    if (reg.tag.test(params[i])) {
                        // 如果对应的索引有存储值
                        if (storage[params[i]]) {
                            // 如果存储值可以转换为数字
                            if (reg.number.test(storage[params[i]]))
                            // 追加
                                str = storage[params[i]];
                        } else {
                            // 无效的值初始化为0
                            str = 0;
                        }
                    } else {
                        // 常量值
                        str = params[i];
                    }
                } else {
                    // 如果匹配索引
                    if (reg.tag.test(params[i])) {
                        // 如果对应的索引有存储值
                        if (storage[params[i]]) {
                            // 存储值可以转换为数字
                            if (reg.number.test(storage[params[i]])) {
                                // 追加
                                str += (tokens[i - 1] ? tokens[i - 1] : "") + storage[params[i]];
                            }
                        }
                    } else {
                        // 不存在匹配则为常量值
                        str += (tokens[i - 1] ? tokens[i - 1] : "") + params[i];
                    }
                }
            }
            // 解析并返回值
            return str ? eval(str) : "";
        }
    };

    // 计算 TODO 返回值出现重复
    function caculate(key) {
        var arr = [];
        // 计算返回值
        var c = function(k) {
            // 获取表达式对象
            var fmla = formulaMap.find(k);
            // 如果表达式对象存在
            if (fmla) {
                // 计算机过
                var result = excute(k, fmla.expression);
                // 保存结果
                arr.push({
                    key: k,
                    result: result
                });
                // 更新数据
                storage[k] = result;
            }
            // 获取子项
            var item = itemMap[k];
            // 如果子项存在
            if (item) {
                // 子项所属表达式
                var fmlas = item.formulas;
                // 遍历表达式
                for (var j in fmlas) {
                    // 计算结果
                    var result_ = excute(j, fmlas[j].expression);
                    // 保存数据
                    arr.push({
                        key: j,
                        result: result_
                    });
                    // 更新数据
                    storage[j] = result_;
                    // 循环计算
                    c(j);
                }
            }
        };
        // 计算
        c(key);
        // 返回计算结果
        return arr;
    };

    // 更新表达式
    function updateFormulas(arr) {
        if (arr) {
            // 遍历传入的数组
            for (var i = 0; i < arr.length; i++) {
                // 单元格索引
                var key = arr[i].key;
                // 表达式
                var formula = arr[i].formula;
                // 通常情况下空的表达式已经被过滤掉
                if (formula === "") {} else {
                    // 检查表达式是否正确
                    if (checkFormula(formula)) {
                        // 获取表达式的函数名称
                        var name = getFormulaName(formula);
                        // 名称不存在表示直接计算表达式
                        name = name ? name : _other;
                        // 表达式对象
                        var fmla;
                        // 如果存在
                        if (itemMap[key]) {
                            // 更新表达式
                            itemMap[key].expression = formula;
                            // 引用对象
                            fmla = itemMap[key];
                        } else {
                            // 新建表达式对象
                            fmla = formulaMap[name][key] = new Formula(key, formula);
                        }
                        // 获取参数语句
                        var params = getFormulaParams(formula);
                        // 获取 参数列表
                        var list = getFormulaParamsList(params, name == _other);
                        // 检查是否含有嵌套
                        if (checkNest(formula, key)) {
                            alert("公式存在嵌套!");
                            return null;
                        } else {
                            // 遍历参数列表
                            for (var j = 0; j < list.length; j++) {
                                // 参数匹配单元格的索引规则
                                if (reg.tag.test(list[j])) {
                                    // 获取索引作为键
                                    var key = list[j];
                                    // 子项对象
                                    var item;
                                    // 不存在则新建
                                    if (!itemMap[key]) {
                                        // 新建子项
                                        item = new Formula(key);
                                        // 添加关联
                                        itemMap[key] = item;
                                    } else {
                                        // 引用子项对象
                                        item = itemMap[key];
                                    }
                                    // 添加关联关系
                                    fmla.addItem(item);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    // 清除表达式
    function clearFormulas() {
        // 清空子项关联
        itemMap = {};
        // 清空保存的函数表达式关系
        formulaMap.clear();
    };

    function caculateAll() {
        var arr = [];
        for (var i in itemMap) {
            arr = arr.concat(caculate(i));
        }
        return arr;
    };

    return {
        excute: excute,
        caculateAll: caculateAll,
        updateStorage: updateStorage,
        caculate: caculate,
        updateFormulas: updateFormulas,
        clearFormulas: clearFormulas,
        updateOneStorage: updateOneStorage,
        checkExcute: checkExcute
    };
}());