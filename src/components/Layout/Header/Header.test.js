/** @format */

import React from 'react';
import { render } from 'react-testing-library';
import Header from './index';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<Header />)).not.toThrow();
  });
});
