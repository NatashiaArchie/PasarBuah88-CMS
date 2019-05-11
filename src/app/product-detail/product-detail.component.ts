import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product : Product;
  imageUrl : string;
  productPrice : number;
  unitType : string;
  productName : string;
  productDescription : string;

  constructor(
    public dialogRef : MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.product = this.data;
  }

  ngOnInit() {
    this.imageUrl = this.product.ImageUrl;
    this.productPrice = this.product.SalesPrice;
    this.unitType = this.product.ProductUnitType;
    this.productName = this.product.ProductName;
    this.productDescription = this.product.ProductDescription;
  }

}
