import * as React from 'react';
import * as d3 from 'd3';
import { ChartSetup, setup } from './chart.setup';
import { treeSetup } from "./tree.setup";
import { Segment } from './tree.generator';

const style = require("./chart.style.scss");
const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");



// Module global variables.
let svg = null;
let tree = null;
let thickScale = null;
let opacityScale = null;
let segmentGenerator = null;

export const createChart = (node, data: Segment[]) => {
  // Create SVG.
  svg = d3.select(node)
    .append("svg")
      .attr("width", setup.width)
      .attr("height", setup.height);
  const defs = svg.append("defs");

  tree = svg
    .append("g")
      .attr("class", "tree")
      .attr("transform", `translate(${setup.width / 2} ${setup.height})`);

  // Create scales and generators.
  thickScale = d3.scaleLinear()
    .domain([0, treeSetup.totalLevels])
    .range([treeSetup.maxThick, treeSetup.minThick]);
  opacityScale = d3.scalePow().exponent(2)
    .domain([0, treeSetup.totalLevels])
    .range([1, 0.5]);

  segmentGenerator = d3.line()
    .x(point => point["0"])
    .y(point => point["1"]);

  // Create segments.
  const segments = tree.selectAll("path")
    .data(data).enter()
    .append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", (d: Segment) => thickScale(d.level))
      //.attr("opacity", (d: Segment) => opacityScale(d.level))
      .attr("d", (d: Segment) => segmentGenerator(d.points as [number,number][]) );
}

export const updateChart = (data: Segment[]) => {
  // Rejoin data and update bars with transition.
  tree.selectAll("path")
    .data(data).transition()
      .duration(setup.transitionDelay)
      .attr("stroke-width", (d: Segment) => thickScale(d.level) )
      //.attr("opacity", (d: Segment) => opacityScale(d.level))
      .attr("d", (d: Segment) => segmentGenerator(d.points as [number,number][]) );
}
