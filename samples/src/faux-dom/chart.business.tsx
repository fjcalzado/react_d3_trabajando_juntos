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
  const dataMock = [
    {a: 0, r: 0},
    {a: Math.PI * 0.25, r: 80},
    {a: Math.PI * 0.50, r: 80},
    {a: Math.PI * 0.75, r: 80},
    {a: Math.PI * 1, r: 80},
    {a: Math.PI * 1.25, r: 80},
    //{a: Math.PI * 1.50, r: 80},
    //{a: Math.PI * 1.75, r: 80},
    //{a: Math.PI * 2, r: 80}
  ];

  const lineRadial = d3.lineRadial()
    .radius(d => d["r"])
    .angle(d => d["a"]);

  svg
    .append("g")
      .attr("class", "lines")
      .attr("transform", `translate(${setup.width / 2} ${setup.height/2})`)
    .append("path")
      .datum(dataMock)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("d", lineRadial);
}
