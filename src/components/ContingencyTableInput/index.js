/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from '../Grid';
import styles from './ContingencyTable.module.css';
import { parseNumber, evaluateTable } from '../../lib/utils';
import Alert from 'react-s-alert';

let tabIndex = 0;

const TableCell = ({ type = 'td', ...rest }) =>
  React.createElement(type, { ...rest });

const TableRow = props => React.createElement('tr', { ...props });

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

  state = {
    ...this.setUpInitalState(),
  };

  /**
   *  The inital state of the table, based on the passed props.
   *  @returns {Object} The inital state
   */
  setUpInitalState() {
    const { initalColumns, initalRows } = this.props;
    return {
      x: new Array(initalColumns).fill(0),
      y: new Array(initalRows).fill(0),
      rows: Array.from({ length: initalRows }).map(() =>
        Array.from({ length: initalColumns }).fill(0)
      ),
      columnTotal: new Array(initalColumns).fill(0),
      rowTotal: new Array(initalRows).fill(0),
      errors: [],
      xErrors: [],
      xUniqueError: false,
      yErrors: [],
      yUniqueError: false,
      sum: 0,
      overMaxSumError: false,
      uniquePointError: false,
    };
  }

  handleErrorMsg = () => {
    if (this.state.overMaxSumError) {
      Alert.error('Maximale Anzahl an Punkten erreicht: ' + this.props.maxSum);
    } else if (this.state.uniquePointError) {
      Alert.error(
        'Maximale Anzahl an unterschiedlichen Punkten erreicht: ' +
          this.props.maxUniquePoints
      );
    }
  };

  addRow = () => {
    this.setState(state => {
      return {
        y: [...state.y, 0],
        rows: [...state.rows, new Array(state.x.length).fill(0)],
        rowTotal: [...state.rowTotal, 0],
      };
    });
  };

  addColumn = () => {
    this.setState(state => {
      return {
        x: [...state.x, 0],
        rows: state.rows.map(row => [...row, 0]),
        columnTotal: [...state.columnTotal, 0],
      };
    });
  };

  countUnique(array) {
    return new Set(array).size;
  }

  getValueErrors(row, index) {
    const oldError = this.state.errors.find(
      error => error[0] === row && error[1] === index
    );
    return oldError ? this.state.errors : [...this.state.errors, [row, index]];
  }

  setNewState(newRows, newErrors, overMaxSum) {
    this.setState(
      state => {
        const { uniquePoints, ...totals } = evaluateTable(state.rows);
        return {
          overMaxSumError: overMaxSum,
          rows: newRows,
          ...totals,
          errors: newErrors,
          uniquePointError: uniquePoints > this.props.maxUniquePoints,
          xUniqueError:
            this.countUnique(this.state.x) !== this.state.x.length
              ? true
              : false,
          yUniqueError:
            this.countUnique(this.state.y) !== this.state.y.length
              ? true
              : false,
        };
      },
      () => {
        this.handleErrorMsg();
        this.props.onDataChange &&
          this.props.onDataChange({
            // should this return the table parsed as an array?
            rows: this.state.rows,
            uniquePointError: this.state.uniquePointError,
            maxSumError: this.state.overMaxSumError,
          });
      }
    );
  }

  handleFocus = event => event.target.select();

  createXRow() {
    const { x, xErrors } = this.state;
    return (
      <TableRow>
        <TableCell type="th" scope="row" children="x / y" />
        {x.map((value, i) => (
          <TableCell type="th" key={i}>
            <input
              className={xErrors.includes(i) ? styles.error : null}
              defaultValue={value}
              onChange={e => this.handleHeaderValueChange(e, 'x', i)}
              type="text"
              onFocus={this.handleFocus}
              tabIndex={(tabIndex += 1)}
            />
          </TableCell>
        ))}
        <TableCell
          className={styles.addButton}
          onClick={this.addColumn}
          scope="row"
          children="+"
        />
      </TableRow>
    );
  }

  createYColumn() {
    const { y, yErrors } = this.state;
    return y.map((v, i) => (
      <TableCell type="th" key={i} scope="col">
        <input
          className={yErrors.includes(i) ? styles.error : null}
          defaultValue={v}
          onChange={e => this.handleHeaderValueChange(e, 'y', i)}
          type="text"
          onFocus={this.handleFocus}
          tabIndex={(tabIndex += 1)}
        />
      </TableCell>
    ));
  }

  createMatrix() {
    const { rows, rowTotal, errors } = this.state;
    const y = this.createYColumn();

    return rows.map((row, rowIndex) => {
      const rowErrors = errors.reduce(
        (err, position) =>
          position[0] === rowIndex ? [...err, position[1]] : err,
        []
      );

      return (
        <TableRow key={rowIndex}>
          {y[rowIndex]}
          {row.map((value, valueIndex) => (
            <TableCell key={valueIndex}>
              <input
                className={rowErrors.includes(valueIndex) ? styles.error : null}
                placeholder="Wert.."
                type="text"
                tabIndex={(tabIndex += 1)}
                onFocus={this.handleFocus}
                defaultValue={value}
                onChange={e =>
                  this.handleDataValueChange(e, rowIndex, valueIndex)
                }
              />
            </TableCell>
          ))}
          <TableCell>{rowTotal[rowIndex]}</TableCell>
        </TableRow>
      );
    });
  }

  handleDataValueChange = ({ target: { value } }, rowIndex, valueIndex) => {
    const newValue = parseNumber(value);
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

  handleHeaderValueChange = ({ target: { value } }, type, index) => {
    const newValue = parseNumber(value);
    const newHeader = this.state[type];
    const typeErrors = this.state[type + 'Errors'];

    if (Number.isNaN(newValue)) {
      newHeader[index] = 0;
      const error = typeErrors.find(e => e === index)
        ? null
        : [...typeErrors, index];

      this.setState({
        [type + 'Errors']: error,
        [type]: newHeader,
      });
    } else {
      const errors = typeErrors.filter(err => {
        return err !== index;
      });
      newHeader[index] = newValue;
      this.setState({
        [type + 'Errors']: errors,
        [type]: newHeader,
        xUniqueError:
          this.countUnique(this.state.x) !== this.state.x.length ? true : false,
        yUniqueError:
          this.countUnique(this.state.y) !== this.state.y.length ? true : false,
      });
    }
  };

  handleResetClick = () => {
    document.querySelectorAll('input').forEach(i => (i.value = 0));
    this.setState(
      {
        ...this.setUpInitalState(),
      },
      () => this.props.onReset()
    );
  };

  handleSubmit = () => {
    if (
      this.state.overMaxSumError === true ||
      this.state.uniquePointError === true ||
      this.state.xUnique === true
    ) {
      this.setState({
        error: 'Bitte überprüfe deine Eingaben.',
      });
    } else {
      this.props.onSubmit({
        matrix: this.state.rows,
        x: this.state.x,
        y: this.state.y,
      });
    }
  };

  isValid = () => {
    const {
      columnTotal,
      sum,
      overMaxSumError,
      uniquePointError,
      xUniqueError,
      yUniqueError,
      errors,
      xErrors,
      yErrors,
    } = this.state;

    return (
      sum >= 2 &&
      !overMaxSumError &&
      !xUniqueError &&
      !yUniqueError &&
      !uniquePointError &&
      errors.length === 0 &&
      xErrors.length === 0 &&
      yErrors.length === 0
    );
  };

  render() {
    const {
      columnTotal,
      sum,
      overMaxSumError,
      uniquePointError,
      error,
    } = this.state;

    tabIndex = 0;

    return (
      <Container fluid>
        <Row>
          <Col>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <table className={'table table-hover ' + styles.base}>
              <tbody>
                {this.createXRow()}
                {this.createMatrix()}
                <TableRow>
                  <TableCell
                    className={styles.addButton}
                    type="th"
                    onClick={this.addRow}
                  >
                    +
                  </TableCell>
                  {columnTotal.map((value, valueIndex) => (
                    <TableCell key={valueIndex}>{value}</TableCell>
                  ))}
                  <TableCell
                    className={
                      overMaxSumError || uniquePointError ? styles.error : null
                    }
                  >
                    {sum}
                  </TableCell>
                </TableRow>
              </tbody>
            </table>
          </Col>
        </Row>

        <div
          className="btn-group"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleResetClick}
          >
            Reset
          </button>
          {this.isValid() ? (
            <button
              type="submit"
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Rechnen!
            </button>
          ) : (
            ''
          )}
        </div>
      </Container>
    );
  }
}
