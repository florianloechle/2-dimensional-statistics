/** @format */

import Statistics from '../lib/Statistics';

describe('The Statistics class', () => {
  const samples = [
    [6, 6, 6],
    [165, 178, 172, 195, 184, 168, 177, 184, 176, 171],
    [79, 70, 75, 100, 75, 60, 78, 92, 70, 71],
  ];

  describe('Average (mean)', () => {
    test.each`
      samples       | expected
      ${samples[0]} | ${6}
      ${samples[1]} | ${177}
      ${samples[2]} | ${77}
    `('returns $expected for $samples', ({ samples, expected }) => {
      expect(Statistics.mean(samples)).toBe(expected);
    });
  });

  describe('Variance', () => {
    test.each`
      samples       | expected
      ${samples[0]} | ${0}
      ${samples[1]} | ${78.88889}
      ${samples[2]} | ${132.22222}
    `('returns $expected for $samples', ({ samples, expected }) => {
      expect(Number(Statistics.variance(samples).toFixed(5))).toBe(expected);
    });
  });
});
