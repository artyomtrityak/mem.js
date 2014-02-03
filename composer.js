//     Composer 0.1.0
//     (c) Artyom Trityak
//     Composer may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/artyomtrityak/composer

(function(root, factory) {

  // Set up Composer appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(function() {
      // Export global even in AMD case in case this script is loaded with
      // others.
      root.Composer = factory(root, exports);
      return root.Composer;
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {;
    factory(root, exports);

  // Finally, as a browser global.
  } else {
    root.Composer = factory(root, {});
  }

}(this, function(root, exports) {

  var Composer;

  return Composer;
}));