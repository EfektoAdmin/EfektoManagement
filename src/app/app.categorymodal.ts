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
    @Input() category = {};
    @Input() public updateCategoryListFunction: Function;
    @Input() public closeModalFunction: Function;
    @Input() addCategory;

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
                });
        }
        else {
            this.categoryService.patchCategory(category)
                .subscribe(
                category => {
                    console.log("saved");
                    this.saving = false;
                });
        }

        this.closeModalFunction();
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

            // if (category.image == null || category.image.trim() == "")
            //     message += "<b>Image Url</b> is required. ";

            if (category.description == null || category.description.trim() == "")
                message += "<b>Description</b> is required. ";
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


