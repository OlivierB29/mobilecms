
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


import { ConfService } from '../../shared/services/conf.service';
import { ReadService } from '../../shared/services/read.service';
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
        private conf: ConfService,
        private log: Log,
        private dataService: ReadService,
        private route: ActivatedRoute
    ) {



    }

    ngOnInit(): void {




        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = params['id'];
            }

        });


        this.dataService.getLocale( 'maincontent/calendar/',
         this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale' + error),
            () => this.log.debug('Locale complete'));



        if (this.id) {

            this.dataService.get('calendar', this.id)
                .subscribe((data: any) => this.current = data,
                error => console.log('get' + error),
                () => { console.log('get complete'); });
        } else {
            console.error("my-newsdetail-component empty id");
        }



    }

}
