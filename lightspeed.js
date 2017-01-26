var $canvas;
$(document).ready(function () {
    $('body').append("<canvas id='canvas'\n\style='\n\
        position:fixed;\n\
        display:block;\n\
        height: 100%;\n\
        z-index:0;\n\
        top:50%;\n\
        left:50%;\n\
        -webkit-transform:translate(-50%, -50%);\n\
        transform:translate(-50%, -50%);\n\
        width: 100%;'></canvas>");
    $canvas = $('#canvas');
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var W = $canvas.width();
    var H = $canvas.height();
    canvas.width = W;
    canvas.height = H;
    var mp = 2400;
    var particles = [];
    for (var i = 0; i < mp / 2; i++) {
        var Distance = Math.random() * 25 + 0.5;
        particles.push({
            x: W / 2, //start X
            y: H / 2, //start Y
            r: 0, //radius (set later)
            d: Distance, //density
            a: Math.random() * (Math.PI * 2), // angle
            s: 0 //speed
        });
    }

    function draw() {
        context.clearRect(0, 0, W, H);
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.beginPath();
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            context.moveTo(p.x, p.y);
            context.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        context.fill();
        update();
    }

    function update() {
        for (var i = particles.length; i < mp; i += 10) {
            var Distance = Math.random() * 25 + 0.5;
            particles.push({
                x: W / 2, //start X
                y: H / 2, //start Y
                r: 0, //radius (set later)
                d: Distance, //density
                a: Math.random() * (Math.PI * 2), // angle
                s: 0
            });
        }
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.s += .05 / p.d + p.s / 50; // gradually accelerate at a faster rate
            p.r = (p.s * .3) / (p.d * 2); // faster = bigger, gives perception of depth
            p.y += p.s * Math.cos(p.a) / p.d;//+ p.d + 1 + p.r / 2;
            p.x += p.s * Math.sin(p.a) / p.d;// * 2;
            if (p.x > W || p.x < 0 || p.y > H || p.y < 0) {
                particles.splice(i, 1);
                i--;
            }
            ;
        }
    }
    setTimeout(setInterval(draw, 33), 50);
});





