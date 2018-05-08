import * as React from 'react';
import { ChartComponent } from './chart.component';
import { getRandomArray } from '../util';


interface ReactRenderProps {
}

interface ReactRenderState {
  data: number[];
}

export class ReactRenderComponent extends React.Component<ReactRenderProps, ReactRenderState> {
  constructor(props) {
    super(props);

    this.state = {
      data: getRandomArray(50, 0, 100)(),
    }
  }

  public render() {
    return (
      <ChartComponent data={this.state.data}/>
    );
  }
}
