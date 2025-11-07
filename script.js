const countdownEl = document.getElementById('countdown');
const whitelistEl = document.getElementById('whitelist');
const accordionItems = document.querySelectorAll('.accordion-item');
const canvas = document.getElementById('grid');

const dropDate = new Date();
dropDate.setDate(dropDate.getDate() + 12);
dropDate.setHours(18, 0, 0, 0);

function updateCountdown() {
  const now = new Date();
  const diff = dropDate.getTime() - now.getTime();

  if (diff <= 0) {
    countdownEl.textContent = 'Live';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${String(days).padStart(2, '0')}d : ${String(hours).padStart(
    2,
    '0'
  )}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

let whitelistCount = parseInt(whitelistEl.textContent.replace(/,/g, ''), 10);

setInterval(() => {
  const increment = Math.floor(Math.random() * 8);
  whitelistCount += increment;
  whitelistEl.textContent = whitelistCount.toLocaleString('es-ES');
}, 4000);

accordionItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

const ctx = canvas.getContext('2d');
let width;
let height;
let animationFrame;
const lines = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  lines.length = 0;
  for (let i = 0; i < 40; i++) {
    lines.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 120 + Math.random() * 180,
      speed: 0.5 + Math.random() * 1.2,
      alpha: 0.1 + Math.random() * 0.3,
    });
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'rgba(122, 92, 255, 0.12)';
  ctx.lineWidth = 1;
  const spacing = 80;
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  lines.forEach((line) => {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(61, 214, 208, ${line.alpha})`;
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x + line.length, line.y - line.length * 0.5);
    ctx.stroke();

    line.x += line.speed;
    line.y -= line.speed * 0.5;

    if (line.x > width + line.length) {
      line.x = -line.length;
    }
    if (line.y + line.length < 0) {
      line.y = height + line.length * 0.5;
    }
  });

  animationFrame = requestAnimationFrame(drawGrid);
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawGrid();
});

resizeCanvas();
drawGrid();
