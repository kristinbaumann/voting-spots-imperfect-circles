function drawLegend(data) {
  // create legend div
  const legend = container.append("div").attr("id", "legend");

  // add note to legend about how many votes make up one spot
  legend
    .append("p")
    .attr("id", "legend-note")
    .text(`1 Spot = 10.000 Zweitstimmen`);

  // create legend party items
  const legendItems = legend
    .append("div")
    .attr("class", "legend-items")
    .selectAll(".legend-item")
    .data(data.results)
    .join("div")
    .attr("class", "legend-item");

  legendItems.append("div").attr("class", "legend-spot-container");

  // create mini canvas for each legend item
  document
    .querySelectorAll(".legend-spot-container")
    .forEach((spotContainer) => {
      d3.select(spotContainer)
        .append("canvas")
        .attr("width", 20)
        .attr("height", 20);
      const canvasLegend = d3.select(spotContainer).select("canvas");
      const contextLegend = canvasLegend.node().getContext("2d");

      drawCircle(
        10,
        10,
        6,
        10,
        Math.random() * Math.PI * 2,
        getColor(spotContainer.__data__.party, 0.6),
        getColor(spotContainer.__data__.party, 0.6),
        contextLegend
      );
    });

  legendItems
    .append("div")
    .attr("class", "legend-text")
    .text((d) => d.party);
}
