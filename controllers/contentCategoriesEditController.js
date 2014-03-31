/**
 * Created by vincent on 1/30/14.
 */
contentCategoriesModule.controller('contentCategoriesEditController', function ($scope, $routeParams,
                                                        mainEnvService,
                                                        mainDebugService,
                                                        mainNotifierService,
                                                        mainUpdateService,
                                                        contentCategoriesFactory) {

    $scope.loaded = false;
    $scope.inProgress = false;
    $scope.root = $routeParams.root;
    $scope.id = $routeParams.id;

    if($scope.id && ! $scope.root)
        $scope.returnUrl = "/content/categories/list/" + $scope.id;


    // if we're editiing a child in the tree edit..
    if($scope.id && $scope.root) {
        $scope.returnUrl = "/content/categories/tree/" + $scope.root;
    }


    /**
     * If route comes is with an id, we assume it is an edit.
     */
    if($routeParams.id) {
        mainUpdateService.setUpdatedId($routeParams.id);
        contentCategoriesFactory.getContentCategory($routeParams.id).then(
                function(data) {
                    $scope.item = data.item;
                    $scope.loaded = true;
                },
                function(response) {
                    // on error
                    mainNotifierService.error('Case niet gevonden');
                }
        );
    }

    /**
     * Edit a item function, here we edit a item to the database and return to the list view
     * @param id
     * @param item
     */
    $scope.edit = function (id, item){
        contentCategoriesFactory.updateContentCategory(id, item)
            .then(
            function(data) {
                mainNotifierService.notify('Case is aangepast');
                $scope.goNext($scope.returnUrl);
            },
            function(response) {
                mainNotifierService.error('Case niet aangepast');
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
            this.edit($routeParams.id,item)
        }
    }

});