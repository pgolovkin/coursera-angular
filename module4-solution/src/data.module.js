(function() {
  'use-strict';

  angular.module('Data', []);
  angular.module('Data')
    .controller('CategoriesDataController', CategoriesDataController)
    .controller('ItemsDataController', ItemsDataController);

    CategoriesDataController.$inject= ['MenuDataService'];
    function CategoriesDataController(MenuDataService) {
      var dataController = this;
      dataController.categories = [];

      dataController.$onInit = function() {
        MenuDataService.getAllCategories().then(function(result) {
          dataController.categories = result;
        });
      }
    }

    ItemsDataController.$inject = ['items']
    function ItemsDataController(items) {
      this.items= items;
    }

})();
