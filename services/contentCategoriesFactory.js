/**
 * Created by vincent on 1/11/14.
 */
contentCategoriesModule.factory("contentCategoriesFactory", function ($rootScope, $resource, $q, mainEnvService, _) {

    var contentCategories = $resource(mainEnvService.getApiContentCategories(),
        {
            id:"@id",
            item:"@item",
            page:"@page",
            itemsPerPage:"@itemsPerPage",
            root : "@root",
            node : "@node",
            getTree : "@getTree",
            method : "@method"
        },
        {
            update : { method: "PUT", params: { item: "@item" } },
            move : {
                method: "GET",
                params: { id: "@id", method : "@method" },
                url: mainEnvService.getApi('contentcategories/move')
            },
            get : {
                method: "GET",
                cache: false
            },
            select : {
                method: "GET",
                cache: true
            }
        });

    /**
     * List the contentCategories
     * @returns {$promise|*}
     */
    contentCategories.listContentCategories = function(page, itemsPerPage) {
        return contentCategories.get(
            { page : page, itemsPerPage : itemsPerPage }
        ).$promise;
    }

    /**
     * Get One contentCategories
     * @param id
     * @returns {$promise|*}
     */
    contentCategories.getContentCategory = function(id, getTree) {
        return contentCategories.get({id : id, getTree : getTree}).$promise;
    }

    /**
     * Update a contentCategories
     * @param id
     * @param item
     * @returns {$promise|*}
     */
    contentCategories.updateContentCategory = function(id, item){
        return contentCategories.update({id : id, item : item}).$promise;
    }

    /**
     * Save a contentCategories
     * @returns {$promise|*}
     */
    contentCategories.saveContentCategory = function(item, root, node) {
        return contentCategories.save({item : item, root : root, node : node}).$promise;
    }

    /**
     * Delete a contentCategories
     * @param item
     * @returns {$promise|*}
     */
    contentCategories.deleteContentCategory = function(item){
        return contentCategories.delete({ id : item.id}).$promise;
    }

    /**
     * Move a contentCategories
     * @param item
     * @returns {$promise|*}
     */
    contentCategories.moveContentCategory = function(id, method){
        return contentCategories.move({ id : id, method : method}).$promise;
    }

    /**
     * Select the contentCategories
     * @returns {$promise|*}
     */
    contentCategories.selectContentCategories = function(page, itemsPerPage) {
        return contentCategories.select(
            { page : page, itemsPerPage : itemsPerPage }
        ).$promise;
    }


    return contentCategories;
});

