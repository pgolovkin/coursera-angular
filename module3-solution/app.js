(function() {
      'use-strict';

      angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', 'http://davids-restaurant.herokuapp.com');

      NarrowItDownController.$inject = ['MenuSearchService'];
      function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.getMatchedMenuItems = function(searchTerm) {
           var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
           promise.then(function (result) {
             menu.found = result;
           });
         }
      };


      MenuSearchService.$inject = ['$http', 'ApiBasePath']
      function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
          return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
          }).then(function (result) {
            var foundItems = [];
            var array = result.data.menu_items;
            for (var i = 0; i < array.length; i++) {
              if (array[i].description.indexOf(searchTerm) !== -1) {
                foundItems.push(array[i]);
              }
            }
            console.log(foundItems);
            return foundItems;
          })
        };
      }


      function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItemList.html',
          scope: {
            items: "<items",
          },
          controller: FoundListDirectiveController,
          controllerAs: 'list',
          bindToController: true,
          transclude: true
        };

        return ddo;
      };

      function FoundListDirectiveController() {
        var controller = this;

      }
})();
