if (window.attachEvent)
	window.attachEvent('onload', showRooms_);
else if (window.addEventListener)
	window.addEventListener('load', function() {
		showRooms_();
	}, false);

function showRooms_() {
	showRooms({
		"banner": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/huxingbanner.jpg",
		"rooms": [{
			"id": 27,
			"name": "C2栋楼",
			"desc": "万达广场一期",
			"rooms": "两室一厅一卫",
			"floor": "10层",
			"area": "约92平米",
			"simg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182622_30281.jpg",
			"bimg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182622_30281.jpg",
			"width": 1600,
			"height": 1600,
			"dtitle": ["详细文字介绍：采用坡地平衡设计，兼顾居住空间对景观优越性和环境舒适度的需求，建筑整体结合地势特征，完美融合坡地山景与自然环境，带来舒适居住体验"],
			"dlist": ["详细介绍2"],
			"pics": [{
				"img": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182823_32298.jpg",
				"width": 960,
				"height": 960,
				"name": "C2户型图二"
			}, {
				"img": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182622_77041.jpg",
				"width": 960,
				"height": 960,
				"name": "C2户型图三"
			}],
			"full3d": [{
				"name": "ff",
				"list": [{
					"name": "aa",
					"url": "\/pfid\/22"
				}],
				"bimg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/bg_3.jpg"
			}, {
				"name": "\u82b1\u56ed",
				"list": [{
					"name": "bb",
					"url": "\/pfid\/21"
				}],
				"bimg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/bg_3.jpg"
			}, {
				"name": "cc",
				"list": [{
					"name": "\u5916\u666f",
					"url": "\/pfid\/20"
				}],
				"bimg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/bg_3.jpg"
			}]
		}, {
			"id": 28,
			"name": "A1栋楼",
			"desc": "万达广场二期",
			"rooms": "一室一厅一卫",
			"floor": "30层",
			"area": "约68平米",
			"simg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182711_28124.jpg",
			"bimg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182711_28124.jpg",
			"width": 1600,
			"height": 1600,
			"dtitle": ["A1栋楼详细文字介绍"],
			"dlist": ["辅助介绍文字"],
			"pics": [{
				"img": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182711_11781.jpg",
				"width": 960,
				"height": 960,
				"name": "A1户型图二"
			}, {
				"img": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182711_76039.jpg",
				"width": 960,
				"height": 960,
				"name": "A1户型图三"
			}]
		}, {
			"id": 29,
			"name": "C3号楼",
			"desc": "万达广场三期",
			"rooms": "4室2厅2卫",
			"floor": "共16层",
			"area": "240平米",
			"simg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182822_99313.jpg",
			"bimg": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182822_99313.jpg",
			"width": 1600,
			"height": 1600,
			"dtitle": ["详细文字介绍"],
			"dlist": ["辅助文字介绍"],
			"pics": [{
				"img": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182823_43977.jpg",
				"width": 960,
				"height": 960,
				"name": "C3户型图二"
			}, {
				"img": "http:\/\/www.mengsi.cn/themes/Wap/default/22/images/20131012182823_32298.jpg",
				"width": 960,
				"height": 960,
				"name": "C3户型图三"
			}]
		}]
	});
};