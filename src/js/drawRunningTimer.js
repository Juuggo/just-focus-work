function drawCircle() {
    console.log('yes');
    var canvas = document.getElementById('circle');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI*2, false);
    ctx.stroke();

    var sec = 0;
    setInterval(function() {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100, 20);
        ctx.arc(100, 100, 80, Math.PI*(-1/2), Math.PI*(-1/2+2/60*sec), false);
        sec++;
        console.log("sec: ", sec);
        ctx.fill();
    }, 1000);

    canvas.addEventListener('click', function() {
        console.log('Click canvas');
    });
}

drawCircle();
