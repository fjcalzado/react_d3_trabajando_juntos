import * as React from 'react';
import * as d3 from 'd3';
import { ChartSetup, setup } from './chart.setup';

const style = require("./chart.style.scss");
//const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


export const plotLine = (lineData: number[]) => {
  const xScale = d3.scaleLinear()
    .domain([0, setup.numSamples - 1])
    .rangeRound([0, setup.width]);

  const yScale = d3.scaleLinear()
    .domain([setup.dataRangeMin, setup.dataRangeMax])
    .rangeRound([0, setup.height]);

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
