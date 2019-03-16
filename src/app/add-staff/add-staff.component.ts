import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {
  employee: Employee;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  phonePattern = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$"
  constructor(
    public employeeService: EmployeeService,
    private toastr : ToastrService,
    public dialogRef : MatDialogRef<AddStaffComponent>
  ) { }

  ngOnInit() {
    this.employee = {
      Username:'',
      FullName:'',
      Email:'',
      PhoneNumber:'',
      Password:''
    }
    
  }

  OnSubmit(form: NgForm) {
    this.employeeService.registerUser(form.value)
      .subscribe((data:any) => {
        console.log(form.value)
        if (data.Succeeded == true){
          form.reset();
          this.toastr.success('Employee registration sucessful');
          this.dialogRef.close();
        }
        else {
          form.reset();
          this.toastr.error(data.Errors);
          console.log(data.Errors);
        }
      });
  }
}
