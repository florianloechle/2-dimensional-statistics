/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import styles from './ContingencyTable.module.css';

export default class ContingencyTable extends React.Component {
  static defaultProps = {
    initalRows: 4,
    initalColumns: 4,
    maxSum: 100,
    maxUniquePoints: 30,
  };

  static propTypes = {
    initalRows: PropTypes.number,

    initalColumns: PropTypes.number,

    maxUniquePoints: PropTypes.number,

    maxSum: PropTypes.number,

    onDataChange: PropTypes.func,

    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const columns = this.props.initalColumns;
    const rows = this.props.initalRows;

    this.state = {
      x: new Array(columns).fill(0),
      y: new Array(rows).fill(0),
      rows: Array.from({ length: rows }).map(() =>
        Array.from({ length: columns }).fill(0)
      ),
      columnTotal: new Array(columns).fill(0),
      rowTotal: new Array(rows).fill(0),
      errors: [],
      overMaxSumError: false,
    };

    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.removeColumn = this.removeColumn.bind(this);
    this.handleDataValueChange = this.handleDataValueChange.bind(this);
  }

  addRow() {
    this.setState(state => {
      return {
        y: [...state.y, 0],
        rows: [...state.rows, new Array(state.x.length).fill(0)],
      };
    });
  }

  removeRow() {
    this.setState(state => {
      return {
        y: state.y.slice(-1),
        rows: state.rows.map(row => row.slice(-1)),
      };
    });
  }

  addColumn() {
    this.setState(state => {
      return {
        x: [...state.x, 0],
        rows: state.rows.map(row => [...row, 0]),
      };
    });
  }

  removeColumn() {
    this.setState(state => {
      return {
        x: state.x.slice(-1),
        rows: state.rows.map(row => row.slice(-1)),
      };
    });
  }

  getValueErrors(row, index) {
    const oldError = this.state.errors.find(
      error => error[0] === row && error[1] === index
    );
    return oldError ? this.state.errors : [...this.state.errors, [row, index]];
  }

  getCurrentTotals() {
    const columnTotal = [];
    const rowTotal = [];
    let sum = 0;
    let unqiuePoints = 0;
    for (let i = 0; i < this.state.x.length; i++) {
      for (let j = 0; j < this.state.y.length; j++) {
        const value = this.state.rows[j][i];
        if (typeof value !== 'number' && value > 0) {
          continue;
        }
        columnTotal[i] = (columnTotal[i] || 0) + value;
        rowTotal[j] = (rowTotal[j] || 0) + value;
        sum = sum += value;
        unqiuePoints++;
      }
    }
    return {
      columnTotal,
      rowTotal,
      sum,
      uniquePointError: unqiuePoints > this.props.maxUniquePoints,
    };
  }

  setNewState(newRows, newErrors, overMaxSum) {
    this.setState(
      state => {
        return {
          overMaxSumError: overMaxSum,
          rows: newRows,
          ...this.getCurrentTotals(),
          errors: newErrors,
        };
      },
      () => {
        this.props.onDataChange &&
          this.props.onDataChange({
            rows: this.state.rows,
            x: this.state.x,
            y: this.state.y,
            sum: this.state.sum,
          });
      }
    );
  }

  handleDataValueChange = ({ target: { value } }, rowIndex, valueIndex) => {
    const input = value.replace(/,/g, '.');
    const newValue = Number(input);
    const oldValue = this.state.rows[rowIndex][valueIndex];
    const newRows = this.state.rows.slice();
    const oldSum = this.state.sum;

    if (Number.isNaN(newValue)) {
      newRows[rowIndex][valueIndex] = 0;

      return this.setNewState(
        newRows,
        this.getValueErrors(rowIndex, valueIndex)
      );
    }

    const errors = this.state.errors.filter(err => {
      return err[0] !== rowIndex || err[1] !== valueIndex;
    });
    const overMaxSum = this.state.sum - oldValue + newValue > this.props.maxSum;
    newRows[rowIndex][valueIndex] = newValue;

    this.setNewState(newRows, errors, overMaxSum);
  };

  render() {
    const yColumn = this.state.y.map((v, i) => (
      <th key={i} scope="row">
        <input defaultValue={v} onChange={this.handleChangeY} type="text" />
      </th>
    ));

    return (
      <table className={'table table-hover ' + styles.base}>
        <tbody>
          <tr className={styles.x}>
            <th>x / y</th>
            {this.state.x.map((v, i) => (
              <th key={i}>
                <input
                  defaultValue={v}
                  onChange={this.handleChangeX}
                  type="text"
                />
              </th>
            ))}
            <th>Summen</th>
          </tr>
          <DataTable
            rows={this.state.rows}
            errors={this.state.errors}
            sumError={this.state.overMaxSumError}
            onValueChange={this.handleDataValueChange}
            y={yColumn}
            columnTotals={this.state.columnTotal}
            rowTotals={this.state.rowTotal}
          />
        </tbody>
      </table>
    );
  }
}
