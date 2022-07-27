
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../activity/activity';


/**
* Display a list of club activities, which have calendar events :
* - Each button open a list of clubs
* - When clicked, display a list of events for the current activity
*/
@Component({

  templateUrl: 'googlecalendar.component.html',
  styleUrls: ['googlecalendar.component.css']
})
export class GooglecalendarComponent implements OnInit {

    /**
    * selected activity name (tennis, basketball, ...)
    */
    activity: string ='';

    /**
    * list of activities objects
    */
    activityObjectList: Activity[] = <any>[];

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


  }

 

}
