var loc;
var acc
var right;
var left;
var up;
var down;
var right;
var space;
var r;
var shotList = [];
var obstacleList = [];
var spaceCounter;
var obstacleAmount;
var time;
var score;
var trailCounter;
var shipFrags = [];
var fragLocs = [];
var shipDestroy;
var destroyTimer;
var playing;
var endScreen;

//Data things
var shipWidth = 59;
var shipHeight = 45;
var arcadeFont;
var actionTheme;
var shotSound;
var obstacleBoom;
var selfBoom;
var rocketSound;
var deathGif;
var ship;
var shipTrail;
var scoreboardStrings;
var newScoreboard;


var frag1, frag2, frag3, frag4; //Ship fragments for when it explodes
function preload() {
  ship = loadImage("spaceship.png");
  shipTrail = loadImage("spaceshipTrail.png");
  arcadeFont = loadFont("data/ARCADE.TTF");
  actionTheme = loadSound("data/action.mp3");
  shotSound = loadSound("data/shot.mp3");
  obstacleBoom = loadSound("data/ObstacleDestroy.mp3");
  selfBoom = loadSound("data/SelfDestroy.mp3");
  rocketSound = loadSound("data/rocket.mp3");
  frag1 = loadImage("data/shipTopLeft.png");
  frag2 = loadImage("data/shipTopRight.png");
  frag3 = loadImage("data/shipBottomRight.png");
  frag4 = loadImage("data/shipBottomLeft.png");
  scoreboardStrings = loadStrings("data/scoreboard.txt");
}

//Creates initial values
function initV() {
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
  trailCounter=0;
  shipDestroy = false;
  fragLocs = [];
  shipFrags = [];
  destroyTimer = 0;
  append(shipFrags, [frag1, createVector(random(-2,2), random(-2,2))]);
  append(shipFrags, [frag2, createVector(random(-2,2), random(-2,2))]);
  append(shipFrags, [frag3, createVector(random(-2,2), random(-2,2))]);
  append(shipFrags, [frag4, createVector(random(-2,2), random(-2,2))]);
  playing=true;
  endScreen=false;
}

function setup() {
  frameRate(144);
  createCanvas(1400,750);
  initV();
  actionTheme.loop(0, 1, 0.2, 1); //Background song
  textFont(arcadeFont);
}

function draw() {
  if (playing) {
    playingScreen();
  }
  
  else if (endScreen) {
    textAlign(CENTER, TOP).textSize(50).fill(255,0,0);
    text("Game Over", width/2, 20);
    
    displayStuff();
    showScoreboard();
  }
}

function showScoreboard() {
  var placesX = width/2-350;
  var scoreX = width/2+50;
  var nameX = width/2+200;
  var r1 = 250;
  var r2 = 300;
  var r3 = 350;
  var r4 = 400;
  var r5 = 450;
  textAlign(CENTER, TOP).textSize(45).fill(0,0,255);
  text("Scoreboard", width/2, 100);
  textSize(30).fill(50,50,255);
  textAlign(CENTER, CENTER);
  text("Rank", placesX-30, 200);
  textAlign(RIGHT, CENTER);
  text("Score", scoreX, 200);
  textAlign(LEFT, CENTER);
  text("Name", nameX, 200);
  textAlign(RIGHT, CENTER).fill(255,0,0);
  text("1st", placesX, r1);
  text(split(scoreboardStrings[0], " ")[0], scoreX, r1);
  text("2nd", placesX, r2);
  text(split(scoreboardStrings[1], " ")[0], scoreX, r2);
  text("3rd", placesX, r3);
  text(split(scoreboardStrings[2], " ")[0], scoreX, r3);
  fill(255,255,0);
  text("4th", placesX, r4);
  text(split(scoreboardStrings[3], " ")[0], scoreX, r4);
  text("5th", placesX, r5);
  text(split(scoreboardStrings[4], " ")[0], scoreX, r5);
  textAlign(LEFT, CENTER);
  fill(255,0,0);
  text(split(scoreboardStrings[0], " ")[1], nameX, r1);
  text(split(scoreboardStrings[1], " ")[1], nameX, r2);
  text(split(scoreboardStrings[2], " ")[1], nameX, r3);
  fill(255,255,0);
  text(split(scoreboardStrings[3], " ")[1], nameX, r4);
  text(split(scoreboardStrings[4], " ")[1], nameX, r5);
}

function playingScreen() {
  background(0);
  
  shotStuff();
  obstacleStuff();
  displayStuff();
  
  if (shipDestroy) {
    for (var i=0; i<shipFrags.length; i++) {
      var temp = shipFrags[i];
      var locc = fragLocs[i];
      image(temp[0], locc.x, locc.y);
      fragLocs[i].add(temp[1]);
    }
    destroyTimer++;
    if (destroyTimer == 180) {
      playing = false;
      endScreen = true;
      actionTheme.stop();
    }
    return;
  }   
      
  
  moveShip();
  imageMode(CENTER);
  translate(loc.x, loc.y)
  rotate(-radians(r));
  if (up) {
    if (trailCounter < 5) {
      image(shipTrail, 0, 0);
    }
    else if (trailCounter < 6) {
      image(ship, 0, 0);
    }
    trailCounter++;
    if (trailCounter == 6) {
      trailCounter=0;
    }
  }
  else {
    image(ship, 0, 0);
  }
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
    if (!(rocketSound.isPlaying())) {
      rocketSound.loop(0, 1, 0.5, 1);
    }
  }
  else {
    if (rocketSound.isPlaying()) {
      rocketSound.stop();
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
    if (spaceCounter <= 0) { //This is where a shot is created
      var acc = findAcc(r);
      var locHolder = createVector(loc.x, loc.y);
      append(shotList, [locHolder, acc]);
      shotSound.play(0, 1, 0.3);
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
    if (collision(obstacle) && !shipDestroy) { //Checks if obstacle hit ship
      shipDied();
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
      obstacleBoom.play(0, 1, 0.3);
    }
  }
  time = millis() / 1000
}

//Function called when ship dies
function shipDied() {
  updateScoreboard();
  if (rocketSound.isPlaying()) {
    rocketSound.stop();
  }
  shipDestroy = true;
  selfBoom.play(0, 1, 0.6);
  for (var i=0; i<4; i++) {
    append(fragLocs, createVector(loc.x, loc.y));
    var temp = shipFrags[i][1];
    temp.x = acc.x*random(.2, 1.5);
    temp.y = acc.y*random(.2, 1.5);
    print("New Line");
  }
}

//Updates scoreboard text file and puts new info in string newScoreboard
function updateScoreboard() {
  var newHi = false;
  var place;
  if (score > int(scoreboardStrings[0][0])) {
    place = 0;
    newHi = true;
  }
  else if (score > int(scoreboardStrings[1][0])) {
    place=1;
    newHi = true;
  }
  else if (score > int(scoreboardStrings[2][0])) {
    place=2;
    newHi = true;
  }
  else if (score > int(scoreboardStrings[3][0])) {
    place=3;
    newHi = true;
  }
  else if (score > int(scoreboardStrings[4][0])) {
    place=4;
    newHi = true;
  }
  if (newHi) {
    var pname = "Test name";
    scoreboardStrings.splice(place, 0, str(score)+" "+pname);
    scoreboardStrings.splice(scoreboardStrings.length-1, 1);
    print(scoreboardStrings);
    saveStrings(scoreboardStrings, "data/scoreboard.txt");
  }
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
  //ellipse(loc.x, loc.y, 50, 50); //Uncomment this to show ship hitbox - using circle to circle collision
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
