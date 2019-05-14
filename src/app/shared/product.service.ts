import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly rootUrl = 'http://localhost:50008/';
  list : Product[];
  formData : Product
  constructor( private http: HttpClient) { }

  addProduct(product: Product) {
    // var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    const body: Product = {
      ImageUrl: product.ImageUrl,
      ProductName: product.ProductName,
      RetailerPrice: product.RetailerPrice,
      SalesPrice: product.SalesPrice,
      QuantityInStock: product.QuantityInStock,
      Category: product.Category,
      ProductBrand: product.ProductBrand,
      ProductStatus: product.ProductStatus,
      ProductUnitType: product.ProductUnitType,
      ProductDescription: product.ProductDescription
    }
    return this.http.post(this.rootUrl + 'api/Product', body);
  }

  editProduct(product: Product){
    const body: Product = {
        ProductId: product.ProductId,
        ImageUrl: product.ImageUrl,
        ProductName: product.ProductName,
        RetailerPrice: product.RetailerPrice,
        SalesPrice: product.SalesPrice,
        QuantityInStock: product.QuantityInStock,
        Category: product.Category,
        ProductBrand: product.ProductBrand,
        ProductStatus: product.ProductStatus,
        ProductUnitType: product.ProductUnitType,
        ProductDescription: product.ProductDescription
      }

    return this.http.put(this.rootUrl + 'api/Product/'+product.ProductId, body)
  }

  refreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Product', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Product[])
  }

  deleteProduct(id: number){
    return this.http.delete(this.rootUrl + 'api/Product/'+id)
  }
}
