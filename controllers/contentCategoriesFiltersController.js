/**
 * Created by vincent on 1/30/14.
 */
contentCategoriesModule.controller('contentCategoriesFiltersController', function ($scope, $route, $routeParams,
                                                               mainFunctionsFactory,
                                                               usersRolesFactory,
                                                               mainNotifierService,
                                                               mainLocalStorageService,
                                                               contentCategoriesFactory) {

    /**
     * Get extra data
     */
    $scope.init = function(){


    }

    switch ($route.current.$$route.controller){

        case 'contentCategoriesListController':

            $scope.itemsPerPageOptions = mainFunctionsFactory.getItemsPerPage();
            $scope.itemsPerPage = mainFunctionsFactory.setUpItemsPerPage($route.current.$$route.controller, $scope.itemsPerPageOptions);

            $scope.$watch('itemsPerPage', function(n,o) {
                if(n.number) {
                    $scope.filter = true;
                    mainLocalStorageService.setItemsPerPageOption(n.id);
                }
            });

        break;
        case 'contentCategoriesAddController':

            break;

        case 'contentCategoriesTreeController':

            if($scope.root)
                $scope.filter = true;


            contentCategoriesFactory.listContentCategories(1,mainFunctionsFactory.getMinItemsPerPage().number).then(
                function(data) {
                    // place items in contentCategories for select list
                    $scope.contentCategories = data.items;

                    // set current contentCategories
                    $scope.selectedRoot = $scope.contentCategories[mainFunctionsFactory.getSelectedIndex($scope.contentCategories, $scope.root)];

                    // we watch the selected root
                    $scope.$watch("selectedRoot", function(n, o){

                            // only when param from
                            if($scope.loaded == true){

                                $scope.loaded = false; // set loaded false for spinner
                                $scope.root = $scope.selectedRoot.id; // place the selected root id
                                $scope.filter = true;
                            }

                    });
                },
                function(response) {
                    mainNotifierService.error('Categorieen niet geladen');
                }
            );

            break;


    }


});