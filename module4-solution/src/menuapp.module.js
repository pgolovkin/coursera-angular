(function() {
  'use-strict';

  angular.module('MenuApp', ['Data', 'ui.router']);

  angular.module('MenuApp')
    .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RouterConfig($stateProvider, $urlRouterProvider) {

      // Redirect to tab 1 if no other URL matches
      $urlRouterProvider.otherwise('/home');

      // Set up UI states
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl:'src/templates/home-state-template.html'
        })

        .state('categories', {
          url: '/categories',
          templateUrl:'src/templates/categories-state-template.html',
          controller: 'CategoriesDataController as categoriesData'
        })

        .state('items', {
          url: '/items/{categoryName}',
          templateUrl:'src/templates/items-state-template.html',
          controller: 'ItemsDataController as itemsData',
          resolve: {
            items: ['$stateParams', 'MenuDataService',
                  function ($stateParams, MenuDataService) {
                    console.log($stateParams);
                    return MenuDataService.getItemsForCategory($stateParams.categoryName)
                      .then(function (items) {
                        return items;
                      });
                  }]
          }
        });
    }
})();
