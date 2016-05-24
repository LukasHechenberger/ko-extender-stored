import * as ko from 'knockout';

var options = {
  prefix: false
};

export default ko.extenders.stored = function(target, name) {
  var storageName = (
      options.prefix === true ?
        'ko-stored-' :
        options.prefix ?
          options.prefix :
          ''
    ) + name;

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
        console.log('If any other part of this application uses LocalStorage ' +
          'double-check it does not change this item. Otherwise ' +
          'you may use the `prefix`-option to prefix stored item names.');
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

export {options};
ko.extenders.stored.options = options;
