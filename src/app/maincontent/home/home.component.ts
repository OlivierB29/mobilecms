import { Component, OnInit } from '@angular/core';


import { ConfService } from '../../shared/services/conf.service';

import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    i18n = {};

    activity: string;
    date: string;




    constructor(


        private conf: ConfService,
        private dataService: ReadService,
        private log: Log
          ) {



    }

    ngOnInit(): void {


        this.dataService.getLocale(  '/maincontent/home',
         this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale'  +  error),
            () => this.log.debug('Locale complete'));


    }



}
