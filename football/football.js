var football = (function() {
  // 动画
  var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        setTimeout(callback, 1000 / 60)
    }
  })();

  var canvas
  var context
  var image
  var ball
  var supportCanvas = document.createElement('canvas').getContext

    function Ball(ballimage, options) {
      this.width = options.width
      this.height = options.height
      this.containerWidth = options.containerWidth
      this.containerHeight = options.containerHeight
      this.x = options.left
      this.y = options.top
      this.image = ballimage
      this.gravity = 0.4
      this.vy = 0.8
      this.vx = 4
      this.vyAdjust = -15
      this.vxAdjust = 0.25
      this.factor = 0.65
      this.end = false
      this.degree = 0
      this.ctx = options.ctx
      this.canvas = options.canvas
      this.ball = ballimage.parentNode
    }

  Ball.prototype.draw = function() {
    if (supportCanvas) {
      this.ctx.save()
      this.rotate()
      this.ctx.drawImage(this.image,
        0, 0,
        100, 100,
        this.x, this.y,
        this.width, this.height
      )
      this.ctx.restore()

      if (this.vx > 0) {
        this.degree += 1 * this.vx
      }
    } else {
      this.ball.style.left = this.x + 'px'
      this.ball.style.top = this.y + 'px'
    }
  }

  Ball.prototype.hit = function() {
    this.vy = this.vyAdjust
  }

  Ball.prototype.rotate = function() {
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    this.ctx.rotate(Math.PI / 180 * this.degree)
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2)
  }

  Ball.prototype.move = function() {
    this.y += this.vy
    this.vy += this.gravity

    if (this.vx > 0) {
      this.x += this.vx
    }

    if ((this.y + this.height) > this.containerHeight) {
      this.hit()
      this.vyAdjust = (this.vyAdjust * this.factor)
      this.vx = this.vx - this.vxAdjust
    }

    if (this.vx < -0.1) {
      this.end = true
    }
  }

  Ball.prototype.clearCanvas = function() {
    this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  Ball.prototype.update = function() {
    this.clearCanvas()
    this.move()
    this.draw()
  }

  function loop() {
    ball.update()

    if (!ball.end) {
      requestAnimFrame(loop)
    }
    if (ball.end) {
      var x = 1000 - ball.x - 100,
        //y=ball.y,
        a = document.createElement("a"),
        style;
      a.id = "football-holder";
      style = a.style;
      a.style.position = "fixed";
      a.style.right = x + "px";
      a.style.bottom = "0px";
      a.style.zIndex = "99999";
      a.style.lineHeight = "0";
      a.href = "/view/134";
      a.innerHTML = "<img src='images/football.png' width='100'/>";
      var vendor = "transform,webkitTransform,mozTransform,oTransform,msTransform".split(","),
        i = vendor.length,
        style = a.style;
      while (i) {
        if (style[vendor[--i]] !== undefined) {
          style[vendor[i]] = "rotate(" + ball.degree + "deg)";
          break;
        }
      }
      document.body.replaceChild(a, canvas);
    }
  }

  function loadBall() {
    ball = new Ball(image, {
      width: 100,
      height: 100,
      left: 0,
      top: 0,
      containerWidth: 1000,
      containerHeight: 500,
      ctx: context,
      canvas: canvas
    })

    loop()
  }

  function init() {
    var url = "/view/134";
    image = new Image()
    image.src = 'images/football.png'

    if (!supportCanvas) {
      var ballContainer = document.getElementById('ball')
      ballContainer.appendChild(image)
      ballContainer.style.display = 'block'
    } else {
      canvas = document.getElementById('football')
      context = canvas.getContext('2d')
      canvas.style.display = 'block'
    }

    image.onload = loadBall
  }

  var fb = {
    play: function() {
      init()
    }
  }
  return fb
}());