import * as React from 'react';
import { createChart, updateChart } from './chart.business';
import { setup } from './chart.setup';
import { Segment } from './tree.generator';

const style = require("./chart.style.scss");


interface ChartProps {
  data: Segment[];
  color: boolean;
}

export class ChartDynamicComponent extends React.PureComponent<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  private rootNodeRef = null;

  private setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  componentDidMount() {
    createChart(this.rootNodeRef, this.props.data, this.props.color);
  }

  componentDidUpdate() {
    updateChart(this.rootNodeRef, this.props.data, this.props.color);
  }

  public render() {
    return (
      <div className={style.container} ref={this.setRef} />
    );
  }
}
