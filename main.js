const canvas = d3
  .select("#container")
  .append("canvas")
  //   .style("border", "1px solid gray")
  .style("max-width", "100%");

const container = document.querySelector("#container");
const devicePixelRatio = window.devicePixelRatio || 1;

const width = container.offsetWidth;
// const height =
//   width * 0.5 > window.innerHeight - 100
//     ? window.innerHeight - 100
//     : width * 0.5;
const height = window.innerHeight * 0.85;
console.log("window height", window.innerHeight);
canvas
  .attr("width", width * devicePixelRatio)
  .attr("height", height * devicePixelRatio);
const canvasNode = canvas.node();

const displayWidth = canvasNode.width / devicePixelRatio;
const displayHeight = canvasNode.height / devicePixelRatio;

const margin = { top: 35, right: 35, bottom: 35, left: 35 };

const context = canvas.node().getContext("2d");
context.scale(devicePixelRatio, devicePixelRatio);

// Daten für Zweitstimmen Bundestagswahl 2021
// gültige Stimmen 46.298.387
// CDU 8.774.920
// SPD 11.901.558
// AfD 4.809.233
// FDP 5.291.013
// Linke 2.255.864
// Grüne 6.814.408
// CSU 2.402.827
// Andere Rest

const numberVotesPerCircle = 10000;

const percentageThatVoted = 0.83;
const numberOfValidVotes = 46298387;
const numberOfVotes = Math.floor(numberOfValidVotes / percentageThatVoted);
console.log("Number of votes", numberOfVotes);

const data = [
  { party: "SPD", percentage: 16.4 },
  { party: "CDU/CSU", percentage: 28.5 },
  { party: "Grüne", percentage: 11.6 },
  { party: "FDP", percentage: 4.3 },
  { party: "AfD", percentage: 20.8 },
  { party: "Linke", percentage: 8.7 },
  { party: "BSW", percentage: 4.9 },
  { party: "Andere", percentage: 4.5 },
];

// calculate the votes for each party and add to data array
data.forEach((d) => {
  d.votes = (numberOfVotes * d.percentage) / 100;
});

const sumVotes = data.reduce(
  (acc, d) => acc + (numberOfVotes * d.percentage) / 100,
  0
);
const sumPercentage = data.reduce((acc, d) => acc + d.percentage, 0);
console.log("Sum votes", sumVotes);
console.log("Sum percentage", sumPercentage);

const xScale = d3
  .scaleBand()
  .domain(data.map((d) => d.party))
  .range([margin.left, displayWidth - margin.right]);

const barWidth = xScale.bandwidth();

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data.map((d) => d.votes))])
  .range([displayHeight - margin.top, margin.bottom]);

const getColor = (party, opacity = 0.6) => {
  const colors = {
    "CDU/CSU": `rgba(19,19,19,${opacity})`, // black
    SPD: `rgba(255,0,0,${opacity})`, // "red",
    AfD: `rgba(0,114,176, ${opacity})`, //"#0072B0",
    FDP: `rgba(254,237,1,${opacity})`, //"#FEED01",
    Linke: `rgba(179,43,106, ${opacity})`, //"#B32B6A",
    Grüne: `rgba(31,161,45, ${opacity})`, //"#1FA12D",
    BSW: `rgba(101,0,102,${opacity})`, //#650066
    Andere: `rgba(161,161,161,${opacity})`, //"#A1A1A1",
  };
  return colors[party];
};

// create an array which has the length of sumVotes, each element is one vote per party,
const votes = data.reduce((acc, d) => {
  acc.push(...Array(Math.floor(d.votes / numberVotesPerCircle)).fill(d.party));
  return acc;
}, []);

// really shuffle the votes array
for (let i = votes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [votes[i], votes[j]] = [votes[j], votes[i]];
}

console.log(votes);
const spdVotes = votes.filter((d) => d === "SPD").length;
const cduVotes = votes.filter((d) => d === "CDU/CSU").length;
const grueneVotes = votes.filter((d) => d === "Grüne").length;
const fdpVotes = votes.filter((d) => d === "FDP").length;
const afdVotes = votes.filter((d) => d === "AfD").length;
console.log("spd", spdVotes, data.filter((d) => d.party === "SPD")[0]);
console.log("cdu", cduVotes, data.filter((d) => d.party === "CDU/CSU")[0]);
console.log("gruene", grueneVotes, data.filter((d) => d.party === "Grüne")[0]);
console.log("fdp", fdpVotes, data.filter((d) => d.party === "FDP")[0]);
console.log("afd", afdVotes, data.filter((d) => d.party === "AfD")[0]);
console.log("Sum votes", votes.length);

function setLinePoints(iterations) {
  var pointList = {};
  pointList.first = { x: 0, y: 1 };
  var lastPoint = { x: 1, y: 1 };
  var minY = 1;
  var maxY = 1;
  var point;
  var nextPoint;
  var dx, newX, newY;

  pointList.first.next = lastPoint;
  for (var i = 0; i < iterations; i++) {
    point = pointList.first;
    while (point.next != null) {
      nextPoint = point.next;

      dx = nextPoint.x - point.x;
      newX = 0.5 * (point.x + nextPoint.x);
      newY = 0.5 * (point.y + nextPoint.y);
      newY += dx * (Math.random() * 2 - 1);

      var newPoint = { x: newX, y: newY };

      //min, max
      if (newY < minY) {
        minY = newY;
      } else if (newY > maxY) {
        maxY = newY;
      }

      //put between points
      newPoint.next = nextPoint;
      point.next = newPoint;

      point = nextPoint;
    }
  }

  //normalize to values between 0 and 1
  if (maxY != minY) {
    var normalizeRate = 1 / (maxY - minY);
    point = pointList.first;
    while (point != null) {
      point.y = normalizeRate * (point.y - minY);
      point = point.next;
    }
  }
  //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
  else {
    point = pointList.first;
    while (point != null) {
      point.y = 1;
      point = point.next;
    }
  }

  return pointList;
}

