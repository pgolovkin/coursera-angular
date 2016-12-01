(function() {
  'use-strict';

  angular.module('Data', ['MenuData'])
    .controller('DataController', DataController);

    DataController.$inject= ['MenuDataService'];
    DataController = function() {
      var items = MenuDataService.getAllCategories();
    }
})();
