// 快速查询
var quickQuery = (function() {
    // 查询控件集合
    var quickQueries = {};

    // 创建快速查询
    function createQuickQuery() {
        var totalLeft;
        var top;
        return function(ctrl) {
            totalLeft = ctrl.offsetLeft;
            top = ctrl.offsetTop;
            var tableid = attr(ctrl, "QuickQueryTable");
            quickQueries[tableid] = {};
            ctrl.innerHTML = "";
            var xml = attr(ctrl, "QuickQueryKeyField") ? unescape(attr(ctrl, "QuickQueryKeyField")) : "";
            if (xml) {
                var xmlobj = LoadXml(xml);
                if (xmlobj) {
                    var cols = xmlobj.selectNodes('col');
                    var i = 0,
                        len = cols.length;
                    for (i; i < len; i++) {
                        var col = cols[i];
                        var name = col.attributes.getNamedItem("name").value;
                        if (name) {
                            var el;
                            var tp = col.attributes.getNamedItem("type").value;
                            if (tp === "select") {
                                el = document.createElement("input");
                                el.className = "quickquery_select";
                            } else if (tp === "input") {
                                el = document.createElement("input");
                                el.className = "quickquery_input";
                            }
                            var lb = document.createElement("label");
                            lb.innerHTML = name + ":";
                            lb.className = "quickquery_lb";
                            var item = document.createElement("div");
                            item.className = "quickquery_item";
                            item.appendChild(lb);
                            // 以下是组件重定位
                            var group = null;
                            if (tp === "select") {
                                group = document.createElement("div");
                                group.appendChild(el);
                                group.className = "quickquery_select_group";
                                item.appendChild(group);
                            } else
                                item.appendChild(el);
                            document.getElementById("div1").appendChild(item);

                            if (group) {
                                group.style.left = lb.offsetWidth + 5;
                            }

                            item.style.left = totalLeft;
                            item.style.top = top;
                            totalLeft += lb.offsetWidth + el.offsetWidth + 10;

                            // 以名称为索引添加到集合中
                            quickQueries[tableid][name] = {
                                type: tp,
                                el: el
                            };
                        }
                    }
                }
            }
            var btn = document.createElement("input");
            btn.type = "button";
            btn.value = " 查询 ";
            btn.style.position = "absolute";
            btn.style.left = totalLeft + 10;
            btn.style.top = top;
            AttachEvent(btn, "click", search(tableid), false);
            document.getElementById("div1").appendChild(btn);
        };
    };

    // 查询
    function search(tableid) {
        var queries = quickQueries[tableid];
        var objbuild = document.getElementById(tableid);
        return function() {
            var flag = false;
            var obj = {};
            for (var i in queries) {
                // 排除空条件查询
                if (queries[i].el.value !== "") {
                    obj[i] = {
                        type: queries[i].type,
                        val: queries[i].el.value
                    };
                    flag = true;
                }
            }
            if (flag === true) {
                getDataFromServer(objbuild, obj);
            }
        };
    };

    // 获取xml创建表格
    function getDataFromServer(objbuild, obj) {
        var xml = queryCache.getCache(obj);
        attr(objbuild, "where", whereCondition(obj));
        TableBuild(objbuild.parentNode, objbuild, null, xml, obj);
    };

    // 创建查询条件
    function whereCondition(obj) {
        var where = "";
        for (var i in obj) {
            if (obj[i].type === "input")
                where += " " + i + " like '%" + obj[i].val + "%' and ";
            else
                where += " " + i + "='" + obj[i].val + "' and ";
        }
        where = where.replace(/and(\s*)?$/, "");
        return where;
    };

    // 绑定数据到快速查询
    function bindData() {
        var count = 0;
        return function(tableid, collections) {
            var c = quickQueries[tableid];
            for (var i in c) {
                if (c[i].type === "select") {
                    var collection = collections[i];
                    var opts = [];
                    for (var k in collection) {
                        opts.push({
                            value: k,
                            text: k
                        });
                    }
                    var select = c[i].el;
                    SearchGroup.createSearch(tableid + "_q_" + count, select, opts);
                    count++;
                } else if (c[i].type === "input") {
                    c[i].el.value = "";
                }
            }
        }
    };

    return {
        createQuickQuery: createQuickQuery(),
        bindData: bindData()
    };
}());

// 查询缓存
var queryCache = (function() {
    // 缓存集合
    var caches = {};
    // 索引集合
    var indexes = {};
    // 索引计数器
    var count = 0;
    // 获取缓存
    function getCache(obj) {
        // 根据查询条件获取索引
        var index = getIndex(obj);
        if (index)
            return caches[index];
        return null;
    };
    // 设置缓存
    function setCache(obj, data) {
        var index = getIndex(obj);
        if (index) {
            caches[index] = data;
        } else {
            var index_ = ++count;
            indexes[index_] = obj;
            caches[index_] = data;
        }
    };

    // 不支持复杂对象
    function objEqualIn(o1, o2) {
        var flag = true;
        for (var i in o1) {
            if (o2.hasOwnProperty(i)) {
                if (typeof o1[i] === "object")
                    flag = o1[i].type === o2[i].type && o1[i].val === o2[i].val;
                else {
                    if (o1[i] !== o2[i]) {
                        flag = false;
                    }
                }
            } else
                flag = false;
        }
        return flag;
    };

    function objEqual(o1, o2) {
        return objEqualIn(o1, o2) && objEqualIn(o2, o1);
    };
    // 获取索引
    function getIndex(o) {
        for (var i in indexes) {
            if (objEqual(indexes[i], o))
                return i;
        }
        return null;
    };
    return {
        setCache: setCache,
        getCache: getCache
    };
}());

// 绑定表格数据
var bindTableData = (function() {
    var datas = {};

    function setData(tableid, data) {
        if (datas[tableid])
            return;
        datas[tableid] = data;
        bindQuickQuery(tableid);
    };

    function getData(tableid) {
        return datas[tableid];
    };

    function bindQuickQuery(tableid) {
        var dt = datas[tableid];
        if (dt) {
            var collections = getXmlCollection(dt);
            quickQuery.bindData(tableid, collections);
        }
    };

    function getXmlCollection(xml) {
        var collections = {};
        var xmlobj = LoadXml(xml);
        if (xmlobj) {
            var i = 0;
            len = xmlobj.childNodes.length;
            for (i; i < len; i++) {
                var c = xmlobj.childNodes[i];
                var j = 0;
                len1 = c.childNodes.length;
                for (j; j < len1; j++) {
                    var o = c.childNodes[j];
                    var name = GetXmlColumnDecode(o.tagName);
                    if (!collections.hasOwnProperty(name))
                        collections[name] = {};
                    collections[name][o.text] = o.text;
                }
            }
        }
        return collections;
    };

    return {
        setData: setData,
        getData: getData
    };
}());