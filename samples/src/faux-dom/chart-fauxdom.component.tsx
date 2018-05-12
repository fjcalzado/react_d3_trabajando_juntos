import * as React from 'react';
import { createChart, updateChart } from './chart.business';
import { setup } from './chart.setup';
import { Segment } from './tree.generator';
import { withFauxDOM, ReactFauxDomProps, createElement } from 'react-faux-dom'

const style = require("./chart.style.scss");


interface ChartProps extends ReactFauxDomProps {
  data: Segment[];
  color: boolean;
}

class InnerChartFauxComponent extends React.Component<ChartProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Provide a faux DOM.
    const fauxDom = this.props.connectFauxDOM("div", "chart");
    createChart(fauxDom, this.props.data, this.props.color);
  }

  componentDidUpdate(prevProps) {
    // Intentionally check condition to call D3. FauxDOM HOC will
    // fire updates through property "chart" changes, but those should
    // be filtered.
    if (prevProps.data !== this.props.data || prevProps.color !== this.props.color) {
      // Reatach to faux DOM.
      const fauxDom = this.props.connectFauxDOM("div", "chart");
      updateChart(fauxDom, this.props.data, this.props.color);
      this.props.animateFauxDOM(setup.transitionDelay * 1.25);
    }
  }

  public render() {
    return (
      <div className={style.container}>
        {this.props["chart"]}
      </div>
    );
  }
}

export const ChartFauxComponent = withFauxDOM(InnerChartFauxComponent);
