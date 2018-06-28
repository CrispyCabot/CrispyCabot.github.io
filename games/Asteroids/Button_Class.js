function Button(x, y, w, h, textt, backColor, textColor, sizeText) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.textt=textt;
  this.col1 = backColor;
  this.col2 = textColor;
  this.inside = false;
  this.sizeText = sizeText;
  
  this.update = function() {
    this.inside = (mouseX < this.x + this.w && mouseX > this.x && mouseY > this.y && mouseY < this.y+h)
    if (this.inside) {
      fill(this.col1[0]-20, this.col1[1]-20, this.col1[2]-20);
      cursor(HAND);
    }
    else {
      fill(this.col1[0], this.col1[1], this.col1[2]);
      cursor(ARROW);
    }
    rect(this.x, this.y, this.w, this.h, 20);
    textAlign(CENTER, CENTER);
    textSize(this.sizeText);
    fill(this.col2[0], this.col2[1], this.col2[2]);
    text(this.textt, this.x+this.w/2, this.y+this.h/2);
  }
  
  this.clicked = function() {
    if (this.inside && mouseIsPressed) {
      return true;
    }
    return false;
  }
}
  
