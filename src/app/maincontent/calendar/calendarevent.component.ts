
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../environments/environment';


import { ReadService } from '../../shared/services/read.service';
import { Log } from '../../shared/services/log.service';


import { Event } from '../../shared/model/event';


@Component({
    moduleId: module.id,
    selector: 'app-my-calendar-event',

    templateUrl: 'calendarevent.component.html',
    styleUrls: ['calendarevent.component.css']
})
export class CalendarEventComponent implements OnInit {


    item: Event = null;
    id= '';

    routerLink = '';

    /**
    * offset for LazyLoadImageModule
    */
    offset = 100;

    /**
    * default image displayed by  for LazyLoadImageModule
    */
    defaultImage = environment.server + '/' + environment.public + '/resources/ring-alt-32.svg';

    constructor(
        private router: Router,
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




        if (this.id) {

            this.dataService.get('calendar', this.id)
                .subscribe((data: any) => this.item = data,
                error => this.log.error('calendar get'  +  error),
                () => { this.log.debug('get complete'); });
        } else {
            console.error('app-my-newsdetail-component empty id');
        }



    }

}
