import './style.css'

type Particle = { 
  x: number;
  y: number;
  dx: number;
  dy: number;
  element: HTMLDivElement;
};

let start: number;
let previousTimeStamp: number;
const {
  width: screenWidth,
  height: screenHeight
} = window.visualViewport || { width: 100, height: 100 };
const particleCount = 100;
const dust: Particle[] = [];

for (let i = 0; i < particleCount; i++) {
  const x = Math.round(Math.random() * screenWidth);
  const y = Math.round(Math.random() * screenHeight);
  const dy = 1 - (Math.random() * 2);
  const dx = 1 - (Math.random() * 2);
  const element = document.createElement('div');
  
  element.classList.add('particle');
  document.body.appendChild(element);
    
  dust.push({ element, x, y, dy, dx });
}

window.requestAnimationFrame(step);
console.log('test', dust);
function step (timestamp: number) {
  start ??= timestamp;
  if (previousTimeStamp === timestamp) return;
  
  console.log(`Animate: ${start}, ${timestamp}`);
  
  for (let a = 0; a < particleCount; a++) 
    move(dust[a]);
  
  previousTimeStamp = timestamp;  
  window.requestAnimationFrame(step);
}

function move (particleA: Particle) {
  for (let b = 0; b < particleCount; b++) 
    interact(particleA, dust[b]); 
  
  particleA.x = particleA.x - Math.min(particleA.dx, 0.6);
  particleA.y = particleA.y - Math.min(particleA.dy, 0.6);

  draw(particleA);
}

function interact (particleA: Particle, particleB: Particle) {
  const distanceX = particleA.x - particleB.x;
  const distanceY = particleA.y - particleB.y;

  particleA.dx = particleA.dx + distanceX;
  particleA.dy = particleA.dy + distanceY;
}

function draw (particle: Particle) {
  particle.element.style.setProperty('--top', particle.y + 'px');
  particle.element.style.setProperty('--left', particle.x + 'px');
}