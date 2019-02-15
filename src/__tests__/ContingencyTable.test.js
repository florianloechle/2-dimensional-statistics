/** @format */

import ContingencyTable from '../lib/ContigencyTable';

const providedSample = [
  {
    data: [
      [20, 0.2],
      [20, 0.3],
      [30, 0.3],
      [20, 0.3],
      [30, 0.4],
      [20, 0.1],
      [30, 0.3],
      [40, 0.3],
      [10, 0.1],
      [40, 0.2],
      [30, 0.3],
      [40, 0.3],
      [30, 0.3],
      [20, 0.1],
      [30, 0.3],
      [40, 0.3],
      [30, 0.4],
      [10, 0.1],
      [20, 0.3],
      [10, 0.2],
      [30, 0.3],
      [20, 0.3],
      [10, 0.2],
      [40, 0.3],
      [30, 0.2],
    ],
    expectedTable: {
      x: [10, 20, 30, 40],
      y: [0.1, 0.2, 0.3, 0.4],
      occurences: [[2, 2, 0, 0], [2, 1, 1, 1], [0, 4, 6, 4], [0, 0, 2, 0]],
    },
    expectedTotals: {
      y: [4, 7, 9, 5],
      x: [4, 5, 14, 2],
    },
    expectedUniquePoints: 10,
  },
];

describe('ContigencyTable', () => {
  describe('The public API', () => {
    it('exposes the correct public API', () => {
      const table = new ContingencyTable({});
      expect(table).toHaveProperty('removeRow');
      expect(table).toHaveProperty('removeColumn');
      expect(table).toHaveProperty('addRow');
      expect(table).toHaveProperty('addColumn');
      expect(table).toHaveProperty('totals');
      expect(ContingencyTable).toHaveProperty('createFromArray');
      expect(table).toHaveProperty('addOcurrency');
      expect(table).toHaveProperty('addXValue');
      expect(table).toHaveProperty('addYValue');
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

      it('can be created using the provied factory method', () => {
        expect(() =>
          ContingencyTable.createFromArray(providedSample[0].data)
        ).not.toThrow();
      });
    });

    describe('Row', () => {
      it('correctly adds a new row to the table', () => {
        const table = new ContingencyTable({});
        table.addRow();
        expect(table.rows.length).toEqual(2);
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
        expect(table.rows.length).toEqual(2);
      });
    });

    describe('Column', () => {
      it('correctly adds a new column to the table', () => {
        const table = new ContingencyTable({});
        table.addColumn();
        expect(table.rows.every(row => row.length === 1)).toEqual(true);
      });

      it('fills the newly added column with the provided default value', () => {
        const table = new ContingencyTable({});
        table.addColumn();

        // i don't like this tbh maybe add an api to fetsch specific columns?
        const column = table.rows.reduce(
          (acc, row) => [...acc, row[row.length - 1]],
          []
        );
        expect(column.every(v => v === 0)).toEqual(true);
      });

      it('correctly removes a column from the table', () => {
        const table = new ContingencyTable({ initalColumns: 2 });
        table.removeColumn();
        expect(table.rows.every(row => row.length === 2)).toEqual(true);
      });
    });

    describe('Data', () => {
      const table = new ContingencyTable({});

      it('correcty adds and changes value of a data point', () => {
        table.addOcurrency(2, 0, 0);
        expect(table.rows[0][0]).toEqual(2);
        table.addOcurrency(1, 0, 0);
        expect(table.rows[0][0]).toEqual(1);
      });

      it('correctly sets and changes a X value', () => {
        table.addXValue(3.4, 0);
        expect(table.x).toEqual([3.4]);
        table.addXValue(1, 0);
        expect(table.x).toEqual([1]);
      });

      it('correctly sets and changes a Y value', () => {
        table.addYValue(3.4, 0);
        expect(table.y).toEqual([3.4]);
        table.addYValue(1, 0);
        expect(table.y).toEqual([1]);
      });
    });

    describe('Properties', () => {
      let table = new ContingencyTable({ initalRows: 3, initalColumns: 3 });

      describe('Totals', () => {
        let count = 0;
        test.each`
          value | rowIndex | columnIndex | rowTotals    | columnTotals
          ${3}  | ${0}     | ${0}        | ${[3, 0, 0]} | ${[3, 0, 0]}
          ${5}  | ${1}     | ${0}        | ${[3, 5, 0]} | ${[8, 0, 0]}
          ${4}  | ${0}     | ${2}        | ${[7, 5, 0]} | ${[8, 0, 4]}
        `(
          'computes rowTotals and columnTotlas after insertion of ' +
            '$value in row $rowIndex and column $columnIndex',
          ({ value, rowIndex, columnIndex, columnTotals, rowTotals }) => {
            table.addOcurrency(value, rowIndex, columnIndex);
            expect(table.totals).toEqual({
              columnTotal: columnTotals,
              rowTotal: rowTotals,
              uniquePoints: ++count,
              sum: rowTotals.reduce((acc, v) => acc + v),
            });
          }
        );
      });
    });

    describe('Real data test cases', () => {
      it('handles various test data gracefully', () => {
        providedSample.forEach(
          ({ expectedTable, expectedTotals, data, expectedUniquePoints }) => {
            const table = ContingencyTable.createFromArray(data);
            expect(table.rows).toEqual(expectedTable.occurences);
            expect(table.x).toEqual(expectedTable.x);
            expect(table.y).toEqual(expectedTable.y);
          }
        );
      });
    });
  });
});
