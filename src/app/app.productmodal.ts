import { OnInit, HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './services/product-service';
import { Category } from './category';
import { CategoryService } from './services/category-service';
import { Tag } from "./tags";

@Component({
    selector: 'productmodal',
    templateUrl: 'app/templates/productModal.html',
    providers: [ProductService, CategoryService],
})
export class ProductModalComponent implements OnInit {
    @Input() product: Product;
    @Input() public updateProductListFunction: Function;
    @Input() public closeModalFunction: Function;
    @Input() addProduct;

    tagArray: Tag[];
    tagItemName: string;
    tagItemValue: string;

    confirmFlag = false;
    confirmProcess: string = "";

    categories: Category[];
    selectedCategory: Category;

    editProduct;

    tempProduct: Product;

    showNotification = false;
    notificationMessage = '';

    constructor(private productService: ProductService, private categoryService: CategoryService) { }

    @HostListener('document:keydown', ['$event'])
    onkeydown(e: KeyboardEvent) {

        if (e.key == 'Esc' || e.key == 'Escape')
            this.cancel();
    }

    saving = false;
    ngOnInit() {
        this.getCategories();

        this.editProduct = !this.addProduct;

        if (this.product.tags == null || this.product.tags.trim() == '') {
            this.tagArray = new Array();
            return;
        }

        this.tagArray = Product.getTagsObjectArray(this.product.tags);
    }

    getCategories() {
        this.selectedCategory = new Category();
        this.categoryService.getCategories()
            .subscribe(
            categories => {
                this.categories = categories;
                if (this.product.Category != null && this.product.Category.trim() != '') {
                    if (this.categories != null) {

                        this.categories.forEach(element => {
                            if (element.name == this.product.Category)
                                this.selectedCategory = element;
                        })
                    }
                }
            });


    }


    cancel() {
        this.confirmFlag = true;
        this.confirmProcess = 'cancel';
    }

    removeTagItem(tagItem: Tag) {
        //this.tagArray = this.tagArray.filter(item => item.name !== tagItem.name && item.value !== tagItem.value);
        this.tagArray = this.tagArray.filter(item => item.name !== tagItem.name);
    }
    addTagItem() {

        if (this.tagItemName == null || this.tagItemName.trim() == '') {
            this.openNotification("The tag <b>name</b> is required.");
            return;
        }

        if (this.tagItemValue == null || this.tagItemValue.trim() == '') {
            this.openNotification("The tag <b>value</b> is required.");
            return;
        }

        let isUsedTagname = false;
        this.tagArray.forEach(element => {
            if (element.name == this.tagItemName) {
                this.openNotification("The tag <b>name</b> has already been used.");
                isUsedTagname = true;
                return;
            }
        });

        if (isUsedTagname)
            return;

        let tempTag = new Tag();
        tempTag.name = this.tagItemName;
        tempTag.value = this.tagItemValue;

        this.tagArray.push(tempTag);

        this.tagItemName = '';
        this.tagItemValue = '';
    }

    confirm(yesOrNo: string, product: Product) {
        if (yesOrNo == 'yes') {
            switch (this.confirmProcess) {
                case 'cancel':
                    {
                        this.saving = false;
                        this.closeModalFunction();
                        break;
                    }
                case 'save':
                    {
                        this.saveProduct(this.tempProduct);
                        break;
                    }
            }
        }
        else if (yesOrNo == 'no') {
            this.saving = false;
        }

        //this.confirmFlag = false;
    }

    saveProduct(product: Product) {
        if (this.tagArray != null)
            product.tags = JSON.stringify(this.tagArray);

        if (!this.validate(product))
            return;

        // if (product == null || product.name == null || product.name.trim() == "") {
        //     this.saving = false;
        //     return;
        // }

        if (this.selectedCategory != null) {
            this.product.Category = this.selectedCategory.name;

        }

        this.tempProduct = product;
        if (this.saving == false) {
            this.confirmFlag = true;
            this.confirmProcess = 'save';
            this.saving = true;
            return;
        }

        if (this.addProduct == true) {
            this.productService.postProduct(product)
                .subscribe(
                responseProduct => {
                    this.updateProductListFunction(product);
                    console.log("saved");
                    this.saving = false;
                    this.selectedCategory = new Category();
                    this.closeModalFunction();
                    this.confirmFlag = false;
                });
        }
        else {
            this.productService.patchProduct(product)
                .subscribe(
                product => {
                    console.log("saved");
                    this.saving = false;
                    this.closeModalFunction();
                    this.confirmFlag = false;
                });
        }


    }


    validate(product: Product) {

        this.showNotification = false;
        var message = '';

        if (product == null) {
            message = "No Category available.";
        }
        else {
            if (product.name == null || product.name.trim() == "")
                message += "<b>Name</b> is required. ";

            if (product.Description == null || product.Description.trim() == "")
                message += "<b>Description</b> is required. ";

            // removed as per demo/UAT
            // if (product.Category == null || product.Category.trim() == "")
            //     message += "<b>Category</b> is required. ";

            if (this.selectedCategory == null)
                message += "<b>Category</b> is required. ";

            /*
            if (product.Image == null || product.Image.trim() == "")
                message += "Image is required.";
            
            if (product.tags == null || product.tags.trim() == "")
                message += "Tags is required.";
            
            if (product.Features == null || product.Features.trim() == "")
                message += "Features is required.";

            if (product.ActNo == null || product.ActNo.trim() == "")
                message += "ActNo is required.";

            if (product.Warnings == null || product.Warnings.trim() == "")
                message += "Warnings is required.";

            if (product.Precautions == null || product.Precautions.trim() == "")
                message += "Precautions is required.";

            if (product.Order == null || product.Order.trim() == "")
                message += "Order is required.";
            */
        }

        if (message == '')
            return true;

        this.openNotification(message);

        return false;
    }

    openNotification(message) {
        if (message != null)
            this.notificationMessage = message;
        this.showNotification = true;
    }

    closeNotification() {
        this.notificationMessage = '';
        this.showNotification = false;
    }


}


