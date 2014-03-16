(function() {
  var option = {
    "product": "embed",
    "fullbg": "pictures/gt/05b7d61b/05b7d61b.jpg",
    "staticserver": "http://staticserver.b0.upaiyun.com/",
    "challenge": "4882197c64a0dcce9f6ca32ea13e08b5h8",
    "ypos": 19,
    "sprite2xurl": "sprite/sp2x-s790463971f.png",
    "apiserver": "http://api.geetest.com/",
    "sliceurl": "pictures/gt/05b7d61b/slice/f530b2a4.png",
    "version": "2.5.3",
    "link": "http://fahao.265g.com",
    "imgserver": "http://geetest-jordan2.b0.upaiyun.com/",
    "spriteurl": "sprite/sp-s089a6e5ece.png",
    "geetestid": "482708a0f54c0bff54c6dafe3629d7bc",
    "id": "a4882197c64a0dcce9f6ca32ea13e08b5",
    "imgurl": "pictures/gt/05b7d61b/bg/f530b2a4.jpg"
  };
  if (!window.GeeTestOptions) {
    window.GeeTestOptions = [option];
  } else {
    GeeTestOptions = GeeTestOptions.concat(option);
  };
  var node, scripts = document.body.getElementsByTagName('script'),
    src = option.apiserver + "get.php?gt=" + option.geetestid;
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(src) !== -1) {
      node = scripts[i];
      var gs = document.createElement("script");
      gs.type = "text/javascript";
      gs.id = option.id + "_script";
      gs.charset = "utf-8";
      gs.async = true;
      gs.src = option.staticserver + "js/geetest." + option.version + ".js";
      node.parentNode.insertBefore(gs, node.nextSibling);
      node.parentNode.removeChild(node);
      var ie6 = /msie 6/i.test(navigator.userAgent),
        ieimg = ie6 ? "gif" : "png";
      var retina = window.devicePixelRatio && window.devicePixelRatio > 1,
        rImg = retina ? option.sprite2xurl : option.spriteurl;
      document.createElement("img").src = option.staticserver + rImg;
      if (!document.getElementById("gt_css")) {
        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", option.staticserver + "css/style.css?v=" + option.version);
        css.setAttribute("id", "gt_css");
        document.getElementsByTagName("head")[0].appendChild(css)
      }
      break;
    }
  }
})()