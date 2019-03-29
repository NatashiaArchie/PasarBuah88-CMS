import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    public dialogRef : MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.employee = this.data;
    
  }

  ngOnInit() {
    if (this.employee == null) {
      this.employee = {
        Id: '',
        UserName:'',
        FullName:'',
        Email:'',
        PhoneNumber:'',
        Password:''
      }
    }
    
  }

  OnSubmit(form: NgForm) {
    if (this.data == null) {
      debugger;
      this.employeeService.registerUser(form.value)
      .subscribe((data:any) => {
        console.log(form.value)
        if (data.Succeeded == true){
          form.reset();
          this.toastr.success('Employee registration successful');
          this.dialogRef.close();
          this.employeeService.refreshList();
        }
        else {
          this.toastr.error(data.Errors);
          console.log(data.Errors);
        }
      });
    }
    else {
      console.log(this.data);
      console.log(form.value);
      debugger;
      this.employeeService.updateUser(form.value)
      .subscribe((data:any) => {
        //if (data.Succeeded == true){
          this.toastr.success('Employee information has been updated sucessful');
          this.dialogRef.close();
        //}
        // else {
        //   this.toastr.error(data.Errors);
        //   console.log(data.Errors);
        // }
      })
    }
  }
}
