/**
 * 仿知乎登录效果
 */

(function () {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var canvas = document.getElementById("zhihu_login_effect");
    var ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;

    function generateRandom(min, max) {
        return parseInt((max - min) * Math.random() + min + 1)
    }

 
    function Circle() {
        this.radius = generateRandom(4, 12);
        this.diam = this.radius * 2;

        // position
        var x = generateRandom(0, canvas.width - this.radius);
        this.xPos = x < this.radius ? this.radius : x;
        var y = generateRandom(0, canvas.height - this.radius);
        this.yPos = y < this.radius ? this.radius : y

        var speed = generateRandom(2, 4) / 10
        this.speedX = generateRandom(0, 4) > 2 ? speed : -speed;
        this.speedY = generateRandom(0, 4) > 2 ? speed : -speed;

        this.color = "rgba(0,0,0," + 0.05 + ")";
    }
 
    Circle.prototype.draw = function () {
        //绘制函数
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    Circle.prototype.move = function () {

        this.xPos += this.speedX;
        if (this.xPos > canvas.width - this.radius) {
            this.xPos = this.radius
        } else if (this.xPos < this.radius) {
            this.xPos = canvas.width - this.radius
        }

        this.yPos += this.speedY;
        if (this.yPos > canvas.height - this.radius) {
            this.yPos = this.radius
        } else if (this.yPos < this.radius) {
            this.yPos = canvas.height - this.radius
        }

    }
    // 圆圈
    var circleArr = [];
    function initCircle() {
        for (var i = 0; i < 15; i++) {
            var obj = new Circle();
            obj.draw();
            obj.move();
            circleArr.push(obj);
        }
    }
    initCircle();
    var dxdy = []
    function circleMove() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 重绘
        for (var i = 0; i < circleArr.length; i++) {
            var circle = circleArr[i];
            circle.draw();
            circle.move();

            dxdy[i] = {
                dx: circle.xPos,
                dy: circle.yPos
            };
            var dx = dxdy[i].dx;
            var dy = dxdy[i].dy;
            for (var j = 0; j < i; j++) {
                var sx = dxdy[j].dx;
                var sy = dxdy[j].dy;
                var l = Math.sqrt((dx - sx) * (dx - sx) + (dy - sy) * (dy - sy));
                var C = 1 / l * 7 - 0.009;
                var alpha = C > 0.03 ? 0.03 : C;
                ctx.strokeStyle = 'rgba(0,0,0,' + alpha + ')';
                //console.log(l);
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.moveTo(dxdy[i].dx, dxdy[i].dy);
                ctx.lineTo(dxdy[j].dx, dxdy[j].dy);
                ctx.closePath();
                ctx.stroke();
            }
        }
        window.requestAnimationFrame(circleMove);
    }
    circleMove();
})();
