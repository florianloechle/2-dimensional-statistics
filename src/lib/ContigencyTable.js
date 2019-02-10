/** @format */

/**
 * This file contians the implementation of a statistical
 * contingency table.
 *
 * A contingency table normally consists of multiple rows and
 * columns. Each of those features a x and y value which define
 * the // while the data points define the occurancy of those values.
 *
 *
 * The internal representation looks like the following:
 *
 *     y/x->0 0 0 0 0 0
 *        0 0 0 0 0 0 0
 *        0 0 0 0 0 0 0
 */

// TODO: Since looping through the table always has O(n^2) runtime,
// we should check if there is a better way to handle computing the
// row and column totals as well as the unique data points.

class ContingencyTable {
  /**
   * Constructs a new contigency table object
   * which represents a statistical contingency table.
   * @constructor
   * @param {Object} param0     - Object for various options
   * @returns {ContingencyTable}
   */
  constructor({ initalRows = 1, initalColumns = 1 } = {}) {
    this._y = new Array(initalRows).fill(0);
    this._x = new Array(initalColumns).fill(0);
    this.rows = Array.from({ length: initalRows }).map(() =>
      Array.from({ length: initalColumns }).fill(0)
    );
  }

  /**
   * Factory function which takes an array of data points as
   * arguments and returns a new ContigencyTable object with
   * a table based representation of the points in the array.
   * @param {Array} sampleArray - Array of data points.
   * @returns {ContingencyTable}
   */
  static createFromArray(sampleArray) {
    if (!Array.isArray(sampleArray)) {
      throw new TypeError(
        'Expected the argument to be an array. Got' + typeof sampleArray
      );
    }

    // this whole algorithm feels very odd and kinda "hacky"
    // i guess there are propably better ways to solve this.
    // TODO: Make this more readable and efficent

    const uniqueXValues = [];
    const uniqueYValues = [];
    const values = {};
    const table = new ContingencyTable({ initalColumns: 0, initalRows: 0 });

    for (let i = 0; i < sampleArray.length; i++) {
      const [x, y] = sampleArray[i];

      if (!uniqueXValues.includes(x)) {
        uniqueXValues.push(x);
        table.addColumn();
      }

      if (!uniqueYValues.includes(y)) {
        uniqueYValues.push(y);
        table.addRow();
      }

      if (!values[x]) {
        values[x] = { [y]: 1 };
      } else {
        values[x][y] ? (values[x][y] = values[x][y] + 1) : (values[x][y] = 1);
      }
    }

    // sort both for asthetic and insert them in the table
    uniqueXValues
      .sort((a, b) => (b > a ? 0 : 1))
      .forEach((v, i) => {
        table.addXValue(v, i);
      });

    uniqueYValues
      .sort((a, b) => (b > a ? 0 : 1))
      .forEach((v, i) => {
        table.addYValue(v, i);
      });

    Object.keys(values).forEach(x => {
      Object.keys(values[x]).forEach(y => {
        table.addDataPoint(
          values[x][y],
          table.y.indexOf(Number(y)),
          table.x.indexOf(Number(x))
        );
      });
    });

    return table;
  }

  /**
   * Gets the current number of rows in the table.
   * @property
   * @returns {Number}  - The current number of rows
   */
  get rowCount() {
    return this._y.length ? this._y.length : 0;
  }

  /**
   * Gets the current number of columns in the table.
   * @property
   * @returns {Number}  - The current number of columns
   */
  get columnCount() {
    return this._x.length ? this._x.length : 0;
  }

  /**
   * Gets the current x values.
   * @property
   * @returns {Array}
   */
  get x() {
    return this._x;
  }

  /**
   * Gets the current y values.
   * @property
   * @returns {Array}
   */
  get y() {
    return this._y;
  }

  /**
   * Gets the computed value of unique data Points inside the table.
   * @property
   * @returns {Number} - The number of unique data points
   */
  get uniqueDataPoints() {
    let dataPoints = 0;

    for (let i = 0; i < this.rowCount; i++) {
      const row = this.rows[i];

      for (let j = 0; j < this.columnCount; j++) {
        if (row[j] !== 0) {
          dataPoints += 1;
        }
      }
    }

    return dataPoints;
  }

  /**
   * Gets the computed total of all rows in the table.
   * @property
   * @returns {Array} - The array containing the total for each row
   */
  get rowTotals() {
    const rowTotals = new Array(this.rowCount).fill(0);
    for (let i = 0; i < this.rowCount; i++) {
      const row = this.rows[i];
      for (let j = 0; j < this.columnCount; j++) {
        rowTotals[i] += row[j];
      }
    }

    return rowTotals;
  }

  /**
   * Gets the computed total of all columns in the table.
   * @property
   * @returns {Array} - The array containing the total for each column
   */
  get columnTotals() {
    const columnTotals = new Array(this.columnCount).fill(0);
    for (let i = 0; i < this.columnCount; i++) {
      for (let j = 0; j < this.rowCount; j++) {
        const row = this.rows[j];
        columnTotals[i] += row[i];
      }
    }

    return columnTotals;
  }

  /**
   * Adds a new row to the table. Optionally fills the row
   * with an inital value. Default is 0.
   * @method
   * @param {Number} initialValue - The inital value for each item in the row
   */
  addRow(initialValue = 0) {
    this._y.push(0);
    this.rows.push(new Array(this.columnCount).fill(initialValue));
  }

  /**
   * Adds a new column to the table. Optionally fills the column
   * with an inital value. Default is 0.
   * @method
   * @param {Number} initialValue - The inital value for each item in the column
   */
  addColumn(initialValue = 0) {
    this._x.push(0);
    for (let i = 0; i < this.rowCount; i++) {
      this.rows[i].push(initialValue);
    }
  }

  /**
   * Removes a row from the table. By default the row
   * with the highest index (last) is removed.
   * A row won't be removed when there is only one left.
   * @method
   * @param {Number} index - Index of the row which should be removed.
   */
  removeRow(index = -1) {
    if (this.rowCount > 1) {
      this._y.splice(index);
      this.rows.splice(index);
    }
  }

  /**
   * Removes a column from the table. By default the column
   * with the highest index (last) is removed.
   * A column won't be removed when there is only one left.
   * @method
   * @param {Number} index - Index of the row which should be removed.
   */
  removeColumn(index = -1) {
    if (this.columnCount > 1) {
      this._x.splice(index);
      for (let i = 0; i < this.rowCount; i++) {
        this.rows[i].splice(index);
      }
    }
  }

  /**
   * Adds or changes a value in the table.
   * The position is defined by the index of the row
   * and the index the column.
   * @method
   * @param {Number} value - The value to be inserted
   * @param {Number} rowIndex - The index of the row the value should be inserted
   * @param {Number} columnIndex - The index of the column the value should be inserted
   */
  addDataPoint(value, rowIndex, columnIndex) {
    if (rowIndex < this.rowCount || columnIndex < this.columnCount) {
      this.rows[rowIndex][columnIndex] = value;
    }
  }

  /**
   * Adds or changes a x value in the table.
   * @method
   * @param {Number} value
   * @param {Number} index
   */
  addXValue(value, index) {
    if (index < this.x.length) {
      this._x[index] = value;
    }
  }

  /**
   * Adds or changes a y value in the table.
   * @method
   * @param {Number} value
   * @param {Number} index
   */
  addYValue(value, index) {
    if (index < this.y.length) {
      this._y[index] = value;
    }
  }

  createArray() {
    // TODO: Implement a method that converts the table to
    // an array that look like [[x,y],[x,y],[x,y]]
  }
}

export default ContingencyTable;
