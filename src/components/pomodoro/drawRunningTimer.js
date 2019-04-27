var startArc = Math.PI*(-1/2);
var drawRunningTimer = function(sessionSec, passedSec) {
    var ctx = document.getElementById('timer').getContext('2d');
    var endArc = Math.PI*(-1/2+2/sessionSec*passedSec);
    var canvasWidth = 200;
    var halfWidth = 100;
    ctx.fillStyle = 'white';
    ctx.center = (canvasWidth, canvasWidth);

    ctx.clearRect(0, 0, canvasWidth, canvasWidth);
    ctx.beginPath();
    ctx.moveTo(halfWidth, halfWidth);
    ctx.lineTo(halfWidth, 20);
    ctx.arc(halfWidth, halfWidth, halfWidth - 20, startArc, endArc, false);
    ctx.fill();
}
export default function(totalSec, passedSec) {
    drawRunningTimer(totalSec, passedSec);
}
