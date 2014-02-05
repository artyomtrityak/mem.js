//     Mem.js 0.1.0
//     (c) Artyom Trityak
//     Mem.js may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/artyomtrityak/mem.js

(function(root, factory) {

  // Set up Mem.js appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'exports'], function(_, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others.
      root.Mem = factory(root, exports, _);
      return root.Mem;
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Mem = factory(root, {}, root._);
  }

}(this, function(root, exports, _) {

  var Mem = function() {},
      removeMethods = ['dispose', 'remove'],
      removeMethodsLen = removeMethods.length,
      compositions = {},
      createNewInstance;

  createNewInstance = function(fn, params) {
    function ScopedFN(params) {
      return fn.apply(this, params);
    }
    ScopedFN.prototype = fn.prototype;
    return new ScopedFN(params);
  };
  
  Mem.prototype.set = function(name, fn) {
    //Parse all other params to array
    var params = arguments.length > 2 ? [].slice.call(arguments, 2) : [];
    var curComp = compositions[name];
    if (curComp && curComp.fn === fn && _.isEqual(curComp.params, params)) {
      curComp.cheanup = false;
      return curComp.ins;
    }
    //save fn to fn, create new instance and save it to ins, set cheanup to false
    compositions[name] = {
      fn: fn,
      cheanup: false,
      ins: createNewInstance(fn, params),
      params: params
    };
    return this.get(name);
  };

  Mem.prototype.unset = function(name) {
    if (!name) {
      compositions = {};
      return; 
    }
    var currentComp = compositions[name];
    if (!currentComp) {
      return;
    }

    for(var i=0; i<removeMethodsLen; i++) {
      var method = removeMethods[i],
          methodFn = currentComp.ins[method];
      if (methodFn && typeof methodFn === 'function') {
        methodFn.call(currentComp.ins);
      }
    }
    compositions[name] = null;
    return this;
  };

  Mem.prototype.get = function(name) {
    if (compositions[name]) {
      return compositions[name].ins;
    }
  };

  Mem.prototype.reset = function(name) {
    var names = name ? [name] : _.keys(compositions);

    for(var i=0, namesLen=names.length; i<namesLen; i++) {
      var curComp = compositions[name];
      if (!curComp) {
        continue;
      }
      this.unset(name);
      curComp.params.unshift(name, curComp.fn);
      this.set.apply(this, curComp.params);
    }
    return this;
  };

  Mem.prototype.manage = function() {
    //TODO: Remove (call dispose, remove) all compositions which has cheanup===true
    //TODO: Set to all compositions cheanup===true
  };

  return new Mem();
}));