import { Injectable } from '@angular/core';

import { Thumbnail } from 'src/app/shared/model/thumbnail';
import { Activity } from './activity';


@Injectable()
export class ActivityService {



  getActivityStyle(activities: Activity[], activity: string): string {
    let color = 'black';


    if (activities && activity) {
      let filter = activities.filter(a => a.name === activity);
      if (filter.length > 0 && filter[0].color) {
        color =  filter[0].color;
      }
    }

    return 'background-color: ' + color;
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
