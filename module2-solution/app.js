(function() {
  'use strict';

  angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
      this.items = ShoppingListCheckOffService.getToBuyItems();

      this.buy = function(itemIndex) {
        ShoppingListCheckOffService.buy(itemIndex);
      };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
      this.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
      var boughtItems = [];
      var toBuyItems = [
        {
          itemName:"pelmeni",
          quantity:7
        },
        {
          itemName:"Borscht",
          quantity:9
        },
        {
          itemName:"Bread",
          quantity:3
        },
        {
          itemName:"Milk",
          quantity:9
        },
        {
          itemName:"Pancakes",
          quantity:8
        }
      ];

      this.buy = function(itemIndex) {
        boughtItems.push(toBuyItems[itemIndex]);
        toBuyItems.splice(itemIndex, 1);
      };

      this.getBoughtItems = function() {
        return boughtItems;
      };

      this.getToBuyItems = function() {
        return toBuyItems;
      };
    }

})();
