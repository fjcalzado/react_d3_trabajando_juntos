import * as React from 'react';
import { ChartStaticComponent } from './chart-static.component';
import { ChartDynamicComponent } from './chart-dynamic.component';


const getRandomArray = (n, min, max) => () => {
  return Array.from({length: n}, () => Math.random() * (max - min) + min);
}

interface D3RenderProps {
  dynamic: boolean;
  numBars?: number;
  interval?: number;
}

interface D3RenderState {
  data: number[];
  randomGenerator: () => number[];
}

export class D3RenderComponent extends React.Component<D3RenderProps, D3RenderState> {
  constructor(props) {
    super(props);

    const randomGenerator = getRandomArray(this.props.numBars || 20, 0, 10);
    this.state = {
      data: randomGenerator(),
      randomGenerator,
    }
  }

  private startDynamicData() {
    setInterval(() => {
      this.setState ({
        ...this.state,
        data: this.state.randomGenerator(),
      });
    }, this.props.interval || 1000);
  }

  public componentDidMount() {
    if (this.props.dynamic) this.startDynamicData();
  }

  public render() {
    return (
      this.props.dynamic ?
        <ChartDynamicComponent data={this.state.data}/> :
        <ChartStaticComponent data={this.state.data}/>
    );
  }
}
