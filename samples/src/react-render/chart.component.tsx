import * as React from "react";
import { plotLine, plotDriverName, plotEnd } from "./chart.business";
import { ChartSetup, setup } from "./chart.setup";
import { DriverLapByLap } from "./data";

const style = require("./chart.style.scss");
const styleDefs = require("../../../css/theme/source/fjcalzado-defs.scss");

interface ChartProps {
  data: DriverLapByLap[];
}

export class ChartComponent extends React.PureComponent<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <svg className={style.lineChart} width={setup.width} height={setup.height}>
        {svgEffects()}
        {this.props.data.map((driverLaps: DriverLapByLap, index) => {
          return (
            <g className={style.driver} key={index}>
              {plotDriverName(driverLaps.driver, driverLaps.pos[0])}
              {plotLine(driverLaps.pos)}
              {plotEnd(driverLaps.pos)}
            </g>
          );
        })}
      </svg>
    );
  }
}

const svgEffects = () => (
  <defs>
    <linearGradient
      id="lineGradient"
      gradientUnits="userSpaceOnUse"
      x1="0" y1="0" x2={setup.width - setup.marginLeft - setup.marginRight} y2="0"
    >
      <stop offset="0" stopColor={styleDefs.primaryColor} />
      <stop offset="30%" stopColor={styleDefs.primaryColor} />
      <stop offset="100%" stopColor={styleDefs.secondaryColor} />
    </linearGradient>
  </defs>
);
