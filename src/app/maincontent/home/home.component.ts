import { Component, OnInit } from '@angular/core';


import { ConfService } from '../../shared/services/conf.service';
import { LocaleService } from '../../shared/services/locale.service';
import { Log } from '../../shared/services/log.service';

@Component({
    moduleId: module.id,
    selector: 'my-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    i18n = {};

    activity: string;
    date: string;


    constructor(


        private conf: ConfService,
        private log: Log,
        private locale: LocaleService
          ) {



    }

    ngOnInit(): void {


        this.locale.getLocale('app/maincontent/home/i18n',
         this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
            error => this.log.debug('Locale' + error),
            () => this.log.debug('Locale complete'));


    }


}
