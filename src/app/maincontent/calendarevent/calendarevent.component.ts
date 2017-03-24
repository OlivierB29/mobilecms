import { CalendarService } from '../../shared/services/calendar.service';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { ConfService } from '../../shared/services/conf.service';
import { LocaleService } from '../../shared/services/locale.service';
import { Log } from '../../shared/services/log.service';


import { Event }        from '../../shared/model/event';


@Component({
    moduleId: module.id,
    selector: 'my-calendar-detail',

    templateUrl: 'calendarevent.component.html',
    styleUrls: ['calendarevent.component.css']
})
export class CalendarEventComponent implements OnInit {


    current: Event = null;
    id: string = '';


    i18n = {};

    commonLocale = {};


    routerLink = '';


    constructor(
        private router: Router,
        private dataservice: CalendarService,


        private conf: ConfService,
        private log: Log,
        private route: ActivatedRoute,
        private locale: LocaleService
    ) {



    }

    ngOnInit(): void {




        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = params['id'];
            }

        });


        this.locale.getLocale(this.conf.getI18n() + '/maincontent/calendar/i18n/',
         this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale' + error),
            () => this.log.debug('Locale complete'));


        if (this.id) {
            this.dataservice.getCalendarEvent(this.id)
                .subscribe((data: Event) => this.current = data,
                error => this.log.debug('getCalendarEvent ' + error),
                () => this.log.debug('getCalendarEvent OK'));

        }



    }

}
