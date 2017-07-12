import { Log } from '../../shared/services/log.service';
import { Component, AfterViewInit, Input } from '@angular/core';

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

export class CalendarFeedComponent implements AfterViewInit {

  imageservice = '';

  @Input() max = 4;

  items: any[] = [];

  type = 'calendar';

  constructor(private dataService: ReadService,
    private log: Log,
    private orderby: OrderbyPipe) {
    // Add an empty item in order to display something.
    // Considering that IO operations are slow, it constructs a raw frame for the end user.
    this.items.push({ id: '', activity: '.....', title: '.... .... ........', date: '..-..-....' });
  }

  ngAfterViewInit(): void {
    let localItems = null;
    this.dataService.getAll(this.type)
      .subscribe((data: any[]) => localItems = data,
      error => this.log.debug(this.type + ' ' + error),
      () => {
        // About 10-20 events per season.
        // https://angular.io/guide/pipes#!#no-filter-pipe

        // filter the next upcoming events
        localItems = this.orderby.transform(localItems, 'date', 'asc');
        if (this.max > 0 && localItems.length > this.max) {
          localItems = localItems.slice(0, this.max);
        }
        this.log.debug(this.type + ' ' + localItems.length);

        // replace or add new items
        for (let i = 0; i < localItems.length; i++) {
          if (this.items.length > i) {
            this.items[i] = localItems[i];
          } else {
            this.items.push(localItems[i]);
          }
        }

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

    return result;
  }


}
