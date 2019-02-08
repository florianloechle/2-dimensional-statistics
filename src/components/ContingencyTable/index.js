/** @format */

import React from 'react';

const MAX_ALLOWED_DATA_POINTS = 30;
const MAX_ALLOWED_SUM = 100;

export default class ContingencyTable extends React.Component {
  state = {
    xThead: [0, 0],
    yThead: [0, 0],
    rows: [[0, 0], [0, 0]],
  };

  addHorizontal() {
    this.setState(state => {
      const xThead = state.xThead;
      const newXY = this.state.rows.map(a => [...a, 0]);

      return {
        xThead: [...xThead, this.state.xThead.length + 1],
        rows: newXY,
      };
    });
  }

  addVertical() {
    this.setState(state => {
      return {
        yThead: [...state.yThead, this.state.yThead.length + 1],
        rows: [...state.rows, new Array(state.xThead.length).fill(0)],
      };
    });
  }

  checkForUniqueLimit(newrows) {
    var count = 0;
    for (var yPos = 0; yPos < newrows.length; yPos++) {
      for (var xPos = 0; xPos < newrows[yPos].length; xPos++) {
        if (newrows[yPos][xPos] > 0) {
          count += 1;
        }
      }
    }

    if (count <= 30) {
      return true;
    } else {
      alert('Only 30 unique points allowed!');
      return false;
    }
  }

  handleChangeX(index, event) {
    const newX = this.state.xThead;
    newX[index] = Number(event.target.value);
    this.setState({ xThead: newX });
  }

  handleChangeY(index, event) {
    const newY = this.state.yThead;
    newY[index] = Number(event.target.value);
    this.setState({ yThead: newY });
  }

  handleChangeXY(index1, index2, event) {
    const oldValue = this.state.rows[index1][index2];
    // JSON parse to make a copy of the object instead of a reference
    const newrows = JSON.parse(JSON.stringify(this.state.rows));

    console.log(typeof event.target.value);
    // leading zeros will be removed
    const newValue = Number(parseInt(event.target.value), 10);

    // datatype integer is being forced, value must be >= 0 and new total sum <= 100
    if (
      Number.isInteger(newValue) === true &&
      newValue >= 0 &&
      this.calcSum() + (newValue - oldValue) <= 100
    ) {
      newrows[index1][index2] = newValue;
    } else if (event.target.value === '') {
      // if value is an empty string, then set to 0
      newrows[index1][index2] = 0;
    }

    // max allowed unique points: 30
    if (this.checkForUniqueLimit(newrows) === true) {
      this.setState({ rows: newrows });
      console.log(newrows);
    }
  }

  calcHorSum(index) {
    var sum = 0;
    for (var yPos = 0; yPos < this.state.rows.length; yPos++) {
      for (var xPos = 0; xPos < this.state.rows[yPos].length; xPos++) {
        if (index === yPos) {
          sum += this.state.rows[yPos][xPos];
        }
      }
    }
    return sum;
  }

  calcSum() {
    var sum = 0;
    for (var yPos = 0; yPos < this.state.rows.length; yPos++) {
      for (var xPos = 0; xPos < this.state.rows[yPos].length; xPos++) {
        sum += this.state.rows[yPos][xPos];
      }
    }

    return sum;
  }

  renderFirstRow() {
    const td = this.state.xThead.map((value, i) => (
      <th key={i}>
        <input
          className="tdX"
          type="number"
          value={value}
          onInput={this.handleChangeX.bind(this, i)}
        />
      </th>
    ));
    return td;
  }

  renderRest() {
    const rows = this.state.yThead.map((yThead, i) => (
      <tr key={i}>
        <td>
          <input
            className="tdY"
            type="number"
            value={yThead}
            onInput={this.handleChangeY.bind(this, i)}
          />
        </td>
        {this.state.rows[i].map((arrayDim2, i2) => (
          <td key={i2}>
            <input
              className="tdXY"
              type="number"
              value={arrayDim2}
              onInput={this.handleChangeXY.bind(this, i, i2)}
            />
          </td>
        ))}
        <td className="tdBold">
          <input disabled value={this.calcHorSum(i)} />
        </td>
      </tr>
    ));

    return rows;
  }

  renderVerticalSums() {
    const arraySums = [];
    for (var yPos = 0; yPos < this.state.rows.length; yPos++) {
      for (var xPos = 0; xPos < this.state.rows[yPos].length; xPos++) {
        if (arraySums[xPos] === undefined) {
          arraySums[xPos] = 0;
        }
        arraySums[xPos] += this.state.rows[yPos][xPos];
      }
    }

    const sums = arraySums.map(val => (
      <td className="tdBold">
        <input disabled value={val} />
      </td>
    ));

    return sums;
  }

  render() {
    return (
      <div className="centerParent">
        <table>
          <tbody>
            <tr>
              <td className="tdBold" />
              {this.renderFirstRow()}
              <td>
                <div
                  className="buttonAdd unselectable"
                  onClick={this.addHorizontal.bind(this)}
                >
                  +
                </div>
              </td>
            </tr>
            {this.renderRest()}
            <tr>
              <td>
                <div
                  className="buttonAdd unselectable"
                  onClick={this.addVertical.bind(this)}
                >
                  +
                </div>
              </td>
              {this.renderVerticalSums()}
              <td className="tdBold">
                <input disabled value={this.calcSum()} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
