/**
 * Created by vincent on 1/30/14.
 */
contentCategoriesModule.controller('contentCategoriesTreeController', function ($scope,
                                                                      $routeParams,
                                                    contentCategoriesFactory,
                                                    mainUpdateService,
                                                    mainNotifierService) {

    $scope.loaded = false;
    $scope.filter = false;

    $scope.root = $routeParams.root;
    $scope.node = $routeParams.node;



    /**
     * Refresh on filter event
     */
    $scope.$watch("filter", function(n,o) {
        if(n == true) {
            $scope.listTree($scope.root);
        }
    });

    $scope.listTree = function(root){
        contentCategoriesFactory.getContentCategory(root, true).then(
            function(data) {

                $scope.items = data.item.tree.descendants;
                $scope.item = data.item;
                $scope.tree = data.item.tree;

                $scope.loaded = true;
                $scope.filter = false;
            },
            function(response) {
                // on error
                $scope.loaded = true;
                mainNotifierService.error('Onderdeel niet gevonden');
            }
        );
    }

    /**
     * Remove item
     * @param item
     */
    $scope.remove = function(item){
        $scope.loaded = false;
        contentCategoriesFactory.deleteContentCategory(item).then(
            function(data) {
                $scope.filter = true;
                mainNotifierService.notify('Onderdeel is verwijderd');
            },
            function(response) {
                mainNotifierService.error('Onderdeel is niet verwijderd');
            }
        );
    }

    /**
     * Send To edit
     * @param id
     */
    $scope.edit = function(id){
        $scope.goNext('content/categories/edit/' + id + '/' + $scope.root);
    }

    /**
     * Send To Content
     * @param id
     */
    $scope.content = function(root, id){
        $scope.goNext('content/list/1/' + root + '/' + id);
    }

    /**
     * Send To Content
     * @param id
     */
    $scope.addContent = function(root, id){
        $scope.goNext('content/add/step/1/' + root + '/' + id);
    }

    /**
     * Move a nod
     * @param id
     */
    $scope.move = function(id, method){
        $scope.loaded = false;
        contentCategoriesFactory.moveContentCategory(id, method).then(
            function(data) {
                mainUpdateService.setUpdatedId(id);
                mainNotifierService.notify('Onderdeel is verplaatst');
                $scope.filter = true;
            },
            function(response) {
                mainNotifierService.error('Onderdeel is niet verplaatst');
            }
        );
    }

});