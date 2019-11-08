function preload() {
  // Preload can be used to load in media before the rest of
  // the program runs.
}

function setup() {
  let myCanvas = createCanvas(700, 500);
  myCanvas.parent('drawContainer');
  colorMode(HSB, 100);
  frameRate(1);
}

function draw() {
  const data = getGeometryData();

}

// Getting data from the localStorage
function getGeometryData() {
  let data = getItem("geometryData");
  return JSON.parse(data);
}

// Draws a bike
function drawBike() {};