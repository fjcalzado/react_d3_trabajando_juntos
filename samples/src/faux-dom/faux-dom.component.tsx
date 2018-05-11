import * as React from 'react';
import { ChartComponent } from './chart.component';
import { generateTree, Segment } from './tree.generator';


interface FauxDomProps {
  dynamic: boolean;
  interval?: number;
}

interface FauxDomState {
  data: Segment[];
}

export class FauxDomComponent extends React.Component<FauxDomProps, FauxDomState> {
  constructor(props) {
    super(props);

    this.state = {
      data: generateTree(),
    }
  }

  private updateData = () => {
    this.setState({
      ...this.state,
      data: generateTree(),
    });
  }

  private startDynamicData() {
    setInterval(this.updateData, this.props.interval || 1000);
  }

  private handleRefreshData = () => {
    this.updateData();
  }

  public componentDidMount() {
    if (this.props.dynamic) this.startDynamicData();
  }

  public render() {
    return (
      <>
        <button onClick={this.handleRefreshData}>Refresh</button>
        <ChartComponent data={this.state.data}/>
      </>
    );
  }
}
