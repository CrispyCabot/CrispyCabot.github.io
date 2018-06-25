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

//Data things
var shipWidth = 59;
var shipHeight = 45;
var arcadeFont;
var actionTheme;
var shotSound;
var obstacleBoom;
var selfBoom;
var deathGif;

function preload() {
  ship = loadImage("spaceship.png");
  arcadeFont = loadFont("data/ARCADE.TTF");
  actionTheme = loadSound("data/action.wav");
  shotSound = loadSound("data/shot.mp3");
  obstacleBoom = loadSound("data/ObstacleDestroy.mp3");
  selfBoom = loadSound("data/SelfDestroy.mp3");
}

function setup() {
  frameRate(144);
  createCanvas(1400,800);
  initV();
  actionTheme.loop(0, 1, 1);
  textFont(arcadeFont);
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
  noStroke();
}

function moveShip() { //Moves the ship
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
  if (loc.x < 0) { //Looping of the ship throughout the screen
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
  
  //Constant decrease of acc
  if (acc.x > 0) {
    acc.x -= 0.03;
  }
  if (acc.y > 0) {
    acc.y -= 0.03;
  }
  if (acc.x < 0) {
    acc.x += 0.03;
  }
  if (acc.y < 0) {
    acc.y += 0.03;
  }
}

//Shot stuff
function shotStuff() { 
  if (space) {
    if (spaceCounter <= 0) {
      var acc = findAcc(r);
      var locHolder = createVector(loc.x, loc.y);
      append(shotList, [locHolder, acc]);
      shotSound.play();
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

//Obstacle stuff
function obstacleStuff() {
  while (obstacleList.length < millis()/2000) {
    var temp = new Obstacle();
    append(obstacleList, temp);
  }
  for (var i=0; i<obstacleList.length;i++) {
    
    var obstacle = obstacleList[i];
    if (collision(obstacle)) { //Checks if obstacle hit ship
      noLoop();
      selfBoom.play();
      textAlign(CENTER).textSize(50).fill(255,0,0);
      text("Game Over", width/2, height/2);
    }
    
    var dead = false;
    
    //Checks if obstacle went off screen - if it did it moves the obstacle to make it continous
    if (obstacle.loc.x+obstacle.radius < 0) {
      obstacle.loc.x = width+obstacle.radius;
    }
    if (obstacle.loc.x-obstacle.radius > width) {
      obstacle.loc.x = 0-obstacle.radius;
    }
    if (obstacle.loc.y+obstacle.radius < 0) {
      obstacle.loc.y = height+obstacle.radius;
    }
    if (obstacle.loc.y-obstacle.radius > height) {
      obstacle.loc.y = 0-obstacle.radius;
    }
    
    //Updates obstacles, returning 0 if they were shot
    if (obstacleList[i].update() == 0) {
      dead = true;
    }
    if (dead) {
      obstacleList.splice(i, 1);
      obstacleBoom.play();
    }
  }
  time = millis() / 1000
}

//COLLISION DETECTOR: OBSTACLE - SHIP
function collision(obstacle) {
  var distance = dist(loc.x, loc.y, obstacle.loc.x, obstacle.loc.y);
  if (obstacle.radius == 40 && distance < 40) {
    return true;
  }
  if (obstacle.radius == 20 && distance < 20) {
    return true;
  }
  if (obstacle.radius == 80 && distance < 50) {
    return true;
  }
  //ellipse(loc.x, loc.y, 50, 50);
  return false;
}

//Gets the acc for an obstacle
function findAcc(r) {
  var x = cos(radians(r));
  var y = -sin(radians(r));
  return createVector(8*x,8*y);
}

//Decorative stuff like the score n stuff
function displayStuff() {
  textAlign(LEFT, TOP).textSize(32).fill(255,255,0);
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

/* I don't know what this does but it disables arrow keys/spacebar from scrolling */
var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.keyCode] = true;
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
false);
window.addEventListener('keyup',
    function(e){
        keys[e.keyCode] = false;
    },
false);
