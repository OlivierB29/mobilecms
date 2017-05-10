
import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';

import './rxjs-extensions';

import { ConfService } from './shared/services/conf.service';
import { Log } from './shared/services/log.service';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {


    layout= 'desktop';

    constructor(private ngZone: NgZone, private conf: ConfService,
       private log: Log) {

    }



}
