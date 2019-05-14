import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    public orderService: OrderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.orderService.refreshList();
  }

  openDialogDetail(order: Order) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.data = order;
    this.dialog.open(OrderDetailComponent, dialogConfig);
  }

}
