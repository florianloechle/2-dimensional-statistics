/** @format */

import React from 'react';

const DataTable = ({ rows, onValueChange, errors }) => (
  <tr>
    {rows.map((arrayDim2, i2) => (
      <td key={i2}>
        <input
          className="tdXY"
          type="number"
          value={arrayDim2}
          onInput={this.handleChangeXY.bind(this, i2)}
        />
      </td>
    ))}
    <td className="tdBold">
      <input disabled value={this.calcHorSum()} />
    </td>
  </tr>
);
