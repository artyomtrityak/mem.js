//     MemoMan 0.1.0
//     (c) Artyom Trityak
//     MemoMan may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/artyomtrityak/composer

(function(root, factory) {

  // Set up MemoMan appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(function() {
      // Export global even in AMD case in case this script is loaded with
      // others.
      root.MemoMan = factory(root, exports);
      return root.MemoMan;
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    factory(root, exports);

  // Finally, as a browser global.
  } else {
    root.MemoMan = factory(root, {});
  }

}(this, function(root, exports) {

  var MemoMan = function() {},
      compositions = {},
      createNewInstance;

  createNewInstance = function(fn, params) {
    function ScopedFN(params) {
      return fn.apply(this, params);
    }
    ScopedFN.prototype = fn.prototype;
    return new ScopedFN(params);
  }
  
  MemoMan.prototype.set = function(name, fn) {
    //parse all other params to array
    var params = arguments.length > 2 ? [].slice.call(arguments, 2) : [];
    
    var currentComp = compositions[name];
    if (currentComp && currentComp.fn === fn) {
      // TODO: check params one by one
      currentComp.old = false;
      return currentComp.ins;
    }
    //save fn to fn
    //create new instance and save it to ins
    //set old to false
    compositions[name] = {
      fn: fn,
      old: false,
      ins: createNewInstance(fn, params)
    };
    return this.get(name);
  };

  MemoMan.prototype.unset = function(name) {
    if (name) {
      compositions[name] = null;
    } else {
      compositions = {};
    }
  };

  MemoMan.prototype.get = function() {
    return compositions[name];
  };

  MemoMan.prototype.manage = function() {
    //TODO: Remove (call dispose, remove) all compositions which has old===true
    //TODO: Set to all compositions old===true
  };

  return new MemoMan();
}));