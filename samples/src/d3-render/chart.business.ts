import { ChartSetup, setup } from './chart.setup';
import { select } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import 'd3-transition';
const d3 = { select, scaleLinear, scaleBand };

const style = require("./chart.style.scss");
const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


export const CreateChartAPI = () => {
  // Closure variables.
  let svg = null;
  let bars = null;
  let x = null;
  let y = null;

  const createChart = (node, data: number[]) => {
    // Create SVG.
    svg = d3.select(node)
      .append("svg")
        .attr("width", setup.width)
        .attr("height", setup.height);

    // Create effects definitions.
    const defs = svg.append("defs");
    createGradient(defs);

    y = d3.scaleLinear()
      .domain([setup.dataRangeMin, setup.dataRangeMax])
      .range([setup.height, 0]);
    x = d3.scaleBand<Number>()
      .domain(data.map((d,i) => i))
      .rangeRound([0, setup.width])
      .paddingInner(setup.barSeparation);

    // Create bars. Enter().
    bars = svg
      .append("g")
        .attr("class", style.bar);

    bars.selectAll("rect")
      .data(data)
      .enter().append("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d))
        .attr("height", d => setup.height - y(d))
        .attr("width", d => x.bandwidth())
        .attr("fill", "url(#barGradient)")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);
  }

  const updateChart = (data: number[]) => {
    // Rejoin data and update bars with transition.
    bars.selectAll("rect")
      .data(data).transition()
        .duration(setup.transitionDelay)
        .attr("y", d => y(d))
        .attr("height", d => setup.height - y(d));
  }

  return {
    createChart,
    updateChart,
  }
}

function handleMouseOver(d, i) {
  d3.select(this).transition()
    .attr("fill", styleDefs.contrastColor)
    .attr("stroke", styleDefs.secondaryColor)
    .duration(setup.transitionDelay/4);
}

function handleMouseOut(d, i) {
  d3.select(this).transition()
    .attr("fill", "url(#barGradient)")
    .attr("stroke", undefined)
    .duration(setup.transitionDelay/4);
}

const createGradient = (defs) => {
  const gradient = defs
    .append("linearGradient")
      .attr("id", "barGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", "0")
      .attr("y1", setup.height)
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
