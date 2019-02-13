/** @format */

import React from 'react';

const TableRow = ({
  row = [],
  y,
  rowTotal,
  onValueChange,
  rowIndex,
  errors,
}) => (
  <tr>
    {y}
    {row.map((value, valueIndex) => (
      <td className="error" key={valueIndex}>
        <input
          style={
            errors.includes(valueIndex)
              ? {
                  textDecoration: 'underline',
                  textDecorationColor: 'red',
                  color: 'red',
                }
              : null
          }
          placeholder="Wert.."
          type="text"
          defaultValue={value}
          onChange={e => onValueChange(e, rowIndex, valueIndex)}
        />
      </td>
    ))}
    <td>{rowTotal}</td>
  </tr>
);

const DataTable = ({
  rows = [],
  columnTotals = [],
  rowTotals,
  y = [],
  onValueChange,
  errors,
  sumError,
}) => {
  return (
    <>
      {rows.map((row, i) => {
        return (
          <TableRow
            key={i}
            errors={errors.reduce(
              (err, position) =>
                position[0] === i ? [...err, position[1]] : err,
              []
            )}
            rowIndex={i}
            row={row}
            y={y[i]}
            rowTotal={rowTotals[i]}
            onValueChange={onValueChange}
          />
        );
      })}
      <tr>
        <th>Summen</th>
        {columnTotals.map((v, i) => (
          <td key={i}>{v}</td>
        ))}
        <td
          style={
            sumError
              ? {
                  textDecoration: 'underline',
                  textDecorationColor: 'red',
                  color: 'red',
                }
              : null
          }
        >
          {columnTotals.reduce((acc, v) => acc + v)}
        </td>
      </tr>
    </>
  );
};

export default DataTable;
