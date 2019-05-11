import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Announcement } from '../shared/announcement.model';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.scss']
})
export class AnnouncementDetailComponent implements OnInit {
  announcement: Announcement

  ImageUrl: string;
  Title: string;
  Description: string;
  Status: string;
  StartDate: string;
  EndDate: string;

  constructor(
    public dialogRef: MatDialogRef<AnnouncementDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.announcement = this.data;
  }

  ngOnInit() {
    this.ImageUrl = this.announcement.ImageUrl;
    this.Title = this.announcement.Title;
    this.Description = this.announcement.Description;
    this.Status = this.announcement.Status;
    this.StartDate = this.announcement.StartDate;
    this.EndDate = this.announcement.EndDate;
  }

}
