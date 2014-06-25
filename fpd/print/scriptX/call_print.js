(function(win) {

    var agent = win.navigator.userAgent,
        doc = win.document,
        obj = win.dialogArguments;
    /**
    obj = {
        styleArray: [],
        styles: [],
        html: "fffffffffffffffff",
        header: "ffffffffff",
        footer: 'xxxxxxxxxxx',
        root: "div1"
    };
    **/
    if (!obj)
        return;

    var rootPath,
        styleArray,
        styles,
        html_,
        header,
        footer,
        root,
        pageSetup,
        cabPath;
    var scriptX;

    function inits() {
        decorate();
        rootPath = obj.rootPath,
        styleArray = obj.styleArray,
        styles = obj.styles,
        html_ = obj.html,
        header = obj.header,
        footer = obj.footer,
        pageSetup = obj.pageSetup,
        cabPath = obj.cabPath;

        scriptX = (function() {
            var temp = doc.createElement("div");
            temp.innerHTML = '<object viewastext id="factory" style="display:none" classid="clsid:1663ed61-23eb-11d2-b92f-008048fdd814" codebase="' + cabPath + '#Version=7,4,0,8"></object>';
            return temp.children[0];
        }());

        if (obj.root) {
            var interval = win.setInterval(function() {
                root = doc.getElementById(obj.root);
                if (root) {
                    initPage();
                    clearInterval(interval);
                }
            }, 10);
        }
    };

    function initPage() {
        var head_0 = doc.getElementsByTagName("head")[0];
        if (styleArray) {
            var i = 0,
                len = styleArray.length;
            for (i; i < len; i++) {
                head_0.appendChild(createLinkStyle(styleArray[i]));
            }
        }
        if (styles) {
            var i = 0,
                len = styles.length;
            for (var i; i < len; i++) {
                head_0.appendChild(createStyle(styles[i]));
            }
        }
        if (html_) {
            root.innerHTML = html_;
            root.appendChild(scriptX);
            print_this();
        }
    };

    function createLinkStyle(href_) {
        var link_ = doc.createElement("link");
        link_.rel = "stylesheet";
        link_.type = "text/css";
        link_.href = (rootPath ? rootPath : "") + href_;
        return link_;
    };

    function createStyle(style_) {
        var style = doc.createElement("style");
        style.type = "text/css";
        if (style.styleSheet)
            style.styleSheet.cssText = style_;
        else
            style.innerHTML = style_;
        return style;
    };

    function print_this() {
        if (/msie/i.test(agent)) {
            set_config_ie();
            MeadCo.ScriptX.PrintPage(false);
            return;
        }
        window.print();
    };

    function set_config_ie() {
        var config = {
            header: pageSetup === false ? "" : (header ? header : ""),
            footer: pageSetup === false ? "" : (footer ? footer : ""),
            bottomMargin: "0",
            leftMargin: "0",
            rightMargin: "0",
            topMargin: "0"
        };

        if (MeadCo.ScriptX.Init()) {
            for (var i in config) {
                MeadCo.ScriptX.Printing[i] = config[i];
                // MeadCo.ScriptX.Printing.orientation = "landscape";
            }
        }
    };

    function decorate() {
        var editBtn = doc.getElementById("edit");
        editBtn.parentNode.removeChild(editBtn);
    };

    win.onload = inits;

}(window));