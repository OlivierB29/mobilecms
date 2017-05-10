
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Activity } from '../../shared/model/activity';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';



@Component({
  moduleId: module.id,
  templateUrl: 'calendaractivities.component.html',
  styleUrls: ['calendaractivities.component.css']
})
export class CalendarActivitiesComponent implements OnInit {


  // Localization
  i18n = {};

  activity: string;


  activityObjectList: Activity[] = [];

  constructor(
    private router: Router,
    private dataService: ReadService,
    private conf: ConfService,
    private log: Log,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {


  this.dataService.getLocale( 'maincontent/calendar',
  this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
                error => this.log.debug('Locale'  +  error),
                () => this.log.debug('Locale complete'));


    // path parameters
    this.route.params.forEach((params: Params) => {
      if (params['activity'] !== undefined) {
        this.activity = params['activity'];


      }

    });


    this.dataService.getAll('activities')
                                  .subscribe((data: Activity[]) => this.activityObjectList = data.filter(function (el) {
  return el.calendar === 'true';
}),
                                      error => this.log.debug('getActivities' + error),
                                      () => this.log.debug('getActivities complete'  +  this.activityObjectList.length));




  }


  gotoActivity(activity: string): void {
    this.router.navigate(['/calendrier/' , activity]);
  }



getLogoUrl(id: string, file: string): string {


  return  'public/activities/' + id + '/' + file ;
}

}
