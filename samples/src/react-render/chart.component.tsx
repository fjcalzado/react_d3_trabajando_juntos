import * as React from 'react';
import { plotLine } from './chart.business';

const style = require("./chart.style.scss");


interface ChartProps {
  data: number[];
  width?: number;
  height?: number;
}

export class ChartComponent extends React.PureComponent<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    width: 600,
    height: 350,
  }

  public render() {
    return (
      <svg
        className={style.lineChart}
        width={this.props.width}
        height={this.props.height}
      >
        {plotLine(this.props.data, 0, 100, this.props.width, this.props.height)}
      </svg>

    );
  }
}
