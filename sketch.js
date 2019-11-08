function preload() {
  // Preload can be used to load in media before the rest of
  // the program runs.
}

function setup() {
  let myCanvas = createCanvas(700, 500);
  myCanvas.parent('drawContainer');
  // rectMode(CENTER);
  // rectMode(CORNERS);
  colorMode(HSB, 100);
}

function draw() {
  // This will "clear" the screen every turn.
  // background(0);
  // Basic shapeS!
  // point(35, 100);
  // x,y x,y
  // line(10, 20, 50, 20);

  // top point x,y, extend to right bottom
  // rect(30, 200, 300, 120);
  // for center mode where you set xy as rect center:
  // have rectmode set in setup
  // Corners mode: top left and bot right
  // Default is CORNER
  
  // Elipse can use ellipseMode()
  // Deafult is center 
  // ellipse(43, 293, 40, 40);

  // rect(100,100,20,100);
  // ellipse(100,70,60,60);
  // ellipse(81,70,16,32);
  // ellipse(119,70,16,32);
  // line(90,150,80,160);
  // line(110,150,120,160);

  // Playing with cursor text.
  textSize(29);
  fill(mouseX % 100, mouseY % 100, 100, 70);
  text(`${mouseX}, ${mouseY}`, mouseX + 20, mouseY + 20);





}

