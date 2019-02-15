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

class ContingencyTable {
  /**
   * Constructs a new contigency table object
   * which represents a statistical contingency table.
   * @constructor
   * @param {Object} param0     - Object for various options
   * @returns {ContingencyTable}
   */
  constructor({ initalRows = 1, initalColumns = 1 } = {}) {
    this.y = new Array(initalRows).fill(0);
    this.x = new Array(initalColumns).fill(0);
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
        table.addOcurrency(
          values[x][y],
          table.y.indexOf(Number(y)),
          table.x.indexOf(Number(x))
        );
      });
    });

    return table;
  }

  get totals() {
    const columnTotal = [];
    const rowTotal = [];
    let sum = 0;
    let uniquePoints = 0;

    if (this.rows.length !== 0) {
      const firstRow = this.rows[0];
      for (let i = 0; i < firstRow.length; i++) {
        for (let j = 0; j < this.rows.length; j++) {
          const value = this.rows[j][i];
          if (typeof value !== 'number') {
            continue;
          }
          columnTotal[i] = (columnTotal[i] || 0) + value;
          rowTotal[j] = (rowTotal[j] || 0) + value;
          sum = sum += value;
          if (value !== 0) {
            uniquePoints++;
          }
        }
      }
    }
    return {
      columnTotal,
      rowTotal,
      sum,
      uniquePoints,
    };
  }

  /**
   * Adds a new row to the table. Optionally fills the row
   * with an inital value. Default is 0.
   * @method
   * @param {Number} initialValue - The inital value for each item in the row
   */
  addRow(initialValue = 0) {
    this.y.push(0);
    this.rows.push(new Array(this.columnCount).fill(initialValue));
    return this;
  }

  /**
   * Adds a new column to the table. Optionally fills the column
   * with an inital value. Default is 0.
   * @method
   * @param {Number} initialValue - The inital value for each item in the column
   */
  addColumn(initialValue = 0) {
    this.x.push(0);
    for (let i = 0; i < this.rowCount; i++) {
      this.rows[i].push(initialValue);
    }
    return this;
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
      this.y.splice(index);
      this.rows.splice(index);
    }
    return this;
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
      this.x.splice(index);
      for (let i = 0; i < this.rowCount; i++) {
        this.rows[i].splice(index);
      }
    }
    return this;
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
  addOcurrency(value, rowIndex, columnIndex) {
    if (rowIndex < this.x.length || columnIndex < this.y.length) {
      this.rows[rowIndex][columnIndex] = value;
    }
    return this;
  }

  /**
   * Adds or changes a x value in the table.
   * @method
   * @param {Number} value
   * @param {Number} index
   */
  addXValue(value, index) {
    if (index < this.x.length) {
      this.x[index] = value;
    }
    return this;
  }

  /**
   * Adds or changes a y value in the table.
   * @method
   * @param {Number} value
   * @param {Number} index
   */
  addYValue(value, index) {
    if (index < this.y.length) {
      this.y[index] = value;
    }
    return this;
  }

  createArray() {
    // TODO: Implement a method that converts the table to
    // an array that look like [[x,y],[x,y],[x,y]]
  }
}

export default ContingencyTable;
