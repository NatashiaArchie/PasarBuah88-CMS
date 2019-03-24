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

  addProduct(fileToUpload: File, product: Product) {
    // var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    // const body: Product = {
    //   ProductName: product.ProductName,
    //   RetailerPrice: product.RetailerPrice,
    //   SalesPrice: product.SalesPrice,
    //   QuantityInStock: product.QuantityInStock,
    //   Category: product.Category,
    //   ProductBrand: product.ProductBrand,
    //   ProductStatus: product.ProductStatus,
    //   ProductUnitType: product.ProductUnitType,
    //   ProductDescription: product.ProductDescription
    // }
    const formData: FormData = new FormData();
    formData.append('ImageName',fileToUpload, fileToUpload.name);
    formData.append('ProductName', product.ProductName);
    formData.append('RetailerPrice', product.RetailerPrice.toString());
    formData.append('SalesPrice', product.SalesPrice.toString());
    formData.append('QuantityInStock', product.QuantityInStock.toString());
    formData.append('Category', product.Category);
    formData.append('ProductBrand', product.ProductBrand);
    formData.append('ProductStatus', product.ProductStatus);
    formData.append('ProductUnitType', product.ProductUnitType);
    formData.append('ProductDescription', product.ProductDescription);

      
    return this.http.post(this.rootUrl + 'api/AddProduct', formData);
  }

  editProduct(fileToUpload: File,product: Product){
    const formData: FormData = new FormData();
    formData.append('ProductId', product.ProductId.toString());
    formData.append('ImageName',fileToUpload, fileToUpload.name);
    formData.append('ProductName', product.ProductName);
    formData.append('RetailerPrice', product.RetailerPrice.toString());
    formData.append('SalesPrice', product.SalesPrice.toString());
    formData.append('QuantityInStock', product.QuantityInStock.toString());
    formData.append('Category', product.Category);
    formData.append('ProductBrand', product.ProductBrand);
    formData.append('ProductStatus', product.ProductStatus);
    formData.append('ProductUnitType', product.ProductUnitType);
    formData.append('ProductDescription', product.ProductDescription);

    return this.http.put(this.rootUrl + 'api/Product/'+product.ProductId, formData)
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
