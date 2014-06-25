(function(win) {

    var agent = win.navigator.userAgent,
        doc = win.document,
        obj = win.dialogArguments;
    if (!obj)
        return;

    var rootPath,
        styleArray,
        styles,
        html_,
        header,
        footer,
        root, pageSetup;

    function inits() {
        decorate();
        rootPath = obj.rootPath,
        styleArray = obj.styleArray,
        styles = obj.styles,
        html_ = obj.html,
        header = obj.header,
        footer = obj.footer,
        pageSetup = obj.pageSetup;

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
            try {
                set_config_ie();
            } catch (e) {
                var errorMsg = e.message + "\r" + "请设置:IE选项->安全->Internet->" + "ActiveX控件和插件" + "\r" + "对未标记为可安全执行脚本的ActiveX的控件初始化并执行脚本->允许/提示";
                alert(errorMsg);
                return;
            }
        }
        window.print();
    };

    function set_config_ie() {
        var root = "HKEY_CURRENT_USER",
            path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        var config = {
            header: pageSetup === false ? "" : (header ? header : ""),
            footer: pageSetup === false ? "" : (footer ? footer : ""),
            margin_left: 0,
            margin_top: 0,
            margin_right: 0,
            margin_bottom: 0
        };
        var Wsh = new ActiveXObject("WScript.Shell");
        for (var i in config) {
            Wsh.RegWrite(root + path + i, config[i]);
        }
    };

    function decorate() {
        var editBtn = doc.getElementById("edit");
        editBtn.parentNode.removeChild(editBtn);
    };

    win.onload = inits;

}(window));