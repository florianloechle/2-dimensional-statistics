/** @format */

class ContingencyTable {
  /**
   * Constructs a new contigency table object
   * which represents a statistical contingency table.
   * @constructor
   * @param {Object} param0     - Object for various options
   * @returns {ContingencyTable}
   */
  constructor({ initalRows = 1, initalColumns = 1 }) {
    this.y = new Array(initalRows).fill(0);
    this.x = new Array(initalColumns).fill(0);
    this.rows = Array.from({ length: initalRows }).map(() =>
      Array.from({ length: initalColumns }).fill(0)
    );
  }

  /**
   * Gets the current number of rows in the table.
   * @property
   * @returns {Number}  - The current number of rows
   */
  get rowCount() {
    return this.rows.length === this.y.length && this.rows.length;
  }

  /**
   * Gets the current number of columns in the table.
   * @property
   * @returns {Number}  - The current number of columns
   */
  get columnCount() {
    return this.rows[0].length === this.x.length && this.rows[0].length;
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
    this.y.push(0);
    this.rows.push(new Array(this.columnCount).fill(initialValue));
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
  }

  /**
   * Adds or changes a value in the table.
   * The position is defined by the index of the row
   * and the index the column.
   * @method
   * @param {Number} value - The value to be inserted
   * @param {*} rowIndex - The index of the row the value should be inserted
   * @param {*} columnIndex - The index of the column the value should be inserted
   */
  addDataPoint(value, rowIndex, columnIndex) {
    if (rowIndex < this.rowCount || columnIndex < this.columnCount) {
      this.rows[rowIndex][columnIndex] = value;
    }
  }

  convertToArray() {}
}

export default ContingencyTable;
