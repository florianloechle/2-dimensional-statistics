/** @format */

import React from 'react';

const TableRow = ({ row = [], rowTotal, onValueChange, rowIndex }) => (
  <tr>
    <td>
      <input
        className="tdY"
        type="number"
        onInput={e => onValueChange(e, 0, 0)}
      />
    </td>
    {row.map((value, valueIndex) => (
      <td key={valueIndex}>
        <input
          type="number"
          value={value}
          onChange={e => onValueChange(e, rowIndex, valueIndex)}
        />
      </td>
    ))}
    <td>{rowTotal}</td>
  </tr>
);

const DataTable = ({ rows = [], rowTotals, onValueChange }) => {
  return (
    <>
      {rows.map((row, i) => (
        <TableRow
          rowTotal={rowTotals[i]}
          key={i}
          rowIndex={i}
          row={row}
          onValueChange={onValueChange}
        />
      ))}
    </>
  );
};

export default DataTable;
