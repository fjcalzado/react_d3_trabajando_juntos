import * as React from 'react';
import { plotLine } from './chart.business';
import { ChartSetup, setup } from './chart.setup';

const style = require("./chart.style.scss");


interface ChartProps {
  data: number[];
}

export class ChartComponent extends React.PureComponent<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <svg
        className={style.lineChart}
        width={setup.width}
        height={setup.height}
      >
        {plotLine(this.props.data)}
      </svg>

    );
  }
}
