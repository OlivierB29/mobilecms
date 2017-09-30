
import { Component, AfterViewInit, Input } from '@angular/core';

import { ReadService } from 'app/shared//services/read.service';
import { OrderbyPipe } from 'app/shared//filters';
import { Event } from 'app/shared//model/event';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Log } from 'app/shared//services/log.service';
import { RouteUtilService } from 'app/shared/services';

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
    private http: HttpClient,
    private log: Log,
    private orderby: OrderbyPipe,
    private routeUtil: RouteUtilService) {
    // Add an empty item in order to display something.
    // Considering that IO operations are slow, it constructs a raw frame for the end user.
    this.items.push({ id: '', activity: '.....', title: '.... .... ........', date: '..-..-....' });
  }

  ngAfterViewInit(): void {
    let localItems = null;
    // Load activities and add link URL, logo URL
    this.http.get<any>(this.dataService.getIndexUrl(this.type))
.subscribe((data: any[]) => {
localItems = data;
// About 10-20 events per season.
// https://angular.io/guide/pipes#!#no-filter-pipe

// filter the next upcoming events
const now = new Date();
localItems = localItems.filter(obj => this.dateAfter(new Date(obj.date), now));
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

 dateAfter(date: Date, from: Date): boolean {
   let result = false;

   if (date && from) {
     if (date.getTime() - from.getTime() > 0 ) {
       result = true;
     }
   }

   return result;

 }

  /**
  * get URL for current locale.
  */
  getUrl(item): string {
    return this.routeUtil.getCalendarRoute(environment.defaultlocale) + '/detail/' + item.id;
  }


}
