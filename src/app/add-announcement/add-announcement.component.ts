import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnnouncementService } from '../shared/announcement.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Announcement } from '../shared/announcement.model';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  image;
  imageUrl: string = "../../assets/images/uploadimages.jpg";
  announcement: Announcement;
  fileToUpload: File;
  basePath = '/announcement';
  status = [
    {value: 'Active'},
    {value: 'Inactive'}
  ]
  constructor(
    public fireDatabase :  AngularFireDatabase,
    public announcementService: AnnouncementService,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<AddAnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.announcement = this.data;
  }

  ngOnInit() {
    if(this.announcement == null) {
      this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/pasarbuah88-fyp.appspot.com/o/announcement%2Fuploadimages.jpg?alt=media&token=36d606f6-c56c-410e-bdfb-b536326993e2";
      this.announcement = {
        ImageUrl: null,
        Title: '',
        Description: '',
        Status: '',
        StartDate: '',
        EndDate: ''
      }
    } else {
      this.imageUrl = this.data.ImageUrl;
    }
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);

    if (form.value.AnnouncementId != null) {
      form.value.ImageUrl = this.data.ImageUrl;
      this.announcementService.EditAnnouncement(form.value)
          .subscribe((data:any) => {
              form.reset();
              this.toastr.success('Product has been updated successful');
              this.dialogRef.close();    
            this.announcementService.refreshList();
      });
      this.announcementService.refreshList();
    } else {
      const metaData = {'contentType': this.fileToUpload.type};
      var storageRef = firebase.storage().ref();
      var uploadProduct = storageRef.child(`${this.basePath}/${this.fileToUpload.name}`)
      .put(this.fileToUpload, metaData)
        .then((result) => {

          //get download Url
          storageRef.child(`${this.basePath}/${this.fileToUpload.name}`).getDownloadURL()
          .then((url) => {
            console.log(url);
            form.value.ImageUrl = url;
            //add to database
            if (form.value.AnnouncementId == null) {
              this.announcementService.AddAnnouncement(form.value)
                .subscribe((data:any) => {
                  this.announcementService.refreshList();
                    form.reset();
                    this.toastr.success('Product has been added successful');
                    this.dialogRef.close();
            });
            }
            else {
            }
            
          })
          .catch((error) => {
            console.log(error);
          });
        });
      console.log("Uploading: ", this.fileToUpload.name);
      console.log(form.value);
    }
    
    
    
  }

}
