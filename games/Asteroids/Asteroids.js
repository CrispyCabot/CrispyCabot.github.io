var loc;
var right;
var left;
var up;
var down;
var right;
var space;
var ship;
var r;
var shotList = [];
var obstacleList = [];
var spaceCounter;

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
  obstacleStuff();
  
  moveShip();
  imageMode(CENTER);
  translate(loc.x, loc.y)
  rotate(-radians(r));
  image(ship, 0, 0);
}

function moveShip() {
  if (left) {
    if (r+5 >= 360) {
      r = 0;
    }
    else {
      r+=5;
    }
  }
  if (right) {
    if (r-5 <= 0) {
      r = 360;
    }
    else {
      r-=5;
    }
  }
  if (up) {
    loc.x+=4*cos(radians(r));
    loc.y-=4*sin(radians(r));
  }
  if (down) {
    loc.x-=4*cos(radians(r)); 
    loc.y-=4*sin(radians(r));
  }
}

function obstacleStuff() {
  while (obstacleList.length < 4) {
    var temp = new Obstacle();
    append(obstacleList, temp);
  }
  for (var i=0; i<obstacleList.length;i++) {
    obstacleList[i].update();
    if (obstacleList[i].loc.x < 0 || obstacleList[i].loc.x > width || obstacleList[i].loc.y < 0 || obstacleList[i].loc.y > height) {
      obstacleList.splice(i, 1);
    }
  }
}

function shotStuff() {
  if (space) {
    if (spaceCounter <= 0) {
      var acc = findAcc(r);
      var locHolder = createVector(loc.x, loc.y);
      append(shotList, [locHolder, acc]);
      spaceCounter = 60;
    }
    else {
      spaceCounter--;
    }
  }
  else {
    spaceCounter--;
  }
  for (var i=0; i < shotList.length; i++) {
    var tempLoc = shotList[i][0];
    var tempAcc = shotList[i][1];
    tempLoc.add(tempAcc);
    stroke(255,255,0);
    strokeWeight(2);
    line(tempLoc.x, tempLoc.y, tempLoc.x+4*tempAcc.x, tempLoc.y+4*tempAcc.y);
    noStroke();
    if (tempLoc.x < 0 || tempLoc.x > width || tempLoc.y < 0 || tempLoc.y > height) {
      shotList.splice(i, 1);
    }
  }
}

function findAcc(r) {
  var x = cos(radians(r));
  var y = -sin(radians(r));
  return createVector(8*x,8*y);
}   

function initV() { //Creates initial values
  right=false;
  left=false;
  up=false;
  down=false;
  space=false;
  loc = createVector(width/2,height/2);
  r = 0.0;
  spaceCounter = 0;
  shotList = [];
  obstacleList=[];
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
