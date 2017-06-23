
import { Component, OnInit } from '@angular/core';

import './rxjs-extensions';

import { ConfService } from './shared/services/conf.service';
import { Log } from './shared/services/log.service';


import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit  {



    constructor(private translate: TranslateService, private conf: ConfService,
       private log: Log) {

    }


      ngOnInit(): void {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(environment.defaultlocale);
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(environment.defaultlocale);

      }

}
