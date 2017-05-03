"use strict";
var Product = (function () {
    function Product() {
    }
    Product.getTagsObjectArray = function (_tags) {
        return JSON.parse(_tags);
    };
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.js.map