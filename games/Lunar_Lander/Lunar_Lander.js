var loc;
var acc;
var left, right, up;
var r;
var lander;
var terrain = [[[0, height], [75, height-100]], [[75, height-100], [100, height-100]], [[100, height-100], [200, height-25]]];

function preload() {
  lander = loadImage("data/lander.png");
}

function initV() {
  loc = createVector(width/2, 100);
  acc = createVector(0,0);
  right=false;
  up=false;
  left=false;
  r = 0;
}

function setup() {
  createCanvas(1100,600);
  background(0);
  initV();
}

function draw() {
  background(0);
  fill(255);
  
  moveShip();
  drawTerrain();
  
  translate(loc.x, loc.y);
  rotate(radians(r));
  imageMode(CENTER); 
  image(lander, 0, 0);
}

function drawTerrain() {
  

function moveShip() {
  if (right) {
    r+=3;
  }
  if (left) {
    r-=3;
  }
  if (up) {
    acc.x += cos(radians(r))*.03;
    acc.y += sin(radians(r))*.03;
  }
  acc.y+=0.01; //Gravity
  loc.add(acc);
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    right = true;
  }
  if (keyCode == UP_ARROW) {
    up = true;
  }
  if (keyCode == LEFT_ARROW) {
    left = true;
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    right = false;
  }
  if (keyCode == UP_ARROW) {
    up = false;
  }
  if (keyCode == LEFT_ARROW) {
    left = false;
  }
}
