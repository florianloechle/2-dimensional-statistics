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
   * @return {Statistics}
   */
  constructor(samples) {
    if (!Array.isArray(samples)) {
      throw new TypeError('Expected the samples to be an array');
    }

    this.samples = samples.reduce(
      (acc, [x, y]) => {
        acc.x.push(x);
        acc.y.push(y);

        return acc;
      },
      { x: [], y: [] }
    );
  }

  /**
   * Returns the computed mean for both dimensions x and y
   * @property
   * @return {Object}
   */
  get mean() {
    return {
      x: Statistics.mean(this.samples.x),
      y: Statistics.mean(this.samples.y),
    };
  }

  /**
   * Returns the computed variance of both dimensions x and y
   * @property
   */
  get variance() {
    return {
      x: Statistics.variance(this.samples.x),
      y: Statistics.variance(this.samples.y),
    };
  }

  /**
   * Calculates the mean value of all values in the proviced array.
   *
   * @param {Array} samples
   * @return {Number}
   */
  static mean(samples) {
    return samples.reduce((acc, s) => acc + s) / samples.length;
  }

  /**
   * Calculates the variance of a sample of n values.
   *
   *
   *
   * @param {Array} samples
   * @return {Number}
   */
  static variance(samples) {
    const mean = Statistics.mean(samples);
    return (
      (1 / (samples.length - 1)) *
      samples.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0)
    );
  }
}

// Alias
Statistics.average = Statistics.mean;
