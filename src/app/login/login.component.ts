import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { EmployeeService } from '../shared/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  constructor( 
    //public navigation: NavigationService,
    private employeeService: EmployeeService,
    private router: Router,
    public toastr: ToastrService
    ) { }

  ngOnInit() {
    //this.navigation.hide();
  }

  OnSubmit(username, password){
    //make a token request
    this.employeeService.userAuthentication(username, password)
    .subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/dashboard']);},
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
      this.toastr.error("Incorrect username or password");
      
    }   
    );
  }

}
