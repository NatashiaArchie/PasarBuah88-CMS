import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { Employee } from '../shared/employee.model';
import { NgForm, NgModel } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  employee: Employee;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  phonePattern = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$"
  constructor( 
    public navigation: NavigationService,
    private employeeService: EmployeeService
    ) { }

  ngOnInit() {
    this.navigation.show();
    this.resetForm();
  }

  resetForm(form?: NgForm){

    if (form !=null) {

    }
    form.reset();
    this.employee = {
      Id: '',
      UserName: '',
      FullName: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
      UserType: '',

    }
  }

  OnSubmit(form: NgForm){
    this.employeeService.registerUser(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded == true)
      this.resetForm(form);
    });
  }

}
