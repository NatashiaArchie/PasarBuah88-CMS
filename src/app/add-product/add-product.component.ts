import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Product } from '../shared/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../shared/product.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from '../shared/category.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {
  image;
  imageUrl: string = "../../assets/images/uploadimages.jpg";
  product : Product;
  fileToUpload : File = null;
  unit: number;
  type: string;
  basePath = '/product';
  statuss: string;
  numberPattern = '^[0-9]+(\.[0-9]{1,2})?$'
  status = [
    {value: 'Active'},
    {value: 'Inactive'}
  ]
  unitType = [
    {value: 'ml'},
    {value: 'L'},
    {value: 'gram'},
    {value: 'Kg'},
    {value: 'packet'},
    {value: 'bundle'},
  ]
  constructor(
    public dialog: MatDialog,
    public productService : ProductService,
    public toastr: ToastrService,
    private router: Router,
    public dialogRef : MatDialogRef<AddProductComponent>,
    public fireDatabase :  AngularFireDatabase,
    public categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.product = this.data;
  }

  ngOnInit( ) {
    this.categoryService.refreshList();
    if (this.product == null) {
      this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/pasarbuah88-fyp.appspot.com/o/announcement%2Fuploadimages.jpg?alt=media&token=36d606f6-c56c-410e-bdfb-b536326993e2";
      this.product = {
        ProductId: null,
        ImageUrl: null,
        ProductName: '',
        RetailerPrice: null,
        SalesPrice: null,
        QuantityInStock: null,
        Category: '',
        ProductBrand: '',
        ProductStatus: '',
        ProductUnitType: '',
        ProductDescription: '',
       }
    }
    else {
      this.imageUrl = this.product.ImageUrl;
      var res = this.product.ProductUnitType.split(" ");
      this.unit = parseInt(res[0]);
      this.statuss = this.product.ProductStatus;
      this.type = res[1].toString();
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

  OnSubmit(Image: any, form: NgForm) {
    debugger;
    console.log(form.value);

    if (form.value.ProductId != null){
      form.value.ImageUrl = this.product.ImageUrl;
      form.value.ProductUnitType = form.value.unit + ' ' + form.value.type;
      this.productService.editProduct(form.value)
        .subscribe((data:any) => {
          this.productService.refreshList();
            form.reset();
            this.toastr.success('Product has been updated successful');
            this.dialogRef.close();    
    });
    this.productService.refreshList();
    } else {
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
            if (form.value.ProductId == null) {
              this.productService.addProduct(form.value)
                .subscribe((data:any) => {
                  this.productService.refreshList();
                    form.reset();
                    this.toastr.success('Product has been added successful');
                    this.dialogRef.close();
            });
            }
            else {
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
  
    
}
