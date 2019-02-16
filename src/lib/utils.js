/**
 * Trys to parse the given String into a number
 * and return NaN if value is not a valid number.
 *
 * @format
 * @param {String} value
 * @returns {*}
 */

export function parseNumber(value) {
  if (value === '') return 0;
  const input = value.replace(/,/g, '.').trim();
  return Number(input);
}
