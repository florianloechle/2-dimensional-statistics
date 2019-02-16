/** @format */

import React from 'react';
import styles from './DotSequency.module.css';

export default class DotSequency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: [[1, 4], [2, 5], [3, 6]],
      x: 0,
      y: 0,
      editRow: null,
    };

    this.handlePointInputChange = this.handlePointInputChange.bind(this);
    this.handlePointInputOnBlur = this.handlePointInputOnBlur.bind(this);
  }

  render() {
    return <div className="centerTable">{this.renderBox()}</div>;
  }

  renderBox() {
    return (
      <div className="row">
        <div className="col-6">{this.renderInput()}</div>
        <div className="col-6">{this.renderList()}</div>
        <div className="rightBottomDiv">
          <button type="button" className="btn btn-outline-primary">
            Weiter
          </button>
        </div>
      </div>
    );
  }

  renderInput() {
    return (
      <div className="input-group">
        <input
          type="number"
          id="x"
          className="form-control"
          value={this.state.x}
          onChange={this.handlePointInputChange}
          onBlur={this.handlePointInputOnBlur}
        />
        <input
          type="number"
          id="y"
          className="form-control"
          value={this.state.y}
          onChange={this.handlePointInputChange}
          onBlur={this.handlePointInputOnBlur}
        />
        <div className="input-group-append">
          <button
            className="input-group-text"
            onClick={e => this.addRow(this.state.x, this.state.y)}
          >
            Hinzufügen
          </button>
        </div>
      </div>
    );
  }

  renderList() {
    return <ul>{this.renderRows()}</ul>;
  }

  renderRows() {
    return this.state.statistics.map(([x, y], i) => (
      <li key={i}>
        {x} / {y}
        <button className="edit" onClick={e => this.editRow(i)}>
          <img src="./assets/images/edit.png" />
        </button>
        <button className="delete" onClick={e => this.deleteRow(i)}>
          &times;
        </button>
      </li>
    ));
  }

  handlePointInputChange(ev) {
    var value = ev.target.value;
    var negativeNumber = false;

    if (value.startsWith('-')) {
      negativeNumber = true;
      value = value.substring(1);
    }

    if (value.length > 1) value = value.replace(/^0+/, '');

    if (value.startsWith('.')) {
      value = '0' + value;
    }

    if (negativeNumber) {
      console.log('Negative: ' + value);
      value = '-' + value;
    }

    console.log(value);
    this.setState({ [ev.target.id]: value });
  }

  handlePointInputOnBlur(ev) {
    if (ev.target.value.length === 0) this.setState({ [ev.target.id]: 0 });
  }

  deleteRow(index) {
    this.setState({
      statistics: this.state.statistics.filter((el, i) => i !== index),
    });
  }

  addRow(x, y) {
    this.setState({
      statistics: [...this.state.statistics, [x, y]],
    });
  }

  editRow(index, x, y) {
    var point = [x, y];
    this.setState({});
  }
}
