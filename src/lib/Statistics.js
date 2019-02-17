/** @format */

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
   * @param {Array} samples     Two dimensional array
   * @returns {Statistics}
   */
  constructor(samples) {
    if (!Array.isArray(samples)) {
      throw new TypeError('Expected the samples to be an array');
    }

    this.raw = samples;

    this.numberOfValues = samples.length;
    this.samples = samples.reduce(
      (acc, [x, y]) => {
        acc.x.push(x);
        acc.y.push(y);

        return acc;
      },
      { x: [], y: [] }
    );

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
      const { x } = this.variance;
      const { x: meanX, y: meanY } = this.mean;
      const m = this.covariance / x;
      const b = meanY - m * meanX;

      let points = [];
      // i dont know if it makes sense to compute all points
      // i think first and last should be sufficent to draw a line? :)
      for (let i = 0; i < this.numberOfValues; i++) {
        const x = this.samples.x[i];
        const y = m * x + b;

        points.push({ x, y });
      }

      return points;
    });
  }

  /**
   * Return regression line details with quality
   * @property
   * @returns {Object}
   */
  get regressionLineDetails() {
    return this._memoize('regressionLineDetails', () => {
      const { x } = this.variance;
      const { x: meanX, y: meanY } = this.mean;
      const m = this.covariance / x;
      const b = meanY - m * meanX;
      const quality = Math.pow(this.correlationCoefficient, 2);

      let details = {
        m: m,
        b: b,
        quality: quality,
      };

      return details;
    });
  }

  /**
   * Calculates the mean value of all values in the proviced array.
   * @static
   * @param {Array} samples
   * @returns {Number}
   */
  static mean(samples) {
    return samples.reduce((acc, s) => acc + s) / samples.length;
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

  static createFromTable(matrix, x, y) {
    const result = [];
    for (let i = 0; i < y.length; i++) {
      for (let j = 0; j < x.length; j++) {
        for (let count = 0; count < matrix[i][j]; count++) {
          result.push([x[j], y[i]]);
        }
      }
    }
    return result;
  }
}

// Alias
Statistics.average = Statistics.mean;
