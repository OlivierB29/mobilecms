
import { Component, OnInit } from '@angular/core';

import './rxjs-extensions';

import { ConfService } from './shared/services/conf.service';
import { Log } from './shared/services/log.service';


import { environment } from '../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit  {



    constructor( private conf: ConfService,
       private log: Log) {

    }


      ngOnInit(): void {

      }

}
