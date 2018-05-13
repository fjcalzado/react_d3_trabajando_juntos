import * as React from 'react';
import { ChartSetup, setup } from './chart.setup';
import { DriverLapByLap } from './data';
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
const d3 = { scaleLinear, line };

const style = require("./chart.style.scss");
const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");


const xScale = d3.scaleLinear()
  .domain([0, setup.numSamples - 1])
  .rangeRound([setup.marginLeft, setup.width - setup.marginRight]);

const yScale = d3.scaleLinear()
  .domain([setup.dataRangeMin, setup.dataRangeMax])
  .rangeRound([setup.marginTopDown, setup.height - setup.marginTopDown]);

const lineGenerator = d3.line<number>()
  .x((d, i) => xScale(i))
  .y(d => yScale(d));


export const plotDriverName = (name: string, startPosition: number) => (
  <text
    className={style.name}
    x={0}
    y={yScale(startPosition)}
  >
    {`${startPosition} ${name}`}
  </text>
);

export const plotLine = (lineData: number[]) => (
  <path
    className={style.line}
    d={lineGenerator(lineData)}
  />
);

export const plotEnd = (lineData: number[]) => {
  const lastLap = lineData.length - 1;
  const driverPos = lineData[lastLap];
  const didFinish = Boolean(lastLap === setup.numSamples - 1);
  const xPos = xScale(lastLap);
  const yPos = yScale(driverPos);
  const radius = (setup.height - (2 * setup.marginTopDown)) / (setup.dataRangeMax - setup.dataRangeMin) / 2;

  return (
    <>
      <circle className={style.end}
        r={radius} cx={xPos} cy={yPos}
        fill={didFinish ? styleDefs.secondaryColor : "black"}
      />
      <text className={style.endText} x={xPos} y={yPos}>
        {didFinish ? driverPos : lastLap}
      </text>
    </>
  );
}
