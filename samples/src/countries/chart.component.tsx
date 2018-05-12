import * as React from 'react';
import { createChart } from './chart.business';
import { Country } from './data';

const style = require("./chart.style.scss");


interface ChartProps {
  data: Country[];
}

export class ChartComponent extends React.Component<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  private rootNodeRef = null;

  private setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  componentDidMount() {
    createChart(this.rootNodeRef, this.props.data);
  }

  shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div className={style.container} ref={this.setRef} />
    );
  }
}
