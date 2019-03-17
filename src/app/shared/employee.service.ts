import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
import { debug } from 'util';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly rootUrl = 'http://localhost:50008/';

  formData : Employee;
  list : Employee[];
  constructor(private http: HttpClient) { }

  registerUser(employee: Employee){
    const body: Employee = {
      Username: employee.Username,
      FullName: employee.FullName,
      Email: employee.Email,
      PhoneNumber: employee.PhoneNumber,
      Password: employee.Password,
    }
    return this.http.post(this.rootUrl + 'api/User/Register', body);
  }

  userAuthentication(username, password){
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.http.post(this.rootUrl+ '/token', data, {headers: reqHeader});
    console.log(reqHeader);
  }

  refreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/User', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Employee[])
  }
}
