import * as d3 from 'd3';

const style = require("./chart.style.scss");

const width = 600;
const height = 350;
const barSeparation = 0.05;

let svg = null;
let bars = null;
let x = null;
let y = null;

export const createChart = (node, data: number[]) => {
  // Create SVG.
  svg = d3.select(node)
    .append("svg")
      .attr("width", width)
      .attr("height", height);
  const defs = svg.append("defs")

  // Create fill gradient.
  createGradient(defs);

  // Create scales;
  const maxDataValue = d3.max(data, (d, i) => d);

  y = d3.scaleLinear()
    .domain([0, maxDataValue])
    .range([height, 0]);
  x = d3.scaleBand<Number>()
    .domain(data.map((d,i) => i))
    .rangeRound([0, width])
    .paddingInner(barSeparation);

  // Create bars. Enter().
  bars = svg
    .append("g")
      .attr("class", style.bar);

  bars.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d))
      .attr("height", d => height - y(d))
      .attr("width", d => x.bandwidth())
      .attr("fill", "url(#barGradient)")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
}

export const updateChart = (data: number[]) => {
  // Rejoin data and update bars with transition.
  bars.selectAll("rect")
    .data(data).transition()
      .duration(500)
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d))
      .attr("height", d => height - y(d))
      .attr("width", d => x.bandwidth())
      .attr("fill", "url(#barGradient)");
}

function handleMouseOver(d, i) {
  d3.select(this)
}

function handleMouseOut(d, i) {
  d3.select(this)
}

const createGradient = (defs) => {
  const gradient = defs
    .append("linearGradient")
      .attr("id", "barGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0")
      .attr("y1", height)
      .attr("x2", "0")
      .attr("y2", "0");
  gradient
    .append("stop")
      .attr("offset", "0")
      .attr("stop-color", "#00eccc");
  gradient
    .append("stop")
      .attr("offset", "30%")
      .attr("stop-color", "#00eccc");
  gradient
    .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff55f7");
}


