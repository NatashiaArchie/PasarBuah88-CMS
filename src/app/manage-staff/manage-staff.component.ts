import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddStaffComponent } from '../add-staff/add-staff.component';
import { LoginComponent } from '../login/login.component';
import { EmployeeService } from '../shared/employee.service';

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

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '400px';
    dialogConfig.disableClose = true;
    this.dialog.open(AddStaffComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
}
