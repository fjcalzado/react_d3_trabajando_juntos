import * as React from 'react';
import { ChartComponent } from './chart.component';
import { TableComponent } from './table.component';
import { Country, countries } from "./data";
import { setup } from './chart.setup';
import { cnc } from '../util';

const style = require("./sample.style.scss");


const modes = {
  chart: "Gráfico",
  data: "Datos",
};

interface CountriesState {
  data: Country[];
  mode: string;
}

export class CountriesSample extends React.Component<{}, CountriesState> {
  constructor(props) {
    super(props);

    this.state = {
      data: countries,
      mode: modes.chart,
    }
  }

  private handleToggleMode = (mode) => {
    this.setState({...this.state, mode});
  }

  public render() {
    return (
      <div style={{width: setup.width}}>
        <ToggleBar modes={Object["values"](modes)} active={this.state.mode} onChange={this.handleToggleMode} />
        {this.state.mode === modes.chart ?
          <ChartComponent data={this.state.data}/> :
          <TableComponent data={this.state.data}/>
        }
      </div>
    );
  }
}


const ToggleBar = ({modes, active, onChange}) => (
  <div className={style.toggleBar}>
    {modes.map((m, i) => (
      <div className={cnc(style.toggle, (active === m) && style.active)}
        key={i} onClick={() => onChange(m)}>
        {m}
      </div>
    ))}
  </div>
);


