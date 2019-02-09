/** @format */

import ContingencyTable from '../lib/ContigencyTable';

describe('ContigencyTable', () => {
  describe('The public API', () => {
    it('exposes the correct public API', () => {
      const table = new ContingencyTable({});

      expect(table).toHaveProperty('addRow');
      expect(table).toHaveProperty('addColumn');
      expect(table).toHaveProperty('rowCount');
    });
  });

  describe('Table operations', () => {
    describe('Initialization', () => {
      test.each`
        initalRow | initalColumn
        ${3}      | ${3}
        ${5}      | ${2}
        ${16}     | ${12}
      `(
        'initalizes with $initalRow rows and $initalColumn columns',
        ({ initalRow, initalColumn }) => {
          const table = new ContingencyTable({
            initalColumns: initalColumn,
            initalRows: initalRow,
          });
          expect(table.x.length).toEqual(initalColumn);
          expect(table.y.length).toEqual(initalRow);
          expect(table.x.every(e => e === 0)).toEqual(true);
          expect(table.y.every(e => e === 0)).toEqual(true);
        }
      );
    });

    describe('Row', () => {
      it('correctly adds a new row to the table', () => {
        const table = new ContingencyTable({});
        table.addRow();
        expect(table.rowCount).toEqual(2);
      });

      it('fills the newly added row with the provided default value', () => {
        const table = new ContingencyTable({});
        table.addRow(2);
        expect(table.rows[table.rows.length - 1].every(v => v === 2)).toEqual(
          true
        );
      });

      it('correctly removes a row from the table', () => {
        const table = new ContingencyTable({ initalRows: 2 });
        table.removeRow();
        expect(table.rowCount).toEqual(1);
      });
    });

    describe('Column', () => {
      it('correctly adds a new column to the table', () => {
        const table = new ContingencyTable({});
        table.addColumn();
        expect(table.columnCount).toEqual(2);
      });

      it('fills the newly added column with the provided default value', () => {
        const table = new ContingencyTable({});
        table.addColumn(2);

        // i don't like this tbh maybe add an api to fetsch specific columns?
        const column = table.rows.map(row =>
          row.filter((v, i) => i === table.columnCount - 1)
        );
        expect(column.every(v => v[0] === 2)).toEqual(true);
      });

      it('correctly removes a column from the table', () => {
        const table = new ContingencyTable({ initalColumns: 2 });
        table.removeColumn();
        expect(table.columnCount).toEqual(1);
      });
    });

    describe('Data', () => {
      it('correcty adds and changes value of a data point', () => {
        const table = new ContingencyTable({});
        table.addDataPoint(2, 0, 0);
        expect(table.rows[0][0]).toEqual(2);
        table.addDataPoint(1, 0, 0);
        expect(table.rows[0][0]).toEqual(1);
      });
    });

    describe('Properties', () => {
      it('returns the correct number of uniqueDataPoints in the table', () => {
        const table = new ContingencyTable({ initalRows: 3, initalColumns: 3 });
        expect(table.uniqueDataPoints).toEqual(0);
        table.addDataPoint(3, 1, 1);
        expect(table.uniqueDataPoints).toEqual(1);
      });

      it('returns the correct total of all rows', () => {
        const table = new ContingencyTable({ initalRows: 3, initalColumns: 3 });
        table.addDataPoint(3, 0, 0);
        expect(table.rowTotals).toEqual([3, 0, 0]);
      });

      let table = new ContingencyTable({ initalRows: 3, initalColumns: 3 });

      describe('Totals', () => {
        test.each`
          value | rowIndex | columnIndex | rowTotals    | columnTotals
          ${3}  | ${0}     | ${0}        | ${[3, 0, 0]} | ${[3, 0, 0]}
          ${5}  | ${1}     | ${0}        | ${[3, 5, 0]} | ${[8, 0, 0]}
          ${4}  | ${0}     | ${2}        | ${[7, 5, 0]} | ${[8, 0, 4]}
        `(
          'computes rowTotals and columnTotlas after insertion of ' +
            '$value in row $rowIndex and column $columnIndex',
          ({ value, rowIndex, columnIndex, columnTotals, rowTotals }) => {
            table.addDataPoint(value, rowIndex, columnIndex);
            expect(table.columnTotals).toEqual(columnTotals);
            expect(table.rowTotals).toEqual(rowTotals);
          }
        );
      });
    });
  });
});
