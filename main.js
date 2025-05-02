console.log("main.js running");

let lastTime = 0;
let tickRate = 1000 / 60;
let keys = {};

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

function gameLoop(timestamp) {
  if (timestamp - lastTime >= tickRate) {
    update();
    lastTime = timestamp;
  }
  requestAnimationFrame(gameLoop);
}

function update() {
  if (window.updatePlayer) updatePlayer();
  if (window.updateCamera) updateCamera();
  if (window.updateUI) updateUI();
}

function resizeCanvas() {
  const canvas = document.getElementById('game-canvas');
  if (canvas) {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
requestAnimationFrame(gameLoop);