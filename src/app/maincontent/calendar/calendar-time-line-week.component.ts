import { Component, AfterViewInit } from '@angular/core';
import { CalendarTimeLineComponent } from './calendar-time-line.component';




@Component({
  
    selector: 'app-calendar-time-line-week',
    templateUrl: 'calendar-time-line-week.component.html',
    styleUrls: ['divtable.css', 'calendar-time-line.component.css']
})
export class CalendarTimeLineWeekComponent  extends CalendarTimeLineComponent   implements AfterViewInit {


    weeks: any[] = [];


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
    localItems = localItems.filter(obj => this.dateutil.dateAfter(new Date(obj.date), now));
    //localItems = this.orderby.transform(localItems, 'date', 'asc');

    this.log.debug(this.type + ' ' + localItems.length);

    // replace or add new items
    for (let i = 0; i < localItems.length; i++) {
    if (this.items.length > i) {
      this.items[i] = localItems[i];
    } else {
      this.items.push(localItems[i]);
    }
    }


    // #####################################################
    const current = new Date();

    let date = this.dateutil.getFirstDayOfMonth(current);
    const end = this.findEndDate();




    // list by weeks
    date = this.dateutil.getFirstMondayOfMonth(current);
    while (this.dateutil.dateBefore(date, end)) {
      let sunday = new Date(date);
      sunday = new Date(sunday.setDate(sunday.getDate() + 6));

      const days = [];
      let dayOfWeek = new Date(date);
      while (this.dateutil.dateBefore(dayOfWeek, sunday)) {
        const day = new Date(dayOfWeek); // issue when not cloning
        days.push(this.getDayContent(day));
        dayOfWeek = new Date(dayOfWeek.setDate(dayOfWeek.getDate() + 1));
      }
      this.weeks.push({date: date,
         number: this.dateutil.getWeek(date),
         days: days
       });

      date = new Date(date.setDate(date.getDate() + 7));
    }




    });




    }
}
