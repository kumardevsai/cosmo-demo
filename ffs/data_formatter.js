(function() {
    var doc = document;
    var cpanel = window.cpanel = (function(win, global) {
        var panels = {};

        var current;

        function init() {
            var crens = doc.getElementById("content").children,
                len = crens.length,
                i;
            for (i = 0; i < len; i++) {
                var c = crens[i];
                panels[c.getAttribute("data-typeindex")] = c;
            }
        };

        function change(index) {
            if (current)
                current.style.display = "none";
            var p = panels[index];
            if (p) {
                p.style.display = "block";
                current = p;
            }
        };

        function setCurrent(index) {
            if (panels[index])
                current = panels[index];
        };

        return {
            init: init,
            change: change,
            setCurrent: setCurrent
        };
    }(window, this));

    function fillDigits(len, char_) {
        var str = "";
        for (var i = 0; i < len; i++)
            str += char_;
        return str;
    };

    var dataFormatter = window.dataFormatter = (function() {

        var structs = {};

        structs.digit = {
            num_digits: 2,
            k: false,
            getFormatter: function() {
                var formatter = "";
                if (this.k) {
                    formatter += "#,##";
                }
                if (this.num_digits > 0)
                    formatter += "0." + fillDigits(this.num_digits, "0");
                else
                    formatter += "0";
                return replace(formatter);
            }
        };

        structs.g = {
            getFormatter: function() {
                return "G"
            }
        };

        structs.money = {
            num_digits: 2,
            money_mark: "￥",
            getFormatter: function() {
                var formatter = "";
                var str = "";
                if (/￥/.test(this.money_mark))
                    str += "002200A50022";
                else if (/\$/.test(this.money_mark))
                    str += "$";
                str += "#,##";
                if (this.num_digits > 0)
                    str += "0." + fillDigits(this.num_digits, "0");
                else
                    str += "0";

                var str_ = new String(str);
                str_ = str_.replace(/#,##/, function(m) {
                    return "-" + m;
                });
                return replace(str + ";" + str_);
            }
        };

        structs.percent = {
            num_digits: 2,
            getFormatter: function() {
                var formatter = "";
                if (this.num_digits > 0)
                    formatter += "0." + fillDigits(this.num_digits, "0");
                else
                    formatter += "0";
                formatter += "%";
                return replace(formatter);
            }
        };

        structs.kuaiji = {
            num_digits: 2,
            money_mark: "￥",
            getFormatter: function() {}
        };

        function replace(formatter) {
            return formatter.replace(/[\.|;|@|#]/g, function(m) {
                return "\\" + m;
            }).replace(/-/g, function(m) {
                return "\\\\" + m;
            }).replace(/0022|00A5/g, function(m) {
                return "\\" + m;
            });
        };

        function setStructProperty(type, pro, value) {
            var struct;
            if (structs[type])
                struct = structs[type];
            else
                struct = {};
            struct[pro] = value;
        };

        function createFormatter(type) {
            var struct;
            if (structs[type])
                struct = structs[type];
            if (struct) {
                return struct.getFormatter();
            }
            return null;
        };

        return {
            setStructProperty: setStructProperty,
            createFormatter: createFormatter
        };

    }());

    function closeWindowWithValue() {
        numTypeSelect = doc.getElementById("numType");
        var index = numTypeSelect.options[numTypeSelect.selectedIndex].getAttribute("data-typeindex");
        index = parseInt(index);
        var formatter = "";
        switch (index) {
            case 0:
                formatter = dataFormatter.createFormatter("g");
                break;
            case 1:
                formatter = dataFormatter.createFormatter("digit");
                break;
            case 2:
                formatter = dataFormatter.createFormatter("money");
                break;
            case 4:
                formatter = dataFormatter.createFormatter("percent");
                break;
            default:
                break;
        }
        window.returnValue = formatter;
        closeWindow();
    };

    function closeWindow() {
        window.close();
    };

    function resize() {
        doc.getElementById("p1").style.height = doc.body.clientHeight - 50 + "px";
    };

    function showNumView() {
        var formatter = dataFormatter.createFormatter("digit");
        for (var i = 0; i < viewNumSelect.options.length; i++) {
            var n = viewNumSelect.options[i];
            var result = MSONumberFormatter.format(n.getAttribute("data-realvalue"), formatter.replace(/\\/g, ""));
            if (result.flag === true)
                n.innerHTML = result.val;
        }
    };

    function showMoneyView() {
        var formatter = dataFormatter.createFormatter("money");
        for (var i = 0; i < viewMoneySelect.options.length; i++) {
            var n = viewMoneySelect.options[i];
            var result = MSONumberFormatter.format(n.getAttribute("data-realvalue"), formatter.replace(/\\/g, "").replace(/\\0022\\00A5\\0022/g, "￥"));
            if (result.flag === true)
                n.innerHTML = result.val;
        }
    };

    AttachEvent(window, "load", inits, false);

    var useksperateCheckbox, numDigits, viewNumSelect, numDigits4Money, markForMoney, viewMoneySelect, okBtn, cancelBtn, numTypeSelect;

    function inits() {

        resize();

        okBtn = doc.getElementById("ok");
        cancelBtn = doc.getElementById("cancel");
        numTypeSelect = doc.getElementById("numType");
        useksperateCheckbox = doc.getElementById("useksperateCheckbox");
        numDigits = doc.getElementById("numDigits");
        viewNumSelect = doc.getElementById("viewNumSelect");
        numDigits4Money = doc.getElementById("numDigitsForMoney");
        markForMoney = doc.getElementById("markForMoney");
        viewMoneySelect = doc.getElementById("viewSelectForMoney");
        numDigitsForPercent = doc.getElementById("numDigitsForPercent");

        cpanel.init();
        cpanel.setCurrent(0);

        var args = window.dialogArguments;
        if (args)
            readFormation(args);

        AttachEvent(okBtn, "click", closeWindowWithValue, false);
        AttachEvent(cancelBtn, "click", closeWindow, false);
        AttachEvent(window, "resize", resize, false);
        AttachEvent(numTypeSelect, "change", function() {
            cpanel.change(numTypeSelect.options[numTypeSelect.selectedIndex].getAttribute("data-typeindex"));
        }, false);

        /**
        <!---------------------
        **/

        AttachEvent(useksperateCheckbox, "change", function() {
            dataFormatter.setStructProperty("digit", "k", useksperateCheckbox.checked);
            showNumView();
        }, false);


        AttachEvent(numDigits, "blur", function() {
            if (/^\d+$/.test(numDigits.value.replace(/\s/g, ""))) {
                dataFormatter.setStructProperty("digit", "num_digits", numDigits.value);
                numDigits.setAttribute("data-oldvalue", numDigits.value);
                showNumView();
            } else {
                numDigits.value = numDigits.getAttribute("data-oldvalue");
            }
        }, false);

        showNumView();
        /**
        --------------------->
        **/

        /**
        <!---------------------
        **/
        AttachEvent(numDigits4Money, "blur", function() {
            if (/^\d+$/.test(numDigits4Money.value.replace(/\s/g, ""))) {
                dataFormatter.setStructProperty("money", "num_digits", numDigits4Money.value);
                showMoneyView();
            } else {
                numDigits4Money.value = numDigits4Money.getAttribute("data-oldvalue");
            }
        }, false);

        AttachEvent(markForMoney, "change", function() {
            dataFormatter.setStructProperty("money", "money_mark", markForMoney.options[markForMoney.selectedIndex].getAttribute("data-money_mark"));
            showMoneyView();
        }, false);

        showMoneyView();
        /**
        --------------------->
         **/

        /**
        <!---------------------
         **/
        AttachEvent(numDigitsForPercent, "blur", function() {
            if (/^\d+$/.test(numDigitsForPercent.value.replace(/\s/g, ""))) {
                dataFormatter.setStructProperty("percent", "num_digits", numDigitsForPercent.value);
            } else
                numDigitsForPercent.value = numDigitsForPercent.getAttribute("data-oldvalue");
        }, false);
        /**
        --------------------->
        **/
    };

    function readFormation(formation) {
        var which = 0;
        var flag = false;
        if (/^g$/i.test(formation) || formation === "") {
            which = 0;
            flag = true;
        }
        if (/^[￥|\$|¥]/.test(formation)) {
            which = 2;
            flag = true;
        }
        if (/%$/.test(formation)) {
            which = 4;
            flag = true;
        }
        if (flag === false)
            which = 1;
        if (which === 0) {
            // 什么都不做
        } else {
            cpanel.change(which);
            numTypeSelect.options[numTypeSelect.selectedIndex].selected = false;
            for (var i = 0; i < numTypeSelect.options.length; i++) {
                var o = numTypeSelect.options[i];
                if (o.getAttribute("data-typeindex") == which) {
                    o.selected = true;
                    break;
                }
            }
        }

        var formatter = formation.replace(/[￥|\$|¥|%]/g, "");
        var useksperate = false;
        var num_digits = 0;


        if (/#,#+/.test(formatter))
            useksperate = true;
        if (/0\.0+/.test(formatter))
            num_digits = formatter.match(/0\.(0+)/)[1].length;
        if (which === 1) {
            numDigits.value = num_digits;
            numDigits.setAttribute("data-oldvalue", num_digits);
            useksperateCheckbox.checked = useksperate;

            dataFormatter.setStructProperty("digit", "k", useksperate);
            dataFormatter.setStructProperty("digit", "num_digits", num_digits);
            showNumView();
        } else if (which === 2) {
            var money_mark = formation.match(/^([￥|\$|¥])/)[1];

            numDigits4Money.value = num_digits;
            numDigits4Money.setAttribute("data-oldvalue", num_digits);
            markForMoney.options[markForMoney.selectedIndex].selected = false;
            for (var i = 0; i < markForMoney.options.length; i++) {
                var o = markForMoney.options[i];
                if (o.getAttribute("data-money_mark") === money_mark) {
                    o.selected = true;
                    break;
                }
            }

            dataFormatter.setStructProperty("money", "num_digits", num_digits);
            dataFormatter.setStructProperty("money", "money_mark", money_mark);
            showMoneyView();
        } else if (which === 4) {
            numDigitsForPercent.value = num_digits;
            numDigitsForPercent.setAttribute("data-oldvalue", num_digits);

            dataFormatter.setStructProperty("percent", "num_digits", num_digits);
        }
    };
}());