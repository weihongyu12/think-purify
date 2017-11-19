/**
 * @author weihongyu<weihongyu12@outlook.com>
 * @version 1.0.0
 */

const Purifier = require('html-purify');

class ThinkPurify {
  constructor() {
    this.purifier = new Purifier();
  }

  /**
   * filter the input string
   * @param {string} data
   */
  purify(data) {
    return this.purifier.purify(data);
  }
}

module.exports = ThinkPurify;
