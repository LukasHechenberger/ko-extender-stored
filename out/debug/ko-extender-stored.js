(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'knockout'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('knockout'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.knockout);
    global.koExtenderStored = mod.exports;
  }
})(this, function (exports, _knockout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.options = undefined;

  var ko = _interopRequireWildcard(_knockout);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var options = {
    prefix: false
  };

  exports.default = ko.extenders.stored = function (target, name) {
    var storageName = (options.prefix === true ? 'ko-stored-' : options.prefix ? options.prefix : '') + name;

    if (typeof DEBUG === 'undefined') {
      console.log('Storing observable as ' + storageName);
    }

    function update(value) {
      if (value === undefined || value === null) {
        localStorage.removeItem(storageName);
      } else {
        localStorage.setItem(storageName, ko.toJSON(value));
      }
    }

    // Init
    var storedJSON = localStorage.getItem(storageName);
    if (storedJSON) {
      try {
        target(JSON.parse(storedJSON));
      } catch (e) {
        console.error('Invalid JSON string at `' + storageName + '`.');

        if (typeof DEBUG === 'undefined') {
          console.log('If any other part of this application uses LocalStorage ' + 'double-check it does not change this item. Otherwise ' + 'you may use the `prefix`-option to prefix stored item names.');
        }
      }
    } else {
      // Value not stored before. Use value of target
      update(ko.unwrap(target));
    }

    // Subscribe to changes
    target.subscribe(update);

    return target;
  };

  exports.options = options;

  ko.extenders.stored.options = options;
});
//# sourceMappingURL=ko-extender-stored.js.map
