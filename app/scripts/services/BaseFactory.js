/* globals Firebase */
'use strict';

angular.module('AngularArchitectureApp')
  .factory('BaseFactory', function () {
    // Service logic
    // ...

    var _url = null,
        _DB = null,
        _items = null,
        _fields = null
    ;

    // Public API here

    return {
        init: function (url) {
            _url = url;
            _DB = new Firebase( _url );
        },
        createValueObject: function(item) {
            var obj = {};
            angular.forEach( _fields, function( field ) {
                //  Works fine, but it's better use "eval()"
                obj[field] = item[field] || '';
            });
            return obj;
        },
        setListItems: function(items){
            _items = items;
            return this;
        },
        getListItems: function(){
            return _items;
        },
        setFields: function(fields){
            _fields = fields;
            return this;
        },
        getDB: function(){
            return _DB;
        },
        countTotalItems: function() {
            var total = 0;
            angular.forEach(_items, function () {
              ++total;
            });
            return total;
        },
        create: function (item) {
            var hashKey = new Firebase(_url).push().key();
            item = this.createValueObject(item);
            _items[hashKey] = item;
            _items[ hashKey ].id = this.countTotalItems();
            _items.$add(_items[ hashKey ]);
            return _items;
        },
        delete: function (id) {
            _items.$remove(_items[ id ]);
            delete _items[ id ];
            return _items;
        },
        update: function (item) {
            _items[ item.hashId ] = item;
            _items.$save(_items[ item.hashId ]);
            return _items;
        }
    };

  });
