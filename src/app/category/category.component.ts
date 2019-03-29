import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationService } from '../navigation.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category[];
  constructor(
    public navigation: NavigationService,
    public dialog: MatDialog,
    public categoryService: CategoryService
  ) { 
    //this.category = this.data;
  }

  ngOnInit() {
    this.categoryService.refreshList();
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '300px';
    this.dialog.open(AddCategoryComponent, dialogConfig);
  }

  openDialogEdit(category: Category){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '300px';
    dialogConfig.data = category;
    this.dialog.open(AddCategoryComponent, dialogConfig);
  }

  onDelete(Id : number){
    this.categoryService.deleteCategory(Id)
    .subscribe((data) =>{
      this.categoryService.refreshList();
    })
  }
  
}
