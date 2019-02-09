
import { Component, AfterViewInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { OrderbyPipe } from 'src/app/shared/pipes';
import { Event } from 'src/app/shared//model/event';
import { environment } from 'src/environments/environment';
import { ReadService, Log } from 'src/app/shared/services';


/**
* same timing animations
*/
@Component({

  selector: 'app-my-calendar-feed',
  templateUrl: 'calendarfeed.component.html',
  styleUrls: ['calendarfeed.component.css']

})

export class CalendarFeedComponent implements AfterViewInit {

  imageservice = '';

  @Input() max = 1;

  items: any[] = [];

  type = 'calendar';



  constructor(private dataService: ReadService,
    private http: HttpClient,
    private log: Log,
    private orderby: OrderbyPipe) {
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
const begin = new Date();
begin.setDate(begin.getDate() - 1);
localItems = localItems.filter(obj => this.dateAfter(new Date(obj.date), begin));
//localItems = this.orderby.transform(localItems, 'date', 'asc');
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



}
