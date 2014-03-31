/**
 * Created by vincent on 1/30/14.
 */
contentCategoriesModule.controller('contentCategoriesAddController', function ($scope,
                                                                     $routeParams,
                                                       mainEnvService, 
                                                       mainDebugService, 
                                                       contentCategoriesFactory, 
                                                       mainUpdateService,  
                                                       mainNotifierService) {


    $scope.inProgress = false;
    $scope.root = $routeParams.root;
    $scope.node = $routeParams.node;

    $scope.returnUrl = "content/categories/list";

    // if we're editing a child in the tree edit..
    if( $scope.root) {
        $scope.returnUrl = "/content/categories/tree/" + $scope.root;
    }


    /**
     * Add a Item function, here we add a item to the database and return to the list view
     * @param item
     */
    $scope.add = function(item){
        contentCategoriesFactory.saveContentCategory(item, $scope.root, $scope.node)
            .then(
                function(data) {
                    mainUpdateService.setUpdatedId(data.id);
                    $scope.goNext($scope.returnUrl);
                },
                function(response) {
                    mainNotifierService.error('Case niet opgeslagen');
                }
            );
    }


    /**
     * Here we handle the form, this comes from the directives form-element and submit-element
     * We switch on the add or edit action, to call the respective functions
     * @param item
     * @param form
     */
    $scope.handleForm = function(item, form) {
        if(form.$valid) {
            $scope.inProgress = true;
            this.add(item);
        }
    }


});