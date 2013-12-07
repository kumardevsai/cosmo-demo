(function() {
  var option = {
    "product": "embed",
    "challenge": "91c519d0f48a4dda68edfeec7f8a85a4W2dQ2xo2j2kHD6Sz0W2rUefr4NT1lc2yg7P9D2x0t3X1B8f4C3UV1nO7Jh2bN9KCS8vt2w9z8HYg2EKd2Ty2q3M3R6i2k7F9m2IB4O1l3o1mJ7bn2vsI0u3Gj1w8Ls4aYAM2u6ZaV0QGZ3eE5ihLP5Ac1pR8Xp4Fq",
    "ypos": "27",
    "apiserver": "http://api.geetest.com/",
    "sliceurl": "pictures/gt/fb94a30b/26343581.jpg",
    "link": "http://data.geetest.com/redirect?des=lhb.265g.com/2013/",
    "imgserver": "http://static.geetest.com/",
    "geetestid": "482708a0f54c0bff54c6dafe3629d7bc",
    "id": "a91c519d0f48a4dda68edfeec7f8a85a4",
    "imgurl": "pictures/gt/fb94a30b.jpg"
  };
  if (!window.GeeTestOptions) {
    window.GeeTestOptions = [option];
  } else {
    GeeTestOptions = GeeTestOptions.concat(option);
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