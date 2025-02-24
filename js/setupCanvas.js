let context, displayWidth, displayHeight, container;
const MARGIN = { top: 35, right: 35, bottom: 35, left: 35 };

function setupCanvas() {
  // select container div
  container = d3.select("#container");
  const containerNode = container.node();

  // create canvas element
  const canvas = container
    .append("canvas")
    .style("max-width", "100%")
    .style("width", "100%");

  // get device pixel ratio and scale canvas accordingly
  const devicePixelRatio = window.devicePixelRatio || 1;
  context = canvas.node().getContext("2d");
  context.scale(devicePixelRatio, devicePixelRatio);

  // set canvas dimensions
  const width = containerNode.offsetWidth;
  const height = window.innerHeight * 0.85; // set height to 85% of the window height to make vis nearly full screen while accounting for the legend

  canvas
    .attr("width", width * devicePixelRatio)
    .attr("height", height * devicePixelRatio);

  // get width and height of canvas in display pixels
  displayWidth = canvas.node().width / devicePixelRatio;
  displayHeight = canvas.node().height / devicePixelRatio;
}
