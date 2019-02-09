/** @format */

import React from 'react';

export default class DotSequency extends React.Component {
  state = {
    yValues: ['1,1', '2,2', '3,3'],
  };

  renderInput() {
    return (
      <div className="input-group">
        <input type="number" className="form-control" />
        <input type="number" className="form-control" />
        <div className="input-group-append">
          <span className="input-group-text">Punkt</span>
        </div>
      </div>
    );
  }

  renderTable() {
    return (
      <table className="table table-hover">
        <thead>
          <tr className="text-center">
            <th scope="col">
              <button type="button" className="btn btn-danger">
                Löschen
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{this.renderRow()}</tbody>
      </table>
    );
  }

  renderRow() {
    var row = 0;
    const rows = this.state.yValues.map(yValue => (
      <tr className="text-center">
        <th scope="row">{yValue}</th>
      </tr>
    ));

    return rows;
  }

  renderBox() {
    return (
      <div className="row">
        <div className="col-6">{this.renderInput()}</div>
        <div className="col-6">{this.renderTable()}</div>
        <div className="rightBottomDiv">
          <button type="button" class="btn btn-outline-primary">
            Weiter
          </button>
        </div>
      </div>
    );
  }

  render() {
    return <div className="centerTable">{this.renderBox()}</div>;
  }
}
