// set vis type to choose how voting spots are displayed
const VIS_TYPE = "distributed"; // 'distributed' or 'histogram'

async function run() {
  // create canvas and set dimensions
  setupCanvas();

  // load and prepare data
  const data = await loadData();

  // draw legend
  drawLegend(data);

  if (VIS_TYPE === "distributed") {
    // draw circles distributed
    drawCirclesDistributed(data, 0);
  } else if (VIS_TYPE === "histogram") {
    defineScales(data);
    // drawHistogramRects(data); // for testing, hide in final outpur
    drawCirclesHistogram(data, 0);
  } else {
    console.error("Unknown VIS_TYPE: ", VIS_TYPE);
  }
}
run();
