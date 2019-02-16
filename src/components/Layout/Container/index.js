/** @format */

import React from 'react';

/**
 * Component that renders its children in a bootstrap container.
 * @param {Object} props
 */
const Container = ({ children }) => (
  <div className="container-fluid">{children}</div>
);

export default Container;
