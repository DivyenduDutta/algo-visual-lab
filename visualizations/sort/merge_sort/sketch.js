// Visualization state
let values = [];
let renderer;
let animations = [];
let animationIndex = 0;
let paused = false;

// Configuration
const ARRAY_SIZE = 10;
const ANIMATION_SPEED = 60; // Frames between animation steps; increase to slow down
const CONTROL_HINT = "SPACE: Pause / Resume   R: Restart";
const CONTROL_HINT_SIZE = 16;
const PAUSED_TEXT_SIZE = 28;

function setup() {
  createCanvas(windowWidth, windowHeight);

  generateNewArray();

  renderer = new Renderer(values);

  animations = generateMergeSortAnimations([...values]);
}

function draw() {
  background(17);
  renderer.render();

  drawControlHints();
  if (paused) drawPausedOverlay();

  if (!paused) advanceAnimation();
}

function drawControlHints() {
  fill(255);
  noStroke();
  textSize(CONTROL_HINT_SIZE);
  textAlign(LEFT, TOP);
  text(CONTROL_HINT, 20, 20);
}

function drawPausedOverlay() {
  fill(color(0, 0, 0));
  textSize(PAUSED_TEXT_SIZE);
  textAlign(CENTER, CENTER);
  text("Paused", width / 2, height / 2);
}

function advanceAnimation() {
  if (
    frameCount % ANIMATION_SPEED === 0 &&
    animationIndex < animations.length
  ) {
    const animation = animations[animationIndex];
    renderer.applyAnimation(animation);
    animationIndex++;
  }
}

function generateNewArray() {
  values = [];

  for (let i = 0; i < ARRAY_SIZE; i++) {
    values.push(random(50, height));
  }
}

function keyPressed() {
  if (key === " ") {
    togglePause();
    return;
  }

  if (key === "r" || key === "R") {
    restartAnimation();
  }
}

function togglePause() {
  paused = !paused;
}

function restartAnimation() {
  generateNewArray();
  renderer = new Renderer(values);
  animations = generateMergeSortAnimations([...values]);
  animationIndex = 0;
  paused = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
