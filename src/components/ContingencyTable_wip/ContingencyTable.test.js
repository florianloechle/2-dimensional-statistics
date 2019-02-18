/** @format */

import ContingencyTable from './index';
import React from 'react';
import { render, cleanup, fireEvent, wait } from 'react-testing-library';

afterEach(cleanup);

function renderTable(props = {}) {
  const utils = render(<ContingencyTable {...props} />);
  const rows = Array.from(utils.container.querySelectorAll('tr')).map(row =>
    row.querySelectorAll('input')
  );
  const y = rows.map(row => row[0]);
  const x = rows[0];
  const rowLength = rows.length - 2;
  const columnLength = rows[0].length;

  return {
    utils,
    rowLength,
    columnLength,
    renderedRows: rows,
    renderedX: x,
    renderedY: y,
  };
}

describe('ContingencyTable Component', () => {
  it('renders without crashing', () => {
    render(<ContingencyTable />);
  });

  describe('Initilization', () => {
    it('default initializes with 4 rows and 4 columns', () => {
      const { rowLength, columnLength } = renderTable();
      expect(rowLength).toEqual(4);
      expect(columnLength).toEqual(4);
    });

    it('can be initialized with custom rows and columns', () => {
      const { rowLength, columnLength } = renderTable({
        initalColumns: 1,
        initalRows: 5,
      });
      expect(rowLength).toEqual(5);
      expect(columnLength).toEqual(1);
    });

    it('fills the table with a default value of 0', () => {
      const { utils } = renderTable();
      // 4 * 4 rows and 4 x header and 4 y header
      expect(utils.getAllByValue(/0/).length).toEqual(4 * 4 + 4 + 4);
    });
  });

  // figure otu a way to make this work
  /* describe('Value Changes', () => {
    it('calls its onDataChange handler with the correct information', () => {
      const handler = jest.fn();
      const { renderedRows } = renderTable({ onDataChange: handler });
      fireEvent.change(renderedRows[1][0], { target: { value: '1' } });
      expect(handler).toHaveBeenCalled();
    });
  }); */
});
