function drawCirclesHistogram(data, index = 0) {
  if (index >= data.votes.length) return;

  const party = data.votes[index];
  const numberOfVotesOfParty = data.results.filter((d) => d.party === party)[0]
    .votes;

  maxRad = 30;
  minRad = 20;

  topLeft = {
    x: xScale(party),
    y: yScale(numberOfVotesOfParty),
  };
  topRight = {
    x: xScale(party) + xScale.bandwidth(),
    y: yScale(numberOfVotesOfParty),
  };
  bottomLeft = {
    x: xScale(party),
    y: yScale(0),
  };
  bottomRight = {
    x: xScale(party) + xScale.bandwidth(),
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

  requestAnimationFrame(() => drawCirclesHistogram(data, index + 1));
}

// function to draw the histogram in background of circles - just for testing the positioning
function drawHistogramRects(data) {
  data.results.forEach((d) => {
    context.beginPath();
    context.rect(
      xScale(d.party),
      yScale(d.votes),
      xScale.bandwidth(),
      yScale(0) - yScale(d.votes)
    );
    context.fillStyle = getColor(d.party, 0.4);
    context.strokeStyle = "rgba(0,0,0,1)";
    context.fill();
    context.stroke();
  });
}
