var loc;
var acc
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
var obstacleAmount;
var time;
var score;

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
  displayStuff();
  
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
    if (abs(acc.x) + abs(acc.y) < 5) {
      acc.x+=.1*cos(radians(r));
      acc.y-=.1*sin(radians(r));
    }
  }
  if (down) {
    if (abs(acc.x) + abs(acc.y) < 5) {
      acc.x-=.1*cos(radians(r)); 
      acc.y+=.1*sin(radians(r));
    }
  }
  if (loc.x < 0) {
    loc.x = width;
  }
  if (loc.x > width) {
    loc.x = 0;
  }
  if (loc.y > height) {
    loc.y = 0;
  }
  if (loc.y < 0) {
    loc.y = height;
  }
  loc.add(acc);
  if (acc.x > 0) {
    acc.x -= 0.01;
  }
  if (acc.y > 0) {
    acc.y -= 0.01;
  }
  if (acc.x < 0) {
    acc.x += 0.01;
  }
  if (acc.y < 0) {
    acc.y += 0.01;
  }
}

function shotStuff() {
  if (space) {
    if (spaceCounter <= 0) {
      var acc = findAcc(r);
      var locHolder = createVector(loc.x, loc.y);
      append(shotList, [locHolder, acc]);
      spaceCounter = 20;
    }
    else {
      spaceCounter--;
    }
  }
  else {
    spaceCounter--;
  }
  for (var i=0; i < shotList.length; i++) {  //Loops through all the shots still in play
    var tempLoc = shotList[i][0];
    var tempAcc = shotList[i][1];
    tempLoc.add(tempAcc);
    stroke(255,255,0);
    strokeWeight(2);
    line(tempLoc.x, tempLoc.y, tempLoc.x+2*tempAcc.x, tempLoc.y+2*tempAcc.y);
    noStroke();
    if (tempLoc.x < 0 || tempLoc.x > width || tempLoc.y < 0 || tempLoc.y > height) { //Check if shot went off screen
      shotList.splice(i, 1);
    }
  }
}

function obstacleStuff() {
  while (obstacleList.length < 5) {
    var temp = new Obstacle();
    append(obstacleList, temp);
  }
  for (var i=0; i<obstacleList.length;i++) {
    
    var obstacle = obstacleList[i];
    if (abs(obstacle.loc.x-loc.x) < 20 && abs(obstacle.loc.y - loc.y) < 20) { //Checks if obstacle hit ship *Only checks in a square from the midpoint 20 pixels horizontal and vertical*
      noLoop();
      textAlign(CENTER).textSize(50).fill(255,0,0);
      text("Game Over", width/2, height/2);
    }
    
    var dead = false;
    
    //Checks if obstacle went off screen
   /* if (obstacleList[i].loc.x < 0 || obstacleList[i].loc.x > width || obstacleList[i].loc.y < 0 || obstacleList[i].loc.y > height) { //Checks if obstacle went off screen
      dead = true;
    }*/
    if (obstacle.loc.x < 0) {
      obstacle.loc.x = width;
    }
    if (obstacle.loc.x > width) {
      obstacle.loc.x = 0;
    }
    if (obstacle.loc.y < 0) {
      obstacle.loc.y = height;
    }
    if (obstacle.loc.y > height) {
      obstacle.loc.y = 0;
    }
    
    if (obstacleList[i].update() == 0) { //Returns 0 if obstacle was hit by shot
      dead = true;
    }
    if (dead) {
      obstacleList.splice(i, 1);
    }
  }
  time = millis() / 1000
}

function findAcc(r) {
  var x = cos(radians(r));
  var y = -sin(radians(r));
  return createVector(8*x,8*y);
}

function displayStuff() {
  textAlign(LEFT, TOP).textSize(40).fill(255,255,0);
  text("Score: "+score, 15, 15);
}

function initV() { //Creates initial values
  right=false;
  left=false;
  up=false;
  down=false;
  space=false;
  loc = createVector(width/2,height/2);
  acc = createVector(0,0);
  r = 0.0;
  spaceCounter = 0;
  shotList = [];
  obstacleList=[];
  obstacleAmount = 5;
  time=0;
  score=0;
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
