// Scalar for changing the scale of the drawing. (to shrink the bike)
let drawScale = 0.42;
// Pixels from the edge we want the wheel to be
let drawBuffer = 10;

function setup() {
  let myCanvas = createCanvas(700, 500);
  myCanvas.parent('drawContainer');
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(34, 4, 93);
  let data = getGeometryData();
  drawBike(data.one, color(200, 90, 100, 0.5));
  drawBike(data.two, color(0, 90, 100, 0.5));
}

// Getting data from the localStorage
function getGeometryData() {
  let data = getItem("geometryData");
  data = JSON.parse(data);
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
wheelbase: "0",
seatTube: "0",
headTube: "0"
}
*/
function drawBike(geo, color) {
  // clean data: turn strings into floats and multiply by Sczalar
  // Ignores the operation for angles
  for (const prop in geo) {
    if (!prop.includes("Angle")) {
      geo[prop] = parseFloat(geo[prop]) * drawScale;
    }
  }

  // Drawing of Bicycle:

  // Rear Wheel Axle
  let rearWheelAxle = createVector(drawBuffer + geo.wheelRadius, height - drawBuffer - geo.wheelRadius);
  stroke(color);
  strokeWeight(10);
  noFill();
  point(rearWheelAxle);

  // Front Wheel Axle
  let frontWheelAxle = createVector(geo.wheelbase, 0).add(rearWheelAxle);
  point(frontWheelAxle);

  // Wheels
  push();
  strokeWeight(3);
  // turn vector into array and get x and y then spread into method...
  circle(rearWheelAxle.x, rearWheelAxle.y, geo.wheelRadius * 2);
  circle(frontWheelAxle.x, frontWheelAxle.y, geo.wheelRadius * 2);
  pop();

  // Bottom Bracket
  let bottomBracket = rearWheelAxle.copy().add(Math.sqrt(Math.pow(geo.chainStayLength, 2) - Math.pow(geo.bottomBracketDrop, 2)), geo.bottomBracketDrop);
  point(bottomBracket);

  // Chainstay
  push();
  strokeWeight(3);
  line(bottomBracket.x, bottomBracket.y, rearWheelAxle.x, rearWheelAxle.y);

  // Seat Angle and Seat Tube
  let seatTube = createVector(0, -1).setMag(geo.seatTube).rotate((90 - geo.seatAngle) * -1);
  seatTube.add(bottomBracket);
  line(seatTube.x, seatTube.y, bottomBracket.x, bottomBracket.y);

  // Effective Top Tube
  let effectiveTopTube = p5.Vector.add(seatTube, createVector(geo.effectiveTopTube, 0, 0));
  line(seatTube.x, seatTube.y, effectiveTopTube.x, effectiveTopTube.y);
  
  // Head Tube
  // x and y of ETT is also top of headtube
  // headTube here is bottom of headtube.
  let headTube = createVector(0, 1).setMag(geo.headTube).rotate((90 - geo.headAngle) * -1);
  headTube.add(effectiveTopTube);
  line(effectiveTopTube.x, effectiveTopTube.y, headTube.x, headTube.y);

  pop();
};

