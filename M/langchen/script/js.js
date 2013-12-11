$(function() {
	//--主导航固定顶部
	//--首页顶部广告自动关闭（复杂特效）
	var topAdTime;
	$('.topAd').find('.close').click(function() {
		clearInterval(topAdTitme3);
		clearTimeout(topAdTime);
		topAdFun();
	})
	$('.tpAdd2').find('.btn').click(function() {
		$('.topAd').animate({
			height: 194
		}, "fast");
		$('.tpAdd2').animate({
			height: 0
		}, "fast");
		$('.navDiv').animate({
			top: 194
		}, "fast");
		topAdTime = setTimeout("topAdFun()", 15000);
		clearInterval(topAdTitme3);
		topAdTitme2 = 15;
		$('.topAd').find('.close').find('span').html(topAdTitme2);
		topAdTitme3 = setInterval("topAdTimeFun()", 1000);
	})
	if ($('.topAd').length > 0) {
		topAdTime = setTimeout("topAdFun()", 15000);
		$('.topAd').find('.close').find('span').html(topAdTitme2);
		topAdTitme3 = setInterval("topAdTimeFun()", 1000);
		if ($(window).scrollTop() > 194) {
			$('.navDiv').css('top', 0);
		} else {
			$('.navDiv').css('top', 194 - $(window).scrollTop());
		}
		$(window).scroll(function() {
			if ($('.topAd').height() > 0) {
				if ($(window).scrollTop() < 194) {
					$('.navDiv').css('top', 194 - $(window).scrollTop());
				} else {
					$('.navDiv').css('top', 0);
				}
			}
		})
		$(window).scroll(function() {
			if ($('.tpAdd2').height() > 0) {
				if ($(window).scrollTop() < 33) {
					$('.navDiv').css('top', 33 - $(window).scrollTop());
				} else {
					$('.navDiv').css('top', 0);
				}
			}
		})
	} else {
		/*$('.sNavDiv').hide();*/
		$('.navDiv').css('top', 0);
	}
	//---我们在为谁服务动画
	if ($('.Client').find('.imgDiv').length > 0) {
		$('.Client').find('.imgDiv').find('.ico').each(function(i) {
			icoTop[i] = parseFloat($(this).css('top'));
			icoTopImg[i] = $(this);
		})
		clientTime = setTimeout('clientImg()');
	}
	//-----留言板弹出层
	$('.lyb_layer').find('.close').click(function() {
		$('.lyb_layer').hide();
	})
	$('.lyb_a').click(function() {
		$('.lyb_layer').css('top', $(this).offset().top - 390);
		$('.lyb_layer').css('left', $(this).offset().left - 405);
		$('.lyb_layer').show();
	})
	//--新闻（复杂特效）
	if ($('.newsList').length > 0) {
		newsListFun();
		$(window).resize(function() {
			newsListFun();
		})
		//
		$('.newsList').find('.list').find('li').each(function() {
			$(this).find('.bg').height($(this).height());
		})
		//
		$('.newsList').find('.list').eq(newsListNow).addClass('listNow');
		$('.newsList').find('.list').eq(newsListNow + 1).addClass('listNow');
	}
	$('.newsList').find('.list').find('li').hover(
		function() {
			$(this).addClass('liNow');
		},
		function() {
			$(this).removeClass('liNow');
		}
	)
	/*$('.newsList').find('.rightBtn').click(function(){
		if(newsListNow<Math.ceil($('.newsList').find('.list').length-2)){
		  newsListNow=newsListNow+2;
		  newsListFun2(334);
		  $('.newsList').find('.list').find('li').unbind();
		  $('.newsList').find('.listNow').find('li').click(function(){
			$('#newsShow').html("");
			$('.newShow').show();
			$('#newsShow').load('newShow.php?varid='+$(this).attr('ajaxId'));
			})
		}
		})	
	$('.newsList').find('.leftBtn').click(function(){
		if(newsListNow>0){
		  newsListNow=newsListNow-2;
		  newsListFun2(-334);
		  $('.newsList').find('.list').find('li').unbind();
		  $('.newsList').find('.listNow').find('li').click(function(){
			$('#newsShow').html("");
			$('.newShow').show();
			$('#newsShow').load('newShow.php?varid='+$(this).attr('ajaxId'));
			})
		}
		})	
	$('.newsList').find('.listNow').find('li').click(function(){
		$('#newsShow').html("");
		$('.newShow').show();
		$('#newsShow').load('newShow.php?varid='+$(this).attr('ajaxId'));
		})	
	$('.newShow').find('.close').click(function(){
		$('.newShow').hide();
		})	*/
	//--网络营销
	var NetworkFastNow = 0;
	$('.Network').find('li:odd').css('background', '#000');
	if ($('.NetworkFast').length > 0) {
		$('.NetworkFast').find('li').eq(NetworkFastNow).addClass('liNow');
		$(window).scroll(function() {
			$('.Network').find('li').each(function(i) {
				if ($(window).scrollTop() >= $(this).offset().top - $(window).height() / 2) {
					$('.NetworkFast').find('li').eq(NetworkFastNow).removeClass('liNow');
					NetworkFastNow = i;
					$('.NetworkFast').find('li').eq(NetworkFastNow).addClass('liNow');
				}
			})
		})
	}
	$('.NetworkFast').find('.ewm').click(function() {
		$('.NetworkFast').animate({
			top: -230
		}, 500);
		$('.NetworkFast').find('.ewmDiv').show();
	})
	$('.NetworkFast').find('.close').click(function() {
		$('.NetworkFast').animate({
			top: 56
		}, 500);
		$('.NetworkFast').find('.ewmDiv').hide();
	})
	$('.NetworkFast').find('li').each(function(i) {
		$(this).click(function() {
			$('html, body').animate({
				scrollTop: $('.Network').find('li').eq(i).offset().top - 55
			}, 500);
			NetworkFastNow = i;
		})
		$(this).hover(
			function() {
				$('.NetworkFast').find('li').eq(NetworkFastNow).removeClass('liNow');
				$(this).addClass('liNow');
			},
			function() {
				if (i != NetworkFastNow) {
					$('.NetworkFast').find('li').eq(NetworkFastNow).addClass('liNow');
					$(this).removeClass('liNow');
				}
			}
		)
	})
	//--成功案例鼠标效果
	$('.case').find('li:first').css('color', '#fff');
	$('.case').find('li').hover(
		function() {
			$(this).addClass('liNow');
		},
		function() {
			$(this).removeClass('liNow');
		}
	)
	//--成功案例
	if ($('.caseBtn').length > 0) {
		caseBtnFun();
		$(window).resize(function() {
			caseBtnFun();
		})
	}
	//--客户
	$('.ClientPart1').find('.rightBtn').click(function() {
		imgScrollRight2($('.ClientPart1').find('.list'), $('.ClientPart1').find('li').length / 3 - 1, 990, 0);
	})
	$('.ClientPart1').find('.leftBtn').click(function() {
		imgScrollLeft2($('.ClientPart1').find('.list'), $('.ClientPart1').find('li').length / 3 - 1, 990, 0);
	})
	//--案例详情
	//$('.caseShow').find('li:odd').css('background','#ffc088');	
	if ($('.caseSide').length > 0) {
		caseSideFun();
		$(window).resize(function() {
			caseSideFun();
		})
		$(window).scroll(function() {
			if ($(window).scrollTop() > 600) {
				$('.caseShowBtn').css('top', $(window).scrollTop() + 200);
			} else {
				$('.caseShowBtn').css('top', 800);
			}
		})
	}
	//--我们是谁
	$('.whoweare').find('li').hover(
		function() {
			$(this).addClass('liNow');
		},
		function() {
			$(this).removeClass('liNow');
		}
	)
	//--我们是谁背景滚动
	$(window).scroll(function() {
		if ($('.whoweare').length > 0) {
			$('.whoweareDiv').find('.bg').css('top', -80 - ($(window).scrollTop() - $('.whoweareDiv').offset().top) * 4);
		}
	})
	//--我们的优势
	var aboutPart1BgTop = 0;
	$(window).scroll(function() {
		if ($('.aboutPart1').length > 0 && $('.aboutPart1').offset().top <= $(window).scrollTop() + $(window).height()) {
			aboutPart1BgTop = ($(window).scrollTop() - $('.aboutPart1').offset().top) / 2;
			$('.aboutPart1').find('.bg').css('top', aboutPart1BgTop);
		}
	})
	if ($('.aboutPart1').length > 0) {
		$('.aboutPart1').find('.btnDiv').find('span').fadeTo(100, 0.5);
		$('.aboutPart1').find('.btnDiv').find('span:first').fadeTo(100, 1);
	}
	$('.aboutPart1').find('.rightBtn').click(function() {
		imgScrollRight2($('.aboutPart1').find('.list'), $('.aboutPart1').find('li').length - 1, 630, 0);
		$('.aboutPart1').find('.btnDiv').find('span').fadeTo(100, 0.5);
		$('.aboutPart1').find('.btnDiv').find('span').eq(imgScrollNum2[0]).fadeTo(100, 1);
	})
	$('.aboutPart1').find('.leftBtn').click(function() {
		imgScrollLeft2($('.aboutPart1').find('.list'), $('.aboutPart1').find('li').length - 1, 630, 0);
		$('.aboutPart1').find('.btnDiv').find('span').fadeTo(100, 0.5);
		$('.aboutPart1').find('.btnDiv').find('span').eq(imgScrollNum2[0]).fadeTo(100, 1);
	})
	$('.aboutPart1').find('.btnDiv').find('span').each(function(i) {
		$(this).click(function() {
			imgScrollNum2[0] = i - 1;
			imgScrollRight2($('.aboutPart1').find('.list'), $('.aboutPart1').find('li').length - 1, 630, 0);
			$('.aboutPart1').find('.btnDiv').find('span').fadeTo(100, 0.5);
			$('.aboutPart1').find('.btnDiv').find('span').eq(imgScrollNum2[0]).fadeTo(100, 1);
		})
	})
	//--我们的优势2
	var aboutPart2BgTop = 0;
	$(window).scroll(function() {
		if ($('.aboutPart2').length > 0 && $('.aboutPart2').offset().top <= $(window).scrollTop() + $(window).height()) {
			aboutPart2BgTop = ($(window).scrollTop() - $('.aboutPart2').offset().top) / 2;
			$('.aboutPart2').find('.bg').css('top', aboutPart2BgTop);
			$('.aboutPart2Div').css('top', aboutPart2BgTop / 2 + 250);
		}
	})
	if ($('.aboutPart2').length > 0) {
		$('.aboutPart2').find('ul').width($('.aboutPart2').find('li').length * 224);
		$("#Level_scroll").hScrollPane({
			mover: "ul",
			showArrow: true,
			handleCssAlter: "draghandlealter",
			mousewheel: {
				bind: true,
				moveLength: 500
			}
		});
	}
	//--我们的环境
	var aboutPart3BgTop = 0;
	$(window).scroll(function() {
		if ($('.aboutPart3').length > 0 && $('.aboutPart3').offset().top <= $(window).scrollTop() + $(window).height()) {
			aboutPart3BgTop = ($(window).scrollTop() - $('.aboutPart3').offset().top) / 2;
			$('.aboutPart3').find('.bg').css('top', aboutPart3BgTop);
			$('.aboutPart3Div').css('top', aboutPart3BgTop / 2 + 250);
		}
	})
	$('.aboutPart3').find('.rightBtn').click(function() {
		imgScrollRight2($('.aboutPart3').find('.list'), $('.aboutPart3').find('li').length - 1, 754, 1);
	})
	$('.aboutPart3').find('.leftBtn').click(function() {
		imgScrollLeft2($('.aboutPart3').find('.list'), $('.aboutPart3').find('li').length - 1, 754, 1);
	})
	//--关于我们悬浮菜单
	var aboutFastNow = 0;
	if ($('.aboutFast').length > 0) {
		$(window).scroll(function() {
			$('.aboutPart').each(function(i) {
				if ($(window).scrollTop() >= $(this).offset().top - $(window).height() / 2) {
					$('.aboutFast').find('li').removeClass('liNow');
					$('.aboutFast').find('li').eq(i).addClass('liNow');
					aboutFastNow = i;
				}
			})
		})
	}
	$('.aboutFast').find('li').each(function(i) {
		$(this).click(function() {
			$('.aboutFast').find('li').removeClass('liNow');
			$(this).addClass('liNow');
			$('html, body').animate({
				scrollTop: $('.aboutPart').eq(i).offset().top - 55
			}, 500);
			aboutFastNow = i;
		})
		$(this).hover(
			function() {
				$('.aboutFast').find('li').removeClass('liNow');
				$(this).addClass('liNow');
			},
			function() {
				$('.aboutFast').find('li').removeClass('liNow');
				$('.aboutFast').find('li').eq(aboutFastNow).addClass('liNow');
			}
		)
	})
	$('.aboutFast').find('.ewm').click(function() {
		$('.aboutFast').animate({
			top: -90
		}, 500);
		$('.aboutFast').find('.ewmDiv').show();
	})
	$('.aboutFast').find('.close').click(function() {
		$('.aboutFast').animate({
			top: 150
		}, 500);
		$('.aboutFast').find('.ewmDiv').hide();
	})
	//--网站+APP策划设计
	if ($('.ProgramPart1_01').length > 0) {
		$('.ProgramPart1_01').find('.title').animate({
			left: 55,
			opacity: 'show'
		}, 300, function() {
			$('.ProgramPart1_01').find('.imgDiv').animate({
				right: 0,
				opacity: 'show'
			}, 200, function() {
				$('.ProgramPart1_01').find('.content').animate({
					left: 55,
					opacity: 'show'
				}, 300, function() {
					$('.ProgramPart1_01').find('.imgDiv2').animate({
						top: 0,
						opacity: 'show'
					}, 200);
				});
			});
		});
	}
	//--网站、APP设计
	$(window).scroll(function() {
		if ($('.ProgramPart1_02').length > 0 && $('.ProgramPart1_02').offset().top <= $(window).scrollTop() + $(window).height() - 400) {
			$('.ProgramPart1_02').find('.li_01').animate({
				top: 117,
				opacity: 'show'
			}, 300, function() {
				$('.ProgramPart1_02').find('.li_02').animate({
					top: 78,
					opacity: 'show'
				}, 200, function() {
					$('.ProgramPart1_02').find('.li_03').animate({
						top: 117,
						opacity: 'show'
					}, 300, function() {
						$('.ProgramPart1_02').find('.li_04').animate({
							top: 215,
							opacity: 'show'
						}, 200, function() {
							$('.ProgramPart1_02').find('.li_05').animate({
								left: 530,
								opacity: 'show'
							}, 300, function() {
								$('.ProgramPart1_02').find('.li_06').animate({
									left: 610,
									opacity: 'show'
								}, 300);
							});
						});
					});
				});
			});
		}
	})
	//--网站设计不同浏览器兼容的保证
	$(window).scroll(function() {
		if ($('.ProgramPart1_03').length > 0 && $('.ProgramPart1_03').offset().top <= $(window).scrollTop() + $(window).height() - 400) {
			$('.ProgramPart1_03').find('.li_01').animate({
				left: 375,
				opacity: 'show'
			}, 500, function() {
				$('.ProgramPart1_03').find('.li_02').animate({
					left: 0,
					opacity: 'show'
				}, 500, function() {
					$('.ProgramPart1_03').find('.li_03').animate({
						top: 330,
						opacity: 'show'
					}, 500);
				});
			});
		}
	})
	//--程序开发滚动
	/*var ProgramPart2_01DivTop=0;
	$(window).scroll(function(){
			if($('.ProgramPart2').length>0&&$('.ProgramPart2').offset().top<=($(window).scrollTop()+$(window).height())){
				if(ProgramPart2_01DivTop<0){
					ProgramPart2_01DivTop=($(window).scrollTop()+$(window).height()-$('.ProgramPart2').offset().top-650)/2;
					$('.ProgramPart2_02').fadeTo(1,1);
					}else{
						ProgramPart2_01DivTop=($(window).scrollTop()+$(window).height()-$('.ProgramPart2').offset().top-650);
						$('.ProgramPart2_02').fadeTo(1,0.2);
						if(650-ProgramPart2_01DivTop*4>90){
						$('.ProgramPart2_01').css('top',650-ProgramPart2_01DivTop*4);
						}
						}
				$('.ProgramPart2_02').css('top',ProgramPart2_01DivTop);	
			}
		})	*/
	var ProgramPart2_01DivTop = 0;
	$(window).scroll(function() {
		if ($('.ProgramPart2').length > 0 && $('.ProgramPart2').offset().top <= ($(window).scrollTop() + $(window).height())) {
			ProgramPart2_01DivTop = ($(window).scrollTop() - $('.ProgramPart2').offset().top) / 2;
			$('.ProgramPart2_02').css('top', ProgramPart2_01DivTop);
		}
	})
	//--功能模块定制开发 
	$('.ProgramPart2_02').find('li').find('img:first').show();
	$('.ProgramPart2_02').find('li').hover(
		function() {
			$(this).find('img:first').hide();
			$(this).find('img:last').show();
			$('.ProgramPart2_02Layer').find('h2').html($(this).find('a').html());
			$('.ProgramPart2_02Layer').find('h2').find('img').hide();
			$('.ProgramPart2_02Layer').find('.content').html($(this).find('.content').html());
			$('.ProgramPart2_02Layer').css('left', $(this).offset().left - 100);
			$('.ProgramPart2_02Layer').css('top', $(this).offset().top - 140);
			$('.ProgramPart2_02Layer').show();
		},
		function() {
			$(this).find('img:first').show();
			$(this).find('img:last').hide();
			$('.ProgramPart2_02Layer').hide();
		}
	)
	//--微信公众平台开发
	var ProgramPart3BgTop = 0;
	$(window).scroll(function() {
		if ($('.ProgramPart3').length > 0 && $('.ProgramPart3').offset().top <= $(window).scrollTop() + $(window).height()) {
			ProgramPart3BgTop = ($(window).scrollTop() - $('.ProgramPart3').offset().top) / 2;
			$('.ProgramPart3').find('dl').css('top', -ProgramPart3BgTop * 2);
			$('.ProgramPart3').find('.bg').css('top', ProgramPart3BgTop);
			$('.ProgramPart3Div').css('top', ProgramPart3BgTop / 2);
		}
	})
	//--微信公众平台开发选项卡
	var ProgramPart3Now = 0;
	$('.ProgramPart3').find('.tab').find('a').each(function(i) {
		$(this).click(function() {
			imgScrollNum2[0] = i - 1;
			imgScrollRight2($('.ProgramPart3').find('.list'), $('.ProgramPart3').find('.list').find('li').length - 1, 790, 0);
			$('.ProgramPart3').find('.tab').find('a').removeClass('aNow');
			$('.ProgramPart3').find('.tab').find('a').eq(imgScrollNum2[0]).addClass('aNow');
		})
	})
	$('.ProgramPart3').find('.rightBtn').click(function() {
		imgScrollRight2($('.ProgramPart3').find('.list'), $('.ProgramPart3').find('.list').find('li').length - 1, 790, 0);
		$('.ProgramPart3').find('.tab').find('a').removeClass('aNow');
		$('.ProgramPart3').find('.tab').find('a').eq(imgScrollNum2[0]).addClass('aNow');
	})
	$('.ProgramPart3').find('.leftBtn').click(function() {
		imgScrollLeft2($('.ProgramPart3').find('.list'), $('.ProgramPart3').find('.list').find('li').length - 1, 790, 0);
		$('.ProgramPart3').find('.tab').find('a').removeClass('aNow');
		$('.ProgramPart3').find('.tab').find('a').eq(imgScrollNum2[0]).addClass('aNow');
	})
	//--淘宝装修（复杂特效）
	var ProgramPart4BgTop = 0;
	$(window).scroll(function() {
		if ($('.ProgramPart4').length > 0 && $('.ProgramPart4').offset().top <= $(window).scrollTop() + $(window).height()) {
			ProgramPart4BgTop = ($(window).scrollTop() - $('.ProgramPart4').offset().top) / 2;
			$('.ProgramPart4').find('.bg').css('top', ProgramPart4BgTop);
			$('.ProgramPart4Div').css('top', ProgramPart4BgTop / 2 + 150);
		}
	})
	//
	var ProgramPart4Now = 0;
	if ($('.ProgramPart4').length > 0) {
		$('.ProgramPart4').find('.listLeft').html($('.ProgramPart4').find('.listCenter').html());
		$('.ProgramPart4').find('.listLeft').find('img:last').prependTo($('.ProgramPart4').find('.listLeft'));
		$('.ProgramPart4').find('.listRight').html($('.ProgramPart4').find('.listCenter').html());
		$('.ProgramPart4').find('.listRight').find('img:first').appendTo($('.ProgramPart4').find('.listRight'));
		$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).css('left', 0);
		$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).css('left', 0);
		$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).css('left', 0);
	}
	$('.ProgramPart4').find('.rightBtn').click(function() {
		$('.ProgramPart4').find('.listCenter').find('img').each(function(i) {
			if (i != ProgramPart4Now) {
				$(this).css('left', 428);
				$('.ProgramPart4').find('.listLeft').find('img').eq(i).css('left', 332);
				$('.ProgramPart4').find('.listRight').find('img').eq(i).css('left', 332);
			}
		})
		$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).animate({
			left: -428
		}, 500);
		$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).animate({
			left: -332
		}, 500);
		$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).animate({
			left: -332
		}, 500);
		ProgramPart4Now++;
		if (ProgramPart4Now == $('.ProgramPart4').find('.listCenter').find('img').length) {
			ProgramPart4Now = 0;
		}
		$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).animate({
			left: 0
		}, 500);
		$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).animate({
			left: 0
		}, 500);
		$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).animate({
			left: 0
		}, 500);
		$('.ProgramPart4').find('.btnDiv').find('span').removeClass('spanNow');
		$('.ProgramPart4').find('.btnDiv').find('span').eq(ProgramPart4Now).addClass('spanNow');
	})
	$('.ProgramPart4').find('.leftBtn').click(function() {
		$('.ProgramPart4').find('.listCenter').find('img').each(function(i) {
			if (i != ProgramPart4Now) {
				$(this).css('left', -428);
				$('.ProgramPart4').find('.listLeft').find('img').eq(i).css('left', -332);
				$('.ProgramPart4').find('.listRight').find('img').eq(i).css('left', -332);
			}
		})
		$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).animate({
			left: 428
		}, 500);
		$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).animate({
			left: 332
		}, 500);
		$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).animate({
			left: 332
		}, 500);
		ProgramPart4Now--;
		if (ProgramPart4Now < 0) {
			ProgramPart4Now = $('.ProgramPart4').find('.listCenter').find('img').length - 1;
		}
		$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).animate({
			left: 0
		}, 500);
		$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).animate({
			left: 0
		}, 500);
		$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).animate({
			left: 0
		}, 500);
		$('.ProgramPart4').find('.btnDiv').find('span').removeClass('spanNow');
		$('.ProgramPart4').find('.btnDiv').find('span').eq(ProgramPart4Now).addClass('spanNow');
	})
	$('.ProgramPart4').find('.btnDiv').find('span').each(function(i) {
		$(this).click(function() {
			$('.ProgramPart4').find('.listCenter').find('img').each(function(i) {
				if (i != ProgramPart4Now) {
					$(this).css('left', 428);
					$('.ProgramPart4').find('.listLeft').find('img').eq(i).css('left', 332);
					$('.ProgramPart4').find('.listRight').find('img').eq(i).css('left', 332);
				}
			})
			$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).animate({
				left: -428
			}, 500);
			$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).animate({
				left: -332
			}, 500);
			$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).animate({
				left: -332
			}, 500);
			ProgramPart4Now = i;
			if (ProgramPart4Now == $('.ProgramPart4').find('.listCenter').find('img').length) {
				ProgramPart4Now = 0;
			}
			$('.ProgramPart4').find('.listCenter').find('img').eq(ProgramPart4Now).animate({
				left: 0
			}, 500);
			$('.ProgramPart4').find('.listLeft').find('img').eq(ProgramPart4Now).animate({
				left: 0
			}, 500);
			$('.ProgramPart4').find('.listRight').find('img').eq(ProgramPart4Now).animate({
				left: 0
			}, 500);
			$('.ProgramPart4').find('.btnDiv').find('span').removeClass('spanNow');
			$('.ProgramPart4').find('.btnDiv').find('span').eq(ProgramPart4Now).addClass('spanNow');
		})
	})
	//--网站建设悬浮菜单
	var ProgramFastNow = 0;
	if ($('.ProgramFast').length > 0) {
		$(window).scroll(function() {
			$('.ProgramPart').each(function(i) {
				if ($(window).scrollTop() >= $(this).offset().top - $(window).height() / 2) {
					$('.ProgramFast').find('li').removeClass('liNow');
					$('.ProgramFast').find('li').eq(i).addClass('liNow');
					ProgramFastNow = i;
				}
			})
		})
	}
	$('.ProgramFast').find('.ewm').click(function() {
		$('.ProgramFast').animate({
			top: -90
		}, 500);
		$('.ProgramFast').find('.ewmDiv').show();
	})
	$('.ProgramFast').find('.close').click(function() {
		$('.ProgramFast').animate({
			top: 150
		}, 500);
		$('.ProgramFast').find('.ewmDiv').hide();
	})
	$('.ProgramFast').find('li').each(function(i) {
		$(this).click(function() {
			$('.ProgramFast').find('li').removeClass('liNow');
			$(this).addClass('liNow');
			$('html, body').animate({
				scrollTop: $('.ProgramPart').eq(i).offset().top - 55
			}, 500);
			ProgramFastNow = i;
		})
		$(this).hover(
			function() {
				$('.ProgramFast').find('li').removeClass('liNow');
				$(this).addClass('liNow');
			},
			function() {
				$('.ProgramFast').find('li').removeClass('liNow');
				$('.ProgramFast').find('li').eq(ProgramFastNow).addClass('liNow');
			}
		)
	})
	//---首页图片切换
	var indexFlashTimerID;
	if ($('.indexFlash').length > 0) {
		$('.indexFlash').find('.list').find('li:first').show();
		$('.indexFlash').find('.btnDiv').find('li').fadeTo(100, 0.3);
		$('.indexFlash').find('.btnDiv').find('li:first').fadeTo(100, 1);
		indexFlashTimerID = setInterval("indexFlash_fun()", 5000);
	}
	$('.indexFlash').find('.btnDiv').find('li').each(function(i) {
		$(this).click(function() {
			clearInterval(indexFlashTimerID);
			$('.indexFlash').find('.btnDiv').find('li').fadeTo(100, 0.3);
			$('.indexFlash').find('.btnDiv').find('li').eq(i).fadeTo(100, 1);
			$('.indexFlash').find('.list').find('li').eq(indexFlashNow).fadeOut("slow");
			indexFlashNow = i;
			$('.indexFlash').find('.list').find('li').eq(indexFlashNow).fadeIn("slow");
			indexFlashTimerID = setInterval("indexFlash_fun()", 5000);
		})
	})
	//--主导航（复杂特效，跳转页面定位）
	var sNavHeight = 0;
	$('.sNav').find('.list').each(function() {
		if (sNavHeight < $(this).height()) {
			sNavHeight = $(this).height();
		}
	})
	$('.navDiv').hover(
		function() {
			$('.navDiv').find('.bg').stop();
			$('.navDiv').find('.bg').animate({
				height: sNavHeight + 25 + 56
			}, 300);
		},
		function() {
			$('.navDiv').find('.bg').stop();
			$('.navDiv').find('.bg').animate({
				height: 56
			}, 300);
		}
	)
	/*if(GetQueryString('NetworkPart')){
		$('.Network').find('li').each(function(i){
			if(i==GetQueryString('NetworkPart')){
				$('html, body').animate({scrollTop:$('.Network').find('li').eq(i).offset().top-55}, 500);
				}
			})
		}
	*/
	/*if(GetQueryString('ProgramPart')){
		$('.ProgramPart').each(function(i){
			if(i==GetQueryString('ProgramPart')){
				$('html, body').animate({scrollTop:$('.ProgramPart').eq(i).offset().top-55}, 500);
				}
			})
		}
	*/
	/*if(GetQueryString('aboutPart')){
		$('.aboutPart').each(function(i){
			if(i==GetQueryString('aboutPart')){
				$('html, body').animate({scrollTop:$('.aboutPart').eq(i).offset().top-55}, 500);
				}
			})
		}
	*/
	//
})