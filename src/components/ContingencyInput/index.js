/** @format */

import React from 'react';
import DataTable from './DataTable';
import PropTypes from 'prop-types';
import styles from './ContigencyInput.module.css';
import ContingencyTable from '../../lib/ContigencyTable';

const MAX_ALLOWED_DATA_POINTS = 30;
const MAX_ALLOWED_SUM = 100;

// TODO: Implement contingency table

export default class ContingencyInput extends React.Component {
  static propTypes = {
    initalRows: PropTypes.number,

    initalColumns: PropTypes.number,

    onValueChanged: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      x: new Array(this.props.initalColumns || 4).fill(0),
      y: new Array(this.props.initalRows || 4).fill(0),
      rows: Array.from({ length: this.props.initalRows || 4 }).map(() =>
        Array.from({ length: this.props.initalColumns || 4 }).fill(0)
      ),
    };
  }

  handleXChange = ({ target: { value } }, index) => {
    const normalizedValue = Number(value);

    this.setState(state => {
      const x = state.x;
      x[index] = normalizedValue;
      return {
        x: x,
      };
    });
  };

  handleYChange = ({ target: { value } }, index) => {
    const normalizedValue = Number(value);

    this.setState(state => {
      const y = state.y;
      y[index] = normalizedValue;
      return {
        y: y,
      };
    });
  };

  handleDataValueChange = ({ target: { value } }, rowIndex, columnIndex) => {
    this.setState(state => {
      const rows = state.rows;
      rows[rowIndex][columnIndex] = value;
      return {
        rows: rows,
      };
    });
  };

  addRow = () => {
    this.setState(state => {
      return {
        y: [...state.y, 0],
        rows: [...state.rows, new Array(state.y.length + 1).fill(0)],
      };
    });
  };

  removeRow = () => {
    this.setState(state => {
      return {
        y: state.y.slice(-1),
        rows: state.rows.map(row => row.slice(-1)),
      };
    });
  };

  addColumn = () => {
    this.setState(state => {
      return {
        x: [...state.x, 0],
        rows: state.rows.map(row => [...row, 0]),
      };
    });
  };

  removeColumn = () => {
    this.setState(state => {
      return {
        x: state.x.slice(-1),
        rows: state.rows.map(row => row.slice(-1)),
      };
    });
  };

  render() {
    const { x, y, rows } = this.state;
    const rowTotals = this.contingencyTable.rowTotals;
    const columnTotals = this.contingencyTable.columnTotals;

    return (
      <table className="table table-hover">
        <tbody>
          <tr>
            <th scope="row">x and y</th>
            {x.map((v, i) => (
              <th scope="row" key={i}>
                <input
                  className="tdY"
                  type="text"
                  onChange={e => this.handleXChange(e, i)}
                  defaultValue={v}
                />
              </th>
            ))}
            <th scope="row">Summen</th>
          </tr>
          <DataTable
            rowTotals={rowTotals}
            rows={rows}
            yValues={y}
            onYValueChange={this.handleYChange}
            onDataValueChange={this.handleDataValueChange}
          />
          <tr>
            <th scope="row">Summen</th>
            {columnTotals.map((total, i) => (
              <td key={i}>{total}</td>
            ))}
            <td />
          </tr>
        </tbody>
      </table>
    );
  }
}
