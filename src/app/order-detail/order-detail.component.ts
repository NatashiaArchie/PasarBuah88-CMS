import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { OrderDetail } from '../shared/order-detail.model';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  orderId: number;
  revenue: number;
  totalprice: number;

  product: Product[];
  orderDetail: OrderDetail[];

  productList;
  OrderProductList;
  constructor(
    public DialogRef: MatDialogRef<OrderDetailComponent>,
    public orderService: OrderService,
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.order = this.data;
  }

  ngOnInit() {
    this.revenue = 0;
    this.totalprice = 0;
    this.orderId=  this.order.OrderId;
    this.orderService.getOrderDetail();
    this.orderService.getOrderDetailProduct();
    this.orderService.getOrderAddress();
    this.productService.refreshList();
    
    this.orderService.returnOrderDetail()
    .subscribe(data => {
      for (var d in data) // for acts as a foreach  
      {  
        if(this.orderId == data[d].OrderId) {
          this.revenue += data[d].Revenue;
          this.totalprice += data[d].TotalPrice;
        }
      }
    })

    

    

  }




}
