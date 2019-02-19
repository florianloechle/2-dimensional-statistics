/** @format */

import Statistics from '../lib/Statistics';

const providedSample = [
  [20, 0.2],
  [20, 0.3],
  [30, 0.3],
  [20, 0.3],
  [30, 0.4],
  [20, 0.1],
  [30, 0.3],
  [40, 0.3],
  [10, 0.1],
  [40, 0.2],
  [30, 0.3],
  [40, 0.3],
  [30, 0.3],
  [20, 0.1],
  [30, 0.3],
  [40, 0.3],
  [30, 0.4],
  [10, 0.1],
  [20, 0.3],
  [10, 0.2],
  [30, 0.3],
  [20, 0.3],
  [10, 0.2],
  [40, 0.3],
  [30, 0.2],
];

describe('The Statistics class', () => {
  const oneDimensionSample = [
    [6, 6, 6],
    [165, 178, 172, 195, 184, 168, 177, 184, 176, 171],
    [79, 70, 75, 100, 75, 60, 78, 92, 70, 71],
  ];

  describe('The public API', () => {
    it('exposes the right static functions', () => {
      expect(Statistics.average).toBeDefined();
      expect(Statistics.mean).toBeDefined();
      expect(Statistics.variance).toBeDefined();
    });

    it('exposes the right property getters', () => {
      const stats = new Statistics(providedSample);

      expect(stats.variance).toBeDefined();
      expect(stats.mean).toBeDefined();
      expect(stats.correlationCoefficient).toBeDefined();
      expect(stats.regressionLine).toBeDefined();
    });
  });

  describe('Average (mean)', () => {
    test.each`
      oneDimensionSample       | expected
      ${oneDimensionSample[0]} | ${6}
      ${oneDimensionSample[1]} | ${177}
      ${oneDimensionSample[2]} | ${77}
    `(
      'returns $expected for $oneDimensionSample',
      ({ oneDimensionSample, expected }) => {
        expect(Statistics.mean(oneDimensionSample)).toBe(expected);
      }
    );
  });

  describe('Variance', () => {
    test.each`
      oneDimensionSample       | expected
      ${[0, 0]}                | ${0}
      ${oneDimensionSample[0]} | ${0}
      ${oneDimensionSample[1]} | ${78.88889}
      ${oneDimensionSample[2]} | ${132.22222}
    `(
      'returns $expected for $oneDimensionSample',
      ({ oneDimensionSample, expected }) => {
        expect(Number(Statistics.variance(oneDimensionSample).toFixed(5))).toBe(
          expected
        );
      }
    );
  });

  describe('Initilization', () => {
    it('inititalizes with a multidimensional array', () => {
      expect(() => new Statistics(providedSample)).not.toThrow();
    });

    it('creates a new Statistic object with the factory function', () => {
      const matrix = [[1, 2]];
      const x = [1, 2];
      const y = [0.5, 1];
      let stats = null;
      expect(() => {
        stats = Statistics.createFromTable(matrix, x, y);
      }).not.toThrow();
    });
  });

  describe('Properties', () => {
    const stats = new Statistics(providedSample);

    it('returns the correct mean for both x and y values', () => {
      const means = stats.mean;
      expect(means).toBeInstanceOf(Object);
      expect(means).toMatchObject({ x: 26, y: 0.256 });
    });

    it('returns the correct variance for both x and y values', () => {
      const variances = stats.variance;
      expect(variances).toBeInstanceOf(Object);
      expect(variances).toMatchObject({ x: 100, y: 0.007566666666666663 });
    });

    it('returns the correct covariance', () => {
      const covariance = stats.covariance;
      expect(covariance).toEqual(0.4833333333333334);
    });

    it('returns the correct correlationCoefficient', () => {
      const cC = stats.correlationCoefficient;
      expect(cC).toEqual(0.5556412072985271);
    });

    it('computes the correct regression line', () => {
      const regressionLine = stats.regressionLine;

      // TODO: need to add checks
    });
  });
});
