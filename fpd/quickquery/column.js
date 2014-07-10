(function(parentobj) {
    var m_pobj;
    var panel;
    var cols = parentobj.cols;
    var col_all;
    var ie = /msie/i.test(window.navigator.userAgent);
    window.onload = inits;

    function inits() {
        panel = document.getElementById("panel");
        col_all = document.getElementById("col_all");
        AttachEvent(document.getElementById("ok"), "click", reback, false);
        AttachEvent(col_all, "change", checkAll(col_all), false);
        if (ie) {
            // 解决ie复选框bug
            AttachEvent(col_all, "click", function() {
                col_all.blur();
            }, false);
        }
        initPanel();
    };

    function checkAll(c) {
        return function() {
            if (c.checked === true) {
                for (var i in checkboxes) {
                    checkboxes[i].checked = true;
                    columns[i].checked = true;
                }
            } else {
                for (var i in checkboxes) {
                    checkboxes[i].checked = false;
                    columns[i].checked = false;
                }
            }
        };
    };

    function initPanel() {
        var dslist = getDSColumns();
        if (dslist) {
            dslist.sort();
            var i = 0,
                len = dslist.length;
            var create = createCheckedItem(len);
            for (i; i < len; i++) {
                if (dslist[i]) {
                    create(dslist[i]);
                }
            }
        }
    };

    function Column(id, name) {
        this.checked = false;
        this.id = id ? id : "";
        this.type = "select";
        this.name = name ? name : "";
    };

    var columns = {};

    function updateColumnHelper0(id) {
        return function(e) {
            e = e || window.event;
            var t = e.srcElement || e.target;
            updateColumn(id, {
                checked: t.checked ? true : false
            });

            if (isAllChecked())
                col_all.checked = true;
            else
                col_all.checked = false;
        };
    };

    function isAllChecked() {
        for (var i in columns) {
            if (columns[i].checked === false) {
                return false;
            }
        }
        return true;
    };

    function updateColumnHelper1(id) {
        return function(e) {
            e = e || window.event;
            var t = e.srcElement || e.target;
            updateColumn(id, {
                type: t.options[t.selectedIndex].value
            });
        };
    };

    function updateColumn(id, obj) {
        var column = columns[id];
        if (column) {
            for (var i in obj) {
                column[i] = obj[i];
            }
        }
    };

    var checkboxes = {};

    function createCheckedItem(len) {
        var count = 0,
            prefix = "col";
        var count_checked = 0;
        return function(column) {
            var tr = document.createElement("tr");

            var td_0 = document.createElement("td");
            var div = document.createElement("div");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            var checkboxId = prefix + "_" + count;
            checkbox.id = checkboxId;
            checkboxes[checkboxId] = checkbox;
            AttachEvent(checkbox, "change", updateColumnHelper0(checkboxId), false);
            div.appendChild(checkbox);
            var label = document.createElement("label");
            label.setAttribute("for", checkboxId);
            label.innerHTML = column;
            div.appendChild(label);
            td_0.appendChild(div);
            tr.appendChild(td_0);
            if (ie) {
                AttachEvent(checkbox, "click", function() {
                    checkbox.blur();
                }, false);

                AttachEvent(label, "click", function() {
                    label.blur();
                }, false);
            }

            var td_1 = document.createElement("td");
            var select = document.createElement("select");
            var opt0 = document.createElement("option");
            opt0.value = "select";
            opt0.innerHTML = "下拉框";
            var opt1 = document.createElement("option");
            opt1.value = "input";
            opt1.innerHTML = "文本框";
            select.appendChild(opt0);
            select.appendChild(opt1);
            AttachEvent(select, "change", updateColumnHelper1(checkboxId), false);
            td_1.appendChild(select);
            tr.appendChild(td_1);

            panel.appendChild(tr);

            count++;
            columns[checkboxId] = new Column(checkboxId, column);
            if (cols.hasOwnProperty(column)) {
                var tp = cols[column];
                columns[checkboxId].checked = true;
                columns[checkboxId].type = tp;
                checkbox.checked = true;
                count_checked++;

                if (tp === "select")
                    opt0.selected = true;
                else if (tp === "input")
                    opt1.selected = true;
            }

            if (count_checked === len)
                col_all.checked = true;
        }
    };

    function getDSColumns() {
        var dsobj = null;
        m_pobj = eval("parentobj.page." + parentobj.objname);
        if (m_pobj.DS == null) { // 主要读取map的数据列
            var tmpxml = new String();
            tmpxml = m_pobj.xml;

            var m_pobj2 = new PdfDoc();
            var ds = new DataSourse();
            m_pobj2.DS.LoadStruct(getObjXml(m_pobj.selectNodes("DataSources")[0]));
            m_pobj2.Param.LoadStruct(getObjXml(m_pobj.selectNodes("Parameter")[0]));
            m_pobj = m_pobj2;
        }
        dsobj = m_pobj.DS.GetNode(parentobj.dsname); // 根据数据源名称得到数据对象
        if (dsobj == null) return;
        if ((dsobj.Columns == null || dsobj.Columns == "") && 'Normal' != dsobj.Type) // 当类型为脚本时，列空时从服务器读取列信息
        {
            var sql = m_pobj.Param.Replace(dsobj.SQL); // 参数替换
            var url = "../../Server/DataBase.aspx?Typein=" + m_pobj.DS.TypeIn + "&command=colname" + "&temp=" + Math.random();
            dsobj.Columns = SendInfoToSever(url, sql); // 将返回值保存在列字段，下回访问时就不用读取服务器(在没有设置数据源情况下)
        }
        // 以","号进行拆分
        var dslist = dsobj.Columns.split(",");
        return dslist;
    };

    function reback() {
        window.returnValue = columns;
        window.close();
    };
}(window.dialogArguments));