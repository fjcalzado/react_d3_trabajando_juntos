import * as React from "react";
import { ChartDynamicComponent } from "./chart-dynamic.component";
import { ChartFauxComponent } from "./chart-fauxdom.component";
import { generateTree, Segment } from "./tree.generator";
import { setup } from "./chart.setup";

const style = require("./sample.style.scss");


interface FauxDomProps {
}

interface FauxDomState {
  data: Segment[];
  color: boolean;
  fauxDOM: boolean;
  dynamicTimerId: number;
}

export class FauxDomSample extends React.Component<FauxDomProps, FauxDomState> {
  constructor(props) {
    super(props);

    this.state = {
      data: generateTree(),
      color: false,
      fauxDOM: true,
      dynamicTimerId: null,
    }
  }

  private updateData = () => {
    this.setState({
      ...this.state,
      data: generateTree(),
    });
  }

  private startDynamicData() {
    this.setState({
      ...this.state,
      dynamicTimerId: window.setInterval(this.updateData, setup.dynamicInterval),
    });
  }

  private stopDynamicData() {
    window.clearInterval(this.state.dynamicTimerId);
    this.setState({
      ...this.state,
      dynamicTimerId: null,
    });
  }

  private handleToggleColor = () => {
    this.setState({
      ...this.state,
      color: !this.state.color,
    });
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

  private handleToggleAutoRefresh = (e) => {
    Boolean(e.target.checked) ? this.startDynamicData() : this.stopDynamicData();
  }

  public render() {
    return (
      <>
        <div className={style.controlArea} >
          <button className={style.control} onClick={this.handleToggleFauxDOM}>
            {`FauxDOM ${this.state.fauxDOM ? "ON" : "OFF"}`}
          </button>
          <button className={style.control} onClick={this.handleRefreshData}>Refresh</button>
          <label htmlFor="autoRefreshId">
            <input
              id="autoRefreshId"
              type="checkbox"
              checked={Boolean(this.state.dynamicTimerId)}
              onChange={this.handleToggleAutoRefresh}
            />
            Auto
          </label>
          <button className={style.control} onClick={this.handleToggleColor}>Toggle Color</button>
        </div>
        { this.state.fauxDOM ?
          <ChartFauxComponent data={this.state.data} color={this.state.color}/> :
          <ChartDynamicComponent data={this.state.data} color={this.state.color}/>
        }

      </>
    );
  }
}
