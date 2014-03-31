contentCategoriesModule.directive('contentCategoriesFilters', function($timeout, $parse) {
    return {
        restrict: 'E',
        templateUrl : 'modules/contentcategories/partials/contentCategoriesFilters.html',
        controller : 'contentCategoriesFiltersController',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

        }
    };
});