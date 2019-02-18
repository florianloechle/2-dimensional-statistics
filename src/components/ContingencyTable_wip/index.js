/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { parseNumber } from '../../lib/utils';
import Controls from '../Controls';
import { BaseTable, TableCell, TableInput, TableRow } from './Table';
import { Container, Row, Col } from '../Grid';
import AddRemoveGroup from './AddRemoveGroup';

class ContingencyInput extends React.Component {
  static propTypes = {
    /**
     * Handler that is called when user clicks on compute
     */
    onSubmit: PropTypes.func,

    /**
     * Handler that is called when user clicks on reset
     */
    onReset: PropTypes.func,
  };

  static defaultProps = {
    initalColumns: 4,
    initalRows: 4,
    maxTotal: 100,
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
      matrix: Array.from({ length: initalRows }).map(() =>
        Array.from({ length: initalColumns }).fill(0)
      ),
      rowTotals: new Array(initalRows).fill(0),
      columnTotals: new Array(initalColumns).fill(0),
      errors: {
        y: [],
        x: [],
        matrix: [],
      },
      error: null,
      total: 0,
    };
  }

  /**
   * Adds a new row to the table and rerenders.
   */
  addRow = () => {
    this.setState(state => {
      return {
        y: [...state.y, 0],
        matrix: [...state.matrix, new Array(state.x.length).fill(0)],
        rowTotals: [...state.rowTotals, 0],
      };
    });
  };

  /**
   * Removes a row to the table and rerenders.
   */
  removeRow = () => {
    this.setState(state => {
      return {
        y: state.y.slice(0, state.y.length - 1),
        matrix: state.matrix.slice(0, state.matrix.length - 1),
        rowTotals: state.rowTotals.splice(0, state.rowTotals.length - 1),
      };
    });
  };

  /**
   * Adds a new column to the table and rerenders.
   */
  addColumn = () => {
    this.setState(state => {
      return {
        x: [...state.x, 0],
        matrix: state.matrix.map(row => [...row, 0]),
        columnTotals: [...state.columnTotals, 0],
      };
    });
  };

  /**
   * Removes a column to the table and rerenders.
   */
  removeColumn = () => {
    this.setState(state => {
      return {
        x: state.x.slice(0, state.x.length - 1),
        matrix: state.matrix.map(row => row.slice(0, row.length - 1)),
        columnTotals: state.columnTotals.splice(
          0,
          state.columnTotals.length - 1
        ),
      };
    });
  };

  /**
   * Handler for the change event in the x row.
   * @param {Event} event The fired event
   * @param {Number} index The index that was edited
   */
  handleXValueChange = (event, index) => {
    const xRow = this.state.x.slice();
    xRow[index] = event.target.value;

    this.setState({
      x: xRow,
    });
  };

  /**
   * Handler for the change event in the y column.
   * @param {Event} event The fired event
   * @param {Number} index The index that was edited
   */
  handleYValueChange = (event, index) => {
    const yColumn = this.state.y.slice();
    yColumn[index] = event.target.value;

    this.setState({
      y: yColumn,
    });
  };

  /**
   * Handler for the click on the reset button.
   * Sets the table back to its inital state and
   * calls the onReset handler.
   */
  handleReset = () => {
    this.setState(
      {
        ...this.setUpInitalState(),
      },
      () => this.props.onReset && this.props.onReset()
    );
  };

  /**
   * Handler for the change event in the matrix.
   * @param {Event} event The fired event
   * @param {Number} rowIndex The index of the row that was edited
   * @param {Number} columnIndex The index of the column that was edited
   */
  handleMatrixValueChange = (event, rowIndex, columnIndex) => {
    const matrix = this.state.matrix.slice();
    matrix[rowIndex][columnIndex] = event.target.value;

    this.setState({
      matrix: matrix,
    });
  };

  handleComputeClick = () => {
    const errors = { matrix: [], y: [], x: [] },
      columnTotals = [],
      rowTotals = [];

    let total = 0;
    for (let row = 0; row < this.state.y.length; row++) {
      for (let column = 0; column < this.state.x.length; column++) {
        let value = parseNumber(this.state.matrix[row][column]);
        if (isNaN(value)) {
          errors.matrix.push([row, column]);
          value = 0;
        }
        columnTotals[column] = (columnTotals[column] || 0) + value || 0;
        rowTotals[row] = (rowTotals[row] || 0) + value || 0;
        total = total += value;
      }
    }

    const isValid =
      errors.x.length === 0 &&
      errors.y.length === 0 &&
      errors.matrix.length === 0;

    console.log({ columnTotals, rowTotals, errors });
  };

  render() {
    const {
      x,
      y,
      matrix,
      rowTotals,
      columnTotals,
      total,
      error,
      errors,
    } = this.state;

    // disable add buttons when over 30 unique points
    const shouldDisableAddColumn = (x.length + 1) * y.length > 30;
    const shouldDisableAddRow = x.length * (y.length + 1) > 30;
    const shouldDisableRemoveColumn = x.length > 1;
    const shouldDisableRemoveRow = y.length > 1;

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
            <BaseTable>
              <TableRow>
                <TableCell type="th" scope="row">
                  x / y
                </TableCell>
                {x.map((value, i) => (
                  <TableCell
                    danger={errors.x.includes(i)}
                    key={i}
                    scope="row"
                    type="th"
                  >
                    <TableInput
                      value={value}
                      onChange={e => this.handleXValueChange(e, i)}
                    />
                  </TableCell>
                ))}
                <TableCell align="left" type="th" scrope="row">
                  <AddRemoveGroup
                    disableAdd={shouldDisableAddColumn}
                    diableRemove={shouldDisableRemoveColumn}
                    onAdd={this.addColumn}
                    onRemove={this.removeColumn}
                  />
                </TableCell>
              </TableRow>
              {matrix.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell type="th" scope="column">
                    <TableInput
                      value={y[rowIndex]}
                      onChange={e => this.handleYValueChange(e, rowIndex)}
                    />
                  </TableCell>
                  {row.map((value, columnIndex) => (
                    <TableCell
                      danger={errors.matrix.find(
                        ([x, y]) => rowIndex === x && columnIndex === y
                      )}
                      key={columnIndex}
                    >
                      <TableInput
                        value={value}
                        onChange={e =>
                          this.handleMatrixValueChange(e, rowIndex, columnIndex)
                        }
                      />
                    </TableCell>
                  ))}
                  <TableCell dark>{rowTotals[rowIndex]}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell type="th" scope="column">
                  <AddRemoveGroup
                    disableAdd={shouldDisableAddRow}
                    diableRemove={shouldDisableRemoveRow}
                    onAdd={this.addRow}
                    onRemove={this.removeRow}
                  />
                </TableCell>
                {columnTotals.map((value, columnIndex) => (
                  <TableCell dark key={columnIndex}>
                    {value}
                  </TableCell>
                ))}
                <TableCell>{total}</TableCell>
              </TableRow>
            </BaseTable>
          </Col>
        </Row>
        <Row>
          <Col>
            <Controls
              onCompute={this.handleComputeClick}
              onReset={this.handleReset}
              error={error}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ContingencyInput;
