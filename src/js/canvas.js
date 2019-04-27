var drawRunningTimer = function() {
    console.log('drawRuningTimer');
    var canvas = document.getElementById('timer');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    
    var sec = minute * 60;
    setInterval(function() {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100, 20);
        ctx.arc(100, 100, 80, Math.PI*(-1/2), Math.PI*(-1/2+2/60*sec), false);
        sec++;
        console.log("sec: ", sec);
        ctx.fill();
    }, 1000);
}

export default function(minute) {
    drawRunningTimer(minute);
}
