/**
 * Created by vincent on 1/30/14.
 */
contentCategoriesModule.controller('contentCategoriesListController', function ($scope, $routeParams,
                                                    contentCategoriesFactory,
                                                    mainNotifierService) {
    $scope.loaded = false;
    $scope.filter = false;

    /**
     * Refresh on filter event
     */
    $scope.$watch("filter", function(n,o) {
        if(n == true) {
            $scope.listAll($routeParams.page, $scope.itemsPerPage);
        }
    });

    /**
     * Get All the items
     */
    $scope.listAll = function(page, itemsPerPage){
        contentCategoriesFactory.listContentCategories(page, itemsPerPage).then(
            function(data) {

                $scope.items = data.items;
                $scope.pager = data.pager;
                $scope.loaded = true;
                $scope.filter = false;

                mainNotifierService.notify('Exposities zijn ingeladen');

            },
            function(response) {
                mainNotifierService.error('Exposities niet geladen');
            }
        );
    };

    /**
     * Remove item
     * @param item
     */
    $scope.remove = function(item){
        $scope.loaded = false;
        contentCategoriesFactory.deleteContentCategory(item).then(
            function(data) {
                $scope.filter = true;
                mainNotifierService.notify('Expositie is verwijderd');
            },
            function(response) {
                mainNotifierService.error('Expositie is niet verwijderd');
            }
        );
    }

    /**
     * Send To edit
     * @param id
     */
    $scope.edit = function(id){
        $scope.goNext('content/categories/edit/'+id);
    }

    /**
     * Send To Tree
     * @param id
     */
    $scope.tree = function(id){
        $scope.goNext('content/categories/tree/'+id);
    }

    /**
     * Send To Content
     * @param id
     */
    $scope.content = function(id){
        $scope.goNext('content/list/1/'+id);
    }


});