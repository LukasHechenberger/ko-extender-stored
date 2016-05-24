//if (typeof DEBUG === 'undefined') { DEBUG = true; }

import * as ko from 'knockout';

export default ko.extenders.stored = function(target, name) {
  console.log('Storing observable as ' + name);

  var options = ko.extenders.stored.options;

  var storageName = (
      options.prefix === true ?
        'ko-stored-' :
        options.prefix ?
          options.prefix :
          ''
    ) + name;

  function update(value) {
    if (value === undefined || value === null) {
      localStorage.removeItem(storageName);
    } else {
        console.log(ko.toJSON(value));
      localStorage.setItem(storageName, ko.toJSON(value));
    }
  }

  // Init
  var storedJSON = localStorage.getItem(storageName);
  if (storedJSON) {
    try {
      target(JSON.parse(storedJSON));
    } catch (e) {
      console.error('Invalid JSON string at `' + storageName + '`. ' +
        'If any other part of this application uses LocalStorage ' +
        'double-check it does not change this item. Otherwise ' +
        'you may use the `prefix`-option to prefix stored item names.');
    }
  } else {
    // Value not stored before. Use value of target
    updateko.unwrap(target));
  }

  // Subscribe to changes
  target.subscribe(update);

  return target;
};

ko.extenders.stored.options = {
  prefix: false
};
