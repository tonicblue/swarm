import './style.css'

type Point = { x: number; y: number; }

class Particle { 
  public element: HTMLDivElement

  constructor (
    public mass: number, 
    public position: Point, 
    public velocity: Point = { x: 0, y: 0 }
  ) {
    this.element = document.createElement('div');
    this.element.classList.add('particle');
    document.body.appendChild(this.element);
  };

  updatePosition(force: { x: number; y: number }, timeStep: number) {
    const acceleration = { x: force.x / this.mass, y: force.y / this.mass };
    //console.log(this.position, this.velocity, force, acceleration, this.mass);

    // Update velocity using kinematic equation: v = u + at
    this.velocity.x += acceleration.x * timeStep;
    this.velocity.y += acceleration.y * timeStep;

    // Update position using kinematic equation: s = ut + 0.5 * at^2
    this.position.x += this.velocity.x * timeStep + 0.5 * acceleration.x * Math.pow(timeStep, 2);
    this.position.y += this.velocity.y * timeStep + 0.5 * acceleration.y * Math.pow(timeStep, 2);

    this.draw();
  }

  draw () {
    this.element.style.setProperty('--top', this.position.y + 'px');
    this.element.style.setProperty('--left', this.position.x + 'px');
  }
}

class GravitySimulator {
  dust: Particle[] = [];
  lastFrameTime = performance.now();

  constructor (public gravitationalConstant: number, public particleCount: number) { 
    this.generateParticles();
    this.step(this.lastFrameTime);
  }

  generateParticles () {
    this.dust = [];
  
    for (let i = 0; i < this.particleCount; i++) {
      const x = Math.round(Math.random() * screenWidth);
      const y = Math.round(Math.random() * screenHeight);
      const position = { x, y };
      const velocity = { x: 0, y: 0 };
      const mass = 10;
      
      this.dust.push(new Particle(mass, position, velocity));
    }

    console.log('PARTICLES', this.dust, screenWidth, screenHeight);
  }

  step = ((startTime: number) => {
    const time = (performance.now() - startTime) / 1000; // Convert to seconds
    const timeStep = time - this.lastFrameTime;
    
    for (let a = 0; a < this.particleCount; a++) 
      for (let b = 0; b < this.particleCount; b++) 
        if (a !== b)
          this.updateParticles(this.dust[a], this.dust[b], timeStep); 
        
    console.log(`position:`, this.dust[0].position, this.dust[0].velocity);

    this.lastFrameTime = time;
  
    window.requestAnimationFrame(this.step.bind(this));
  }).bind(this);

  updateParticles(particle1: Particle, particle2: Particle, timeStep: number) {
    const gravityForce1 = this.calculateGravity(particle1, particle2);
    const gravityForce2 = this.calculateGravity(particle2, particle1);

    particle1.updatePosition(gravityForce1, timeStep);
    particle2.updatePosition(gravityForce2, timeStep);
  }

  calculateGravity(particle1: Particle, particle2: Particle): Point {
    const distanceX = particle2.position.x - particle1.position.x;
    const distanceY = particle2.position.y - particle1.position.y;
    const distanceSquared = Math.pow(distanceX, 2) + Math.pow(distanceY, 2);
    const distance = Math.sqrt(distanceSquared);
    const forceMagnitude = (this.gravitationalConstant * particle1.mass * particle2.mass) / distanceSquared;
    const forceX = forceMagnitude * (distanceX / distance);
    const forceY = forceMagnitude * (distanceY / distance);

    return { x: forceX, y: forceY };
  }
}

const gravitationalConstant = 6.67 * Math.pow(10, -11);
const particleCount = 50;
const screenWidth = window.visualViewport?.width || document.body.offsetWidth;
const screenHeight = window.visualViewport?.height || document.body.offsetHeight;
const simulation = new GravitySimulator(gravitationalConstant, particleCount);

// function minmax (number: number, min: number, max: number) {
//   return Math.min(Math.max(number, max), min);
// }