let salt = [];
let angle = 0;
let song;
let dreamTextDisplayed = false;
let dreamTextTime = 0;
let dreamTextColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];


function preload() {
  song = loadSound('city-of-stars.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(64);
  textStyle(BOLD);
}

function draw() {
  background(0);

  // Salt shaker outline
  noFill();
  stroke(255);
  strokeWeight(4);
  push();
  translate(width/2, height/2);
  rotate(angle);
  beginShape();
  vertex(-50, -50);
  vertex(-50, 50);
  vertex(50, 50);
  vertex(50, -50);
  endShape(CLOSE);
  textSize(50);
  text('Salt', 0, 20);
  pop();

  // Salt particles
  for (let i = salt.length - 1; i >= 0; i--) {
    salt[i].update();
    salt[i].display();
    if (salt[i].alpha <= 0) {
      salt.splice(i, 1);
    }
  }

  // Stars
  if (frameCount > 120) {
    let starSize = map(frameCount, 120, 360, 2, 10);
    let starAlpha = map(frameCount, 120, 360, 255, 50);
    let starColor = color(random(255), random(255), random(255));
    for (let i = 0; i < 5; i++) {
      let x = random(width);
      let y = random(height);
      let vx = random(-2, 2);
      let vy = random(-2, 2);
      let s = new Star(x, y, vx, vy, starSize, starAlpha, starColor);
      salt.push(s);
    }
  }

  // City of Stars
  if (frameCount == 360) {
    song.stop();
    song.play();
    textSize(48);
    text('You can dream it all', width/2, height/2 - 50);
  }


  
  
  // "Dream it to see it"
  if (frameCount >= 360 * 4) {
    if (!dreamTextDisplayed) {
      textSize(32);
      fill(random(dreamTextColors));
      text('Dream it to see it', width/2, height/2 + 50);
      dreamTextDisplayed = true;
      dreamTextTime = millis();
    } else if (millis() - dreamTextTime >= 10000) {
      dreamTextDisplayed = false;
    }
  }

}

class SaltParticle {
  constructor() {
    this.pos = createVector(0, 0);
    this.vel = createVector(random(-2, 2), random(-5, -1));
    this.acc = createVector(0, 0.1);
    this.size = random(3, 5);
    this.alpha = 255;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.alpha -= 5;
    this.size += 0.05;
  }

  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

class Star {
constructor(x, y, vx, vy) {
this.pos = createVector(x, y);
this.vel = createVector(vx/5, vy/5);
this.acc = createVector(0, 0.01);
this.size = random(2, 4);
this.alpha = 255;
// Add a color property that randomly assigns a color to each star
this.color = color(random(255), random(255), random(255));
this.growFactor = random(0.02, 0.05); // the factor by which the size of the star will grow per frame
this.initialSize = this.size;
}

update() {
this.vel.add(this.acc);
this.pos.add(this.vel);
this.alpha -= 3;
// Grow the size of the star
this.size += this.growFactor;
if (this.size > this.initialSize * 2) {
this.size = this.initialSize;
}
}

display() {
noStroke();
// Use the star's color property to fill the ellipse
fill(this.color, this.alpha);
ellipse(this.pos.x, this.pos.y, this.size, this.size);
}
}

function floatImage() {
  var image = document.getElementById("salt");
  var x = 0;
  var y = 0;
  var dx = 5;
  var dy = 5;
  var interval = setInterval(moveImage, 50);
  
  function moveImage() {
    x += dx;
    y += dy;
    image.style.left = x + "px";
    image.style.top = y + "px";
    
    if (x + image.width > window.innerWidth || x < 0) {
      dx = -dx;
    }
    if (y + image.height > window.innerHeight || y < 0) {
      dy = -dy;
    }
  }
}

function mousePressed() {
if (dist(mouseX, mouseY, width/2, height/2) < 100) {
angle += HALF_PI;
}
  
  // Create new salt particles
for (let i = 0; i < 20; i++) {
  let s = new SaltParticle();
  salt.push(s);
}

// Wait 3 seconds, then display "Dream it to see it"
setTimeout(function() {
  let dreamText = createDiv('Dream it to see it');
  dreamText.position(width/2, height/2 + 50);
  dreamText.style('font-size', '64px');
  dreamText.style('font-weight', 'bold');
  dreamText.style('text-align', 'center');
  dreamText.style('color', color(random(255), random(255), random(255)).toString());
  setInterval(function() {
    dreamText.style('color', color(random(255), random(255), random(255)).toString());
  }, 100);
}, 3000);

// Turn the salt shaker 90 degrees
angle += 90;
  
}
