/** @format */

import React from 'react';

const TableRow = ({ row = [], rowTotal, onValueChange, rowIndex }) => (
  <>
    {row.map((value, valueIndex) => (
      <td key={valueIndex}>
        <input
          defaultValue={value}
          type="text"
          onChange={e => onValueChange(e, rowIndex, valueIndex)}
        />
      </td>
    ))}
    <td>{rowTotal}</td>
  </>
);

const DataTable = ({
  rows = [],
  onYValueChange,
  rowTotals,
  yValues,
  onDataValueChange,
}) => {
  return (
    <>
      {rows.map((row, i) => (
        <tr key={i}>
          <th scope="row">
            <input
              defaultValue={yValues[i]}
              type="text"
              onChange={e => onYValueChange(e, i)}
            />
          </th>
          <TableRow
            rowTotal={rowTotals[i]}
            rowIndex={i}
            row={row}
            onValueChange={onDataValueChange}
          />
        </tr>
      ))}
    </>
  );
};

export default DataTable;
