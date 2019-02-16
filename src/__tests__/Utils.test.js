/** @format */

import * as utils from '../lib/utils';

describe('Utils', () => {
  describe('ParseNumber', () => {
    const validNumbers = ['0.1', '6', '7.564', '5,684', '6,1', '0.'];
    const invalidNumbers = ['aga', '5,3ffs', '4.12t', 'a.645', '?`ß´33'];

    test.each(validNumbers)('case %#: %s is valid number', number => {
      expect(utils.parseNumber(number)).not.toEqual(Number.NaN);
    });

    test.each(invalidNumbers)('case %#: %s is a invalid number', number => {
      expect(utils.parseNumber(number)).toEqual(Number.NaN);
    });
  });
});
