"use strict";
var Category = (function () {
    function Category() {
    }
    Category.getTagsObjectArray = function (_tags) {
        return JSON.parse(_tags);
    };
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map