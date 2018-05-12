import * as React from "react";
import { ChartDynamicComponent } from "./chart-dynamic.component";
import { ChartFauxComponent } from "./chart-fauxdom.component";
import { generateTree, Segment } from "./tree.generator";

const style = require("./sample.style.scss");


interface FauxDomProps {
  dynamic: boolean;
  interval?: number;
}

interface FauxDomState {
  data: Segment[];
  fauxDOM: boolean;
}

export class FauxDomSample extends React.Component<FauxDomProps, FauxDomState> {
  constructor(props) {
    super(props);

    this.state = {
      data: generateTree(),
      fauxDOM: true,
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

  private handleToggleFauxDOM = () => {
    this.setState({
      ...this.state,
      fauxDOM: !this.state.fauxDOM,
    });
  }

  public componentDidMount() {
    if (this.props.dynamic) this.startDynamicData();
  }

  public render() {
    return (
      <>
        <div className={style.controlArea} >
          <button onClick={this.handleToggleFauxDOM}>
            {`FauxDOM ${this.state.fauxDOM ? "ON" : "OFF"}`}
          </button>
          <button onClick={this.handleRefreshData}>Refresh</button>
        </div>
        { this.state.fauxDOM ?
          <ChartFauxComponent data={this.state.data}/> :
          <ChartDynamicComponent data={this.state.data}/>
        }

      </>
    );
  }
}
