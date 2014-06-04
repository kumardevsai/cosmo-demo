var cpanel = window.cpanel = (function(win, global) {
    var doc = win.document;
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
            return formatter;
        }
    };

    structs.g = {
        getFormatter: function() {
            return "G"
        }
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
    var numTypeSelect = document.getElementById("numType");
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
    document.getElementById("p1").style.height = document.body.clientHeight - 50 + "px";
};

AttachEvent(window, "load", inits, false);

function inits() {
    resize();

    cpanel.init();
    cpanel.setCurrent(0);

    var okBtn = document.getElementById("ok");
    var cancelBtn = document.getElementById("cancel");
    var numTypeSelect = document.getElementById("numType");

    AttachEvent(okBtn, "click", closeWindowWithValue, false);
    AttachEvent(cancelBtn, "click", closeWindow, false);
    AttachEvent(window, "resize", resize, false);
    AttachEvent(numTypeSelect, "change", function() {
        cpanel.change(numTypeSelect.options[numTypeSelect.selectedIndex].getAttribute("data-typeindex"));
    }, false);

    var useksperate = document.getElementById("useksperate");
    AttachEvent(useksperate, "change", function() {
        dataFormatter.setStructProperty("digit", "k", useksperate.checked);
        showNumView();
    }, false);

    var numDigits = document.getElementById("numDigits");
    AttachEvent(numDigits, "change", function() {
        dataFormatter.setStructProperty("digit", "num_digits", numDigits.options[numDigits.selectedIndex].getAttribute("data-num_digits"));
        showNumView();
    }, false);

    var viewNumSelect = document.getElementById("viewNumSelect");

    function showNumView() {
        var formatter = dataFormatter.createFormatter("digit");
        for (var i = 0; i < viewNumSelect.options.length; i++) {
            var n = viewNumSelect.options[i];
            var result = MSONumberFormatter.format(n.getAttribute("data-realvalue"), formatter);
            if (result.flag === true)
                n.innerHTML = result.val;
        }
    };
};