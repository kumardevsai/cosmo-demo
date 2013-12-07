var compile_ = function(a) {
	"use strict";
	var b = function(a) {
		return "[object Object]" === {}.toString.call(a)
	},
		c = function(a) {
			return "[object Function]" === {}.toString.call(a)
		},
		d = function(a) {
			var b = a.toString();
			return b = b.substr("function ".length), b = b.substr(0, b.indexOf("("))
		},
		e = function(a) {
			if (null === a || "object" != typeof a) return a;
			var b = new a.constructor;
			for (var c in a) b[c] = e(a[c]);
			return b
		},
		f = {
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
		},
		g = f.loadModule = function(a, e, g) {
			var h, i = f;
			if (g = g || i, b(a)) {
				for (h in a) g[h] = a[h];
				return i
			}
			return c(a) ? (h = d(a), g[h] = a, i) : (e && e(i), i)
		},
		h = f.loadConfig = function(b, c) {
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
				var a = d ? e(d) : e(g.defaultConfig);
				for (i in b) a[i] = b[i];
				return a
			}(), c && c(), g.config
		},
		i = h(),
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
		l = {},
		m = l.jsonp = function(b, c) {
			var d = document.createElement("script");
			d.src = b, c = c ||
				function() {}, d.onload = d.onreadystatechange = function() {
					this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (a.GeeTest_tempData && c ? (c(GeeTest_tempData), GeeTest_tempData = null) : c && c(), this.onload = this.onreadystatechange = null, this.parentNode.removeChild(this))
			}, document.getElementsByTagName("head")[0].appendChild(d)
		},
		n = function() {
			var a, b = function() {
					for (var b, c = 0, d = i.challenge.slice(32), e = d.replace(/\D/g, ""), f = [], g = /\d{3}/g; null !== (b = g.exec(e));) f[c] = parseInt(b[0], 10), c++;
					for (a = f.slice(-1)[0], c = 0; 18 > c; c++) f[c] = (f[c] - a) / 19;
					return f = f.slice(0, 18)
				};
			b();
			var c = function() {
				for (var a = 0, c = 0, d = b(), e = d.slice(0, 8), f = d.slice(8), g = []; 10 > a; a++) {
					for (; 8 > c; c++) {
						var h = 8 * f[a] + e[c];
						g = g.concat(h)
					}
					c = 0
				}
				return g
			},
				d = function() {
					for (var a = document.createElement("div"), b = s(".gt_ads_slice")[0], d = c(), e = s(".gt_ads_slice_border")[0], g = 0; 80 > g; g++) {
						var h = a.cloneNode();
						h.className = "gt_slice", h.style.backgroundImage = "url(" + i.imgserver + i.sliceurl + ")", h.style.backgroundPosition = "-" + d[g] + "px 0px", b.insertBefore(h, e)
					}
					return b.style.top = i.ypos + "px", w(0), f
				},
				e = function() {
					for (var a = s(".gt_slice"), b = 0; b < a.length; b++) a[b].parentNode.removeChild(a[b]);
					return g(n()), d()
				},
				h = function(a) {
					for (var b, c = a - 0 + f.base, d = i.challenge.slice(0, 32), e = [
							[],
							[],
							[],
							[],
							[]
						], g = {}, h = 0, j = 0, k = d.length; k > j; j++) b = d.charAt(j), g[b] || (g[b] = 1, e[h] = e[h].concat(b), h++, h = 5 == h ? 0 : h);
					for (var l, m, n = c, o = 4, p = "", q = [1, 2, 5, 10, 50]; n > 0;) l = parseInt(Math.random() * o, 10), n - q[l] >= 0 ? (m = parseInt(Math.random() * e[l].length, 10), p = p.concat(e[l][m]), n -= q[l]) : (e.splice(l, 1), q.splice(l, 1), o -= 1);
					return p
				};
			return {
				createSlice: d,
				base: a,
				refreshSlice: e,
				getResponse: h
			}
		};
	g(n());
	var o, p, q, r = function() {
			var a = i.product,
				b = function(a, b) {
					void 0 === q && (q = document.getElementById(i.id).parentNode);
					var c = document.getElementById(i.id);
					if (".gt_holder" === a || ".gt_popup" === a) return [c];
					if (b = b || c || document, b.querySelectorAll) return b.querySelectorAll(a).length ? b.querySelectorAll(a) : o.querySelectorAll(a).length ? o.querySelectorAll(a) : q.querySelectorAll(a).length ? q.querySelectorAll(a) : [];
					var d = function(a, b) {
						for (var c = [], d = a.replace(".", ""), e = new RegExp("(^| )" + d + "( |$)"), f = b.getElementsByTagName("*"), g = 0, h = f.length; h > g; g++) e.test(f[g].className) && c.push(f[g]);
						return c
					};
					return d(a, b).length ? d(a, b) : d(a, o).length ? d(a, o) : d(a, q).length ? d(a, q) : []
				},
				c = function(a, c) {
					var d, e;
					if ("string" == typeof a) {
						if (d = a, e = b("." + a), !e || !e.length) return;
						e = e[0]
					} else e = a, d = e.className.split(" ")[0];
					e.className = d + " " + c
				},
				d = function(a, b) {
					return a.parentNode.insertBefore(b, a.nextSibling), b
				},
				g = function w(a, b) {
					var c, d = document.createElement("div");
					b = b || d.cloneNode();
					for (c in a) {
						var e, f = "" === c.split(".")[0] ? "div" : c.split(".")[0];
						"input" === f ? (e = document.createElement(f), e.className = c.split(".")[1], e.type = "hidden", e.name = c.split(".")[1]) : (e = document.createElement(f), e.className = c.split(".")[1]), (".gt_holder" === c || ".gt_popup" === c) && (e.id = i.id), b.appendChild(e), w(a[c], e)
					}
					return b.childNodes ? b : null
				},
				h = {};
			h.embed = {
				".gt_holder": {
					".gt_widget": {
						".gt_ads_holder": {
							"a.gt_ads": {
								".gt_ads_slice": {
									".gt_ads_slice_border": {},
									".gt_ads_drag_hand": {}
								}
							},
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
									".gt_ads_slice_border": {},
									".gt_ads_drag_hand": {}
								}
							},
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
			var j, l = function() {
					if (k) return b(".gt_ads")[0].style.backgroundImage = "url(" + i.imgserver + i.imgurl + ")", f.loadTime = 0, void 0;
					var a = !1,
						c = new Date,
						d = document.createElement("img"),
						e = function() {
							if (!a) {
								b(".gt_ads")[0].style.backgroundImage = "url(" + d.src + ")";
								var e = new Date,
									g = e.getTime() - c.getTime();
								f.loadTime = g, a = !0
							}
						};
					d.onload = e, d.src = i.imgserver + i.imgurl
				},
				m = function() {
					var c = function() {
						if (!document.getElementById("gt_css")) {
							var a = document.createElement("link");
							a.setAttribute("rel", "stylesheet"), a.setAttribute("type", "text/css"), a.setAttribute("href", i.imgserver + i.css + "?v=20131125"), a.setAttribute("id", "gt_css"), document.getElementsByTagName("head")[0].appendChild(a)
						}
					};
					c();
					var e = document.getElementById(i.id + "_script"),
						j = g(h[a]);
					j.style.float = "left", d(e, j);
					var m = (function() {
						"popup" != a ? (b(".gt_holder")[0].className += " " + a, k && (i.bg = "themes/default/bgall-float.gif")) : (b(".gt_popup")[0].className += " " + a, i.bg = i.popupbg);
						var c, d = [".gt_widget", ".gt_info_tip", ".gt_refresh_button", ".gt_help_button", ".gt_contact_button", ".gt_logo_button", ".gt_slider_knob", ".gt_ads_drag_hand", ".gt_refresh_tips", ".gt_help_tips", ".gt_contact_tips", ".gt_ads_tips", ".gt_ajax_tip", ".gt_slider_holder"];
						"popup" == a && (d.pop(), d.pop(), d = d.concat(".gt_logo_tips", ".gt_form_header_0", ".gt_form_header_1", ".gt_form_header_close"));
						for (c in d) b(d[c])[0].style.backgroundImage = "url(" + i.imgserver + i.bg + ")";
						b(".gt_ads_anim")[0].style.backgroundImage = "url(" + i.imgserver + i.flash_img + ")"
					}(), function() {
						var a, c = {
								".gt_help_button": "http://geetest.com/usage-tips",
								".gt_contact_button": "http://geetest.com/contact-us",
								".gt_logo_button": "http://geetest.com/",
								".gt_ads_tips": "http://geetest.com/",
								".gt_ads": i.link
							};
						for (a in c) b(a)[0].href = c[a], b(a)[0].target = "_blank"
					}(), function() {
						var a = b(".gt_guide_tip")[0],
							c = document.createTextNode(" 正确拖动以完成验证 "),
							d = document.createElement("a");
						d.innerHTML = ">";
						for (var e = [], f = 0; 6 > f; f++) e[f] = d.cloneNode(!0), 3 === f && a.appendChild(c), a.appendChild(e[f]);
						var g = function(a) {
							8 !== a && (e[a - 2] ? e[a - 2].style.cssText = "color:#686767 !important" : null, e[a - 1] ? e[a - 1].style.cssText = "color:#ccc !important" : null, e[a] ? e[a].style.cssText = "color:#fff !important" : null, setTimeout(function() {
								g(a + 1)
							}, 150))
						},
							h = setInterval(function() {
								g(0)
							}, 4e3);
						return function() {
							clearInterval(h), a.style.opacity = 0, setTimeout(function() {
								a.style.display = "none"
							}, 500)
						}
					});
					return f.cancelAnime = m(), l(), f
				},
				n = function() {
					l();
					b(".gt_info_tip")[0], b(".gt_ajax_tip")[0];
					return c("gt_info_tip", "info_wait"), c("gt_ajax_tip", "ajax_lock"), b(".gt_info_time")[0].innerHTML = "", b(".gt_info_text")[0].innerHTML = "", b(".gt_slider_knob")[0].style.left = "0", b(".gt_ads_slice")[0].style.left = "0", f
				},
				r = function(a, b, c, d, e) {
					var f = 0,
						g = document.addEventListener ? 13 : 33,
						h = parseInt(a / g, 10),
						i = ((d - c) / h).toFixed(2) - 0,
						j = function() {
							c += i, b(c), f++, h > f ? setTimeout(j, g) : (b(d), e && e())
						};
					return setTimeout(j, g)
				},
				s = function(a) {
					var c, d = b(".gt_slice"),
						e = b(".gt_ads_slice")[0];
					if ("transition" in document.body.style) return e.style.opacity = a.toFixed(2), void 0;
					for (c = 0; c < d.length; c++) d[c].style.opacity = a.toFixed(2), d[c].style.filter = "alpha(opacity=" + parseInt(100 * a, 10) + ")";
					var f = b(".gt_ads_slice_border")[0];
					f.style.opacity = a, f.style.filter = "alpha(opacity=" + 100 * a + ")"
				},
				t = function(a) {
					var b = document.getElementById(i.id);
					void 0 !== a && v(!a);
					var c = function() {
						var a = document.documentElement.scrollTop || document.body.scrollTop;
						return (b.getBoundingClientRect().top + a).toFixed(2)
					},
						d = function() {
							var a = document.documentElement.scrollLeft || document.body.scrollLeft;
							return (b.getBoundingClientRect().left + a).toFixed(2)
						};
					o.style.left = d() + "px", o.style.top = c() + "px", o.style.position = "absolute", o.style.zIndex = 999999999, o.style.marginLeft = "-20px", o.style.marginTop = "-155px"
				},
				u = function() {
					if (o = b(".gt_widget")[0], "popup" === a) {
						p = b(".gt_mask")[0], document.body.appendChild(p);
						var c = b(".gt_popup")[0];
						document.body.appendChild(c)
					}
					return "float" !== a ? f : (t(0), document.body.appendChild(o), f)
				},
				v = function(a) {
					"transition" in document.body.style ? (j && clearTimeout(j), a ? (o.className = o.className.replace(" gt_hide", ""), o.className += " gt_hide", j = setTimeout(function() {
						o.style.visibility = "hidden"
					}, 500)) : (c(o, "transition"), o.style.visibility = "visible")) : (o.className = o.className.replace(" gt_hide_ie", ""), a && (o.className += " gt_hide_ie"))
				};
			return {
				$: b,
				initDom: m,
				refreshDom: n,
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
		var c, d, e = function(a, b) {
				if (null == a) return !1;
				if (b.compareDocumentPosition) {
					var c = b.compareDocumentPosition(a);
					return 20 === c || 0 === c ? !0 : !1
				}
				if (b.contains) return b.contains(a) ? !0 : !1;
				for (; a != b && a;) a = a.parentNode;
				return a ? !0 : !1
			},
			g = function() {
				var b = "ontouchstart" in a ? 1 : navigator.maxTouchPoints > 0 ? 2 : a.navigator.maxTouchPoints > 0 ? 3 : 0;
				return b
			},
			h = function(a) {
				var b = a.type;
				return -1 !== b.indexOf("touch") || -1 !== b.indexOf("pointer") ? !0 : !1
			},
			l = !1,
			n = !1,
			q = s(".gt_holder")[0] || o,
			r = s(".gt_slider_holder")[0];
		if ("popup" !== i.product) {
			s(".gt_ajax_tip")[0]
		}
		var x, z, A, B, C = new b(document, "mousemove"),
			D = new b(document, "mouseup"),
			E = new b(q, "mousedown"),
			F = new b(o, "mouseover"),
			G = new b(o, "mouseout"),
			H = new b(o, "click"),
			I = new b(r, "mouseover"),
			J = new b(r, "mouseout");
		if (g()) {
			1 === g() ? (x = new b(document, "touchend"), z = new b(document, "touchmove"), A = new b(q, "touchstart"), B = new b(q, "touchend")) : 2 === g() ? (x = new b(document, "pointerup"), z = new b(document, "pointermove"), A = new b(q, "pointerdown"), B = new b(q, "pointerup")) : 3 === g() && (x = new b(document, "MSPointerUp"), z = new b(document, "MSPointerMove"), A = new b(q, "MSPointerDown"), B = new b(q, "MSPointerUp"));
			var K = function(a, b) {
				g() > 1 && (s(".gt_holder")[0].style["-ms-touch-action"] = b ? "none" : "auto", s(".gt_holder")[0].style["touch-action"] = b ? "none" : "auto")
			};
			K(null, !0)
		}
		var L, M, N, O, P = "",
			Q = function() {
				var b, j, p, q, B, F, G, H, I, J = s(".gt_slider_knob")[0],
					K = s(".gt_ads_slice")[0],
					Q = s(".gt_ads_drag_hand")[0],
					R = [];
				O = function() {
					R = [], P = ""
				};
				var S = function(a) {
					var b = function() {
						"transition" in document.body.style ? w(0) : u(100, w, 1, 0)
					},
						c = function() {
							"transition" in document.body.style ? w(1) : u(100, w, 0, 1)
						};
					b(), setTimeout(c, 100), setTimeout(b, 200), setTimeout(c, 300), setTimeout(a, 400)
				},
					T = function(a) {
						if (!k) {
							var b = s(".gt_ads_anim")[0];
							b.style.left = a + "px"
						}
					},
					V = function(a, b) {
						s(".geetest_challenge", !1, !0)[0].value = i.challenge, a.success && (s(".geetest_validate", !1, !0)[0].value = a.message.split("|")[0], s(".geetest_seccode", !1, !0)[0].value = a.message.split("|")[0]), b()
					},
					W = function(a) {
						a && a.success ? (s(".gt_info_time")[0].innerHTML = (F / 1e3).toFixed(1), s(".gt_info_text")[0].innerHTML = 100 - a.message.split("|")[1], t("gt_info_tip", "info_complete"), "popup" === i.product && (s(".gt_form_header_0")[0].style.display = "none", s(".gt_form_header_1")[0].style.display = "block", L.removeEvent(U), N.onclick = M, setTimeout(function() {
							s(".gt_form_header_close")[0].click(), N.click(), s(".gt_refresh_button")[0].click()
						}, 1e3)), t("gt_ajax_tip", "ajax_pass"), "transition" in document.body.style ? (t("gt_ads_anim", "transition"), t("gt_ads_slice", "long"), T(-184), w(0), setTimeout(function() {
							t("gt_ads_anim", ""), t("gt_ads_slice", ""), T(261)
						}, 500)) : (u(500, w, 1, 0), u(500, T, 261, -184)), V(a, function() {
							"function" == typeof gt_custom_ajax && gt_custom_ajax(1, document.getElementById(i.id + "_script"))
						}), clearTimeout(c), c = setTimeout(function() {
							n = !1, d && "float" == i.product && v(1)
						}, 1500)) : a ? (V(a, function() {
							"function" == typeof gt_custom_ajax && gt_custom_ajax(0, document.getElementById(i.id + "_script"))
						}), t("gt_ajax_tip", "ajax_error"), "fail" === a.message ? t("gt_info_tip", "info_error") : "abuse" === a.message && (t("gt_info_tip", "info_abuse"), setTimeout(function() {
							s(".gt_refresh_button")[0].click()
						}, 500)), S(function() {
							l = !1, clearTimeout(c), c = setTimeout(function() {
								n = !1, d && "float" == i.product && v(1)
							}, 1500)
						})) : console.log("GeeTest failed to reach the server")
					},
					X = function(a, b) {
						if (!l) {
							t("gt_ajax_tip", "ajax_wait");
							var c = f.getResponse(a);
							P.length > 1800 && (P = P.substr(P.length - 1800, P.length));
							var d = i.apiserver + "ajax.php?challenge=" + i.challenge + "&userresponse=" + c + "&passtime=" + b + "&imgload=" + f.loadTime + "&a=" + P;
							m(d, W)
						}
					},
					Y = function(a) {
						var d = a.target || a.srcElement;
						if ((e(d, J) || e(d, K)) && 2 !== a.button && !l) {
							f.cancelAnime(), v(!1), Q.style.display = "block", w(.7), a.preventDefault ? a.preventDefault() : a.returnValue = !1, document.body.style.cursor = "pointer", t(J, "knob_active"), j = parseInt(J.style.left, 10) || 0, b = a.clientX || a.changedTouches && a.changedTouches[0].clientX, q = new Date, n = !0, clearTimeout(c);
							var i;
							I ? i = q.getTime() - I.getTime() : (i = 0, I = q), G = b, H = a.clientY || a.changedTouches && a.changedTouches[0].clientY; {
								a.layerX || a.offsetX, a.layerY || a.offsetY
							}
							if (g() || h(a)) return x.addEvent(Z), z.addEvent($), void 0;
							D.addEvent(Z), C.addEvent($)
						}
					},
					Z = function(a) {
						Q.style.display = "none", t(J, "knob_normal"), w(1), B = new Date, F = B.getTime() - q.getTime();
						var c = new Date,
							d = c.getTime() - q.getTime(),
							e = (a.clientX || a.changedTouches[0].clientX) - b,
							f = H - (a.clientY || a.changedTouches[0].clientY);
						R.push([e, f, d]);
						var i = new y(R);
						var ddd = P;
						return P += i.encode(), P += ";", R = [], X(p, F), l = !0, document.body.style.cursor = "auto", g() || h(a) ? (z.removeEvent($), x.removeEvent(Z), void 0) : (C.removeEvent($), D.removeEvent(Z), void 0)
					},
					$ = function(c) {
						try {
							document.selection ? document.selection.empty ? document.selection.empty() : document.selection = null : a.getSelection && a.getSelection().removeAllRanges()
						} catch (f) {}
						var h = c.target || c.srcElement;
						g() || (d = e(h, o) || e(h, r) ? !1 : !0), c.preventDefault ? c.preventDefault() : c.returnValue = !1;
						var i = (c.clientX || c.changedTouches && c.changedTouches[0].clientX) - b;
						p = j + i, p = 2 > p ? 2 : p > 178 ? 178 : p, J.style.left = p + "px", K.style.left = p + "px";
						var k = new Date,
							l = k.getTime() - q.getTime(),
							m = H - (c.clientY || c.changedTouches && c.changedTouches[0].clientY);
						R.push([i, m, l])
					};
				return g() ? (A.addEvent(Y), void 0) : (E.addEvent(Y), void 0)
			},
			R = function() {
				var a = ["gt_refresh_button", "gt_help_button", "gt_contact_button"],
					b = s(".gt_ads_tips")[0],
					c = function(c, d) {
						var f = c.target || c.srcElement,
							g = f.className,
							h = c.relatedTarget || c.toElement || c.fromElement;
						if (-1 !== j(g, a)) {
							var i = g.replace("_button", "_tips");
							s("." + i)[0].style.display = d ? "block" : "none"
						} else if (e(f, s(".gt_ads")[0])) {
							if (h == b) return;
							b.style.display = d ? "block" : "none"
						} else "gt_ads_tips" != g || d || e(h, s(".gt_ads")[0]) || (b.style.display = "none")
					};
				F.addEvent(c, !0), G.addEvent(c, !1)
			},
			S = function() {
				if ("float" !== i.product) return f;
				var a = 250,
					b = function(b, g) {
						f.resetWidget();
						var h = b.target || b.srcElement,
							i = "mouseover" == b.type ? b.relatedTarget || b.fromElement : b.relatedTarget || b.toElement;
						if ((e(h, o) || e(h, r)) && !e(i, o) && !e(i, r)) {
							if (d = !g, n) return;
							clearTimeout(c), c = setTimeout(function() {
								v(!g)
							}, a)
						}
					},
					j = function(b, g) {
						if (h(b)) {
							f.resetWidget();
							var i = b.target;
							if (g && (e(i, o) || e(i, r))) clearTimeout(c), c = setTimeout(function() {
								d = !1, v(!1), x.addEvent(j, !1), A.removeEvent(j, !0)
							}, a);
							else if (!(e(i, o) || e(i, r) && !g)) {
								if (n) return;
								clearTimeout(c), c = setTimeout(function() {
									d = !0, v(!0), x.removeEvent(j, !1), A.addEvent(j, !0)
								}, a)
							}
						}
					};
				return g() ? (A.addEvent(j, !0), void 0) : (F.addEvent(b, !0), G.addEvent(b, !1), I.addEvent(b, !0), J.addEvent(b, !1), void 0)
			},
			T = function() {
				var a = s(".gt_refresh_button")[0],
					b = function() {
						f.reloadConfig().refreshDom().refreshSlice().bindRefresh(), O(), l = !1, "function" == typeof gt_custom_refresh && gt_custom_refresh(1)
					},
					c = function(d) {
						var f = d.target || d.srcElement;
						if (e(f, a)) {
							H.removeEvent(c);
							var g = i.apiserver + "refresh.php?&id=" + i.id + "&challenge=" + i.challenge + "&websiteid=" + i.websiteid + "&random=" + Math.floor(1e3 * Math.random());
							m(g, b)
						}
					};
				return H.addEvent(c), f
			},
			U = function(a) {
				a.preventDefault ? a.preventDefault() : a.returnValue = !1, s(".gt_popup")[0].style.display = "block", p.style.display = "block"
			},
			V = function() {
				if ("popup" != i.product) return f;
				var a = function() {
					s(".gt_popup")[0].style.display = "none", p.style.display = "none"
				};
				return s(".gt_form_header_0")[0].style.display = "block", s(".gt_form_header_1")[0].style.display = "none", setTimeout(function() {
					N = document.getElementById(i.popupbtnid), new b(s(".gt_form_header_close")[0], "click").addEvent(a), L = new b(N, "click"), M = M || N.onclick, N.onclick = "", L.addEvent(U)
				}, 100), f
			},
			W = function() {
				a.gt_manual_refresh || (a.gt_manual_refresh = function(a) {
					s(".gt_refresh_button", a)[0].click()
				})
			},
			X = function() {
				return Q(), T(), V(), R(), S(), W(), f
			};
		return {
			regEvent: X,
			bindRefresh: T
		}
	},
		y = function(a) {
			this.data = a, this.str = "", this.secret = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.:"
		};
	y.prototype = {
		oTo65: function(a) {
			var b = this.secret;
			return a = a > 65 ? 65 : a - 0, b[a]
		},
		getAngle: function(a, b) {
			var c = b[0] - a[0],
				d = b[1] - a[1],
				e = Math.atan2(d, c);
			return e = 0 > e ? 2 * Math.PI + e : e, e = parseInt(e / Math.PI / 2 * 65)
		},
		getSpeed: function(a, b) {
			return parseInt(Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2)) / 20 * 65)
		},
		filterPoint: function() {
			for (var a = [], b = 0, c = this.data, d = 0; d < c.length; d++) c[d][2] - b >= 10 && (a.push(c[d]), b = c[d][2]);
			return a
		},
		encode: function() {
			for (var a = [], b = this.filterPoint(), c = 0; c < b.length - 1; c++) a.push([this.getSpeed(b[c], b[c + 1]), this.getAngle(b[c], b[c + 1])]);
			for (var d = a.toString().split(","), e = "", c = 0; c < d.length; c++) e += this.oTo65(d[c]);
			return e
		}
	};
	var z = function A() {
		"complete" == document.readyState || "interactive" == document.readyState && !k ? f.initDom().createSlice().setWidget().loadModule(x()).regEvent() : setTimeout(A, 500)
	};
	setTimeout(z, 100)
}(window);