function drawCircle(
  centerX,
  centerY,
  minRad,
  maxRad,
  phase,
  colorStroke,
  colorFill,
  thisContext = context
) {
  var point;
  var rad, theta;
  var twoPi = 2 * Math.PI;
  var x0, y0;

  //generate the random function that will be used to vary the radius, 9 iterations of subdivision
  var pointList = setLinePoints(9);

  thisContext.strokeStyle = colorStroke;
  thisContext.lineWidth = 1;
  thisContext.fillStyle = colorFill;
  thisContext.beginPath();
  point = pointList.first;
  theta = phase;
  rad = minRad + point.y * (maxRad - minRad);
  x0 = centerX + rad * Math.cos(theta);
  y0 = centerY + rad * Math.sin(theta);
  thisContext.lineTo(x0, y0);
  while (point.next != null) {
    point = point.next;
    theta = twoPi * point.x + phase;
    rad = minRad + point.y * (maxRad - minRad);
    x0 = centerX + rad * Math.cos(theta);
    y0 = centerY + rad * Math.sin(theta);
    thisContext.lineTo(x0, y0);
  }
  thisContext.stroke();
  thisContext.fill();
}

// function drawRect(centerX, centerY) {
//   context.beginPath();
//   context.rect(centerX, centerY, barWidth, yScale(0) - centerY);
//   context.fillStyle = "rgba(0,0,0,0.25)";
//   context.strokeStyle = "rgba(0,0,0,1)";
//   context.fill();
//   context.stroke();
// }

function generateCirclesHistogram(index = 0) {
  if (index >= votes.length) return;

  const party = votes[index];
  const numberOfVotesOfParty = data.filter((d) => d.party === party)[0].votes;

  //   maxRad = 25 + Math.random() * 25; // between 50 and 100
  maxRad = 30;

  //   minRad = 0.88 * maxRad; // slightly smaller than maxRad
  minRad = 20;

  topLeft = {
    x: xScale(party),
    y: yScale(numberOfVotesOfParty),
  };
  topRight = {
    x: xScale(party) + barWidth,
    y: yScale(numberOfVotesOfParty),
  };
  bottomLeft = {
    x: xScale(party),
    y: yScale(0),
  };
  bottomRight = {
    x: xScale(party) + barWidth,
    y: yScale(0),
  };

  // get random position along x axis between top left and top right
  circleX = topLeft.x + Math.random() * (topRight.x - topLeft.x);
  circleY = topLeft.y + Math.random() * (bottomLeft.y - topLeft.y);

  colorFill = getColor(party, 0.4);
  colorStroke = getColor(party, 0.8);

  phase = Math.random() * Math.PI * 2; // [0, 2*PI] starting angle for drawing points on a circle

  drawCircle(
    circleX,
    circleY,
    minRad,
    maxRad,
    phase,
    colorStroke,
    colorFill,
    context
  );

  requestAnimationFrame(() => generateCirclesHistogram(index + 1));
}

function generateCirclesDistributed(index = 0) {
  if (index >= votes.length) return;

  maxRad = 30;
  minRad = 20;

  circleX = maxRad + Math.random() * (displayWidth - 2 * maxRad);
  circleY = maxRad + Math.random() * (displayHeight - 2 * maxRad);

  const party = votes[index];
  colorFill = getColor(party, 0.5);
  colorStroke = getColor(party, 0.9);

  phase = Math.random() * Math.PI * 2;

  drawCircle(
    circleX,
    circleY,
    minRad,
    maxRad,
    phase,
    colorStroke,
    colorFill,
    context
  );
  requestAnimationFrame(() => generateCirclesDistributed(index + 1));
}

function drawLegend() {
  const legendNote = d3
    .select("#container")
    .append("p")
    .attr("id", "legend-note");
  legendNote.text(`1 Spot = 10.000 Zweitstimmen`);

  const legend = d3.select("#container").append("div").attr("id", "legend");
  const legendItems = legend
    .selectAll(".legend-item")
    .data(data)
    .join("div")
    .attr("class", "legend-item");

  legendItems.append("div").attr("class", "legend-color-container");

  document.querySelectorAll(".legend-color-container").forEach((container) => {
    d3.select(container).append("canvas").attr("width", 20).attr("height", 20);
    const canvasLegend = d3.select(container).select("canvas");
    const contextLegend = canvasLegend.node().getContext("2d");

    drawCircle(
      10,
      10,
      6,
      10,
      Math.random() * Math.PI * 2,
      getColor(container.__data__.party, 0.6),
      getColor(container.__data__.party, 0.6),
      contextLegend
    );
  });

  legendItems
    .append("div")
    .attr("class", "legend-text")
    .text((d) => d.party);
}

// function generateRects() {
//   data.forEach((d) => {
//     drawRect(xScale(d.party), yScale(d.votes));
//   });
// }

// generateRects();
// generateCirclesHistogram();

generateCirclesDistributed();
drawLegend();
