import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee.model';
// import { Response } from "@angular/http";
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly rootUrl = 'http://localhost:50008/';
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
  }
}
