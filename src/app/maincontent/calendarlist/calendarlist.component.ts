import { Component, OnInit, Input } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { ReadService } from '../../shared/services/read.service';
import { ConfService } from '../../shared/services/conf.service';

import { Log } from '../../shared/services/log.service';


import { Event }        from '../../shared/model/event';
import { Activity }        from '../../shared/model/activity';


@Component({
    moduleId: module.id,
    selector: 'my-calendar-list',
    templateUrl: 'calendarlist.component.html',
    styleUrls: ['calendarlist.component.css']
})
export class CalendarListComponent implements OnInit {

    items: Event[] = [];

    years: string[] = [];

     @Input() activity: string;

    i18n = {};

    commonLocale = {};


    localregion = 'Bretagne';

    /**
    * router link of the current page
    */
    routerLink = '';


    logosUrl : string = '';



    constructor(
        private router: Router,
        private dataservice: ReadService,


        private conf: ConfService,
        private log: Log,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {


        this.logosUrl = this.conf.getResources() + '/public/activities';

        var currentDate = new Date();

        var currentYear = currentDate.getFullYear();

        if (currentDate.getMonth() > 6) {

            //2016-2017
            this.years.push('' + currentYear);
            this.years.push('' + (currentYear + 1));

        } else {
            //2015-2016
            this.years.push('' + (currentYear - 1));
            this.years.push('' + currentYear);

        }


        this.route.params.forEach((params: Params) => {
            if (params['activity'] !== undefined) {

                this.activity = params['activity'];

                this.log.debug('activity selected ' + this.activity);
            }
        });

        //Explanation :
        //if locale is en : calendar
        //if locale is fr : calendrier
        this.routerLink = this.route.routeConfig.path;


        this.dataservice.getLocale( 'maincontent/calendar/',
         this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale' + error),
            () => this.log.debug('Locale complete'));


        if (this.activity) {
          //case : activity selected
            this.dataservice.getAll('calendar')
                .subscribe((data: Event[]) => this.items = data,
                error => this.log.debug('getCalendarEvents ' + error),
                () => this.log.debug('getCalendarEvents complete :' + this.activity + ' ' + this.items.length));
        } 

    }





    gotoDetail(currentItem: Event): void {

    let link = [this.routerLink+'/detail/' , currentItem.activity];
    this.router.navigate(link);
  }


  


}
