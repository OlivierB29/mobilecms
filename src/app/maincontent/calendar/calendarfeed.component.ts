import { Log } from '../../shared/services/log.service';
import { Component, OnInit, Input } from '@angular/core';

import { ReadService } from '../../shared/services/read.service';
import { OrderbyPipe } from '../../shared/filters';

import { Event } from '../../shared/model/event';


import { environment } from '../../../environments/environment';


/**
* same timing animations
*/
@Component({
  moduleId: module.id,
  selector: 'app-my-calendar-feed',
  templateUrl: 'calendarfeed.component.html',
  styleUrls: ['calendarfeed.component.css']

})

export class CalendarFeedComponent implements OnInit {

  imageservice = '';

  @Input() max = 4;

  items: any[] = [];

  type = 'calendar';

  constructor(private dataService: ReadService,
    private log: Log,
    private orderby: OrderbyPipe) {
  }

  ngOnInit(): void {

    this.dataService.getAll(this.type)
                              .subscribe((data: any[]) => this.items = data,
                                  error => this.log.debug(this.type + ' ' + error),
                                  () =>  {
                                    // About 10-20 events per season.
                                    // https://angular.io/guide/pipes#!#no-filter-pipe
                                    this.orderby.transform(this.items, 'date', 'asc');
                                    if (this.max > 0 && this.items.length > this.max) {
                                       this.items = this.items.slice(0, this.max);
                                    }
                                    this.log.debug(this.type + ' '  +  this.items.length);



                                });

  }

  /**
  * get URL for current locale.
  */
  getUrl(item): string {
    let result = '';
    if ('fr' === environment.defaultlocale) {
      result += 'calendrier/detail/';
    } else {
      result += 'calendar/detail/';
    }
    result += item.id;

    return result ;
  }


}
