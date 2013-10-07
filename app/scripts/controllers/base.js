'use strict';

angular.module('AngularArchitectureApp')
  .controller('BaseCtrl', function ($scope, $routeParams, BaseService) {

    angular.extend($scope, BaseService);

    var url = 'https://palestra-angular.firebaseio.com/products';

    $scope.BaseFactory.init( url );

    /**
     * Table fields
     *
     * @type {Array}
     */
    $scope.fields = ['id', 'title' , 'category' , 'google_id'];

    /**
     * Initial value of form products for create/update data
     *
     * @type {Array}
     */
    $scope.product = [
        {id: '', title : '', category : '', google_id: ''}
    ];

    this.initOnDataLoaded = function onDataLoaded($scope, $routeParams) {

        $scope.BaseFactory.setListItems( $scope.products )
                            .setFields( $scope.fields );

        $scope.$watch('product', function (p) {
            if (p.hashId !== undefined ){
                $scope.products[ p.hashId ] = $scope.BaseFactory.createValueObject(p);
            }
        }, true);

        /**
         * Add/edit a products in $scope.products
         */
        $scope.save = function(){
            var product = $scope.product;
            if(product.hashId !== undefined){
                $scope.update(product);
            } else {
                $scope.create(product);
            }
            $scope.reset();
        };

        /**
         * Create item in Firebase database
         */
        $scope.create = function( product ) {
            $scope.products = $scope.BaseFactory.create( product );
        };

        /**
         * Update item in Firebase database
         */
        $scope.update = function( product ) {
            $scope.products = $scope.BaseFactory.update(product);
        };

        /**
         * Editing a individual snippet
         */
        $scope.editProduct = function( id ){
            $scope.product = $scope.products[ id ];
            $scope.product.hashId = id;
        };

        /**
         * Reset the form values
         */
        $scope.reset = function() {
            $scope.product = [
                {id: '', title : '', category : '', google_id: ''}
            ];
        };

        /**
         * Remove products from actual products list
         * @return {bool} Boolean value of return
         */
        $scope.deleteProduct = function( id ){
            $scope.products = $scope.BaseFactory.delete( id );
        };

    };

    /**
     * ...And the application begin here!
     */
    $scope.angularFire( $scope.BaseFactory.getDB() , $scope, 'products', {}).then(function () {
        this.initOnDataLoaded($scope, $routeParams);
    }.bind(this));

  });
