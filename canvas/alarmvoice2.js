/**
 * 音效2
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var value1 = 0, value2 = 10, value3 = 20,
    value4 = 0, value5 = -10, value6 = -20,
    fraction1 = 6, fraction2 = 4, fraction3 = 3;
opacity1 = 1, opacity2 = 0.6, opacity3 = 0.3;
(function () {
    var canvas = document.getElementById("alarmVoice2");
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;

    var hasRendered = false;

    window.InitVoice = function (value) {
        if (canvas.getContext) {
            ctx = canvas.getContext("2d");
            ctx.translate(canvas_width / 2, canvas_height / 2);

            if (!hasRendered) {
                value1 = value + value1;
                value2 = value + value2;
                value3 = value + value3;
                value4 = value4 - value;
                value5 = value5 - value;
                value6 = value6 - value;
                if (value1 > 30) {
                    value1 = 0;
                    fraction1 = 6;
                    opacity1 = 1;
                }
                if (value2 > 30) {
                    value2 = 0;
                    fraction2 = 6;
                    opacity2 = 1;
                }
                if (value3 > 30) {
                    value3 = 0;
                    fraction3 = 6;
                    opacity3 = 1;
                }
                if (value4 < -30) {
                    value4 = 0;
                }
                if (value5 < -30) {
                    value5 = 0;
                }
                if (value6 < -30) {
                    value6 = 0;
                }

                fraction1 = fraction1 - value / 8;
                fraction2 = fraction2 - value / 8;
                fraction3 = fraction3 - value / 8;

                opacity1 = opacity1 - value / 24;
                opacity2 = opacity2 - value / 24;
                opacity3 = opacity3 - value / 24;

                // LEFT
                drawArc(ctx, value4, 0, 10, Math.PI * (fraction1 - 1) / fraction1, Math.PI * (fraction1 + 1) / fraction1, false, opacity1);
                drawArc(ctx, value5, 0, 10, Math.PI * (fraction2 - 1) / fraction2, Math.PI * (fraction2 + 1) / fraction2, false, opacity2);
                drawArc(ctx, value6, 0, 10, Math.PI * (fraction3 - 1) / fraction3, Math.PI * (fraction3 + 1) / fraction3, false, opacity3);

                // RIGHT
                drawArc(ctx, value1, 0, 10, - Math.PI / fraction1, Math.PI / fraction1, false, opacity1);
                drawArc(ctx, value2, 0, 10, - Math.PI / fraction2, Math.PI / fraction2, false, opacity2);
                drawArc(ctx, value3, 0, 10, - Math.PI / fraction3, Math.PI / fraction3, false, opacity3);
                hasRendered = true;
            } else {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas_width, canvas_height);
                ctx.translate(canvas_width / 2, canvas_height / 2);
                value1 = value + value1;
                value2 = value + value2;
                value3 = value + value3;
                value4 = value4 - value;
                value5 = value5 - value;
                value6 = value6 - value;
                if (value1 > 30) {
                    value1 = 0;
                    fraction1 = 6;
                    opacity1 = 1;
                }
                if (value2 > 30) {
                    value2 = 0;
                    fraction2 = 6;
                    opacity2 = 1;
                }
                if (value3 > 30) {
                    value3 = 0;
                    fraction3 = 6;
                    opacity3 = 1;
                }
                if (value4 < -30) {
                    value4 = 0;
                }
                if (value5 < -30) {
                    value5 = 0;
                }
                if (value6 < -30) {
                    value6 = 0;
                }

                fraction1 = fraction1 - value / 8;
                fraction2 = fraction2 - value / 8;
                fraction3 = fraction3 - value / 8;

                opacity1 = opacity1 - value / 24;
                opacity2 = opacity2 - value / 24;
                opacity3 = opacity3 - value / 24;

                // LEFT
                drawArc(ctx, value4, 0, 10, Math.PI * (fraction1 - 1) / fraction1, Math.PI * (fraction1 + 1) / fraction1, false, opacity1);
                drawArc(ctx, value5, 0, 10, Math.PI * (fraction2 - 1) / fraction2, Math.PI * (fraction2 + 1) / fraction2, false, opacity2);
                drawArc(ctx, value6, 0, 10, Math.PI * (fraction3 - 1) / fraction3, Math.PI * (fraction3 + 1) / fraction3, false, opacity3);

                // RIGHT
                drawArc(ctx, value1, 0, 10, - Math.PI / fraction1, Math.PI / fraction1, false, opacity1);
                drawArc(ctx, value2, 0, 10, - Math.PI / fraction2, Math.PI / fraction2, false, opacity2);
                drawArc(ctx, value3, 0, 10, - Math.PI / fraction3, Math.PI / fraction3, false, opacity3);
            }
        }
    }


    /**
    * drawArc[画弧]
    * @param {Object} ctx [上下文]
    */
    function drawArc(ctx, X, Y, R, BEGIN, END, Counterclockwise, initOPacity) {
        ctx.save();
        ctx.strokeStyle = "rgba(255,0,0," + (initOPacity) + ")";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(X, Y, R, BEGIN, END, Counterclockwise);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
})();

/**
 * 数据刷新
 */
refreshData();
function refreshData() {
    requestAnimFrame(refreshData);
    InitVoice(0.1);
}
