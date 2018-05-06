import * as d3 from 'd3';

const style = require("./chart.style.scss");
const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


const width = 600;
const height = 350;
const barSeparation = 0.05;

let svg = null;
let bars = null;
let x = null;
let y = null;
let trDelay = null;

export const createChart = (node, data: number[], transitionDelays = 500) => {
  // Create SVG.
  svg = d3.select(node)
    .append("svg")
      .attr("width", width)
      .attr("height", height);
  const defs = svg.append("defs")

  // Create effects definitions.
  trDelay = transitionDelays;
  createGradient(defs);
  createShadow(defs);

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
      .duration(trDelay)
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d))
      .attr("height", d => height - y(d))
      .attr("width", d => x.bandwidth())
      .attr("fill", "url(#barGradient)");
}

function handleMouseOver(d, i) {
  d3.select(this).transition()
    .attr("fill", styleDefs.selectionColor)
    .attr("stroke", styleDefs.secondaryColor)
    .duration(trDelay/4);
}

function handleMouseOut(d, i) {
  d3.select(this).transition()
    .attr("fill", "url(#barGradient)")
    .attr("stroke", undefined)
    .duration(trDelay/4);
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
      .attr("stop-color", styleDefs.primaryColor);
  gradient
    .append("stop")
      .attr("offset", "30%")
      .attr("stop-color", styleDefs.primaryColor);
  gradient
    .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", styleDefs.secondaryColor);
}

const createShadow = (defs) => {
  // const filter = defs
  //   .append("filter")
  //     .attr("id", "barShadow")
  //     .attr("filterUnits", "userSpaceOnUse")
  //     .attr("x", -50)
  //     .attr("y", -50)
  //     .attr("width", width + 50)
  //     .attr("height", height + 50)
  // filter.append("feGaussianBlur")
  //   .attr("in", "SourceAlpha")
  //   .attr("result", "blurOut")
  //   .attr("stdDeviation", 10);
  // filter.append("feOffset")
  //   .attr("in", "blurOut")
  //   .attr("result", "dropBlur")
  //   .attr("dx", 0)
  //   .attr("dy", 0);
  // filter.append("feComposite")
  //   .attr("operator", "over")
  //   .attr("in", "SourceGraphic")
  //   .attr("in2", "dropBlur")
  //   .attr("result", "final");
}
