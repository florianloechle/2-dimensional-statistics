/** @format */

import React from 'react';

const TableRow = ({ row = [], yThead, onValueChange, rowIndex }) => (
  <tr>
    <td>
      <input
        className="tdY"
        type="number"
        value={yThead}
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
  </tr>
);

const DataTable = ({ rows = [], yThead = [], onValueChange, errors }) => {
  return (
    <>
      {rows.map((row, i) => (
        <TableRow
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
