/** @format */

import React from 'react';

export default class ContingencyTable extends React.Component {
  state = {
    labelHor: 'Age',
    labelVer: 'Income',
    sum: 0,
    xThead: [1, 2, 3],
    yThead: [2, 3, 4],
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
        yThead: [...state.yThead, 0],
        values: [...state.values, new Array(state.xThead.length).fill(0)],
      };
    });
  }

  renderFirstRow() {
    const td = this.state.xThead.map((value, i) => (
      <th key={i} className="tdBold">
        <input
          type="number"
          value={value}
          onInput={this.handleChangeX.bind(this, i)}
        />
      </th>
    ));
    return td;
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
    const newValues = this.state.values;
    newValues[index1][index2] = Number(event.target.value);
    this.setState({ values: newValues });
  }

  renderRest() {
    const rows = this.state.yThead.map((yThead, i) => (
      <tr key={i}>
        <td className="tdBold">
          <input
            type="number"
            value={yThead}
            onInput={this.handleChangeY.bind(this, i)}
          />
        </td>
        {this.state.values[i].map((arrayDim2, i2) => (
          <td key={i2}>
            <input
              type="number"
              value={arrayDim2}
              onInput={this.handleChangeXY.bind(this, i, i2)}
            />
          </td>
        ))}
        <td className="tdBold">
          <input disabled type="number" value={this.calcHorSum(i)} />
        </td>
      </tr>
    ));

    return rows;
  }

  calcHorSum(index) {
    var sum = 0;
    for (var yPos = 0; yPos < this.state.values.length; yPos++) {
      for (var xPos = 0; xPos < this.state.values[yPos].length; xPos++) {
        if (index === yPos) {
          sum += this.state.values[yPos][xPos];
        }
      }
    }
    return sum;
  }

  renderVerticalSums() {
    const arraySums = [];
    for (var yPos = 0; yPos < this.state.values.length; yPos++) {
      for (var xPos = 0; xPos < this.state.values[yPos].length; xPos++) {
        if (arraySums[xPos] === undefined) {
          arraySums[xPos] = 0;
        }
        arraySums[xPos] += this.state.values[yPos][xPos];
      }
    }
    //  const arraySums = this.state.values.reduce((sums,arr) => {

    //  },[])

    const sums = arraySums.map(val => (
      <td className="tdBold">
        <input disabled type="number" value={val} />
      </td>
    ));

    return sums;
  }

  calcSum() {
    var sum = 0;
    for (var yPos = 0; yPos < this.state.values.length; yPos++) {
      for (var xPos = 0; xPos < this.state.values[yPos].length; xPos++) {
        sum += this.state.values[yPos][xPos];
      }
    }

    return sum;
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
              {this.renderVerticalSums()}
              <td className="tdBold">
                <input disabled type="number" value={this.calcSum()} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
