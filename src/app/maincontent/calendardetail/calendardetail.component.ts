
import { Component, OnInit, Input } from '@angular/core';



import { ReadService } from '../../shared/services/read.service';
import { ConfService } from '../../shared/services/conf.service';

import { Log } from '../../shared/services/log.service';

@Component({
    moduleId: module.id,
    selector: 'app-my-calendardetail-component',
    templateUrl: 'calendardetail.component.html',
    styleUrls: ['calendardetail.component.css']
})
export class CalendarDetailComponent implements OnInit {

    @Input() id: string;

    item: any = {};


  // Localization
  i18n = {};

    constructor(
        private readService: ReadService,

        private conf: ConfService,
        private log: Log
    ) {
    }

    ngOnInit(): void {
        this.log.debug('app-my-calendardetail-component '  +  this.id);


  this.readService.getLocale( 'maincontent/calendar',
  this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
                error => this.log.debug('Locale'  +  error),
                () => this.log.debug('Locale complete'));

        if (this.id) {

            this.readService.get('calendar', this.id)
                .subscribe((data: any) => this.item = data,
                error => this.log.debug('get'  +  error),
                () => { this.log.debug('get complete'); });
        } else {
            console.error('app-my-calendardetail-component empty id');
        }


    }



}
