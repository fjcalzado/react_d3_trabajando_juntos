import * as React from 'react';
import { CreateChartAPI } from './chart.business';
const chartAPI = CreateChartAPI();

const style = require("./chart.style.scss");


interface ChartProps {
  data: number[];
}

export class ChartStaticComponent extends React.Component<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  private rootNodeRef = null;

  private setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  public componentDidMount() {
    chartAPI.createChart(this.rootNodeRef, this.props.data);
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div className={style.container} ref={this.setRef} />
    );
  }
}
