/**
 * 音效
 */
// requestAnim shim layer by Paul Irish
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

var opacity = 0;
var position = 1;

(function () {
    var canvas = document.getElementById("alarmVoice");
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;

    var hasRendered = false;

    window.InitVoice = function (value) {
        if (canvas.getContext) {
            ctx = canvas.getContext("2d");
            ctx.translate(canvas_width / 2, canvas_height / 2);

            if (!hasRendered) {
                // LEFT
                drawArc(ctx, -0 - value, 0, 10, Math.PI * 5 / 6, Math.PI * 7 / 6, false, 1);
                drawArc(ctx, -10 - value, 0, 10, Math.PI * 3 / 4, Math.PI * 5 / 4, false, 0.6);
                drawArc(ctx, -20 - value, 0, 10, Math.PI * 2 / 3, Math.PI * 4 / 3, false, 0.3);

                // RIGHT
                drawArc(ctx, value + 2, 0, 10, - Math.PI / 6, Math.PI / 6, false, 1);
                drawArc(ctx, value + 10, 0, 10, - Math.PI / 4, Math.PI / 4, false, 0.6);
                drawArc(ctx, value + 20, 0, 10, - Math.PI / 3, Math.PI / 3, false, 0.3);
                hasRendered = true;
            } else {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, canvas_width, canvas_height);
                ctx.translate(canvas_width / 2, canvas_height / 2);
                // LEFT

                drawArc(ctx, -10 - value, 0, 10, Math.PI * 3 / 4, Math.PI * 5 / 4, false, 0.6);
                drawArc(ctx, -20 - value, 0, 10, Math.PI * 2 / 3, Math.PI * 4 / 3, false, 0.3);
                //   setTimeout(function () {
                drawArc(ctx, -0 - value, 0, 10, Math.PI * 5 / 6, Math.PI * 7 / 6, false, 1);
                drawArc(ctx, value + 0, 0, 10, - Math.PI / 6, Math.PI / 6, false, 1);
                //  }, 10);

                // RIGHT
                drawArc(ctx, value + 10, 0, 10, - Math.PI / 4, Math.PI / 4, false, 0.6);
                drawArc(ctx, value + 20, 0, 10, - Math.PI / 3, Math.PI / 3, false, 0.3);
            }
        }
    }


    /**
    * drawArc[画弧]
    * @param {Object} ctx [上下文]
    */
    function drawArc(ctx, X, Y, R, BEGIN, END, Counterclockwise, initOPacity) {
        ctx.save();
        ctx.strokeStyle = "rgba(255,0,0," + (initOPacity - opacity) + ")";
        ctx.lineWidth = 1;
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
    value += 0.1;
    opacity += 0.002;
    if (value > 5) {
        value = 0.1;
        opacity = 0;
    }
    var datetime = new Date().getTime();
    InitVoice(value);
}
