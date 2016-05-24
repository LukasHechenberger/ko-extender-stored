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

> This project requires Knockout to be added **before** itself.
> 
> As you may have seen, the download contains multiple files named `ko-extender-stored.js`.
> Refer to [Which file to use](#which-file-to-use) to get the best out of this project.

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

> The following options can be passed to `ko.extenders.stored.options`.
> E.g. (using AMD):
>
> ```javascript
> define(['knockout', 'ko-extender-stored'], function(ko) {
>   ko.extenders.stored.options.anOption = theValueToSet;
> });
> ```
> 
> Note that options must be set **before** using the extender.

**prefix**

In some cases it may be required to prefix the stored item names.
In this case set `ko.extenders.stored.options.prefix` to true (to use the default prefix) or a string containing the prefix you want to use.

## Further Info

### Which file to use

The download contains multiple versions of the main file:

| Path                                  | Content               | Usage                                                                                    |
|---------------------------------------|-----------------------|------------------------------------------------------------------------------------------|
| `out/dist/ko-extender-stored.js`      | Main production build | Can be used as AMD, CommonJS or browser global module, minified.                         |
| `out/dist/amd/ko-extender-stored.js`  | AMD production build  | Can be used as an AMD module, minified.                                                  |
| `out/debug/ko-extender-stored.js`     | Main debug build      | Can be used as AMD, CommonJS or browser global module, prints debug messages to console. |
| `out/debug/amd/ko-extender-stored.js` | AMD debug build       | Can be used as an AMD module, prints debug messages to console.                          |
| `src/ko-extender-stored.js`           | ES6 Source module     | Useful if you want to generate custom builds.                                            |
