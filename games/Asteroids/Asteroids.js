var loc;
var right;
var left;
var up;
var down;
var right;
var space;
var ship;
var r;
var shots;

function preload() {
  ship = loadImage("spaceship.png");
}

function setup() {
  frameRate(144);
  createCanvas(1200,600);
  initV();
}

function draw() {
  background(0);
  
  shotStuff();
  
  moveShip();
  imageMode(CENTER);
  translate(loc.x, loc.y)
  rotate(r);
  image(ship, 0, 0);
  print(right);
}

function shotStuff() {
  if (space) {
    var newShot = [loc.x, loc.y, 

function moveShip() {
  if (right) {
    r+=.05;
  }
  if (left) {
    r-=.05;
  }
  if (up) {
    loc.x+=4*cos(r); 
    loc.y+=4*sin(r);
  }
  if (down) {
    loc.x-=4*cos(r); 
    loc.y-=4*sin(r);
  }
}

function initV() { //Creates initial values
  right=false;
  left=false;
  up=false;
  down=false;
  space=false;
  loc = createVector(width/2,height/2);
  r = 0.0;
  shots = [];
}
    
function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    right=true;
  }
  if (keyCode == LEFT_ARROW) {
    left = true;
  }
  if (keyCode == UP_ARROW) {
    up = true;
  }
  if (keyCode == DOWN_ARROW) {
    down = true;
  }
  if (key ==' ') {
    space=true;
  }
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    right=false;
  }
  if (keyCode == LEFT_ARROW) {
    left = false;
  }
  if (keyCode == UP_ARROW) {
    up = false;
  }
  if (keyCode == DOWN_ARROW) {
    down = false;
  }
  if (key ==' ') {
    space=false;
  }
}
