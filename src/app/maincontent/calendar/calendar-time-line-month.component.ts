import { Component, AfterViewInit } from '@angular/core';
import { CalendarTimeLineComponent } from './calendar-time-line.component';




@Component({
    moduleId: module.id,
    selector: 'app-calendar-time-line-month',
    templateUrl: 'calendar-time-line-month.component.html',
    styleUrls: ['divtable.css', 'calendar-time-line.component.css', 'calendar-time-line-month.component.css']
})
export class CalendarTimeLineMonthComponent  extends CalendarTimeLineComponent  implements AfterViewInit {

  years: any[] = [];

//  months: any[] = [];


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
    localItems = this.orderby.transform(localItems, 'date', 'asc');

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





    // list by days
    /*
    date = this.dateutil.getFirstDayOfMonth(current);
    while (this.dateutil.dateBefore(date, end)) {

      this.days.push(this.getDayContent(date));
      date = new Date(date.setDate(date.getDate() + 1));

    }
*/
    // list by months
    date = this.dateutil.getFirstDayOfMonth(current);

    while (this.dateutil.dateBefore(date, end)) {
      const lastday = this.dateutil.getLastDayOfMonth(date);

      const days = [];
      let dayOfMonth = new Date(date);
      while (this.dateutil.dateBefore(dayOfMonth, lastday)) {
        const day = new Date(dayOfMonth); // issue when not cloning
        days.push(this.getDayContent(day));
        dayOfMonth = new Date(dayOfMonth.setDate(dayOfMonth.getDate() + 1));
      }


      this.getYearByNumber(date.getFullYear()).months.push({date: date, number: date.getMonth(),
         name: this.dateutil.getMonthName(date.getMonth()),
         days: days});

      date = new Date(date.setMonth(date.getMonth() + 1));
    }

    });




    }

    getYearByNumber(year: number) {
      let result = null;
      const match =  this.years.filter(obj =>  obj.number === year);
      if (match.length > 0) {
        result = match[0]
      } else {
        result = { number: year, months: [] };
        this.years.push(result);

      }
      return result;
    }

    getDayOfMonthStyle(day: number) {
      return this.dateutil.isWeekEndDay(day) ? 'weekend' : '';
    }

    getItemTitleMonthFormat(item: any): string {
      let result = '';
      const activitysize = 3;
      const size = 45;

      if (item.activity) {
        result += item.activity.toUpperCase() + ': ';
      }
      if (item.title) {
      result += item.title;
      if ( result.length > size) {
        result = result.substring(0, size);
        result += '...';
      }
      }
      return result;
    }
}