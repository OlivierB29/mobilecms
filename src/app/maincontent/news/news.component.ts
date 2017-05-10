
import { Component, OnInit } from '@angular/core';
import { OrderbyDescPipe } from '../../shared/filters/orderbydesc.pipe';
import { Log } from '../../shared/services/log.service';
import { ReadService } from '../../shared/services/read.service';
import { ConfService } from '../../shared/services/conf.service';


@Component({
    moduleId: module.id,
    selector: 'app-my-news-component',
    templateUrl: 'news.component.html',
    styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {

  items: any[] = [];

  maxElements = 4;

  // Localization
  i18n = <any>{};


    constructor(
        private conf: ConfService,
        private dataService: ReadService,
        private log: Log,
        private orderbydesc: OrderbyDescPipe
    ) {
    }
    ngOnInit(): void {

        this.dataService.getLocale( 'maincontent/news',
        this.conf.getDefaultLocale()).subscribe((data: any) => this.i18n = data,
                error => this.log.debug('Locale'  +  error),
                () => this.log.debug('Locale complete'));

        this.dataService.getAll('news')
                                  .subscribe((data: any[]) => this.items = data,
                                      error => this.log.debug('getNews' + error),
                                      () => this.log.debug('getNews complete'  +  this.items.length));




    }



}
