import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { OrderDetail } from './order-detail.model';
import { Order } from './order.model';
import { OrderDetailProduct } from './order-detail-product.model';
import { OrderAddress } from './order-address.model';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly rootUrl = 'http://localhost:50008/';
  orderList: Order[];
  orderDetailList: OrderDetail[];
  orderDetailProductList: OrderDetailProduct[];
  orderAddressList: OrderAddress[];
  constructor(
    public http: HttpClient,
  ) { }

  refreshList(){
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Orders', {headers: reqHeader})
    .toPromise().then(res => this.orderList = res as Order[]);
  }

  getOrderDetail() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/OrderDetails', {headers: reqHeader})
    .toPromise().then(res => this.orderDetailList = res as OrderDetail[]);
  }

  getOrderDetailProduct() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/OrderDetailsProduct', {headers: reqHeader})
    .toPromise().then(res => this.orderDetailProductList = res as OrderDetailProduct[])
  }

  getOrderAddress() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/OrderAddress', {headers: reqHeader} )
    .toPromise().then(res => this.orderAddressList = res as OrderAddress[])
  }

  getOrderMap() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/Orders', {headers: reqHeader})
    .map(result => result);
  }

  returnOrder() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/Orders', {headers: reqHeader})
  }

  returnOrderDetail() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/OrderDetails', {headers: reqHeader})
  }
}
