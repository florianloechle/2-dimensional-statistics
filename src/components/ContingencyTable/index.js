/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContingencyTable.module.css';

const errorStyle = {
  textDecoration: 'underline',
  textDecorationColor: 'red',
  color: 'red',
};

function parseValue(value) {
  const input = value.replace(/,/g, '.');
  return Number(input);
}

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
      xErrors: [],
      yErrors: [],
      sum: 0,
      overMaxSumError: false,
      uniquePointError: false,
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

  get currentTotals() {
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
          ...this.currentTotals,
          errors: newErrors,
        };
      },
      () => {
        this.props.onDataChange &&
          this.props.onDataChange({
            ...this.state,
          });

        if (this.state.overMaxSumError && this.props.onError) {
          this.props.onError();
        }
      }
    );
  }

  get x() {
    const { x, xErrors } = this.state;
    return (
      <tr>
        <th>x / y</th>
        {x.map((value, i) => (
          <th key={i}>
            <input
              style={xErrors.includes(i) ? errorStyle : null}
              defaultValue={value}
              onChange={e => this.handleHeaderValueChange(e, 'x', i)}
              type="text"
            />
          </th>
        ))}
        <th>Summen</th>
      </tr>
    );
  }

  get y() {
    const { y, yErrors } = this.state;
    return y.map((v, i) => (
      <th key={i} scope="row">
        <input
          style={yErrors.includes(i) ? errorStyle : null}
          defaultValue={v}
          onChange={e => this.handleHeaderValueChange(e, 'y', i)}
          type="text"
        />
      </th>
    ));
  }

  get rows() {
    const { rows, rowTotal, errors } = this.state;
    const y = this.y;

    return rows.map((row, rowIndex) => {
      const rowErrors = errors.reduce(
        (err, position) =>
          position[0] === rowIndex ? [...err, position[1]] : err,
        []
      );

      return (
        <tr key={rowIndex}>
          {y[rowIndex]}
          {row.map((value, valueIndex) => (
            <td className="error" key={valueIndex}>
              <input
                style={rowErrors.includes(valueIndex) ? errorStyle : null}
                placeholder="Wert.."
                type="text"
                defaultValue={value}
                onChange={e =>
                  this.handleDataValueChange(e, rowIndex, valueIndex)
                }
              />
            </td>
          ))}
          <td>{rowTotal[rowIndex]}</td>
        </tr>
      );
    });
  }

  handleDataValueChange = ({ target: { value } }, rowIndex, valueIndex) => {
    const newValue = parseValue(value);
    const oldValue = this.state.rows[rowIndex][valueIndex];
    const newRows = this.state.rows.slice();
    const oldSum = this.state.sum;
    const overMaxSum = oldSum - oldValue + newValue > this.props.maxSum;

    if (Number.isNaN(newValue)) {
      newRows[rowIndex][valueIndex] = 0;

      return this.setNewState(
        newRows,
        this.getValueErrors(rowIndex, valueIndex),
        overMaxSum
      );
    }

    const errors = this.state.errors.filter(err => {
      return err[0] !== rowIndex || err[1] !== valueIndex;
    });

    newRows[rowIndex][valueIndex] = newValue;

    this.setNewState(newRows, errors, overMaxSum);
  };

  handleHeaderValueChange(
    {
      target: { value },
    },
    type,
    index
  ) {
    const newValue = parseValue(value);
    const newHeader = this.state[type];

    if (Number.isNaN(newValue)) {
      newHeader[index] = 0;
      const error = this.state[type + 'Errors'].find(e => e === index)
        ? null
        : [...this.state[type + 'Errors'], index];

      this.setState({
        [type + 'Errors']: error,
        [type]: newHeader,
      });
    } else {
      const errors = this.state.xErrors.filter(err => {
        return err !== index;
      });
      newHeader[index] = newValue;
      this.setState({
        [type + 'Errors']: errors,
        [type]: newHeader,
      });
    }
  }

  render() {
    const rows = this.rows;
    const x = this.x;
    const { columnTotal, sum, overMaxSumError } = this.state;

    return (
      <table className={'table table-hover ' + styles.base}>
        <tbody>
          {x}
          {rows}
          <tr>
            <th>Summe</th>
            {columnTotal.map((value, valueIndex) => (
              <td key={valueIndex}>{value}</td>
            ))}
            <td style={overMaxSumError ? errorStyle : null}>{sum}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
