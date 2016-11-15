(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
      $scope.lunchMessages = '';
      $scope.lunchMenu = '';
      $scope.checkLunch = function() {
        if ($scope.lunchMenu == "") {
          $scope.lunchMessages = "Please enter data first";
          return;
        }
        var lunchMenu = $scope.lunchMenu.split(',').length;
        if (lunchMenu <= 3) {
          $scope.lunchMessages = 'Enjoy!';
        } else {
          $scope.lunchMessages = 'Too much!';
        }
      }
    }
})();
