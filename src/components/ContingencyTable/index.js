/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import DataTable from './DataTable';
import styles from './ContingencyTable.module.css';

const MAX_ALLOWED_DATA_POINTS = 30;
const MAX_ALLOWED_SUM = 100;

export default class ContingencyTable extends React.Component {
  static propTypes = {
    initalRows: PropTypes.number,

    initalColumns: PropTypes.number,

    onValueChanged: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const columns = this.props.initalColumns || 4;
    const rows = this.props.initalRows || 4;

    this.state = {
      x: new Array(columns).fill(0),
      y: new Array(rows).fill(0),
      rows: Array.from({ length: rows }).map(() =>
        Array.from({ length: columns }).fill(0)
      ),
      errors: [],
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

  setValueError(row, index) {
    return this.setState(state => {
      const oldError = state.errors.find(
        error => error[0] === row && error[1] === index
      );

      return oldError ? null : { errors: [...state.errors, [row, index]] };
    });
  }

  handleDataValueChange = ({ target: { value } }, rowIndex, valueIndex) => {
    const input = value.replace(/,/g, '.');
    const numberfied = Number(input);
    const oldValue = this.state.rows[rowIndex][valueIndex];

    if (Number.isNaN(numberfied)) {
      return this.setValueError(rowIndex, valueIndex);
    }

    const rows = this.state.rows.slice();
    rows[rowIndex][valueIndex] = numberfied;
    this.setState(state => {
      return {
        rows: rows,
        errors: state.errors.filter(err => {
          return err[0] !== rowIndex || err[1] !== valueIndex;
        }),
      };
    });
  };

  render() {
    const columnTotals = [];
    const rowTotals = [];
    for (let i = 0; i < this.state.x.length; i++) {
      for (let j = 0; j < this.state.y.length; j++) {
        const value = this.state.rows[j][i];
        if (typeof value !== 'number') {
          continue;
        }
        columnTotals[i] = (columnTotals[i] || 0) + value;
        rowTotals[j] = (rowTotals[j] || 0) + value;
      }
    }

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
            onValueChange={this.handleDataValueChange}
            y={yColumn}
            columnTotals={columnTotals}
            rowTotals={rowTotals}
          />
        </tbody>
      </table>
    );
  }
}
