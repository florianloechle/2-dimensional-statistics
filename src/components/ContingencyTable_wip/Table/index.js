/** @format */

import React from 'react';
import styles from './Table.module.css';
import clsx from 'clsx';

const BaseTable = ({ children }) => (
  <table className={'table table-hover table-sm ' + styles.table}>
    <tbody>{children}</tbody>
  </table>
);

const TableCell = React.memo(({ type = 'td', dark, danger, ...rest }) =>
  React.createElement(type, {
    className: clsx({ 'table-dark': dark, 'table-danger': danger }),
    ...rest,
  })
);

const TableRow = React.memo(({ dark, ...rest }) =>
  React.createElement('tr', {
    className: `${styles.row} ${dark ? 'table-dark' : ''}`,
    ...rest,
  })
);

const TableInput = React.memo(props =>
  React.createElement('input', { type: 'text', placeholder: 'Wert', ...props })
);

export { BaseTable, TableCell, TableRow, TableInput };
