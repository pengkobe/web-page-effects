/**
 * 仪表盘效果显示数据
 */

(function () {
    var canvas = document.getElementById("showdashboard");
    var hasRendered = false;
    window.InitDash = function (params) {
        if (canvas.getContext) {
            ctx = canvas.getContext("2d");
            // move axies to center
            ctx.translate(canvas.width / 2, canvas.height / 2);
            // Use the identity matrix while clearing the canvas
            if (!hasRendered) {
                setValueText(ctx, canvas, params.value);
                drawCircle(ctx, params.parts, params.radius);
                drawDataPointer(ctx, params.value, params.radius);
                hasRendered = true;
            } else {
                // Use the identity matrix while clearing the canvas
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Restore the transform
                ctx.translate(canvas.width / 2, canvas.height / 2);
                setValueText(ctx, canvas, params.value);
                drawCircle(ctx, params.parts, params.radius);
                drawDataPointer(ctx, params.value, params.radius);
            }
        }
    }

    /**
    * drawCircle[显示当前值]
    * @param {Object} ctx [上下文]
    * @param {Object} canvas [画布]
    * @param {Number} value [当前值]
    */
    function setValueText(ctx, canvas, value) {
        ctx.save();
        if (value <= 0.5) {
            ctx.fillStyle = 'rgb(' + parseInt(510 * value) + ',255,0)';
        } else {
            ctx.fillStyle = 'rgb(255,' + parseInt(2 * (1 - value) * 255) + ',0)';
        }
        ctx.textAlign = "center";
        ctx.fillText(value * 100, 0, radius - 11);
        ctx.restore();
    }

    /**
    * drawCircle[画仪表盘]
    * @param {Object} ctx [上下文]
    * @param {Number} parts [份数]
    * @param {Number} radius [半径]
    */
    function drawCircle(ctx, parts, radius) {
        ctx.save();
        var beginAngle = Math.PI / 6;
        var endAngle = Math.PI * 11 / 6;

        ctx.rotate(Math.PI / 2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        // x,y,radius,sAngle,eAngle
        ctx.arc(0, 0, radius, beginAngle, endAngle);
        ctx.stroke();
        ctx.closePath();
        ctx.rotate(beginAngle - Math.PI);
        var divides = 255 / (parts / 2);
        for (var i = 0; i <= parts; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            if (i < parts / 2) {
                ctx.strokeStyle = 'rgb(' + parseInt(i * divides) + ',255,0)';
            } else {
                ctx.strokeStyle = 'rgb(255,' + (parts - i) * divides + ',0)';
            }
            ctx.moveTo(-34, 0);
            ctx.lineTo(-38, 0);
            ctx.stroke();
            ctx.closePath();
            ctx.rotate((endAngle - beginAngle) / 51);
        }

        ctx.restore();
    }

    /**
    * drawDataPointer[画仪表盘指针]
    * @param {Object} ctx [上下文]
    * @param {Number} value [当前值]
    * @param {Number} radius [半径]
    */
    function drawDataPointer(ctx, value, radius) {
        ctx.save();
        var beginAngle = Math.PI / 6;
        var endAngle = Math.PI * 11 / 6;

        ctx.rotate(-Math.PI / 2 + beginAngle + value * (endAngle - beginAngle));
        ctx.beginPath();
        ctx.arc(-radius + 11, 0, 3, 0, 2 * Math.PI, true);
        if (value <= 0.5) {
            ctx.fillStyle = 'rgb(' + parseInt(510 * value) + ',255,0)';
        } else {
            ctx.fillStyle = 'rgb(255,' + parseInt(2 * (1 - value) * 255) + ',0)';
        }
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
})();


var value = 0.75;
var radius = 40;
var parts = 50;
setInterval(function () {
    value += 0.1;
    if (value > 1) {
        value = 0.1;
    }
    InitDash({ value: value, radius: radius, parts: parts });
}, 1000)