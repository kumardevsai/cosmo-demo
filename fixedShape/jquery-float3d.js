(function($) {
	$.fn.float3d = function(options) {
		return this.each(function() {
			var fc = $(this);
			var fs = fc.children("div");
			var ObjectCss = function(id, zindex) {
				this.oldZindex = zindex ? parseInt(zindex, 10) : 0;
				this.objid = id ? id : "";
			};
			var ObjectCascade = function() {
				this.objs = new Array();
			};
			ObjectCascade.prototype.getMaxZIndex = function() {
				var zindexs_ = new Array();
				for (var i in this.objs) {
					zindexs_.push(this.objs[i].oldZindex);
				}
				zindexs_.sort();
				return zindexs_.pop();
			};
			ObjectCascade.prototype.pushObjectCss = function(id, zindex) {
				var obj = new ObjectCss(id, zindex);
				this.objs.push(obj);
			};
			ObjectCascade.prototype.getObjectCss = function(id) {
				for (var i in this.objs) {
					if (this.objs[i].objid == id)
						return this.objs[i];
				}
			};
			var objcascade = new ObjectCascade();
			var edgeCollision = function(o1, o2) {
				var leftObject;
				var rightObject;
				var topObject;
				var bottomObject;
				var collisioned = false;
				var collisionWidth = 0;
				var collisionHeight = 0;

				function CenterPoint(y, x) {
					this.y = y;
					this.x = x;
				};
				var collisionedX = false;
				var collisionedy = false;
				var moveDirection = "left";
				var o1Center = new CenterPoint(o1.offset().top + o1.height() / 2, o1.offset().left + o1.width() / 2);
				var o2Center = new CenterPoint(o2.offset().top + o2.height() / 2, o2.offset().left + o2.width() / 2);

				if (o1Center.x < o2Center.x) {
					leftObject = o1;
					rightObject = o2;
					if (o2Center.x - o1Center.x < o2.width() / 2 + o1.width() / 2) {
						moveDirection = "right";
						collisionedX = true;
						if (o2.offset().left + o2.width() < o1.offset().left + o1.width())
							collisionWidth = o2.width();
						else
							collisionWidth = o1.width() + o2.width() - (o2.offset().left + o2.width() - o1.offset().left);
					} else
						collisionedX = false;
				} else if (o1Center.x > o2Center.x) {
					leftObject = o2;
					rightObject = o1;
					if (o1Center.x - o2Center.x < o2.width() / 2 + o1.width() / 2) {
						moveDirection = "left";
						collisionedX = true;
						if (o2.offset().left > o1.offset().left)
							collisionWidth = o2.width();
						else
							collisionWidth = o1.width() + o2.width() - (o1.offset().left + o1.width() - o2.offset().left);
					} else
						collisionedX = false;
				} else {
					leftObject = null;
					rightObject = null;
					if (o1.width < o2.width())
						collisionWidth = o1.width();
					else if (o1.width > o2.width())
						collisionWidth = o2.width();
					moveDirection = "";
					collisionedX = true;
				}
				if (o1Center.y < o2Center.y) {
					topObject = o1;
					bottomObject = o2;
					if (o2Center.y - o1Center.y < o1.height() / 2 + o2.height() / 2) {
						moveDirection += "_bottom";
						collisionedY = true;
						if (o2.offset().top + o2.height() < o1.offset().top + o1.height()) {
							collisionHeight = o2.height();
						} else
							collisionHeight = o1.height() + o2.height() - (o2.offset().top + o2.height() - o1.offset().top);
					} else
						collisionedY = false;
				} else if (o1Center.y > o2Center.y) {
					topObject = o2;
					bottomObject = o1;
					if (o1Center.y - o2Center.y < o2.height() / 2 + o1.height() / 2) {
						moveDirection += "_top";
						collisionedY = true;
						if (o2.offset().top > o1.offset().top)
							collisionHeight = o2.height();
						else
							collisionHeight = o1.height() + o2.height() - (o1.offset().top + o1.height() - o2.offset().top);
					} else
						collisionedY = false;
				} else {
					topObject = null;
					bottomObject = null;
					if (o1.height() < o2.height())
						collisionHeight = o1.height();
					else if (o1.height() > o2.height())
						collisionHeight = o2.height();
					collisionedY = true;
				}
				collisioned = collisionedY && collisionedX;
				return {
					collisioned: collisioned,
					leftObject: leftObject,
					rightObject: rightObject,
					topObject: topObject,
					bottomObject: bottomObject,
					collisionHeight: collisionHeight,
					collisionWidth: collisionWidth,
					moveDirection: moveDirection
				};
			};

			function getUpObjects(o) {
				var downobject;
				if (o instanceof ObjectCss)
					downobject = $(o.objid);
				else
					downobject = o;
				var upobjects = new Array();
				$(objcascade.objs).each(function(index, item) {
					if (item.objid != downobject.attr("id") && parseInt(downobject.css("z-index"), 10) < parseInt($("#" + item.objid).css("zIndex"), 10) == true)
						upobjects.push($("#" + item.objid));
				});
				return upobjects;
			};

			fs.each(function(index, item) {
				objcascade.pushObjectCss($(item).attr("id"), $(item).css("z-index"));
				$(item).css({
					"opacity": ".98"
				});

				function callbackCss(item, item_) {
					$(item).css({
						"zIndex": objcascade.getMaxZIndex() + 1
					});
					$(item_).css({
						"zIndex": objcascade.getObjectCss($(item_).attr("id")).oldZindex
					});
				};
				$(item).bind("click", function() {
					var upObjects = getUpObjects($(item));
					$(upObjects).each(function(index, item_) {
						var edgeCollisionedObjects = edgeCollision($(item), item_);
						if (edgeCollisionedObjects.collisioned == true) {
							var animateDirection = edgeCollisionedObjects.moveDirection;
							if (animateDirection == "left_top") {
								item_.animate({
									"top": item_.offset().top - edgeCollisionedObjects.collisionHeight,
									"left": item_.offset().left - edgeCollisionedObjects.collisionWidth
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"top": item_.offset().top,
									"left": item_.offset().left
								}, 200);
							} else if (animateDirection == "right_top") {
								item_.animate({
									"top": item_.offset().top - edgeCollisionedObjects.collisionHeight,
									"left": item_.offset().left + edgeCollisionedObjects.collisionWidth
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"top": item_.offset().top,
									"left": item_.offset().left
								}, 200);
							} else if (animateDirection == "left_bottom") {
								item_.animate({
									"top": item_.offset().top + edgeCollisionedObjects.collisionHeight,
									"left": item_.offset().left - edgeCollisionedObjects.collisionWidth
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"top": item_.offset().top,
									"left": item_.offset().left
								}, 200);
							} else if (animateDirection == "right_bottom") {
								item_.animate({
									"top": item_.offset().top + edgeCollisionedObjects.collisionHeight,
									"left": item_.offset().left + edgeCollisionedObjects.collisionWidth
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"top": item_.offset().top,
									"left": item_.offset().left
								}, 200);
							} else if (animateDirection == "_top") {
								item_.animate({
									"top": item_.offset().top - edgeCollisionedObjects.collisionHeight
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"top": item_.offset().top
								}, 200);
							} else if (animateDirection == "_bottom") {
								item_.animate({
									"top": item_.offset().top + edgeCollisionedObjects.collisionHeight
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"top": item_.offset().top
								}, 200);
							} else if (animateDirection == "right") {
								item_.animate({
									"left": item_.offset().left + edgeCollisionedObjects.collisionWidth
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"left": item_.offset().left
								}, 200);
							} else if (animateDirection == "left") {
								item_.animate({
									"left": item_.offset().left - edgeCollisionedObjects.collisionWidth
								}, 200, function() {
									callbackCss(item, item_);
								}).animate({
									"left": item_.offset().left
								}, 200);
							}
						}
					});
				});
			});
		});
	}
})(jQuery);
