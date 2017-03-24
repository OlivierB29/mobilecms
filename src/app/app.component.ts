
import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';

import './rxjs-extensions';

import { ConfService } from './shared/services/conf.service';
import { Log } from './shared/services/log.service';

import { LocaleService }          from './shared/services/locale.service';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {

 


    /*width : number ;
    height : number ;
  */
    layout: string = 'desktop';

    constructor(private ngZone: NgZone, private conf: ConfService,
       private log: Log, private locale: LocaleService) {
/*

        window.onresize = (e) => {
            ngZone.run(() => {
                this.layout = this.conf.getLayout();
                this.log.debug('layout on onresize ' + this.layout);
            });
        };
*/
    }
/*
    ngAfterViewInit() {

        this.layout = this.conf.getLayout();
        this.log.debug('layout on load ' + this.layout);

    }

*/


}
