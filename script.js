// Snowfall Effect
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const button = document.querySelector('button');
const card = document.querySelector('.card');

document.addEventListener('click', (event) => {
  // Check if clicked element is the card or its children
  if (event.target.closest('.card')) {
    card.classList.toggle('flipped');
  }
});
// Tự động điều chỉnh kích thước canvas theo màn hình
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Tạo các bông tuyết
const snowflakes = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1, // Kích thước bông tuyết
    speedX: Math.random() * 1 - 0.5, // Chuyển động ngang
    speedY: Math.random() * 2 + 1, // Tốc độ rơi
}));

// Vẽ và di chuyển bông tuyết
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ
    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        flake.x += flake.speedX;
        flake.y += flake.speedY;

        // Nếu bông tuyết rơi khỏi màn hình, đưa nó lên lại từ trên
        if (flake.y > canvas.height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * canvas.width;
        }

        // Nếu bông tuyết di chuyển ngang ra ngoài màn hình
        if (flake.x > canvas.width) {
            flake.x = 0;
        } else if (flake.x < 0) {
            flake.x = canvas.width;
        }
    });
    requestAnimationFrame(drawSnowflakes); // Lặp lại hiệu ứng
}

drawSnowflakes();
