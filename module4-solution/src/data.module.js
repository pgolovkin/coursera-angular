(function() {
  'use-strict';

  angular.module('Data', []);
  angular.module('Data')
    .controller('DataController', DataController);

    DataController.$inject= ['MenuDataService'];
    function DataController(MenuDataService) {
      var dataController = this;
      dataController.categories = [];
      dataController.items = [];


      dataController.loadCategories = function() {
        console.log('getting items');
        MenuDataService.getAllCategories().then(function(result) {
          dataController.categories = result;
        });
        console.log(dataController.categories);
      }

      dataController.loadItems = function(categoryName) {
        console.log('getting items in main controller');
        MenuDataService.getItemsForCategory(categoryName).then(function(result) {
          dataController.items = result;
        });
        console.log(dataController.items);
      }
    }
})();
