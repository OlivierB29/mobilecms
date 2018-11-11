import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { ReadService } from 'src/app/shared/services/read.service';


import { Log } from 'src/app/shared/services/log.service';


import { Event } from 'src/app/shared/model/event';
import { Activity } from 'src/app/shared/model/activity';
import { OrderbyPipe } from 'src/app/shared/pipes';
import { HttpClient } from '@angular/common/http';

@Component({
  
    selector: 'app-my-calendar-list',
    templateUrl: 'calendarlist.component.html',
    styleUrls: ['calendarlist.component.css']
})
export class CalendarListComponent implements OnInit {

    items: Event[] = [];

    years: string[] = [];

     @Input() activity: string;



    localregion = 'Bretagne';

    /**
    * router link of the current page
    * Explanation :
    * - en: calendar
    * - fr: calendrier
    */
    routerLink = '';


    logosUrl  = '';

    type = 'calendar';



    constructor(
        private router: Router,
        private dataservice: ReadService,
        private log: Log,
        private route: ActivatedRoute,
        private orderby: OrderbyPipe,
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {

        this.route.params.forEach((params: Params) => {
            if (params['activity'] !== undefined) {

                this.activity = params['activity'];

                this.log.debug('activity selected '  +  this.activity);

            }
        });

        // Explanation :
        // if locale is en: calendar
        // if locale is fr: calendrier
        this.routerLink = this.route.routeConfig.path;


        if (this.activity) {
          this.http.get<any>(this.dataservice.getIndexUrl(this.type))
              .subscribe((data: Event[]) => {
                this.items = data;
                this.log.debug('getCalendarEvents complete : '  +  this.activity  +  ' '  +  this.items.length);
                // filter by activity
                this.items = this.items.filter(item => item.activity.indexOf(this.activity) !== -1);

                // next events
                this.orderby.transform(this.items, 'date', 'asc');
              });


        }

    }





    gotoDetail(currentItem: Event): void {

    this.router.navigate([this.routerLink + '/detail/' , currentItem.activity]);
  }



}
