
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Activity } from '../../shared/model/activity';


import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';

/**
* Display a list of club activities :
* - Each button open a list of clubs
* - When clicked, display a list of clubs for the current activity
*/

@Component({
  moduleId: module.id,
  templateUrl: 'clubactivities.component.html',
  styleUrls: ['clubactivities.component.css']
})
export class ClubActivitiesComponent implements OnInit {

  /**
  * selected activity name (tennis, basketball, ...)
  */
  activity: string;

  /**
  * list of activities objects
  */
  activityObjectList: Activity[] = [];

  constructor(
    private router: Router,
    private dataService: ReadService,

    private log: Log,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
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
        // all activities are displayed
        this.activityObjectList = data;
      },
      error => this.log.debug('getActivities' + error),
      () => this.log.debug('getActivities complete' + this.activityObjectList.length));

  }

}
