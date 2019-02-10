/** @format */

import React from 'react';
import DataTable from './DataTable';
import styles from './ContigencyInput.module.css';
import ContingencyTable from '../../lib/ContigencyTable';

const MAX_ALLOWED_DATA_POINTS = 30;
const MAX_ALLOWED_SUM = 100;

// TODO: Implement contingency table

export default class ContingencyInput extends React.Component {
  state = {
    currentSum: 0,
  };

  contingencyTable = new ContingencyTable({
    initalRows: 4,
    initalColumns: 4,
  });

  addRow = () => {};

  removeRow = () => {};

  addColumn = () => {};

  removeColumn = () => {};

  render() {
    const currentSum = this.state.currentSum;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>x and y</td>
              {this.contingencyTable.x.map((v, i) => (
                <td key={i}>
                  <input
                    className="tdY"
                    value={v}
                    type="number"
                    onInput={e => console.log(e.target.value)}
                  />
                </td>
              ))}
              <td>Zeilensummen</td>
            </tr>
            <DataTable
              rowTotals={this.contingencyTable.rowTotals}
              rows={this.contingencyTable.rows}
            />
            <tr>
              <td>Spaltensummen</td>
              {this.contingencyTable.columnTotals.map((total, i) => (
                <td key={i}>{total}</td>
              ))}
              <td>{currentSum}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
