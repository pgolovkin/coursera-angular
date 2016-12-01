(function() {
  'use-strict';

  angular.module('MenuData', [])
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

    MenuDataService.$inject = ['$http'];
    MenuDataService = function($http) {
      var service = this;
      service.getAllCategories = function() {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json")
        }).then(function(result) {
          return result.data;
        });
      };

      service.getItemsFoCategory = function(categoryShortName) {

      };


    }
})();
