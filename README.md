# ko-extender-stored

> [Knockout.js](http://knockoutjs.com) extender that stores observables in the browser's LocalStorage.

## Download

**Using Bower (preferred)**

This project is available through the [Bower](http://bower.io) package manager.
To download the project run

```bash
bower install ko-extender-stored
```

**Using GitHub releases**

You can also use the [GitHub Release-Page](https://github.com/LukasHechenberger/ko-extender-stored/releases) to download this project.

## Installation

> Note that this project requires Knockout to be added before itself

**Using AMD (preferred)**

Just define Knockout.js and *ko-extender-stored* as dependencies of the modules that use the extender.
E.g.:

```javascript
define(['knockout', 'ko-extender-stored'], function(ko) {
    // ko-extender-stored is available as ko.extenders.stored
})
```

**Using a `<script>`-Tag**

Simply reference the main-file after importing Knockout.js within the HTML `head` or `body`:

```html
<script src="path/to/knockout.js"></script>
<script src="path/to/ko-extender-stored.js"></script>
```

## Usage

Just like a regular [Knockout extender](http://knockoutjs.com/documentation/extenders.html).

```javascript
var storedObservable = ko.observable('initial value').extend({stored: 'testVar'});
```

In this example, *storedObservable* is stored in LocalStorage as *testVar*.
If LocalStorage already contains an item named *testVar*, the extender uses the stored value.

## Options

**prefix**

In some cases it may be required to prefix the stored item names.
In this case set `ko.extenders.stored.options.prefix` to true (to use the default prefix) or a string containing the prefix you want to use.
