import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { AnnouncementService } from '../shared/announcement.service';
import { Announcement } from '../shared/announcement.model';
import { AnnouncementDetailComponent } from '../announcement-detail/announcement-detail.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcement: Announcement;

  constructor(
    public dialog: MatDialog,
    public announcementService: AnnouncementService
  ) { }

  ngOnInit() {
    this.announcementService.refreshList();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    this.dialog.open(AddAnnouncementComponent, dialogConfig);
  }
  openDialogEdit(a: Announcement){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = a;
    this.dialog.open(AddAnnouncementComponent, dialogConfig);
  }

  onDelete(id: number) {

  }

  openDialogDetail(a: Announcement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.data = a;
    this.dialog.open(AnnouncementDetailComponent, dialogConfig);
  }



}
