/**
 * Trys to parse the given String into a number
 * and return NaN if value is not a valid number.
 *
 * @format
 * @param {String} value
 * @returns {*}
 */

export function parseNumber(value) {
  const input = value.replace(/,/g, '.');
  return Number(input);
}

/**
 * Takes an a table as input and computes the column and
 * rowtotals as well as the total of values and the overall sum.
 * @param {Array} table
 * @returns {Object} columnTotal, rowTotal, sum, uniquePoints
 */
export function evaluateTable(table) {
  const columnTotal = [];
  const rowTotal = [];
  let sum = 0;
  let uniquePoints = 0;

  if (table.length !== 0) {
    const firstRow = table[0];
    for (let i = 0; i < firstRow.length; i++) {
      for (let j = 0; j < table.length; j++) {
        const value = table[j][i];
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
