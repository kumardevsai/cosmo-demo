(function() {
  var option = {
    "product": "embed",
    "challenge": "6908a2cd8250b8d10ab18fa73991906frG3NUpfa5VOgP6l3P9e4J4R5s1Z4z3C2tTkCtjU3R3b7nq4G7v0zoHsi4M1du3h3Q7ZuT5nW4w3c2H3X7aEm5S3Qf9IAK4N4BrE7F0y4VOKm5x1Lh3b3e7I4Y8XLkW9i4J1D3pgq5FBD0v8j3c5od6A3SMx3w7yYl",
    "ypos": "3",
    "apiserver": "http://api.geetest.com/",
    "sliceurl": "pictures/gt/fb94a30b/6733b1f8.jpg",
    "link": "http://lhb.265g.com/2013/",
    "imgserver": "http://static.geetest.com/",
    "geetestid": "482708a0f54c0bff54c6dafe3629d7bc",
    "id": "a6908a2cd8250b8d10ab18fa73991906f",
    "imgurl": "pictures/gt/fb94a30b.jpg"
  };
  if (!window.GeeTestOptions) {
    window.GeeTestOptions = [option];
    window.GeeTestOptions_ = [option];
  } else {
    GeeTestOptions = GeeTestOptions.concat(option);
    GeeTestOptions_ = GeeTestOptions_.concat(option);
  };
  /**
  var node, scripts = document.body.getElementsByTagName('script'),
    src = "http://api.geetest.com/get.php?gt=" + option.geetestid;
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(src) !== -1) {
      node = scripts[i];
      var gs = document.createElement("script");
      gs.type = "text/javascript";
      gs.id = option.id + "_script";
      gs.charset = "utf-8";
      gs.async = true;
      gs.src = "http://static.geetest.com/js/geetest.2.4.7.js";
      node.parentNode.insertBefore(gs, node.nextSibling);
      node.parentNode.removeChild(node);
      break;
    }
  }
  **/
})();