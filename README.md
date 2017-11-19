# think-purify
[![npm](https://img.shields.io/npm/v/think-purify..svg)](https://www.npmjs.com/package/think-purify)
[![Build Status](https://travis-ci.org/weihongyu12/think-purify.svg?branch=master)](https://travis-ci.org/weihongyu12/think-purify)

Use the [HTML5 Purify](https://www.npmjs.com/package/html-purify) extension in ThinkJS

## How to use

### Install

```bash
npm install think-purify --save
```

### Configure extends.js
```javascript
const purify = require('think-purify')

module.exports = [
 purify
];
```
### Use in controller, context or think

```javascript
module.exports = class extends Base {
  indexAction() {
    const html = this.post('html')
    const result = this.purify(html); // Filtering dangerous html tags and attributes
    return this.display();
  }
};
```
