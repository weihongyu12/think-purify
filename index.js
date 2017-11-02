const ThinkPurify = require('./lib/think-purify');

/**
 * extends to think, controller, context
 */
module.exports = {
  controller: {
    purify: data => {
      return (new ThinkPurify()).purify(data);
    }
  },
  context: {
    purify: data => {
      return (new ThinkPurify()).purify(data);
    }
  },
  think: {
    purify: data => {
      return (new ThinkPurify()).purify(data);
    }
  }
};
