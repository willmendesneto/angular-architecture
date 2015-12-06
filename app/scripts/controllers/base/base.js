'use strict';

angular.module('AngularArchitectureApp')
  .controller('BaseCtrl', function ($scope, $routeParams, $route, $location, BaseService) {

    angular.extend($scope, BaseService);

    var URL = 'https://angular-architecture.firebaseio.com/products';

    $scope.BaseFactory.init( URL );

    /**
     * Table fields
     *
     * @type {Array}
     */
    $scope.fields = ['id', 'title' , 'category' , 'google_id'];

    $scope.products = [];

    /**
     * Initial value of form products for create/update data
     *
     * @type {Array}
     */
    $scope.product = [
        {id: '', title : '', category : '', google_id: ''}
    ];

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
        $location.path('/base');
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
    $scope.edit = function( id ){
        var id = $routeParams.id;
        console.log($scope.BaseFactory.getListItems());
        $scope.product = $scope.BaseFactory.getListItems()[id];
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
        if (confirm('Esta ação é irreversível, deseja mesmo excluir este produto?') ) {
            $scope.products = $scope.BaseFactory.delete( id );
            $scope.products.$remove();
        }
    };

    /**
     * ...And the application begin here!
     */
    $scope.init = function() {
        $scope.angularFire($scope.BaseFactory.getDB()).$loaded().then(function(data){
          $scope.products = data;
          $scope.BaseFactory.setListItems( $scope.products )
                              .setFields( $scope.fields );
          //  Calling routeParam method
          if ($route.current.method !== undefined) {
              $scope[$route.current.method]();
          }
        });

    };

    $scope.init();

  });
