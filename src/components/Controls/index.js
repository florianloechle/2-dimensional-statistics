/** @format */

import React from 'react';

/**
 * Renders a row with two buttons to calculate and reset the table.
 * @param {Props} param0
 */
const Controls = ({ onCompute, onReset }) => (
  <div
    className="btn-group"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <button type="button" className="btn btn-danger" onClick={onReset}>
      Reset
    </button>
    <button type="button" className="btn btn-dark" onClick={onCompute}>
      Berechnen
    </button>
  </div>
);

export default React.memo(Controls);
