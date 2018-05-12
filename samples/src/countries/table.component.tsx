import * as React from 'react';
import { Country, countries } from "./data";
import { setup } from './chart.setup';

const style = require("./table.style.scss");

interface TableProps {
  data: Country[];
}

export class TableComponent extends React.PureComponent<TableProps, {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={style.tableScroll} style={{width: setup.width, height: setup.height}}>
        <table className={style.dataTable}>
          <tbody>
            <tr>
              <th>País</th>
              <th>Hab.</th>
              <th>Continente</th>
              <th>Esp. de Vida</th>
              <th>Poder Adq.</th>
            </tr>
            {this.props.data.map((c, i) =>
              <tr key={i}>
                <td>{c.country}</td>
                <td>{c.population}</td>
                <td>{c.continent}</td>
                <td>{c.lifeExpectancy}</td>
                <td>{c.purchasingPower}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
