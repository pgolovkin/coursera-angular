(function() {
  'use-strict';

  angular.module('MenuApp')
  .component('categories', {
      templateUrl: '/src/templates/categories-template.html',
      controller: CategoriesComponentController,
      bindings: {
         categories: '<',
         onGetItems: '&'
      }
  });

  function CategoriesComponentController() {
    var $ctrl = this;
    $ctrl.getItems = function (myCategoryName) {
      console.log('getting items ' + myCategoryName);
      console.log($ctrl.onGetItems);
      $ctrl.onGetItems({ categoryName: myCategoryName });

      console.log('items got');
    };

  }
})();
