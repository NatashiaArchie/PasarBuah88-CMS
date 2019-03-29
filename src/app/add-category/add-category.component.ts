import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../shared/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../shared/category.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category: Category;
  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public dialogRef : MatDialogRef<AddCategoryComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.category = this.data;
  }

  ngOnInit() {
    if (this.category == null){
      this.category = {
        CategoryId: null,
        CategoryName: ''
       }
    }
  }

  OnSubmit(form: NgForm) {
    if (form.value.CategoryId == null) {
      console.log(form.value);
      this.categoryService.addCategory(form.value)
      .subscribe((data: any) => {
        this.categoryService.refreshList();
            form.reset();
            this.toastr.success('Category has been added successful');
            this.dialogRef.close();
      });
    }
    else {
      this.categoryService.editCategory(form.value)
      .subscribe((data: any) => {
        this.categoryService.refreshList();
            form.reset();
            this.toastr.success('Category has been added successful');
            this.dialogRef.close();
      });
    }
  }

}
