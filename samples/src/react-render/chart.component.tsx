import * as React from 'react';
import { plotLine } from './chart.business';
import { ChartSetup, defaultChartSetup } from './chart.setup';

const style = require("./chart.style.scss");


interface ChartProps {
  data: number[];
}

interface ChartState {
  setup: ChartSetup;
}

export class ChartComponent extends React.PureComponent<ChartProps, ChartState> {
  constructor(props) {
    super(props);

    this.state = {
      setup: defaultChartSetup,
    }
  }

  public render() {
    return (
      <svg
        className={style.lineChart}
        width={this.state.setup.width}
        height={this.state.setup.height}
      >
        {plotLine(this.state.setup, this.props.data)}
      </svg>

    );
  }
}
