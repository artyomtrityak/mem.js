//     Mem.js 0.2.0
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

  // Mem.js manages functions and objects.
  // It allows save, get and cleanup outdates instanses.
  // It's often for MV* framerowks to "lost" some views / models which
  // are not using any more but still present in memory.
  //
  // Also it helps reuse views / models / functions after routing.
  var Mem = function() {},
      removeMethods = ['dispose', 'remove'],
      removeMethodsLen = removeMethods.length,
      Storage = {},
      createNewInstance,
      callRemoveFn;

  // Creates new function instance or store object for next reusage
  createNewInstance = function(fn, params) {
    if (typeof fn !== 'function') {
      return fn;
    }
    function ScopedFN(params) {
      return fn.apply(this, params);
    }
    ScopedFN.prototype = fn.prototype;
    return new ScopedFN(params);
  };
  
  // Stores functions / object for next reusage. Invokes fn with passed params
  // or store objects / strings / arrays "as it is" 
  Mem.prototype.set = function(name, fn) {
    //Parse all other params to array
    var params = arguments.length > 2 ? [].slice.call(arguments, 2) : [];
    var curComp = Storage[name];
    if (curComp && curComp.fn === fn && _.isEqual(curComp.params, params)) {
      curComp.cleanup = false;
      return curComp.ins;
    }
    // Unsets current stored object before creating new one
    if (curComp) {
      this.unset(name);
    }
    //save fn to fn, create new instance and save it to ins, set cleanup to false
    Storage[name] = {
      fn: fn,
      cleanup: false,
      ins: createNewInstance(fn, params),
      params: params
    };
    return this.get(name);
  };

  // Removes stored object from storage and calls remove and dispose functions
  // Without name param unsets all stored objects
  Mem.prototype.unset = function(name) {
    var names = name ? [name] : _.keys(Storage);
    for(var i = 0, namesLen = names.length; i < namesLen; i++) {
      var storedObj = Storage[names[i]];

      if (!storedObj) {
        continue;
      }

      for(var j = 0; j < removeMethodsLen; j++) {
        var method = removeMethods[j],
            methodFn = storedObj.ins[method];
        if (methodFn && typeof methodFn === 'function') {
          methodFn.call(storedObj.ins);
        }
      }

      delete Storage[names[i]];
    }
    
    return this;
  };

  // Returns stored object
  Mem.prototype.get = function(name) {
    if (Storage[name]) {
      return Storage[name].ins;
    }
  };

  // Unsets stored object by name and sets it back with same params.
  // Without name param resets all stored objects
  Mem.prototype.reset = function(name) {
    var names = name ? [name] : _.keys(Storage);
    for(var i = 0, namesLen = names.length; i < namesLen; i++) {
      var currentName = names[i],
          currentObj = Storage[currentName];
      if (!currentObj) {
        continue;
      }
      this.unset(currentName);
      currentObj.params.unshift(currentName, currentObj.fn);
      this.set.apply(this, currentObj.params);
    }
    return this;
  };

  // Unsets all outdated objects with cleanup=true state
  // and sets to all other objects cleanup=true state for next cleanup.
  // Mem.set resets cleanup state back to false
  Mem.prototype.manage = function() {
    for(var key in Storage) {
      var storedObj = Storage[key];
      if (!storedObj.cleanup) {
        //Set to all stored objects which is new cleanup=true for next manage
        storedObj.cleanup = true;
        continue;
      }
      this.unset(key);
    }
    return this;
  };

  // Singleton
  return new Mem();
}));