import * as React from 'react';
import * as d3 from 'd3';
import { ChartSetup } from './chart.setup';

const style = require("./chart.style.scss");
//const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


// Module global variables.
let setup = null;
let svg = null;
let trDelay = null;

export const createChart = (chartSetup: ChartSetup, node, data: number[]) => {
  setup = chartSetup;

  // Create SVG.
  svg = d3.select(node)
    .append("svg")
      .attr("width", setup.width)
      .attr("height", setup.height);
  const defs = svg.append("defs")

  // Mock data for test.
  svg.append("circle")
    .attr("cx", 300)
    .attr("cy", 150)
    .attr("r", 100);
}
