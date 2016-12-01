(function() {
      'use-strict';

      angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .component('foundItems', {
          templateUrl: 'foundItemList.html',
          controller: ShoppingListComponentController,
          bindings: {
            items: "<items",
            onRemove:"&"
          }
        })
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
                if (array[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                  foundItems.push(array[i]);
                }
              }
            }
            return foundItems;
          })
        };
      }

      function ShoppingListComponentController() {
        var controller = this;

        controller.nothingFound = function () {
          if (controller.items === undefined) {
            return false;
          }
          return controller.items.length == 0;
        };

        controller.remove = function(removeIndex) {
          controller.onRemove({index : removeIndex});
        }
      }
})();
