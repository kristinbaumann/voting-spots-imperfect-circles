// Initialize the scales
const xScale = d3.scaleBand();
const yScale = d3.scaleLinear();

const defineScales = (data) => {
  // Scale for the horizontal axis (in case of histogram style)
  xScale
    .domain(data.results.map((d) => d.party))
    .range([MARGIN.left, displayWidth - MARGIN.right]);

  // Scale for the vertical axis (in case of histogram style)
  yScale
    .domain([0, d3.max(data.results.map((d) => d.votes))])
    .range([displayHeight - MARGIN.top, MARGIN.bottom]);
};

// Find party color with  opacity
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
