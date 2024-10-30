const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2;
    this.speed = Math.random() * 3 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
}

Firework.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.size *= 0.98; // fade out
};

Firework.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    fireworks.push(new Firework(x, y));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.size < 0.1) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

document.getElementById('playSound').addEventListener('click', () => {
    const sound = document.getElementById('fireworkSound');
    sound.play();
    createFirework();
});

setInterval(createFirework, 1000);
animate();