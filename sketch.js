function preload() {
  // Preload can be used to load in media before the rest of
  // the program runs.
}

function setup() {
  let myCanvas = createCanvas(700, 500);
  myCanvas.parent('drawContainer');
  colorMode(HSB, 100);
}

function draw() {
  background(123, 20, 100);
  const data = getGeometryData();
  stroke(210);
  text(data.one.offset, mouseX, mouseY);

}

// Getting data from the localStorage
function getGeometryData() {
  let data = getItem("geometryData");
  data = JSON.parse(data);
  return data;
}

// Draws a bike
function drawBike() {};