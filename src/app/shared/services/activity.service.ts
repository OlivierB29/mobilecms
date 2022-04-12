import { Injectable } from '@angular/core';
import { Activity } from '../model/activity';
import { Thumbnail } from '../model/thumbnail';



@Injectable()
export class ActivityService {



  getActivityStyle(activities: Activity[], activity: string): string {
    let color = 'black';


    if (activities) {
      let filter = activities.filter(a => a.name === activity);
      if (filter.length > 0) {
        color =  filter[0].color;
      }
    }

    return 'background-color: ' + color.toString();
  }

  getActivityLogo(activities: Activity[], activity: string): string {

    return this.getDefaultActivityLogo(activities, activity).url;
  }
  
  getDefaultActivityLogo(activities: Activity[], activity: string): Thumbnail {
  
    let result: Thumbnail = new Thumbnail("10", "10", "");
    if (activities) {
      let filter = activities.filter(a => a.name === activity);
      if (filter.length > 0) {
        result = new Thumbnail("32", "32", 'public/activities/' + activity + '/' + filter[0].mapicon);
      }
    }
    return result;
  }
  
}
