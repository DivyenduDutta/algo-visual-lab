let values = [];
let renderer;

let animations = [];
let animationIndex = 0;
let paused = false;

const ARRAY_SIZE = 10;
const ANIMATION_SPEED = 60; // Increase this value to slow down animation

function setup() {
  createCanvas(windowWidth, windowHeight);

  generateNewArray();

  renderer = new Renderer(values);

  animations = generateMergeSortAnimations([...values]);
}

function draw() {
  background(17);

  renderer.render();

  fill(255);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text("SPACE: Pause / Resume   R: Restart", 20, 20);

  if (paused) {
    fill(color(0, 0, 0));
    textSize(28);
    textAlign(CENTER, CENTER);
    text("Paused", width / 2, height / 2);
  }

  if (!paused && frameCount % ANIMATION_SPEED === 0) {
    if (animationIndex < animations.length) {
      const animation = animations[animationIndex];

      renderer.applyAnimation(animation);

      animationIndex++;
    }
  }
}

function generateNewArray() {
  values = [];

  for (let i = 0; i < ARRAY_SIZE; i++) {
    values.push(random(50, height));
  }
}

function keyPressed() {
  // Press SPACE to pause/resume
  if (key === " ") {
    paused = !paused;
    return;
  }

  // Press R to restart
  if (key === "r" || key === "R") {
    generateNewArray();

    renderer = new Renderer(values);

    animations = generateMergeSortAnimations([...values]);

    animationIndex = 0;
    paused = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
