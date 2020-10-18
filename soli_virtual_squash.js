//10/10/2020 tale p5.js
//using soli sensor on google pixel 4
//virtual squash experience
//swipes to swing, tap to reclaim the ball, and scores on the top left corner

//following two lines from LingDong's solifttt example : https://glitch.com/edit/#!/solifttt?path=public%2Fsketch.js%3A4%3A0
//This detects if the prototype is opened in Soli Sandbox, and sends an alert to the user that soli functionality will not work in other apps/browswe
if(!navigator.userAgent.includes("Soli Sandbox")){ alert("This prototype needs to be opened in Soli Sandbox in order to receive Soli Events. Soli functionality will not work.");} else {console.log("Soli Sandbox Detected");}


//play game
let serve = false;

//ball xyz
let bx = 0;
let by = 0;
let bz = 20;

//ball speed
let dx = 1;
let dy = 20;
let dz = 20;

//gravity
let g = 0.98;

//board
var boardX = 640;
var boardY = 975;
var boardZ = 0;

//sound
let sound;

//score
let score = 0;
let reset = 0;
let font;

function preload(){
  sound = loadSound('https://cdn.glitch.com/858181df-4b05-4947-a40a-441ded04e43e%2FBounceWall.m4a?v=1602257705942');
  font = loadFont("https://cdn.glitch.com/858181df-4b05-4947-a40a-441ded04e43e%2FAdobeFanHeitiStd-Bold.otf?v=1602259950697");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight, WEBGL);
  //fill("#F6B30E");
  
}

function draw() {
  //bgs
  background(255);
  drawbg();

  //camera
  camera(0, 710, 200, 0, 0, 120, 0, 1, 0);
  
  //score
  push();
  fill(0);
  textFont(font);
  textSize(6);
  textAlign(LEFT, CENTER);
  translate(-160,560,255);
  rotateX(-PI/2);
  text(score+' hits',0,0);
  text(reset + ' resets',0,6.5);
  pop();

  //ball
  drawBall();
}

function drawBall() {
  bounce();
  dz -= g;
  bx += dx;
  by += dy;
  bz += dz;
  translate(bx, by, bz);
  fill(0);
  noStroke();
  sphere(7);
}

function bounce() {
  if (bx > boardX / 2 || bx < -boardX / 2) dx = -dx;
  if (by < -boardY / 2) {
    dy = -dy;
    sound.play();
    score++;
  }
  if (bz <= boardZ) {
    dz = 20;
  }
}


function keyPressed() {
  //left swipe
  if (keyCode === LEFT_ARROW) {
    if(serve){
      dx = random(-10,5);
      dy = -25;
      serve = false;
    }
    else if ( bx >= 0 && by > 0) {
      dx = random(-10,5);
      dy = random(-20,-35);
      if(dy<-20)dz = random(20,25);
    }
  }
  //right swipe
  else if (keyCode === RIGHT_ARROW) {
    if(serve){
      dx = random(-5,10);
      dy = -25;
      serve = false;
    }
    else if (bx <= 0 && by > 0) {
      dx = random(-5,10);
      dy = random(-20,-35);
      if(dy<-20)dz = random(20,25);
    }
  }
  //tap
  else if (keyCode === ENTER) {
    bx = 0;
    by = 0;
    bz = 20;
    dx = 0;
    dy = 0;
    dz = 0;
    serve = true;
    reset++;
  }
}


window.onSoliEvent = function(event) {
  //left swipe
  if (event.type == "swipe") {
    if (event.data.direction == "5") {
      if (serve) {
        dx = random(-10, 5);
        dy = -20;
        serve = false;
      } else if (bx >= 0 && by > 0) {
        dx = random(-10, 5);
        dy = random(-15, -30);
        if (dy < -20) dz = random(20, 25);
      }
    }
    //right swipe
    else if (event.data.direction == "1") {
      if (serve) {
        dx = random(-5, 10);
        dy = -20;
        serve = false;
      } else if (bx <= 0 && by > 0) {
        dx = random(-5, 10);
        dy = random(-15, -30);
        if (dy < -20) dz = random(20, 25);
      }
    }
  }
  //tap
  else if (event.type == "tap") {
    bx = 0;
    by = 0;
    bz = 20;
    dx = 0;
    dy = 0;
    dz = 0;
    serve = true;
    reset ++;
  }
}

function drawbg() {
  var line = "#B41212";
  var wall = "#FCFBF5";
  var floor = "#FFD262";

  //floor
  strokeWeight(4);
  stroke(line);
  strokeWeight(8);
  strokeCap(PROJECT);
  fill(floor);
  //T
  //vert line
  push();
  translate(0, boardY / 4, 0);
  box(0, boardY / 2 - 5, boardZ);
  pop();
  //horz line
  box(boardX, 0, boardZ);
  //floor
  box(boardX, boardY, boardZ);
  //boxes
  //L
  push();
  translate(-boardX / 3 - 25, boardY / 8, 0);
  box(boardX / 4, boardY / 4, 0);
  pop();

  //R
  push();
  translate(+boardX / 3 + 25, boardY / 8, 0);
  box(boardX / 4, boardY / 4, 0);
  pop();

  //front wall
  push();
  fill(wall);
  stroke(240);
  strokeWeight(1);
  rotateX(-PI / 2);
  translate(0, -boardX / 2, -boardY / 2);
  box(boardX, boardX, 0);
  pop();
  push();
  noStroke();
  fill(255);
  rotateX(-PI / 2);
  translate(0, -boardX-33, -boardY / 2);
  box(boardX+40, 60, 0);
  pop();
  push();
  //midline
  fill(wall);
  stroke(line);
  translate(0, -boardY / 2, boardX / 2 - 50);
  box(boardX, 0, 0);
  //bottomline
  translate(0, 0, -boardX / 2 + 100);
  box(boardX, 0, 0);
  pop();
  push();
  //topline
  translate(0, -boardY / 2, boardX);
  box(boardX, 0, 0);
  pop();

  //side wall L
  push();
  translate(0, -130, 323);
  push();
  fill(wall);
  stroke(line);
  rotateY(PI / 2 + 0.05);
  rotateZ(-PI / 8);
  translate(200, -boardX / 4, -boardX / 2 - 25);
  box(boardX * 1.06, boardY * 1.8, 0);
  pop();
  pop();

  //side wall R
  push();
  translate(0, 0, 319);
  push();
  fill(wall);
  stroke(line);
  rotateY(PI / 2 + 0.05);
  rotateZ(-PI / 8);
  translate(200, -boardX / 4 + 60, boardX / 2 + 20);
  box(boardX, boardY * 1.5, 0);
  pop();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
