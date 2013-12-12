(function() {

	var container = $$("idContainer"),
		src = "1.jpg",
		options = {
			onPreLoad: function() {
				container.style.backgroundImage = "url('loading.gif')";
			},
			onLoad: function() {
				container.style.backgroundImage = "";
			}
		},
		it = new ImageTrans(container, options);
	it.load(src);
	//垂直翻转
	$$("idVertical").onclick = function() {
		it.vertical();
	}
	//水平翻转
	$$("idHorizontal").onclick = function() {
		it.horizontal();
	}
	//左旋转
	$$("idLeft").onclick = function() {
		it.left();
	}
	//右旋转
	$$("idRight").onclick = function() {
		it.right();
	}
	//重置
	$$("idReset").onclick = function() {
		it.reset();
	}
	//换图
	$$("idLoad").onclick = function() {
		it.load($$("idSrc").value);
	}

})();