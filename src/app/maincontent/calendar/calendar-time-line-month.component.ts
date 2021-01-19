import { Component, AfterViewInit } from '@angular/core';
import { CalendarTimeLineComponent } from './calendar-time-line.component';




@Component({

    selector: 'app-calendar-time-line-month',
    templateUrl: 'calendar-time-line-month.component.html',
    styleUrls: ['divtable.css', 'calendar-time-line.component.css', 'calendar-time-line-month.component.css']
})
export class CalendarTimeLineMonthComponent  extends CalendarTimeLineComponent  implements AfterViewInit {

//  years: any[] = <any>[];

  months: any[] = <any>[];


    ngAfterViewInit(): void {
      let localItems;
      // Load activities and add link URL, logo URL
      this.http.get<any>(this.dataService.getIndexUrl(this.type))
    .subscribe((data: any[]) => {
    localItems = data;
    // About 10-20 events per season.
    // https://angular.io/guide/pipes#!#no-filter-pipe

    // filter the next upcoming events
    const now = new Date();
    let date = this.dateutil.getFirstDayOfMonth(now);
    localItems = localItems.filter(obj => this.dateutil.dateAfter(new Date(obj.date), date));
   // localItems = this.orderby.transform(localItems, 'date', 'asc');

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

    while (this.dateutil.dateBefore(date, end)) {
      const lastday = this.dateutil.getLastDayOfMonth(date);

      const days = <any>[];
      let dayOfMonth = new Date(date);
      while (this.dateutil.dateBefore(dayOfMonth, lastday)) {
        const day = new Date(dayOfMonth); // issue when not cloning
        days.push(this.getDayContent(day));
        dayOfMonth = new Date(dayOfMonth.setDate(dayOfMonth.getDate() + 1));
      }


      this.months.push({date: date,
         number: date.getMonth(),
         year: date.getFullYear(),
         name: this.dateutil.getMonthName(date.getMonth()),
         days: days});

      date = new Date(date.setMonth(date.getMonth() + 1));
    }

    });




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

    /**
    * Maximum 10 colors.
    */
    getCssColor(activity: string): string {
      let color = 0;
      if (activity && activity.length > 0) {
        color = activity.charCodeAt(0);
      }

      color = color % 10;

      return 'activitycolor' + color.toString();
    }
}
