function Obstacle() {
  this.layer = round(random(1,3));
  this.radius=200;
  
  var rand = int(random(1,4));
  if (rand == 1) {
    this.loc = createVector(0, random(0,height));
    this.acc = createVector(random(1,2), random(-2,2));
  }
  if (rand == 2) {
    this.loc = createVector(random(0,width), 0);
    this.acc = createVector(random(-2,2), random(1,2));
  }
  if (rand == 3) {
    this.loc = createVector(width, random(0,height));
    this.acc = createVector(-random(1,2), random(-2,2));
  }
  if (rand == 4) {
    this.loc = createVector(random(0,width), height);
    this.acc = createVector(random(-2,2), -random(1,2));
  }
  
  if (this.layer == 1) {
    this.radius=20;
  }
  if (this.layer == 2) {
    this.radius=40;
  }
  if (this.layer == 3) {
    this.radius=80;
  }
  
  this.update = function() {
    this.loc.add(this.acc);
    fill(255);
    noStroke();
    ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
    for (var m=0; m< shotList.length; m++) {
      var temp = shotList[m][0];
      if (dist(temp.x, temp.y, this.loc.x, this.loc.y) < this.radius) { //If a shot hit an asteroid
        shotList.splice(m, 1);
        
        if (this.layer == 1) {
          score+=80;
          return 0;
        }
        if (this.layer == 2) {
          score+=40;
          var temp1 = new Obstacle()
          temp1.setLocAccLayer(this.loc.x, this.loc.y, this.acc.x+1, this.acc.y+1, 1);
          append(obstacleList, temp1);
          var temp2 = new Obstacle();
          temp2.setLocAccLayer(this.loc.x, this.loc.y, this.acc.x-1, this.acc.y-1, 1);
          append(obstacleList, temp2);
          return 0;
        }
        if (this.layer == 3) {
          score+=20;
          var temp1 = new Obstacle()
          temp1.setLocAccLayer(this.loc.x, this.loc.y, this.acc.x+1, this.acc.y+1, 2);
          append(obstacleList, temp1);
          var temp2 = new Obstacle();
          temp2.setLocAccLayer(this.loc.x, this.loc.y, this.acc.x-1, this.acc.y-1, 2);
          append(obstacleList, temp2);
          var temp3 = new Obstacle();
          temp3.setLocAccLayer(this.loc.x, this.loc.y, this.acc.x-1.25, this.acc.y-1.25, 2);
          append(obstacleList, temp3);
          return 0;
        }
        
      }
    }
  }
  
  this.setLocAccLayer = function(x, y, x1, y1, layer) {
    this.loc.x = x;
    this.loc.y = y;
    this.acc.x = x1;
    this.acc.y = y1;
    this.layer = layer;
    if (this.layer == 1) {
      this.radius=20;
    }
    if (this.layer == 2) {
      this.radius=40;
    }
  }
}
    
