/**
 * 仪表盘效果显示数据
 */

(function () {
    var canvas = document.getElementById("showdashboard");
    var value = 0.75;
    var radius = 40;
    var parts = 50;
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        setValueText(ctx, canvas, value);
        drawCircle(ctx, parts, radius);
        drawDataPointer(ctx, value, radius);
    }

    /**
    * drawCircle[显示当前值]
    * @param {Object} ctx [上下文]
    * @param {Object} canvas [画布]
    * @param {Number} value [当前值]
    */
    function setValueText(ctx, canvas, value) {
        // move axies to center
        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (value <= 0.5) {
            ctx.fillStyle = 'rgb(' + parseInt(510 * value) + ',255,0)';
        } else {
            ctx.fillStyle = 'rgb(255,' + parseInt(2 * (1 - value) * 255) + ',0)';
        }
        ctx.textAlign="center";
        ctx.fillText(value * 100, 0, radius - 11);
    }

    /**
    * drawCircle[画仪表盘]
    * @param {Object} ctx [上下文]
    * @param {Number} parts [份数]
    * @param {Number} radius [半径]
    */
    function drawCircle(ctx, parts, radius) {
        var beginAngle = Math.PI / 6;
        var endAngle = Math.PI * 11 / 6;

        ctx.rotate(Math.PI / 2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        // x,y,radius,sAngle,eAngle
        ctx.arc(0, 0, radius, beginAngle, endAngle);
        ctx.stroke();
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
        ctx.save();
    }

    /**
    * drawDataPointer[画仪表盘指针]
    * @param {Object} ctx [上下文]
    * @param {Number} value [当前值]
    * @param {Number} radius [半径]
    */
    function drawDataPointer(ctx, value, radius) {
        var beginAngle = Math.PI / 6;
        var endAngle = Math.PI * 11 / 6;

        ctx.rotate(2 * beginAngle + value * (endAngle - beginAngle));
        ctx.beginPath();
        ctx.arc(-radius + 11, 0, 3, 0, 2 * Math.PI, true);
        if (value <= 0.5) {
            ctx.fillStyle = 'rgb(' + parseInt(510 * value) + ',255,0)';
        } else {
            ctx.fillStyle = 'rgb(255,' + parseInt(2 * (1 - value) * 255) + ',0)';
        }
        ctx.fill();
        ctx.closePath();
        ctx.save();
    }
})();


