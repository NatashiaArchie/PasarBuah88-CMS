import { PipeTransform, Pipe } from '@angular/core';
import { Announcement } from '../shared/announcement.model';
import { pipe } from 'rxjs';
@Pipe({
    name: 'announcementFilter'
})

export class AnnouncementFilterPipe implements PipeTransform{
    transform(announcement: Announcement[], searchTerm: string):Announcement[] {
        if (!announcement || ! searchTerm){
            return announcement;
        }
        return announcement.filter( announcement => 
            announcement.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

}