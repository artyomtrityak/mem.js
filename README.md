Mem.js
===================

[![Build Status](https://travis-ci.org/artyomtrityak/mem.js.png?branch=master)](https://travis-ci.org/artyomtrityak/mem.js)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


JavaScript memory management library. Works good with Backbone.js apps

## Intro

Mem.js manages functions and objects. It allows save, get and cleanup outdates instanses.


It's often for MV* framerowks to "lost" some views / models which are not using any more but still present in memory.


Also it helps reuse views / models / functions after routing.

## Usage

### Require.js AMD

```js
requirejs.config({
  baseUrl: 'static/',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    underscore: 'assets/js/underscore',
    mem: 'assets/js/mem'
  },

  shim: {
    mem: {
      deps: ['underscore'],
      exports: 'Mem'
    }
  }
});
```

### CommonJS

```js
var Mem = require('mem');

```

### Old style

```html
<script src="assets/js/underscore.js" />
<script src="assets/js/mem.js" />
```

##Dependencies

- [Underscore.js](http://underscorejs.org/) or [Lo-Dash](http://lodash.com/)
