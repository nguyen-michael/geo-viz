// Scalar for changing the scale of the drawing in 1/x. (to shrink the bike)
let drawScale = 2;

function setup() {
  let myCanvas = createCanvas(700, 500);
  myCanvas.parent('drawContainer');
  colorMode(HSB, 100);
}

function draw() {
  background(50, 20, 100);
}

// Getting data from the localStorage
function getGeometryData() {
  let data = getItem("geometryData");
  data = JSON.parse(data);
  console.log(data);
  return data;
}

// Draws a bike, takes object in format:
/*
{ 
bottomBracketDrop: "0",
chainStayLength: "0",
effectiveTopTube: "0",
headAngle: "0",
offset: "0",
seatAngle: "0",
wheelRadius: "0",
wheelbase: "0"
}
*/
function drawBike(geo) {
  
};

