function Obstacle() {
  this.layer = int(random(1,4));
  this.radius=200;
  
  var rand = int(random(1,4));
  if (rand == 1) {
    this.loc = createVector(0, random(0,height));
    this.acc = createVector(random(1,4), random(-4,4));
  }
  if (rand == 2) {
    this.loc = createVector(random(0,width), 0);
    this.acc = createVector(random(-4,4), random(1,4));
  }
  if (rand == 3) {
    this.loc = createVector(width, random(0,height));
    this.acc = createVector(-random(1,4), random(-4,4));
  }
  if (rand == 4) {
    this.loc = createVector(random(0,width), height);
    this.acc = createVector(random(-4,4), -random(1,4));
  }
  
  if (this.layer == 1) {
    this.radius=20;
  }
  if (this.layer == 2) {
    this.radius=40;
  }
  if (this.layer == 3) {
    this.radius=60;
  }
  if (this.layer == 4) {
    this.radius == 80;
  }
  
  this.update = function() {
    this.loc.add(this.acc);
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
  }
}
    
