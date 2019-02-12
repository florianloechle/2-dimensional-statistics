/** @format */

import React from 'react';
import { render } from 'react-testing-library';
import Footer from './index';

describe('Footer Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });
});
