import * as React from 'react';
import { ChartSetup, setup } from './chart.setup';
import { treeSetup } from "./tree.setup";
import { Segment } from './tree.generator';
import { select } from "d3-selection";
import { scaleLinear, scalePow } from "d3-scale";
import { line } from "d3-shape";
import { interpolateHcl } from "d3-interpolate";
import 'd3-transition';
const d3 = { select, scaleLinear, scalePow, line, interpolateHcl };

const style = require("./chart.style.scss");
const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


// Module global variables.
let svg = null;
let tree = null;
let thickScale = null;
let opacityScale = null;
let colorScale = null;
let segmentGenerator = null;

export const createChart = (node: Element, data: Segment[], color: boolean) => {
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
  colorScale = d3.scaleLinear<string>()
    .domain([0, treeSetup.totalLevels])
    .range([styleDefs.primaryColor as string, styleDefs.secondaryColor as string])
    .interpolate(d3.interpolateHcl);

  segmentGenerator = d3.line()
    .x(point => point["0"])
    .y(point => point["1"]);

  // Create segments.
  tree.selectAll("path")
    .data(data).enter()
    .append("path")
      .attr("fill", "none")
      .attr("stroke", d => color ? colorScale(d.level) : setup.noColor)
      .attr("stroke-width", d => thickScale(d.level))
      //.attr("opacity", d => opacityScale(d.level))
      .attr("d", d => segmentGenerator(d.points as [number,number][]) );
}

export const updateChart = (node: Element, data: Segment[], color: boolean) => {
  // Rejoin data and update elements.
  d3.select(node).select("svg").select("g[class=tree]")
    .selectAll("path")
    .data(data).transition()
      .duration(setup.transitionDelay)
      .attr("stroke", d => color ? colorScale(d.level) : setup.noColor)
      .attr("stroke-width", d => thickScale(d.level) )
      //.attr("opacity", d => opacityScale(d.level))
      .attr("d", d => segmentGenerator(d.points as [number,number][]) );
}
