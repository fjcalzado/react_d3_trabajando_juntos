import * as React from 'react';
import { ChartComponent } from './chart.component';


interface FauxDomProps {
}

interface FauxDomState {
  data: number[];
}

export class FauxDomComponent extends React.Component<FauxDomProps, FauxDomState> {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  public render() {
    return (
      <ChartComponent data={this.state.data}/>
    );
  }
}
