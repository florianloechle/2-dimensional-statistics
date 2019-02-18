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

  describe('Evaluate Table', () => {
    const table = [[1, 1, 1, 1], [2, 0, 2, 1], [1, 1, 2, 1]];

    it('returns an object with the right properties', () => {
      const result = utils.evaluateTable(table);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('columnTotal');
      expect(result).toHaveProperty('rowTotal');
      expect(result).toHaveProperty('sum');
    });

    it('evaluats a table correctly and returns the correct values', () => {
      expect(utils.evaluateTable(table)).toEqual({
        columnTotal: [4, 2, 5, 3],
        rowTotal: [4, 5, 5],
        sum: 14,
      });
    });
  });
});
