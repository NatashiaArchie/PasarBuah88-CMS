import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    public navigation: NavigationService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.navigation.show();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= '800px';
    dialogConfig.height= '470px';
    this.dialog.open(AddProductComponent,dialogConfig);
  }
}
