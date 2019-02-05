/** @format */

import React from 'react';

export default class ContingencyTable extends React.Component {
  state = {
    labelHor: 'Age',
    labelVer: 'Income',
    xValues: [1, 2, 3],
    yValues: [2, 3, 4],
    xyValues: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  };

  renderFirstRow() {
    const td = this.state.xValues.map(value => (
      <td className="tdBold">{value}</td>
    ));
    return td;
  }

  renderRest() {
    var row = 0;
    const rows = this.state.yValues.map(yValue => (
      <tr>
        <td className="tdBold">{yValue}</td>
        {this.state.xyValues[row].map(
          arrayDim2 => (
            <td>{arrayDim2}</td>
          ),
          (row += 1)
        )}
      </tr>
    ));

    return rows;
  }

  renderTable() {
    return (
      <table>
        <tr>
          <td className="tdBold">
            {this.state.labelHor}/{this.state.labelVer}
          </td>
          {this.renderFirstRow()}
        </tr>
        {this.renderRest()}
      </table>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}
