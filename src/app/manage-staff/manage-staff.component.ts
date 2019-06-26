import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddStaffComponent } from '../add-staff/add-staff.component';
import { LoginComponent } from '../login/login.component';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { EditStaffComponent } from '../edit-staff/edit-staff.component';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss']
})
export class ManageStaffComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog,
    public navigation: NavigationService,
    public employeeService: EmployeeService
    ) { }

  ngOnInit() {
    this.navigation.show();
    this.employeeService.refreshList();
  }

  openDialogAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '540px';
    this.dialog.open(AddStaffComponent, dialogConfig);
  }

  openDialogEdit(emp : Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '540px';
    dialogConfig.disableClose = true;
    dialogConfig.data = emp;
    this.dialog.open(AddStaffComponent, dialogConfig);
  }

  onDelete(id: number){
    this.employeeService.deleteUser(id)
    .subscribe((data) => {
      this.employeeService.refreshList();
    });  
  }
}
