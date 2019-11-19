// Scalar for changing the scale of the drawing. (to shrink the bike)
let drawScale = 0.40;
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
headTube: "0",
stack: "0",
reach: "0"
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

  // Bottom Bracket
  let bottomBracket = rearWheelAxle.copy().add(Math.sqrt(Math.pow(geo.chainStayLength, 2) - Math.pow(geo.bottomBracketDrop, 2)), geo.bottomBracketDrop);
  point(bottomBracket);

  // Chainstay
  line(bottomBracket.x, bottomBracket.y, rearWheelAxle.x, rearWheelAxle.y);

  // Stack and Reach lines + Effective Top Tube
  push();
  strokeWeight(1);
  let stack = createVector(0, -1).setMag(geo.stack);
  let reach = createVector(1, 0).setMag(geo.reach);
  stack.add(bottomBracket);
  reach.add(stack);
  // stack line:
  line(stack.x, stack.y, bottomBracket.x, bottomBracket.y);
  // Reach line:
  // This will be covered by the ETT.
  line(stack.x, stack.y, reach.x, reach.y);

  // Effective Top Tube
  // This original Logic is wrong, the ETT  should not extend from the top of the seat tube.
  // let effectiveTopTube = p5.Vector.add(seatTube, createVector(geo.effectiveTopTube, 0, 0));
  // line(seatTube.x, seatTube.y, effectiveTopTube.x, effectiveTopTube.y);

  let effectiveTopTube = createVector(-1, 0).setMag(geo.effectiveTopTube);
  effectiveTopTube.add(reach);
  line(effectiveTopTube.x, effectiveTopTube.y, reach.x, reach.y);
  pop();

  // Head Tube
  // Original logic here is based on false assumption of where ETT goes.
  // let headTube = createVector(0, 1).setMag(geo.headTube).rotate((90 - geo.headAngle) * -1);
  // headTube.add(effectiveTopTube);
  // line(effectiveTopTube.x, effectiveTopTube.y, headTube.x, headTube.y);
  // New Logic: Top of headtube is Stack + Reach from the bottom bracket.
  // From our coding, it is the endpoint of the reach vector
  // Headtube vector will still lead to bottom of headtube
  let headTube = createVector(0, 1).setMag(geo.headTube).rotate((90 - geo.headAngle) * -1);
  headTube.add(reach);
  line(reach.x, reach.y, headTube.x, headTube.y);

  // Other Tubes
  // Seat Angle and Seat Tube
  let seatTube = createVector(0, -1).setMag(geo.seatTube).rotate((90 - geo.seatAngle) * -1);
  seatTube.add(bottomBracket);
  line(seatTube.x, seatTube.y, bottomBracket.x, bottomBracket.y);

  // Top Tube
  // aka "ineffective top tube" huehuehue
  line(seatTube.x, seatTube.y, reach.x, reach.y);

  // Down Tube
  line(bottomBracket.x, bottomBracket.y, headTube.x, headTube.y);

  // Seat Stay
  line(rearWheelAxle.x, rearWheelAxle.y, seatTube.x, seatTube.y);

  // (Simulated) Fork
  line(headTube.x, headTube.y, frontWheelAxle.x, frontWheelAxle.y);
  pop();
};

