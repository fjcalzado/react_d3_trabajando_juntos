import * as React from 'react';
import { ChartComponent } from './chart.component';
import { getRandomArray } from '../util';
import { DriverLapByLap, nurburgring2006 } from './data';


interface ReactRenderProps {
}

interface ReactRenderState {
  data: DriverLapByLap[];
}

export class ReactRenderSample extends React.Component<ReactRenderProps, ReactRenderState> {
  constructor(props) {
    super(props);

    this.state = {
      data: nurburgring2006,
    }
  }

  public render() {
    return (
      <ChartComponent data={this.state.data}/>
    );
  }
}


