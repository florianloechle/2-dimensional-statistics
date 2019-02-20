/** @format */

import { sortAscending } from './utils';

export default class Statistics {
  /**
   * Constructs a new statistics object to get
   * various statistical values from provided sample.
   *
   * Example Input:
   *
   * Array = [
   *  [2,5]
   *  [6,6]
   *  [4,8]
   * ]
   *
   * @param {Matrix} samples     Two dimensional array
   * @returns {Statistics}
   */
  constructor(samples) {
    // check if possibly matrix
    if (!Array.isArray(samples)) {
      // check if defininetly matrix
      if (!Array.isArray(samples[0])) {
        throw new TypeError('Expected the samples to be an array');
      }
    }

    //  save the number of poinst in the matrix
    this.numberOfValues = samples.length;
    this.raw = samples;
    this.samples = samples.reduce(
      (acc, [x, y]) => {
        acc.x.push(x);
        acc.y.push(y);

        return acc;
      },
      { x: [], y: [] }
    );

    // since we need stuff like mean etc. repeatedly
    // we just cache the results and avoid unnecessary recomputations.
    this._cache = new Map();
    this._memoize = (key, fn) => {
      if (this._cache.get(key)) return this._cache.get(key);
      return this._cache.set(key, fn()).get(key);
    };
  }

  /**
   * Returns the computed mean for both dimensions x and y
   * @property
   * @returns {Object}
   */
  get mean() {
    return this._memoize('mean', () => ({
      x: Statistics.mean(this.samples.x),
      y: Statistics.mean(this.samples.y),
    }));
  }

  /**
   * Returns the computed variance of both dimensions x and y
   * @property
   * @returns {Object}
   */
  get variance() {
    return this._memoize('variance', () => ({
      x: Statistics.variance(this.samples.x),
      y: Statistics.variance(this.samples.y),
    }));
  }

  /**
   * Returns the computed convariance for values x and y
   * @property
   * @returns {Number}
   */
  get covariance() {
    return this._memoize('covariance', () => {
      const { x: meanX, y: meanY } = this.mean;
      const { x, y } = this.samples;

      let total = 0;
      for (let i = 0; i < this.numberOfValues; i++) {
        total += (x[i] - meanX) * (y[i] - meanY);
      }
      return (1 / (this.numberOfValues - 1)) * total;
    });
  }

  /**
   * Return the computed correlation Coefficient for values x and y
   * @property
   * @returns {Number}
   */
  get correlationCoefficient() {
    return this._memoize('correlationCoefficient', () => {
      const { x: varX, y: varY } = this.variance;
      return this.covariance !== 0
        ? this.covariance / Math.sqrt(varX * varY)
        : 0;
    });
  }

  /**
   * Returns the points of the regression line as objects
   * with x and y properties.
   * @property
   * @returns {Array}
   */
  get regressionLine() {
    return this._memoize('regressionLine', () => {
      const { x: sX } = this.variance;
      const { x: meanX, y: meanY } = this.mean;
      const m = this.covariance / sX;
      const b = meanY - m * meanX;
      const quality = Math.pow(this.correlationCoefficient, 2);
      const xSamples = this.samples.x.sort(sortAscending);
      let points = [];

      for (let i = 0; i < this.numberOfValues; i++) {
        const x = xSamples[i];
        const y = m * x + b;
        points.push({ x, y });
      }
      return { points, m, b, quality };
    });
  }

  /**
   * Calculates the mean value of all values in the proviced array.
   * @static
   * @param {Array} samples
   * @returns {Number}
   */
  static mean(samples) {
    return samples.reduce((acc, v) => acc + v) / samples.length;
  }

  /**
   * Calculates the variance of a sample of n values.
   * @static
   * @param {Array} samples
   * @returns {Number}
   */
  static variance(samples) {
    const mean = Statistics.mean(samples);
    return (
      (1 / (samples.length - 1)) *
      samples.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0)
    );
  }

  /**
   * Factory function to construct a new statistics object
   * given matrix of occurrences and x and y data values.
   * @param {Matrix} matrix
   * @param {Array} x
   * @param {Array} y
   * @returns {Statistics}
   */
  /* static createFromTable(matrix, x, y) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const occurrence = matrix[i][j];
        if(occurrence && occurrence !== 0) {
          result = [...result, ...new Array(occurrence).fill([x[i], y[j]])];
        }
      }
    }
    return new Statistics(result);
  } */

  static createFromTable(matrix, x, y) {
    const result = [];
    for (let i = 0; i < y.length; i++) {
      for (let j = 0; j < x.length; j++) {
        for (let count = 0; count < matrix[i][j]; count++) {
          result.push([x[j], y[i]]);
        }
      }
    }
    return new Statistics(result);
  }
}

// Alias
Statistics.average = Statistics.mean;
