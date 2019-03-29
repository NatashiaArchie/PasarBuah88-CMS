import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  readonly rootUrl = 'http://localhost:50008/';
  list: Category[];
  constructor(private http: HttpClient) { }

  addCategory(category: Category){
    const body: Category = {
      CategoryId: null,
      CategoryName: category.CategoryName
    }
    return this.http.post(this.rootUrl + 'api/Category', body);
  }

  refreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Category', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Category[])
  }

  editCategory(category: Category){
    const body: Category = {
      CategoryId: category.CategoryId,
      CategoryName: category.CategoryName
    }

    return this.http.put(this.rootUrl + 'api/Category/' + category.CategoryId, body);
  }

  deleteCategory(id : number){
    return this.http.delete(this.rootUrl + 'api/Category/' + id);
  }
}
