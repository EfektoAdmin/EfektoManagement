import { OnInit, HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './services/category-service';
import { Tag } from './tags';

@Component({
    selector: 'categorymodal',
    templateUrl: 'app/templates/categoryModal.html',
    providers: [CategoryService],
})
export class CategoryModalComponent implements OnInit {
    @Input() category: Category;
    @Input() public updateCategoryListFunction: Function;
    @Input() public closeModalFunction: Function;
    @Input() addCategory;

    tagArray: Tag[];
    tagItemName: string;
    tagItemValue: string;

    confirmFlag = false;
    confirmProcess: string = "";
    categories: Category[];

    editCategory;

    tempCategory: Category;

    showNotification = false;
    notificationMessage = '';

    constructor(private categoryService: CategoryService) { }

    @HostListener('document:keydown', ['$event'])
    onkeydown(e: KeyboardEvent) {

        if (e.key == 'Esc' || e.key == 'Escape')
            this.cancel();
    }

    saving = false;

    ngOnInit() {
        this.editCategory = !this.addCategory;
        this.getCategories();

        if (this.category.tags == null || this.category.tags.trim() == '') {
            this.tagArray = new Array();
            return;
        }

        this.tagArray = Category.getTagsObjectArray(this.category.tags);
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(
            categories => this.categories = categories);
    }

    cancel() {
        this.confirmFlag = true;
        this.confirmProcess = 'cancel';
    }

    removeTagItem(tagItem: Tag) {
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

    confirm(yesOrNo: string, category: Category) {
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
                        this.saveCategory(this.tempCategory);
                        break;
                    }
            }
        }
        else if (yesOrNo == 'no') {
            this.saving = false;
        }

        this.confirmFlag = false;
    }

    saveCategory(category: Category) {
        if (this.tagArray != null)
            category.tags = JSON.stringify(this.tagArray);

        if (!this.validate(category))
            return;

        // if (category == null || category.name == null || category.name.trim() == "" ||
        //     category.categorytype == null || category.categorytype.trim() == "") {
        //     this.saving = false;
        //     return;
        // }

        this.tempCategory = category;
        if (this.saving == false) {
            this.confirmFlag = true;
            this.confirmProcess = 'save';
            this.saving = true;
            return;
        }

        if (this.addCategory == true) {
            this.categoryService.postCategory(category)
                .subscribe(
                responseCategory => {
                    this.updateCategoryListFunction(category);
                    console.log("saved");
                    this.saving = false;
                    this.closeModalFunction();
                });
        }
        else {
            this.categoryService.patchCategory(category)
                .subscribe(
                category => {
                    console.log("saved");
                    this.saving = false;
                    this.closeModalFunction();
                });
        }


    }

    validate(category: Category) {
        this.showNotification = false;
        var message = '';

        if (category == null) {
            message = "No Category available.";
        }
        else {
            if (category.name == null || category.name.trim() == "")
                message += "<b>Name</b> is required. ";

            if (category.categorytype == null || category.categorytype.trim() == "")
                message += "<b>Category</b> Type is required. ";

            if (category.parent != null && category.parent == category.id)
                message += "<b>Category</b> cannot be parent to itself. ";

            // if (category.image == null || category.image.trim() == "")
            //     message += "<b>Image Url</b> is required. ";

            // if (category.description == null || category.description.trim() == "")
            //     message += "<b>Description</b> is required. ";
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


