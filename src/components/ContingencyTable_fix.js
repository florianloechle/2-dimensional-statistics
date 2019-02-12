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
    const td = this.state.xValues.map(value => <th>{value}</th>);
    return td;
  }

  renderRest() {
    var row = 0;
    const rows = this.state.yValues.map(yValue => (
      <tr>
        <th scope="row">{yValue}</th>
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
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              {this.state.labelHor}/{this.state.labelVer}
            </th>
            {this.renderFirstRow()}
          </tr>
        </thead>
        <tbody>{this.renderRest()}</tbody>
      </table>
    );
  }

  render() {
    return <div className="centerTable">{this.renderTable()}</div>;
  }
}
