/** @format */

import React from 'react';

const AddRemove = ({
  vertical,
  onAdd,
  onRemove,
  disableAdd,
  disableRemove,
}) => (
  <div className={vertical ? 'btn-group-vertical' : 'btn-group'}>
    <button
      type="button"
      disabled={disableAdd}
      className="btn btn-success btn-sm pl-3 pr-3"
      onClick={onAdd}
    >
      +
    </button>
    <button
      type="button"
      disabled={disableRemove}
      className="btn btn-danger btn-sm pl-3 pr-3"
      onClick={onRemove}
    >
      -
    </button>
  </div>
);

export default React.memo(AddRemove);
