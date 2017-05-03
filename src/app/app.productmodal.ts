import { OnInit, HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './services/product-service';
import { Tag } from "./tags";

@Component({
    selector: 'productmodal',
    templateUrl: 'app/templates/productModal.html',
    providers: [ProductService],
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

    editProduct;

    tempProduct: Product;

    showNotification = false;
    notificationMessage = '';

    constructor(private productService: ProductService) { }

    @HostListener('document:keydown', ['$event'])
    onkeydown(e: KeyboardEvent) {

        if (e.key == 'Esc' || e.key == 'Escape')
            this.cancel();
    }

    saving = false;
    ngOnInit() {
        this.editProduct = !this.addProduct;

        if (this.product.tags == null || this.product.tags.trim() == '') {
            this.tagArray = new Array();
            return;
        }


        this.tagArray = Product.getTagsObjectArray(this.product.tags);
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
            this.openNotification("The tag name is required.");
            return;
        }

        if (this.tagItemValue == null || this.tagItemValue.trim() == '') {
            this.openNotification("The tag value is required.");
            return;
        }

        let isUsedTagname = false;
        this.tagArray.forEach(element => {
            if (element.name == this.tagItemName) {
                this.openNotification("The tag name has already been used.");
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

        this.confirmFlag = false;
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
                });
        }
        else {
            this.productService.patchProduct(product)
                .subscribe(
                product => {
                    console.log("saved");
                    this.saving = false;
                });
        }

        this.closeModalFunction();
    }


    validate(product: Product) {
        this.showNotification = false;
        var message = '';

        if (product == null) {
            message = "No Category available.";
        }
        else {
            if (product.name == null || product.name.trim() == "")
                message += "Product Name is required.<br />";

            if (product.Description == null || product.Description.trim() == "")
                message += "Product Description is required.<br />";

            if (product.Category == null || product.Category.trim() == "")
                message += "Product Category is required.<br />";

            if (product.Image == null || product.Image.trim() == "")
                message += "Product Image is required.<br />";

            if (product.tags == null || product.tags.trim() == "")
                message += "Product tags is required.<br />";

            if (product.Features == null || product.Features.trim() == "")
                message += "Product Features is required.<br />";

            if (product.ActNo == null || product.ActNo.trim() == "")
                message += "Product ActNo is required.<br />";

            if (product.Warnings == null || product.Warnings.trim() == "")
                message += "Product Warnings is required.<br />";

            if (product.Precautions == null || product.Precautions.trim() == "")
                message += "Product Precautions is required.<br />";

            if (product.Order == null || product.Order.trim() == "")
                message += "Product Order is required.<br />";
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


