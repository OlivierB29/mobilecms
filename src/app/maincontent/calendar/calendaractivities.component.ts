
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Activity } from 'app/shared/model/activity';


import { Log } from 'app/shared/services/log.service';
import { ReadService } from 'app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';


/**
* Display a list of club activities, which have calendar events :
* - Each button open a list of clubs
* - When clicked, display a list of events for the current activity
*/
@Component({

  templateUrl: 'calendaractivities.component.html',
  styleUrls: ['calendaractivities.component.css']
})
export class CalendarActivitiesComponent implements OnInit {

    /**
    * selected activity name (tennis, basketball, ...)
    */
    activity: string;

    /**
    * list of activities objects
    */
    activityObjectList: Activity[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private dataService: ReadService,
    private http: HttpClient,
    private log: Log,
    private route: ActivatedRoute
  ) {
        // this.titleService.setTitle(this.type);
  }

  ngOnInit(): void {

    // path parameters
    this.route.params.forEach((params: Params) => {
      if (params['activity'] !== undefined) {
        this.activity = params['activity'];
      }
    });

    // Load activities and add link URL, logo URL
    this.http.get<any>(this.dataService.getIndexUrl('activities'))
.subscribe((data: Activity[]) => {
this.activityObjectList = data.filter(function(el) { return el.calendar === 'true'; });
});



  }
}
