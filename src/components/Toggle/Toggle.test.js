/** @format */

import React from 'react';
import SelectionToggle from './index';
import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup);

describe('The Toggle Component', () => {
  it('renders without crashing', () => {
    render(<SelectionToggle />);
  });

  it('default selects the point input', () => {
    const { getByLabelText } = render(<SelectionToggle />);
    const radio = getByLabelText(/punktfolge/i);
    expect(radio.checked).toEqual(true);
  });

  it('changes the selection to table when click on table radio', () => {
    const { getByLabelText } = render(<SelectionToggle />);
    const radio = getByLabelText(/kontingenztafel/i);
    expect(radio).toHaveProperty('checked', false);
    fireEvent.click(radio);
    expect(radio).toHaveProperty('checked', true);
  });

  it('calls the onChange handler when a state change happens', () => {
    const handler = jest.fn();
    const { getByLabelText } = render(<SelectionToggle onChange={handler} />);
    const radio = getByLabelText(/kontingenztafel/i);
    fireEvent.click(radio);
    expect(handler).toHaveBeenCalledWith(true);
  });
});
