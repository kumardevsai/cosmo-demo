/*! gt-front - v2.5.1 - 2014-03-12
 * http://geetest.com/
 * Copyright (c) 2014 zhangcx93; Licensed  */
! function(a) {
	"use strict";
	var b = function(a) {
		return "[object Object]" === {}.toString.call(a)
	}, c = function(a) {
			return "[object Function]" === {}.toString.call(a)
		}, d = function(a) {
			var b = a.toString();
			return b = b.substr("function ".length), b = b.substr(0, b.indexOf("("))
		}, e = function(a) {
			if (null === a || "object" != typeof a) return a;
			var b = new a.constructor;
			for (var c in a) b[c] = e(a[c]);
			return b
		}, f = {
			defaultConfig: {
				challenge: "",
				ypos: "",
				apiserver: "http://api.geetest.com/",
				sliceurl: "",
				imgserver: "http://static.geetest.com/",
				websiteid: 2,
				geetestid: "",
				imgurl: "",
				bg: "themes/default/bgall-float.png",
				flash_img: "themes/default/finish.png",
				popupbg: "themes/default/bgall-popup-grey.png",
				product: "float",
				id: "",
				link: "",
				css: "css/style.css",
				onValidate: function() {}
			}
		}, g = f.loadModule = function(a, e, g) {
			var h, i = f;
			if (g = g || i, b(a)) {
				for (h in a) g[h] = a[h];
				return i
			}
			return c(a) ? (h = d(a), g[h] = a, i) : (e && e(i), i)
		}, h = f.loadConfig = function(b, c) {
			var d, g = f;
			if (a.GeeTestOptions && a.GeeTestOptions.length) {
				var h = a.GeeTestOptions;
				if (g.config) {
					for (var i = 0; i < h.length; i++)
						if (h[i].id === g.config.id) {
							d = g.config, b = h[i], h.splice(i, 1);
							break
						}
				} else d = g.defaultConfig, b = h[0], h.splice(0, 1)
			}
			return g.config = function() {
				var a = e(d ? d : g.defaultConfig);
				for (i in b) a[i] = b[i];
				return a
			}(), c && c(), g.config
		}, i = h(),
		j = (f.reloadConfig = function() {
			return i = h(), f
		}, function(a, b, c) {
			var d, e = Array.prototype.indexOf;
			if (b) {
				if (e) return e.call(b, a, c);
				for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
					if (c in b && b[c] === a) return c
			}
			return -1
		}),
		k = /msie 6/i.test(navigator.userAgent),
		l = "transition" in document.body.style || "webkitTransition" in document.body.style || "mozTransition" in document.body.style || "msTransition" in document.body.style,
		m = {}, n = m.jsonp = function(b, c) {
			var d = document.createElement("script"),
				e = !1;
			d.src = b, c = c || function() {}, d.onload = d.onreadystatechange = function() {
				this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (a.GeeTest_tempData && c ? (c(GeeTest_tempData), GeeTest_tempData = null) : c && c(), e = !0, this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this))
			}, setTimeout(function() {
				!e && c && c(!1, "Connection Timeout or Internal Server Error")
			}, 2e3), document.getElementsByTagName("head")[0].appendChild(d)
		}, o = function() {
			var a, b = function(a) {
					for (var b = i.challenge.slice(32), c = [], d = 0; d < b.length; d++) {
						var e = b.charCodeAt(d);
						c[d] = e > 57 ? e - 87 : e - 48
					}
					b = 36 * c[0] + c[1];
					for (var f, g = a - 0 + b, h = i.challenge.slice(0, 32), j = [
							[],
							[],
							[],
							[],
							[]
						], e = {}, k = 0, d = 0, l = h.length; l > d; d++) f = h.charAt(d), e[f] || (e[f] = 1, j[k] = j[k].concat(f), k++, k = 5 == k ? 0 : k);
					for (var m, n, o = g, p = 4, q = "", r = [1, 2, 5, 10, 50]; o > 0;) m = parseInt(Math.random() * p, 10), o - r[m] >= 0 ? (n = parseInt(Math.random() * j[m].length, 10), q = q.concat(j[m][n]), o -= r[m]) : (j.splice(m, 1), r.splice(m, 1), p -= 1);
					return q
				};
			return {
				base: a,
				getResponse: b
			}
		};
	g(o());
	var p, q, r = function() {
			var a = i.product,
				b = function() {
					var a = [];
					return function(b) {
						if ("string" == typeof b) {
							for (var c = 0, d = a.length; d > c; c++)
								if (-1 !== a[c].className.indexOf(b.split(".")[1])) return a[c];
							return !1
						}
						a.push(b)
					}
				}(),
				c = function(a, c, d) {
					var e, f, d = d || !1;
					if ("string" == typeof a) {
						if (f = b("." + a), !f) return
					} else f = a; if (e = f.className.split(" "), d) return f.className = e[0] + " " + c;
					for (var g = 0; g < e.length; g++)
						if (c === e[g]) return e.splice(g, 1), f.className = e.join(" ");
					return e.push(c), f.className = e.join(" ")
				}, d = function(a, b) {
					return a.parentNode.insertBefore(b, a.nextSibling), b
				}, g = function w(a, c) {
					var d, e = document.createElement("div");
					c = c || e.cloneNode();
					for (d in a) {
						var f, g = "" === d.split(".")[0] ? "div" : d.split(".")[0];
						"input" === g ? (f = document.createElement(g), f.className = d.split(".")[1], f.type = "hidden", f.name = d.split(".")[1]) : (f = document.createElement(g), f.className = d.split(".")[1]), (".gt_holder" === d || ".gt_popup" === d) && (f.id = i.id), c.appendChild(f), b(f), w(a[d], f)
					}
					return c.childNodes ? c : null
				}, h = {};
			h.embed = {
				".gt_holder": {
					".gt_widget": {
						".gt_ads_holder": {
							"a.gt_ads": {
								".gt_ads_slice": {
									".gt_ads_drag_hand": {}
								}
							},
							"a.gt_ads_bg": {},
							".gt_ads_anim": {}
						},
						".gt_info": {
							".gt_info_tip": {
								".gt_info_time": {},
								".gt_info_text": {}
							}
						},
						".gt_button_holder": {
							"a.gt_refresh_button": {},
							"a.gt_help_button": {},
							"a.gt_contact_button": {},
							"a.gt_logo_button": {}
						},
						".gt_tips": {
							".gt_refresh_tips": {},
							".gt_help_tips": {},
							".gt_contact_tips": {},
							"a.gt_ads_tips": {}
						}
					},
					".gt_input_holder": {
						"input.geetest_challenge": {},
						"input.geetest_validate": {},
						"input.geetest_seccode": {}
					},
					".gt_slider_holder": {
						".gt_guide_tip": {},
						"a.gt_slider_knob": {}
					},
					".gt_ajax_tip": {}
				}
			}, h.float = e(h.embed), h.popup = {
				".gt_input_holder": {
					"input.geetest_challenge": {},
					"input.geetest_validate": {},
					"input.geetest_seccode": {}
				},
				".gt_mask": {},
				".gt_popup": {
					".gt_widget": {
						".gt_form_header": {
							".gt_form_header_0": {},
							".gt_form_header_1": {},
							".gt_form_header_close": {}
						},
						".gt_ads_holder": {
							"a.gt_ads": {
								".gt_ads_slice": {
									".gt_ads_drag_hand": {}
								}
							},
							"a.gt_ads_bg": {},
							".gt_ads_anim": {}
						},
						".gt_info": {
							".gt_info_tip": {
								".gt_info_time": {},
								".gt_info_text": {}
							}
						},
						".gt_button_holder": {
							"a.gt_refresh_button": {},
							"a.gt_help_button": {},
							"a.gt_contact_button": {},
							"a.gt_logo_button": {}
						},
						".gt_tips": {
							".gt_refresh_tips": {},
							".gt_help_tips": {},
							".gt_contact_tips": {},
							".gt_logo_tips": {},
							"a.gt_ads_tips": {}
						},
						".gt_slider_holder": {
							".gt_guide_tip": {},
							"a.gt_slider_knob": {}
						}
					}
				}
			};
			var j, m = function() {
					if (b(".gt_ads_slice").style.backgroundImage = "url(" + i.imgserver + i.sliceurl + ")", b(".gt_ads_slice").style.top = i.ypos + "px", k) return b(".gt_ads_bg").style.backgroundImage = "url(" + i.imgserver + i.fullbg + ")", b(".gt_ads_slice").style.backgroundImage = "none", b(".gt_ads_slice").style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + i.imgserver + i.sliceurl + '")', void(f.loadTime = 0);
					var a = !1,
						c = new Date,
						d = document.createElement("img"),
						e = function() {
							if (!a) {
								b(".gt_ads_bg").style.backgroundImage = "url(" + d.src + ")";
								var e = new Date,
									g = e.getTime() - c.getTime();
								f.loadTime = g, a = !0
							}
						};
					d.onload = e;
					var g = new Image;
					g.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA", g.onload = g.onerror = function() {
						var a = "jpg";
						2 === g.height && (a = "webp"), console.log(a), b(".gt_ads").style.backgroundImage = "url(" + i.imgserver + i.imgurl.replace("jpg", a) + ")", d.src = i.imgserver + i.fullbg.replace("jpg", a)
					}
				}, n = function() {
					var e = document.getElementById(i.id + "_script"),
						j = g(h[a]);
					c(j, i.product);
					! function() {
						var a, c = {
								".gt_help_button": "http://www.geetest.com/install/#instruct",
								".gt_contact_button": "http://www.geetest.com/contact/#report",
								".gt_logo_button": "http://www.geetest.com/",
								".gt_ads_tips": "http://geetest.com/",
								".gt_ads_bg": i.link ? i.apiserver + "click.php?challenge=" + i.challenge : "javascript:;"
							};
						for (a in c) b(a).href = c[a], -1 == c[a].indexOf("javascript") && (b(a).target = "_blank")
					}();
					j.style.float = "left", d(e, j);
					var k = function() {
						var a = b(".gt_guide_tip"),
							c = document.createTextNode(" 姝ｇ‘鎷栧姩浠ュ畬鎴愰獙璇� "),
							d = document.createElement("a");
						d.innerHTML = ">";
						for (var e = [], f = 0; 6 > f; f++) e[f] = d.cloneNode(!0), 3 === f && a.appendChild(c), a.appendChild(e[f]);
						var g = function(a) {
							8 !== a && (e[a - 2] ? e[a - 2].style.cssText = "color:#686767 !important" : null, e[a - 1] ? e[a - 1].style.cssText = "color:#ccc !important" : null, e[a] ? e[a].style.cssText = "color:#fff !important" : null, setTimeout(function() {
								g(a + 1)
							}, 150))
						}, h = setInterval(function() {
								g(0)
							}, 4e3);
						return function() {
							clearInterval(h), a.style.opacity = 0, setTimeout(function() {
								a.style.display = "none"
							}, 500)
						}
					};
					return f.cancelAnime = k(), m(), f
				}, o = function() {
					return m(), c("gt_ads_bg", "transition", !0), c("gt_ads_bg", "transition"), c("gt_info_tip", "info_wait", !0), c("gt_ajax_tip", "ajax_lock", !0), b(".gt_info_time").innerHTML = "", b(".gt_info_text").innerHTML = "", b(".gt_slider_knob").style.left = "0", b(".gt_ads_slice").style.left = "0", b(".gt_slider_knob").style.webkitTransform = "", b(".gt_ads_slice").style.webkitTransform = "", b(".gt_ads_bg").style.opacity = "", b(".gt_slider_knob").style.transform = "", b(".gt_ads_slice").style.transform = "", f
				}, r = function(a, b, c, d, e, f) {
					var g = 0,
						h = document.addEventListener ? 13 : 33,
						i = parseInt(a / h, 10),
						j = ((d - c) / i).toFixed(2) - 0,
						e = e || void 0,
						k = !1,
						l = function() {
							k || (c += j, b(c, e), g++, i > g ? setTimeout(l, h) : (b(d, e), f && f()))
						};
					setTimeout(l, h);
					var m = function() {
						k = !0
					};
					return m
				}, s = function(a, c) {
					var c = c || b(".gt_ads_slice");
					c.style.opacity = a.toFixed(2)
				}, t = function(a) {
					var b = document.getElementById(i.id);
					void 0 !== a && v(!a);
					var c = function() {
						var a = document.documentElement.scrollTop || document.body.scrollTop;
						return (b.getBoundingClientRect().top + a).toFixed(2)
					}, d = function() {
							var a = document.documentElement.scrollLeft || document.body.scrollLeft;
							return (b.getBoundingClientRect().left + a).toFixed(2)
						};
					p.style.left = d() + "px", p.style.top = c() + "px", p.style.position = "absolute", p.style.zIndex = 999999999, p.style.marginLeft = "-20px", p.style.marginTop = "-155px"
				}, u = function() {
					if (p = b(".gt_widget"), "popup" === a) {
						q = b(".gt_mask"), document.body.appendChild(q);
						var c = b(".gt_popup");
						document.body.appendChild(c)
					}
					return "float" !== a ? f : (t(0), document.body.appendChild(p), f)
				}, v = function(a) {
					l ? (j && clearTimeout(j), a ? (c(p, "gt_hide"), j = setTimeout(function() {
						p.style.visibility = "hidden"
					}, 500)) : (c(p, "transition", !0), p.style.visibility = "visible")) : (c(p, "gt_hide_ie", !0), a || c(p, "gt_hide_ie"))
				};
			return {
				$: b,
				initDom: n,
				refreshDom: o,
				animate: r,
				setOpacity: s,
				setWidget: u,
				resetWidget: t,
				toggleWidget: v,
				toggleClass: c
			}
		}(),
		s = r.$,
		t = r.toggleClass,
		u = r.animate,
		v = r.toggleWidget,
		w = r.setOpacity;
	g(r);
	var x = function() {
		var b = function(a, b) {
			this.obj = a, this.queue = [], this.etype = b, this.handlers = function() {}
		};
		b.prototype.regEvent = function() {
			var b = this.queue,
				c = this,
				d = this.obj,
				e = this.etype,
				f = this.handlers = function(a) {
					for (var d = 0; d < c.queue.length; d++) b[d].func(a)
				};
			a.addEventListener ? d.addEventListener(e, f, !1) : a.attachEvent && d.attachEvent("on" + e, f)
		}, b.prototype.addEvent = function(a, b) {
			var c = this.obj;
			b = b ? b : null;
			var d = {
				arg: b,
				fn: a
			};
			return d.func = function(d) {
				a.call(c, d, b)
			}, -1 == this.isIn(d, this.queue) ? (this.queue.push(d), this.removeEvent().regEvent(), this) : void 0
		}, b.prototype.removeEvent = function(b, c) {
			var d = this.obj,
				e = this.etype,
				f = this.handlers;
			if (!b) return a.addEventListener ? d.removeEventListener(e, f, !1) : a.attachEvent && d.detachEvent("on" + e, f), this;
			c = c ? c : null;
			var g = {
				arg: c,
				fn: b
			};
			g.func = function(a) {
				b.call(d, a, c)
			};
			var h = this.isIn(g, this.queue);
			if (-1 != h) return this.queue.splice(h, 1), this.removeEvent().regEvent(), this
		}, b.prototype.isIn = function(a, b) {
			for (var c = 0; c < b.length; c++)
				if (a.fn.toString() == b[c].fn.toString() && a.arg == b[c].arg) return c;
			return -1
		};
		var c, d, e, g = function(a, b) {
				if (null == a) return !1;
				if (b.compareDocumentPosition) {
					var c = b.compareDocumentPosition(a);
					return 20 === c || 0 === c ? !0 : !1
				}
				if (b.contains) return b.contains(a) ? !0 : !1;
				for (; a != b && a;) a = a.parentNode;
				return a ? !0 : !1
			}, h = function(b) {
				if (b && b.type && -1 == b.type.indexOf("mouse")) return !0;
				if (!b) {
					var c = "ontouchstart" in a ? 1 : navigator.maxTouchPoints > 0 ? 2 : a.navigator.maxTouchPoints > 0 ? 3 : 0;
					return c
				}
			}, m = !1,
			o = !1,
			r = !1,
			x = s(".gt_holder") || p,
			z = s(".gt_slider_holder");
		if ("popup" !== i.product) {
			s(".gt_ajax_tip")
		}
		var A, B, C, D, E = new b(document, "mousemove"),
			F = new b(document, "mouseup"),
			G = new b(x, "mousedown"),
			H = new b(p, "mouseover"),
			I = new b(p, "mouseout"),
			J = new b(p, "click"),
			K = new b(z, "mouseover"),
			L = new b(z, "mouseout");
		if (h()) {
			1 === h() ? (A = new b(document, "touchend"), B = new b(document, "touchmove"), C = new b(x, "touchstart"), D = new b(x, "touchend")) : 2 === h() ? (A = new b(document, "pointerup"), B = new b(document, "pointermove"), C = new b(x, "pointerdown"), D = new b(x, "pointerup")) : 3 === h() && (A = new b(document, "MSPointerUp"), B = new b(document, "MSPointerMove"), C = new b(x, "MSPointerDown"), D = new b(x, "MSPointerUp"));
			var M = function(a, b) {
				h() > 1 && (s(".gt_holder").style["-ms-touch-action"] = b ? "none" : "auto", s(".gt_holder").style["touch-action"] = b ? "none" : "auto")
			};
			M(null, !0)
		}
		var N, O, P, Q, R, S = "",
			T = function() {
				var b, j, q, x, D, H = s(".gt_slider_knob"),
					I = s(".gt_ads_slice"),
					J = s(".gt_ads_drag_hand"),
					K = [];
				Q = function() {
					K = [], S = ""
				}, R = function(a) {
					b = a || 0
				};
				var L = function(a) {
					var b = 100,
						c = function() {
							t("gt_ads_bg", "hide")
						}, d = function() {
							t("gt_ads_bg", "hide")
						};
					c(), setTimeout(d, 1 * b), setTimeout(c, 2 * b), setTimeout(d, 3 * b), setTimeout(a, 4 * b)
				}, M = function(a) {
						if (!k) {
							var b = s(".gt_ads_anim");
							b.style.left = a + "px"
						}
					}, T = function(a, b) {
						s(".geetest_challenge").value = i.challenge, a.success && (s(".geetest_validate").value = a.message.split("|")[0], s(".geetest_seccode").value = a.message.split("|")[0] + "|jordan"), b()
					}, U = function(a, b) {
						var g = function(a, f) {
							if (a && a.success) s(".gt_info_time").innerHTML = (b / 1e3).toFixed(1), s(".gt_info_text").innerHTML = 100 - a.message.split("|")[1], t("gt_info_tip", "info_complete", !0), "popup" === i.product && (s(".gt_form_header_0").style.display = "none", s(".gt_form_header_1").style.display = "block", N.removeEvent(X), P.onclick = O, setTimeout(function() {
								s(".gt_form_header_close").click(), P.click(), s(".gt_refresh_button").click()
							}, 1e3)), t("gt_ajax_tip", "ajax_pass", !0), l ? (t("gt_ads_anim", "transition"), t("gt_ads_bg", "transition"), t("gt_ads_bg", "hide"), M(-184), setTimeout(function() {
								t("gt_ads_anim", "transition"), t("gt_ads_slice", "long"), M(261)
							}, 500)) : (e(), t("gt_ads_bg", "hide"), u(500, w, 0, 1, s(".gt_ads_bg")), u(500, M, 261, -184)), T(a, function() {
								"function" == typeof gt_custom_ajax && gt_custom_ajax(1, document.getElementById(i.id + "_script"), "Success")
							}), clearTimeout(c), c = setTimeout(function() {
								o = !1, d && "float" == i.product && v(1)
							}, 1500);
							else if (a) {
								T(a, function() {
									"function" == typeof gt_custom_ajax && gt_custom_ajax(0, document.getElementById(i.id + "_script"), "Wrong Result")
								}), t("gt_ajax_tip", "ajax_error", !0), "fail" === a.message ? t("gt_info_tip", "info_error", !0) : "abuse" === a.message && (t("gt_info_tip", "info_abuse", !0), setTimeout(function() {
									s(".gt_refresh_button").click()
								}, 500)), l ? (t("gt_ads_slice", "long"), w(1)) : (e(), u(200, w, .5, 1));
								var g = function() {
									L(function() {
										m = !1, r = !1, clearTimeout(c), c = setTimeout(function() {
											o = !1, d && "float" == i.product && v(1)
										}, 1500)
									})
								};
								setTimeout(g, 200)
							} else "function" == typeof gt_custom_ajax && gt_custom_ajax(0, document.getElementById(i.id + "_script"), f)
						};
						if (!m) {
							t("gt_ajax_tip", "ajax_wait", !0);
							var h = f.getResponse(a),
								j = i.apiserver + "ajax.php?api=jordan&challenge=" + i.challenge + "&userresponse=" + h + "&passtime=" + b + "&imgload=" + f.loadTime + "&a=" + S;
							n(j, g), l ? (t("gt_ads_slice", "long"), w(.5)) : e = u(500, w, 1, .5)
						}
					}, V = function(a) {
						var d = a.target || a.srcElement;
						if (g(d, H) && !r && !m && 2 !== a.button) {
							a.preventDefault ? a.preventDefault() : a.returnValue = !1, r = !0, f.cancelAnime(), v(!1), J.style.display = "block", t("gt_ads_bg", "hide", !0), w(.9), document.body.style.cursor = "pointer", t(H, "knob_active"), b = b || parseInt(H.style.left, 10) || 0, q = new Date, o = !0, clearTimeout(c), x = a.clientX || a.changedTouches && a.changedTouches[0].clientX, D = a.clientY || a.changedTouches && a.changedTouches[0].clientY;
							var e = H.getBoundingClientRect();
							if (K.push([Math.round(e.left - x), Math.round(e.top - D), 0]), K.push([0, 0, 0]), h(a)) return A.addEvent(Y), void B.addEvent(W);
							F.addEvent(Y), E.addEvent(W)
						}
					}, W = function(c) {
						try {
							document.selection ? document.selection.empty ? document.selection.empty() : document.selection = null : a.getSelection && a.getSelection().removeAllRanges()
						} catch (e) {}
						var f = c.target || c.srcElement;
						h(c) || (d = g(f, p) || g(f, z) ? !1 : !0), c.preventDefault ? c.preventDefault() : c.returnValue = !1;
						var i = (c.changedTouches && c.changedTouches[0].clientX || c.clientX) - x,
							k = D - (c.changedTouches && c.changedTouches[0].clientY || c.clientY),
							l = new Date,
							m = l.getTime() - q.getTime();
						if (K.push([i, k, m]), j = b + i, j = 2 > j ? 2 : j > 178 ? 178 : j, "webkitTransform" in document.body.style || "transform" in document.body.style) {
							var n = "translate(" + j + "px, 0px)";
							return H.style.webkitTransform = n, H.style.transform = n, I.style.webkitTransform = n, void(I.style.transform = n)
						}
						H.style.left = j + "px", I.style.left = j + "px"
					}, Y = function(a) {
						J.style.display = "none", t(H, "knob_normal"), w(1);
						var c = new Date,
							d = c.getTime() - q.getTime(),
							e = (a.changedTouches && a.changedTouches[0].clientX || a.clientX) - x,
							f = D - (a.changedTouches && a.changedTouches[0].clientY || a.clientY);
						return b = j, K.push([e, f, d]), S = y(K), K = [], U(j, d), m = !0, document.body.style.cursor = "auto", h(a) ? (B.removeEvent(W), void A.removeEvent(Y)) : (E.removeEvent(W), void F.removeEvent(Y))
					};
				h() && C.addEvent(V), G.addEvent(V)
			}, U = function() {
				var a = ["gt_refresh_button", "gt_help_button", "gt_contact_button"],
					b = s(".gt_ads_tips"),
					c = function(c, d) {
						var e = c.target || c.srcElement,
							f = e.className,
							h = c.relatedTarget || c.toElement || c.fromElement;
						if (-1 !== j(f, a)) {
							var i = f.replace("_button", "_tips");
							s("." + i).style.display = d ? "block" : "none"
						} else if (g(e, s(".gt_ads_bg"))) {
							if (h == b) return;
							b.style.display = d ? "block" : "none"
						} else "gt_ads_tips" != f || d || g(h, s(".gt_ads_bg")) || (b.style.display = "none")
					};
				H.addEvent(c, !0), I.addEvent(c, !1)
			}, V = function() {
				if ("float" !== i.product) return f;
				var a = 250,
					b = function(b, e) {
						f.resetWidget();
						var h = b.target || b.srcElement,
							i = "mouseover" == b.type ? b.relatedTarget || b.fromElement : b.relatedTarget || b.toElement;
						if ((g(h, p) || g(h, z)) && !g(i, p) && !g(i, z)) {
							if (d = !e, o) return;
							clearTimeout(c), c = setTimeout(function() {
								v(!e)
							}, a)
						}
					}, e = function(b, i) {
						if (h(b)) {
							f.resetWidget();
							var j = b.target;
							if (i && (g(j, p) || g(j, z))) clearTimeout(c), c = setTimeout(function() {
								d = !1, v(!1), A.addEvent(e, !1), C.removeEvent(e, !0)
							}, a);
							else if (!(g(j, p) || g(j, z) && !i)) {
								if (o) return;
								clearTimeout(c), c = setTimeout(function() {
									d = !0, v(!0), A.removeEvent(e, !1), C.addEvent(e, !0)
								}, a)
							}
						}
					};
				return h() ? void C.addEvent(e, !0) : (H.addEvent(b, !0), I.addEvent(b, !1), K.addEvent(b, !0), void L.addEvent(b, !1))
			}, W = function() {
				var a = s(".gt_refresh_button"),
					b = function() {
						f.reloadConfig().refreshDom().bindRefresh(), Q(), R(), s(".geetest_validate").value = "", s(".geetest_seccode").value = "", m = !1, r = !1, "function" == typeof gt_custom_refresh && gt_custom_refresh(1)
					}, c = function(d) {
						var e = d.target || d.srcElement;
						if (g(e, a)) {
							J.removeEvent(c);
							var f = i.apiserver + "refresh.php?api=jordan&id=" + i.id + "&challenge=" + i.challenge + "&websiteid=" + i.websiteid + "&random=" + Math.floor(1e3 * Math.random());
							n(f, b)
						}
					};
				return J.addEvent(c), f
			}, X = function(a) {
				a.preventDefault ? a.preventDefault() : a.returnValue = !1, s(".gt_popup").style.display = "block", q.style.display = "block"
			}, Y = function() {
				if ("popup" != i.product) return f;
				var a = function() {
					s(".gt_popup").style.display = "none", q.style.display = "none"
				};
				return s(".gt_form_header_0").style.display = "block", s(".gt_form_header_1").style.display = "none", setTimeout(function() {
					P = document.getElementById(i.popupbtnid), new b(s(".gt_form_header_close"), "click").addEvent(a), N = new b(P, "click"), O = O || P.onclick, P.onclick = "", N.addEvent(X)
				}, 100), f
			}, Z = function() {
				a.gt_manual_refresh || (a.gt_manual_refresh = function(a) {
					s(".gt_refresh_button", a).click()
				})
			}, $ = function() {
				return T(), W(), Y(), U(), V(), Z(), f
			}, _ = function() {
				return "function" == typeof onGeetestLoaded && onGeetestLoaded(document.getElementById(i.id + "_script")), f
			};
		return {
			pluginLoaded: _,
			regEvent: $,
			bindRefresh: W
		}
	}, y = function(a) {
			var b = function(a) {
				for (var b = [], c = 0; c < a.length - 1; c++) {
					var d = [];
					d[0] = a[c + 1][0] - a[c][0], d[1] = a[c + 1][1] - a[c][1], d[2] = a[c + 1][2] - a[c][2], (d[0] || d[1] || d[2]) && b.push(d)
				}
				return b
			}, c = function(a) {
					var b = "!$'()*+,-./0123456789:;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~";
					return b.charAt(a)
				}, d = function(a) {
					for (var b = "", d = a; d;) b += c(d % 77 + 2), d = (d - d % 77) / 77;
					return b ? b : "'"
				}, e = function(a) {
					for (var a = b(a), e = "", f = "", g = "", h = 0; h < a.length; h++) {
						var i = "",
							j = "",
							k = "",
							l = a[h][0],
							m = a[h][1],
							n = a[h][2]; - 2 == m && l >= 1 && 4 >= l ? j = c(1 + l) : -1 == m && l >= -2 && 6 >= l ? j = c(8 + l) : 0 == m && l >= -5 && 10 >= l ? j = c(20 + l) : 1 == m && l >= -2 && 7 >= l ? j = c(33 + l) : (m >= -17 && 20 >= m ? j = c(58 + m) : -17 > m ? j = c(1) + d(-18 - m) + c(0) : m > 20 && (j = c(0) + d(m - 21) + c(1)), l >= -21 && 55 >= l ? i = c(23 + l) : -21 > l ? i = c(1) + d(-22 - l) + c(0) : l > 55 && (i = c(0) + d(l - 56) + c(1)));
						var o = d(n);
						k = o.length <= 1 ? o : 2 === o.length ? c(0) + o : c(0) + c(0), e += i, f += j, g += k
					}
					var p = e + c(1) + c(1) + c(1) + f + c(1) + c(1) + c(1) + g;
					return p
				};
			return e(a)
		}, z = function A() {
			"complete" == document.readyState || "interactive" == document.readyState && !k ? f.initDom().setWidget().loadModule(x()).regEvent().pluginLoaded() : setTimeout(A, 500)
		};
	setTimeout(z, 100)
}(window);