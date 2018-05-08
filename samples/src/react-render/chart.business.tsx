import * as React from 'react';
import * as d3 from 'd3';

const style = require("./chart.style.scss");
//const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


export const plotLine = (lineData: number[], dataMin: number, dataMax: number, width: number, height: number) => {
  const xScale = d3.scaleLinear()
    .domain([0, lineData.length])
    .rangeRound([0, width]);

  const yScale = d3.scaleLinear()
    .domain([dataMin, dataMax])
    .rangeRound([0, height]);

  const lineGenerator = d3.line()
    .x(d => xScale(d["0"]))
    .y(d => yScale(d["1"]));

  const lineCoordinates = lineData.map((value, index) => ([index, value]));

  return (
    <path
      className={style.line}
      d={lineGenerator(lineCoordinates as [number, number][])}
    />
  );
}
