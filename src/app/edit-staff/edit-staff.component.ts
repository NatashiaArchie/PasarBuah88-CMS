import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Employee } from '../shared/employee.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  employee : Employee;
  constructor(
    private dialogRef : MatDialogRef<EditStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.employee = this.data;
      console.log(this.data);
  }

  ngOnInit() {
    console.log(this.employee);
  }

}
