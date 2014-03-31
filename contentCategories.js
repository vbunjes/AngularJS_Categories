/**
 * Created by vincent on 1/30/14.
 */
var contentCategoriesModule = angular.module('adminWebApp.ContentCategories', []);

contentCategoriesModule.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/content/categories/list/:page?',
        {
            controller : 'contentCategoriesListController',
            templateUrl: 'modules/contentcategories/partials/contentCategoriesList.html',
            resolve : {
                validate: function(mainAuthService){
                    return mainAuthService.validate();
                }
            }
        })
        .when('/content/categories/add/:root?/:node?',
        {
            controller : 'contentCategoriesAddController',
            templateUrl: 'modules/contentcategories/partials/contentCategoriesAdd.html',
            resolve : {
                validate: function(mainAuthService){
                    return mainAuthService.validate();
                }
            }
        })
        .when('/content/categories/edit/:id/:root?',
        {
            controller : 'contentCategoriesEditController',
            templateUrl: 'modules/contentcategories/partials/contentCategoriesEdit.html',
            resolve : {
                validate: function(mainAuthService){
                    return mainAuthService.validate();
                }
            }
        })
        .when('/content/categories/tree/:root',
        {
            controller : 'contentCategoriesTreeController',
            templateUrl: 'modules/contentcategories/partials/contentCategoriesTree.html',
            resolve : {
                validate: function(mainAuthService){
                    return mainAuthService.validate();
                }
            }
        })
        .otherwise({redirectTo: '/home'});
}]);
