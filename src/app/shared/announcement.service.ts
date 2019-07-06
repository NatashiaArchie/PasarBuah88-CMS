import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Announcement } from './announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  announcement: Announcement;
  readonly rootUrl = 'http://localhost:50008/';
  list: Announcement[];
  constructor(
    public http: HttpClient
  ) { }

  AddAnnouncement(a: Announcement) {
    const body: Announcement ={
      ImageUrl: a.ImageUrl,
      Title: a.Title,
      Description: a.Description,
      Status: a.Status,
      StartDate: a.StartDate,
      EndDate: a.EndDate
    }

    return this.http.post(this.rootUrl + 'api/Announcement', body)
  }

  EditAnnouncement(a: Announcement) {
    const body: Announcement ={
      AnnouncementId: a.AnnouncementId,
      ImageUrl: a.ImageUrl,
      Title: a.Title,
      Description: a.Description,
      Status: a.Status,
      StartDate: a.StartDate,
      EndDate: a.EndDate
    }

    return this.http.put(this.rootUrl + 'api/Announcement/' + a.AnnouncementId, body)
  }

  refreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Announcement', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Announcement[])
  }

  deleteAnnouncement(id: number){
    return this.http.delete(this.rootUrl + 'api/Announcement/'+id)
  }


}
