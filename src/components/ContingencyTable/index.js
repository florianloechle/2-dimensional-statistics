/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContingencyTable.module.css';
import { parseNumber } from '../../lib/utils';

const TableCell = ({ type = 'td', ...rest }) =>
  React.createElement(type, { ...rest });

const TableRow = props =>
  React.createElement('tr', { className: styles.row, ...props });

const TableInput = props =>
  React.createElement('input', { type: 'text', placeholder: 'Wert', ...props });

const AddButton = props =>
  React.createElement('button', { className: styles.addButton, ...props });

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

    onSubmit: PropTypes.func,
  };

  /**
   * @enum
   */
  static actionTypes = {
    __setOccurency: 0,
    __setXValue: 1,
    __setYValue: 2,
    __setOccurencyError: 3,
    __setXError: 4,
    __setYError: 5,
  };

  constructor(props) {
    super(props);

    const columns = this.props.initalColumns;
    const rows = this.props.initalRows;

    this.state = {
      x: new Array(columns).fill(0),
      y: new Array(rows).fill(0),
      matrix: Array.from({ length: rows }).map(() =>
        Array.from({ length: columns }).fill(0)
      ),
      errors: [],
      xErrors: [],
      yErrors: [],
      rowTotal: new Array(rows).fill(0),
      columnTotal: new Array(columns).fill(0),
      sum: 0,
      overMaxSum: false,
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
        matrix: [...state.matrix, new Array(state.x.length).fill(0)],
        rowTotal: [...state.rowTotal, 0],
      };
    });
  }

  removeRow() {
    this.setState(state => {
      return {
        y: state.y.slice(-1),
        matrix: state.matrix.map(row => row.slice(-1)),
        rowTotal: state.rowTotal.slice(-1),
      };
    });
  }

  addColumn() {
    this.setState(state => {
      return {
        x: [...state.x, 0],
        matrix: state.matrix.map(row => [...row, 0]),
        columnTotal: [...state.columnTotal, 0],
      };
    });
  }

  removeColumn() {
    this.setState(state => {
      return {
        x: state.x.slice(-1),
        matrix: state.matrix.map(row => row.slice(-1)),
        columnTotal: state.columnTotal.slice(-1),
      };
    });
  }

  getMatrixTotals(matrix) {
    const columnTotal = [];
    const rowTotal = [];
    let sum = 0;

    if (matrix.length !== 0)
      for (let i = 0; i < matrix[0].length; i++) {
        for (let j = 0; j < matrix.length; j++) {
          const value = matrix[j][i];
          if (typeof value !== 'number') {
            continue;
          }
          columnTotal[i] = (columnTotal[i] || 0) + value;
          rowTotal[j] = (rowTotal[j] || 0) + value;
          sum = sum += value;
        }
      }

    return {
      columnTotal,
      rowTotal,
      sum,
    };
  }

  setMatrixReducer(action) {
    return this.setState(({ matrix, errors, sum }) => {
      const { rowIndex, columnIndex, value } = action.payload;

      switch (action.type) {
        case ContingencyTable.actionTypes.__setOccurency: {
          const overMax =
            sum - matrix[rowIndex][columnIndex] + value > this.props.maxSum;

          matrix[rowIndex][columnIndex] = value;

          return {
            matrix,
            ...this.getMatrixTotals(matrix),
            overMaxSum: overMax,
            errors: errors.filter(
              err => err[0] !== rowIndex || err[1] !== columnIndex
            ),
          };
        }
        case ContingencyTable.actionTypes.__setOccurencyError: {
          matrix[rowIndex][columnIndex] = value;
          return {
            matrix,
            errors: [...errors, [rowIndex, columnIndex]],
          };
        }
        default: {
          throw new Error(
            'This case should not happen and is likely caused by a bug in the component.'
          );
        }
      }
    });
  }

  setHeaderReducer(action) {
    const { columnIndex, rowIndex, value } = action.payload;

    return this.setState(({ x, xErrors, y, yErrors }) => {
      switch (action.type) {
        case ContingencyTable.actionTypes.__setXValue: {
          x[columnIndex] = value;
          return {
            x: x,
            xErrors: xErrors.filter(e => e !== columnIndex),
          };
        }
        case ContingencyTable.actionTypes.__setXError: {
          x[columnIndex] = value;
          return {
            x: x,
            xErrors: [...xErrors, columnIndex],
          };
        }
        case ContingencyTable.actionTypes.__setYValue: {
          y[rowIndex] = value;
          return {
            x: x,
            yErrors: yErrors.filter(e => e !== rowIndex),
          };
        }
        case ContingencyTable.actionTypes.__setYError: {
          y[rowIndex] = value;
          return {
            x: x,
            yErrors: [...yErrors, rowIndex],
          };
        }
        default: {
          throw new Error(
            'This case should not happen and is likely caused by a bug in the component.'
          );
        }
      }
    });
  }

  createXRow() {
    const { x, xErrors, y } = this.state;
    return (
      <TableRow>
        <TableCell type="th" scope="row" children="x / y" />
        {x.map((value, i) => (
          <TableCell
            type="th"
            key={i}
            className={xErrors.includes(i) ? styles.error : null}
          >
            <TableInput
              defaultValue={value}
              onChange={e => this.handleXValueChange(e, i)}
            />
          </TableCell>
        ))}
        <TableCell type="th" scope="row">
          Summen
        </TableCell>
      </TableRow>
    );
  }

  createYColumn() {
    const { y, yErrors } = this.state;
    return y.map((v, i) => (
      <TableCell type="th" key={i} scope="col">
        <TableInput
          className={yErrors.includes(i) ? styles.error : null}
          defaultValue={v}
          onChange={e => this.handleYValueChange(e, i)}
        />
      </TableCell>
    ));
  }

  createMatrix() {
    const { matrix, rowTotal, errors } = this.state;
    const yColumn = this.createYColumn();

    return matrix.map((row, rowIndex) => {
      const rowErrors = errors.reduce(
        (err, position) =>
          position[0] === rowIndex ? [...err, position[1]] : err,
        []
      );

      return (
        <TableRow key={rowIndex}>
          {yColumn[rowIndex]}
          {row.map((value, columnIndex) => (
            <TableCell
              key={columnIndex}
              className={rowErrors.includes(columnIndex) ? styles.error : null}
            >
              <TableInput
                defaultValue={value}
                onChange={e =>
                  this.handleDataValueChange(e, rowIndex, columnIndex)
                }
              />
            </TableCell>
          ))}
          <TableCell>{rowTotal[rowIndex]}</TableCell>
        </TableRow>
      );
    });
  }

  isValid() {
    return (
      this.state.xErrors.length === 0 &&
      this.state.yErrors.length === 0 &&
      this.state.errors.length === 0
    );
  }

  handleDataValueChange = ({ target: { value } }, rowIndex, columnIndex) => {
    const newValue = parseNumber(value);

    if (isNaN(newValue) || value === '') {
      return this.setMatrixReducer({
        type: ContingencyTable.actionTypes.__setOccurencyError,
        payload: {
          rowIndex,
          columnIndex,
          value: 0,
        },
      });
    }

    return this.setMatrixReducer({
      type: ContingencyTable.actionTypes.__setOccurency,
      payload: {
        rowIndex,
        columnIndex,
        value: newValue,
      },
    });
  };

  handleXValueChange = ({ target: { value } }, columnIndex) => {
    const newValue = parseNumber(value);

    if (isNaN(newValue) || value === '') {
      return this.setHeaderReducer({
        type: ContingencyTable.actionTypes.__setXError,
        payload: {
          columnIndex,
          value: 0,
        },
      });
    }

    return this.setHeaderReducer({
      type: ContingencyTable.actionTypes.__setXValue,
      payload: {
        columnIndex,
        value: newValue,
      },
    });
  };

  handleYValueChange = ({ target: { value } }, rowIndex) => {
    const newValue = parseNumber(value);

    if (isNaN(newValue) || value === '') {
      return this.setHeaderReducer({
        type: ContingencyTable.actionTypes.__setYError,
        payload: {
          rowIndex,
          value: 0,
        },
      });
    }

    return this.setHeaderReducer({
      type: ContingencyTable.actionTypes.__setYValue,
      payload: {
        rowIndex,
        value: newValue,
      },
    });
  };

  render() {
    const { sum, columnTotal, overMaxSum } = this.state;

    return (
      <div>
        <table className={'table table-hover ' + styles.base}>
          <tbody>
            {this.createXRow()}
            {this.createMatrix()}
            <TableRow>
              <TableCell type="th">Summen</TableCell>
              {columnTotal.map((value, valueIndex) => (
                <TableCell key={valueIndex}>{value}</TableCell>
              ))}
              <TableCell className={overMaxSum ? styles.error : null}>
                {sum}
              </TableCell>
            </TableRow>
          </tbody>
        </table>
        <button onClick={this.validateInput} />
      </div>
    );
  }
}
