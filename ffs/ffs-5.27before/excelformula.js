/**
    TODO 
    1.Ƕ�׼�鲻��ȫ
    2.������鲻�ϸ�
    3.�����Ż�
**/
var ExcelFormula = window.ExcelFormula = (function() {

    // toString
    var _toString = Object.prototype.toString;
    // ���ݴ洢
    var storage;
    // �������ʽ
    var _other = "OTHER";

    // ��֤����
    var reg = {
        // ��֤���ʽ
        formula: {
            SUM: /^=SUM\(.*\)$/i,
            AVERAGE: /^=AVERAGE\(.*\)$/i,
            MAX: /^=MAX\(.*\)$/i,
            MIN: /^=MIN\(.*\)$/i,
            COUNT: /^=COUNT\(.*\)$/i,
            // round���ʽ��֤����
            ROUND: /^=ROUND\((\d+|\d+\.\d*|[a-zA-Z]+[1-9][0-9]*),\d+\)$/i,
            // ֱ�Ӽ�����ʽ��֤����
            OTHER: /^=(\d+|\d+\.\d*|[a-zA-Z]+[1-9][0-9]*)([+-/\*](\d+|\d+\.\d*|[a-zA-Z]+[1-9][0-9]*))*\d*$/i
        },
        // ��֤���ʽ����
        name: /^=(SUM|AVERAGE|MAX|MIN|COUNT|ROUND)/i,
        // ��֤���ʽ����
        params: /\(.*\)$/,
        // ��֤������ǩ
        tag: /^[a-zA-Z]+[1-9][0-9]*$/i,
        // ��֤һ�����
        tagRange: /^[a-zA-Z]+[1-9][0-9]*:[a-zA-Z]+[1-9][0-9]*$/i,
        // ��ѧ����
        token: /[+-/\*]/gi,
        // ����
        number: /\d+|\d+\.\d+/
    };

    // �����������е�����
    function updateStorage(stor) {
        storage = stor;
    };

    // ����ָ����������
    function updateOneStorage(stor) {
        storage[stor.key] = stor.val;
    };

    // �����ʽ
    function checkFormula(formula) {
        var flag = false;
        for (var i in reg.formula) {
            if (reg.formula[i].test(formula))
                flag = true;
        }
        if (flag == false)
        {
            //alert("��ʽ����ȷ��֧��!");
        }
        return flag;
    };

    // ��ȡ���ʽ����
    function getFormulaName(formula) {
        var arr = formula.match(reg.name);
        if (arr && arr.length > 0)
            return arr[1];
        else
            return null;
    };

    // ��ȡ���ʽ����
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

    // ��ȡ���ʽ�����б�
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

    // ���ݵ�Ԫ�������ִ�ж�Ӧ�ĺ���
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

    // ��ȡ�����ŵ�����
    function getTokens(formula) {
        var arr = [];
        if (formula)
            arr = formula.match(reg.token);
        arr = arr ? arr : [];
        return arr;
    };

    // �����ʽ�Ƿ�氮Ƕ��
    function checkExcute(key, formula) {
        if (checkFormula(formula)) {
            if (checkNest(formula, key)) {
                alert("��ʽ����Ƕ��!");
                return false;
            } else
                return true;
        }
    };

    // ���ݲ�����Χ��ȡ��������
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

    // ���ʽ��
    function Formula(name, expression) {
        this.name = name ? name : null;
        this.expression = expression ? expression : null;
        this.items = [];
        this.formulas = {};
    };

    // ���ʽԭ��
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

    // ������
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

    // Ƕ�׼��
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

    // ������
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

    // ���ʽ����
    var itemMap = {};

    // ��������
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
        // ��������
        COUNT: function(params) {
            // ��ʼֵΪ0
            var t = 0;
            // ���������б�
            for (var i = 0; i < params.length; i++) {
                // ���ƥ��Ϊ����
                if (reg.tag.test(params[i])) {
                    // ֵ����ת��Ϊ����
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t++;
                    } else {
                        // �����Ӧ��������ֵ
                        if (storage[params[i]]) {
                            // ֵ����ת��Ϊ����
                            if (TableUtils.canbeNumber(storage[params[i]], false)) {
                                t++;
                            }
                        }
                    }
                } else {
                    // ֵ����ת��Ϊ����
                    if (TableUtils.canbeNumber(params[i], false)) {
                        t++;
                    }
                }
            }
            return t;
        },
        // round()
        ROUND: function(params) {
            // ��һ������Ϊֵ
            var num = params[0];
            // ���ƥ��Ϊ����
            if (reg.tag.test(num)) {
                // �����Ӧ��������ֵ
                if (storage[num]) {
                    // ֵ����ת��Ϊ����
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
            // ��������
            for (var i = 0; i < params.length; i++) {
                // ��һ���������治����������
                if (i == 0) {
                    // ���ƥ������
                    if (reg.tag.test(params[i])) {
                        // �����Ӧ�������д洢ֵ
                        if (storage[params[i]]) {
                            // ����洢ֵ����ת��Ϊ����
                            if (reg.number.test(storage[params[i]]))
                            // ׷��
                                str = storage[params[i]];
                        } else {
                            // ��Ч��ֵ��ʼ��Ϊ0
                            str = 0;
                        }
                    } else {
                        // ����ֵ
                        str = params[i];
                    }
                } else {
                    // ���ƥ������
                    if (reg.tag.test(params[i])) {
                        // �����Ӧ�������д洢ֵ
                        if (storage[params[i]]) {
                            // �洢ֵ����ת��Ϊ����
                            if (reg.number.test(storage[params[i]])) {
                                // ׷��
                                str += (tokens[i - 1] ? tokens[i - 1] : "") + storage[params[i]];
                            }
                        }
                    } else {
                        // ������ƥ����Ϊ����ֵ
                        str += (tokens[i - 1] ? tokens[i - 1] : "") + params[i];
                    }
                }
            }
            // ����������ֵ
            return str ? eval(str) : "";
        }
    };

    // ���� TODO ����ֵ�����ظ�
    function caculate(key) {
        var arr = [];
        // ���㷵��ֵ
        var c = function(k) {
            // ��ȡ���ʽ����
            var fmla = formulaMap.find(k);
            // ������ʽ�������
            if (fmla) {
                // �������
                var result = excute(k, fmla.expression);
                // ������
                arr.push({
                    key: k,
                    result: result
                });
                // ��������
                storage[k] = result;
            }
            // ��ȡ����
            var item = itemMap[k];
            // ����������
            if (item) {
                // �����������ʽ
                var fmlas = item.formulas;
                // �������ʽ
                for (var j in fmlas) {
                    // ������
                    var result_ = excute(j, fmlas[j].expression);
                    // ��������
                    arr.push({
                        key: j,
                        result: result_
                    });
                    // ��������
                    storage[j] = result_;
                    // ѭ������
                    c(j);
                }
            }
        };
        // ����
        c(key);
        // ���ؼ�����
        return arr;
    };

    // ���±��ʽ
    function updateFormulas(arr) {
        if (arr) {
            // �������������
            for (var i = 0; i < arr.length; i++) {
                // ��Ԫ������
                var key = arr[i].key;
                // ���ʽ
                var formula = arr[i].formula;
                // ͨ������¿յı��ʽ�Ѿ������˵�
                if (formula === "") {} else {
                    // �����ʽ�Ƿ���ȷ
                    if (checkFormula(formula)) {
                        // ��ȡ���ʽ�ĺ�������
                        var name = getFormulaName(formula);
                        // ���Ʋ����ڱ�ʾֱ�Ӽ�����ʽ
                        name = name ? name : _other;
                        // ���ʽ����
                        var fmla;
                        // �������
                        if (itemMap[key]) {
                            // ���±��ʽ
                            itemMap[key].expression = formula;
                            // ���ö���
                            fmla = itemMap[key];
                        } else {
                            // �½����ʽ����
                            fmla = formulaMap[name][key] = new Formula(key, formula);
                        }
                        // ��ȡ�������
                        var params = getFormulaParams(formula);
                        // ��ȡ �����б�
                        var list = getFormulaParamsList(params, name == _other);
                        // ����Ƿ���Ƕ��
                        if (checkNest(formula, key)) {
                            alert("��ʽ����Ƕ��!");
                            return null;
                        } else {
                            // ���������б�
                            for (var j = 0; j < list.length; j++) {
                                // ����ƥ�䵥Ԫ�����������
                                if (reg.tag.test(list[j])) {
                                    // ��ȡ������Ϊ��
                                    var key = list[j];
                                    // �������
                                    var item;
                                    // ���������½�
                                    if (!itemMap[key]) {
                                        // �½�����
                                        item = new Formula(key);
                                        // ��ӹ���
                                        itemMap[key] = item;
                                    } else {
                                        // �����������
                                        item = itemMap[key];
                                    }
                                    // ��ӹ�����ϵ
                                    fmla.addItem(item);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    // ������ʽ
    function clearFormulas() {
        // ����������
        itemMap = {};
        // ��ձ���ĺ������ʽ��ϵ
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