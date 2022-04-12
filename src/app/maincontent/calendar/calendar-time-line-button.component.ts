 import { Component, Input, OnInit } from '@angular/core';

import { ActivityService } from '../activity';
import { Activity } from '../activity/activity';
 
 @Component({
     selector: 'app-calendar-time-line-button',
     templateUrl: 'calendar-time-line-button.component.html',
     styleUrls: ['calendar-time-line-button.component.css']
 })
 
 export class CalendarTimeLineButtonComponent implements OnInit {

    @Input() item: any ;
  /**
  * list of activities
  */
   @Input() activities: Activity[] = [];

    constructor(
      protected activityService : ActivityService) {

    }


 
     ngOnInit() { }

     getItemTitleMonthFormat(): string {
        let result = '';
        const activitysize = 3;
        const size = 45;
  
  
        if (this.item.title) {
        result += this.item.title;
        if ( result.length > size) {
          result = result.substring(0, size);
          result += '...';
        }
        }
        return result;
      }

      getActivityStyle(): string {

  
        return this.activityService.getActivityStyle(this.activities, this.item.activity);
      }
      getActivityLogo(): string {
  
        return this.activityService.getDefaultActivityLogo(this.activities, this.item.activity).url;
      }
      /**
    * get URL for current locale.
    */
       getUrl(): string {
        return  'detail/' + this.item.id;
      }
 }