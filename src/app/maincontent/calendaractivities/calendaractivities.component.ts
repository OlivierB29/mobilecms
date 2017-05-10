
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

  /**
  * router link of the current page
  * Explanation :
  * - en: calendar
  * - fr: calendrier
  */
  mainRoute = '';

  constructor(
    private router: Router,
    private dataService: ReadService,
    private conf: ConfService,
    private log: Log,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    // Explanation :
    // if locale is en: calendar/:activity
    // if locale is fr: calendrier/:activity


    // TODO find better ?
    const routerLink = this.route.routeConfig.path;
    this.mainRoute = routerLink.split('/')[0];


    this.dataService.getLocale('maincontent/calendar',
      this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
      error => this.log.debug('Locale' + error),
      () => this.log.debug('Locale complete'));


    // path parameters
    this.route.params.forEach((params: Params) => {
      if (params['activity'] !== undefined) {
        this.activity = params['activity'];
      }
    });


    //
    // Load activities and add link URL, logo URL
    //
    this.dataService.getAll('activities')
      .subscribe((data: Activity[]) => {
        this.activityObjectList = data.filter(function(el) { return el.calendar === 'true'; });
        this.activityObjectList.forEach((a: Activity) => {
          a.link = '/' + this.mainRoute + '/' + a.name;
          a.image = 'public/activities/' + a.name + '/' + a.logo;
        });
      },
      error => this.log.debug('getActivities' + error),
      () => this.log.debug('getActivities complete' + this.activityObjectList.length));

  }
}
