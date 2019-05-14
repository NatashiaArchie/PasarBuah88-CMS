import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product : Product
  constructor(
    public navigation: NavigationService,
    public dialog: MatDialog,
    public productService: ProductService
    ) { }

  ngOnInit() {
    this.navigation.show();
    this.productService.refreshList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= '800px';
    dialogConfig.height= '470px';
    this.dialog.open(AddProductComponent,dialogConfig);
  }

  openDialogEdit(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.height = '470px';
    dialogConfig.data = product;
    this.dialog.open(AddProductComponent, dialogConfig);
  }

  onDelete(Id : number) {
    this.productService.deleteProduct(Id)
    .subscribe((data) => {
      this.productService.refreshList();
    })
  }

  openDialogDetail(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = product;
    this.dialog.open(ProductDetailComponent, dialogConfig);
  }
}
