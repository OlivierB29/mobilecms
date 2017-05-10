
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Activity } from '../../shared/model/activity';

import { ConfService } from '../../shared/services/conf.service';
import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';



@Component({
  moduleId: module.id,
  templateUrl: 'clubactivities.component.html',
  styleUrls: ['clubactivities.component.css']
})
export class ClubActivitiesComponent implements OnInit {


  // Localization
  i18n = {};

  // Server context
  context = '';


  activity: string;


  activityObjectList: Activity[] = [];

  /**
  * router link of the current page.
  * Same value in this case, but could be different
  * Explanation :
  * - en: clubs
  * - fr: clubs
  */
  mainRoute = 'clubs';

  constructor(
    private router: Router,
    private dataService: ReadService,
    private conf: ConfService,
    private log: Log,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {


  this.dataService.getLocale( 'maincontent/clublist',
  this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
                error => this.log.debug('Locale'  +  error),
                () => this.log.debug('Locale complete'));


    // path parameters
    this.route.params.forEach((params: Params) => {
      if (params['activity'] !== undefined) {
        this.activity = params['activity'];


      }

    });

    this.context = this.conf.getContext();

    //
    // Load activities and add link URL, logo URL
    //
    this.dataService.getAll('activities')
      .subscribe((data: Activity[]) => {
        // all activities are displayed
        this.activityObjectList = data;
        this.activityObjectList.forEach((a: Activity) => {
          a.link = '/' + this.mainRoute + '/' + a.name;
          a.image = 'public/activities/' + a.name + '/' + a.logo;
        });
      },
      error => this.log.debug('getActivities' + error),
      () => this.log.debug('getActivities complete' + this.activityObjectList.length));


  }


  gotoActivity(activity: string): void {

  this.router.navigate(['/clubs/' , activity]);
  }




}
