(function() {
      'use-strict';

      angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

      NarrowItDownController.$inject = ['MenuSearchService'];
      function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.getMatchedMenuItems = function(searchTerm) {
           var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
           promise.then(function (result) {
             menu.found = result;
           });
         }

         menu.onRemove = function(index) {
           menu.found.splice(index, 1);
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
            if (searchTerm) {
              for (var i = 0; i < array.length; i++) {
                if (array[i].description.indexOf(searchTerm) !== -1) {
                  foundItems.push(array[i]);
                }
              }
            }
            return foundItems;
          })
        };
      }


      function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItemList.html',
          scope: {
            items: "<items",
            onRemove:"&"
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

        controller.nothingFound = function () {
          if (controller.items === undefined) {
            return false;
          }
          return controller.items.length == 0;
        };
      }
})();
