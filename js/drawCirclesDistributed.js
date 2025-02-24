function drawCirclesDistributed(data, index = 0) {
  if (index >= data.votes.length) return;

  maxRad = 30;
  minRad = 20;

  circleX = maxRad + Math.random() * (displayWidth - 2 * maxRad);
  circleY = maxRad + Math.random() * (displayHeight - 2 * maxRad);

  const party = data.votes[index];
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
  requestAnimationFrame(() => drawCirclesDistributed(data, index + 1));
}
