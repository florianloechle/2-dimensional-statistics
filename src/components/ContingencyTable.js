/** @format */

import React from 'react';

export default class ContingencyTable extends React.Component {
  state = {
    labelHor: 'Age',
    labelVer: 'Income',
    xThead: [1, 2, 3],
    yTHead: [2, 3, 4],
    values: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
  };

  addHorizontal() {
    this.setState(state => {
      const xThead = state.xThead;
      const newXY = this.state.values.map(a => [...a, 0]);

      return {
        xThead: [...xThead, 0],
        values: newXY,
      };
    });
  }

  addVertical() {
    this.setState(state => {
      return {
        yTHead: [...state.yTHead, 0],
        values: [...state.values, new Array(state.xThead.length).fill(0)],
      };
    });
  }

  changeVal(event, index) {
    console.log(event);
    this.setState(state => {
      const newX = state.xThead;
      newX[index] = event.target.value;

      return {
        xThead: newX,
      };
    });
  }

  renderFirstRow() {
    const td = this.state.xThead.map((value, i) => (
      <th key={i} className="tdBold">
        <input
          onChange={e => this.changeVal(e, i)}
          type="number"
          value={value}
        />
      </th>
    ));
    return td;
  }

  renderRest() {
    const rows = this.state.yTHead.map((yTHead, index) => (
      <tr key={index}>
        <td className="tdBold">
          <input type="number" />
        </td>
        {this.state.values[index].map((arrayDim2, i) => (
          <td key={i}>
            <input type="number" />
          </td>
        ))}
      </tr>
    ));

    return rows;
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td className="tdBold">
                {this.state.labelHor} / {this.state.labelVer}
              </td>
              {this.renderFirstRow()}
              <td className="buttonAdd" onClick={this.addHorizontal.bind(this)}>
                +
              </td>
            </tr>
            {this.renderRest()}
            <tr>
              <td className="buttonAdd" onClick={this.addVertical.bind(this)}>
                +
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
