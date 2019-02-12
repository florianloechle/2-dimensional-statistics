/** @format */

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Layout from './index';

afterEach(cleanup);

function renderLayout(props) {
  const utils = render(<Layout {...props} />);
  return utils;
}

describe('Layout Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<Layout />)).not.toThrow();
  });

  it('renders the header', () => {
    const { container } = render(<Layout />);
    const header = container.querySelectorAll('header');
    expect(header.length).toEqual(1);
  });

  it('renders the footer', () => {
    const { container } = render(<Layout />);
    const footer = container.querySelectorAll('footer');
    expect(footer.length).toEqual(1);
  });

  it('renders the children inside the main tag', () => {
    const { getByTestId } = renderLayout({
      children: <div data-testid="content" />,
    });

    const element = getByTestId('content');
    expect(element.parentElement.tagName).toEqual('MAIN');
  });
});
