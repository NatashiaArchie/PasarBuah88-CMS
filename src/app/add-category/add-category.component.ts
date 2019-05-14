import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../shared/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../shared/category.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import 'firebase/storage';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category: Category;
  imageUrl: string = "../../assets/images/uploadimages.jpg";
  fileToUpload: File;
  basePath = '/category';
  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public dialogRef : MatDialogRef<AddCategoryComponent>,
    public fireDatabase :  AngularFireDatabase,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.category = this.data;
  }

  ngOnInit() {
    if (this.category == null){
        this.imageUrl = "../../assets/images/uploadimages.jpg";
      this.category = {
        CategoryId: null,
        CategoryName: '',
        ImageUrl: ''
       }
    } else {
      this.imageUrl = this.category.ImageUrl;
    }
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    
  }

  OnSubmit(form: NgForm) {
    debugger;
    console.log(form.value);
    
    const metaData = {'contentType': this.fileToUpload.type};
    var storageRef = firebase.storage().ref();
    var uploadProduct = storageRef.child(`${this.basePath}/${this.fileToUpload.name}`)
    .put(this.fileToUpload, metaData)
      .then((result) => {

        //get download Url
        storageRef.child(`${this.basePath}/${this.fileToUpload.name}`).getDownloadURL()
        .then((url) => {
          console.log(url);
          form.value.ImageUrl = url;
          form.value.ProductUnitType = form.value.unit + ' ' + form.value.type;
          //add to database
          //debugger;
          console.log(form.value);
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
        })
        .catch((error) => {
          console.log(error);
        });
      });
    console.log("Uploading: ", this.fileToUpload.name);
    console.log(form.value);



    
  }

}
