
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { Log } from 'src/app/shared/services/log.service';
import { ReadService } from 'src/app/shared/services/read.service';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../activity/activity';

import { Event } from 'src/app/shared/model/event';


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

  items: any[] = <any>[];


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

/*
    this.http.get<any>(this.googleCalendarUrl('c2l0ZS5jcmtkci5icmV0YWduZUBnbWFpbC5jb20'))
    .subscribe((data: Event[]) => {
      this.items = data;
      this.log.debug('getGoogleCalendarEvents complete : '  +  ' '  +  this.items.length);

    });


*/
  }

  googleCalendarUrl(calendarId : String) {
    
    return 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events';

  }
 

}
