import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Product } from '../shared/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../shared/product.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {
  imageUrl: string = "../../assets/images/uploadimages.jpg";
  product : Product;
  fileToUpload : File = null;
  constructor(
    public dialog: MatDialog,
    public productService : ProductService,
    public toastr: ToastrService,
    private router: Router,
    public dialogRef : MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.product = this.data;
  }

  ngOnInit( ) {
    if (this.product == null) {
      this.product = {
        ProductId: null,
        //ImageName: null,
        ProductName: '',
        RetailerPrice: 0,
        SalesPrice: 0,
        QuantityInStock: 0,
        Category: '',
        ProductBrand: '',
        ProductStatus: '',
        ProductUnitType: '',
        ProductDescription: '',
       }
    }
   
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    //debugger
    //this.product.ImageName = this.fileToUpload;
  }

  OnSubmit(Image: any, form: NgForm) {
    debugger;
    console.log(form.value);
    if (form.value.ProductId == null) {
      this.productService.addProduct(this.fileToUpload, form.value)
        .subscribe((data:any) => {
        console.log(form.value)
          form.reset();
          this.toastr.success('Product has been added successful');
          this.dialogRef.close();
          //this.router.navigate(['/product']);
          //this.productService.refreshList();   
    });
    }
    else {
      this.productService.editProduct(this.fileToUpload, form.value)
        .subscribe((data:any) => {
        console.log(form.value)
          form.reset();
          this.toastr.success('Product has been updated successful');
          this.dialogRef.close();
          this.productService.refreshList();     
    });
    }
    this.productService.refreshList();
  }
}
