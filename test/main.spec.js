define(['knockout', 'ko-extender-stored'], function(ko) {

  var storagePath = 'path';

  describe('Extender', function() {
    beforeAll(function() {
      localStorage.removeItem(storagePath);
    });

    it('Should be available', function() {
      expect(ko.extenders.stored).toBeDefined();
    });

    it('Should store initial value', function() {
      var test = ko.observable('InitialValue').extend({stored: storagePath});
      expect(test()).toEqual('InitialValue');
    });

    it('Should take previous stored value', function() {
      var test = ko.observable().extend({stored: storagePath});
      expect(test()).toEqual('InitialValue');
    });

    it('Stored value should override initial value', function() {
      var test = ko.observable('AnotherValue').extend({stored: storagePath});
      expect(test()).toEqual('InitialValue');
    });

    it('Should remove stored item if null is set', function() {
      var test = ko.observable('AnotherValue').extend({stored: storagePath});
      test(null);
      expect(test()).toBeNull();
      expect(localStorage.getItem(storagePath)).toBeNull();
    });

    it('Should log error if stored value is not valid json', function() {
      spyOn(console, 'error');

      localStorage.setItem(storagePath, '#+asdf');
      ko.observable().extend({stored: storagePath});

      expect(console.error).toHaveBeenCalled();
    });

    describe('Type Safety', function() {

      beforeEach(function() {
        localStorage.removeItem(storagePath);
      });

      it('Should store boolean values as booleans', function() {
        var test = ko.observable(true).extend({stored: storagePath});
        expect(test()).toEqual(true);

        test(false);
        expect(test()).toEqual(false);
      });

      it('Should store numbers as numbers', function() {
        var test = ko.observable(13).extend({stored: storagePath});
        expect(test()).toEqual(13);
      });

      it('Should store strings as strings', function() {
        var test = ko.observable('a string').extend({stored: storagePath});
        expect(test()).toEqual('a string');
      });

      it('Should keep array item types', function() {
        var test = ko.observable([13, 'a string']).extend({stored: storagePath});
        expect(test()).toEqual([13, 'a string']);
      });

      it('Should keep object property types', function() {
        var test = ko.observable({number: 13, string: 'a string'}).extend({stored: storagePath});
        expect(test()).toEqual({number: 13, string: 'a string'});
      });

    });

    describe('With Observable Array', function() {

      beforeEach(function() {
        localStorage.removeItem(storagePath);
      });

      it('Should work ', function() {
        var test = ko.observableArray([13, 'a string']).extend({stored: storagePath});
        expect(test()).toEqual([13, 'a string']);
      });

      it('Should store pushed items', function() {
        var test = ko.observableArray([13, 'a string']).extend({stored: storagePath});
        test.push(125);
        expect(test()).toEqual([13, 'a string', 125]);
      });

      it('Should remove removed items', function() {
        var test = ko.observableArray([13, 'a string']).extend({stored: storagePath});
        test.remove(13);
        expect(test()).toEqual(['a string']);
      });

    });

    describe('Options', function() {
      it('Should be available', function() {
        expect(ko.extenders.stored.options).toBeDefined();
      });
      
      describe('Prefix', function() {
        
        it('Should prefix storage paths if set to true', function() {
          ko.extenders.stored.options.prefix = true;
          
          var value = new Date().getTime();
          var test = ko.observable().extend({stored: storagePath});
          test(value);
          
          expect(test()).toEqual(value);
          var stored = localStorage.getItem('ko-extender-str')
          expect(text)
        });
        
      });
      
    });
  });

});
