import { Component, AfterViewInit, Input } from '@angular/core';


import { ReadService } from 'src/app/shared/services/read.service';
import { OrderbyPipe } from 'src/app/shared/pipes';
import { Event } from 'src/app/shared/model/event';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Log } from 'src/app/shared/services/log.service';

import { RouteUtilService, DateUtilService } from 'src/app/shared/services';


@Component({
  
    selector: 'app-calendar-time-line',
    templateUrl: 'calendar-time-line.component.html',
    styleUrls: ['divtable.css', 'calendar-time-line.component.css']
})
export class CalendarTimeLineComponent {

  @Input() items: any[] = [];

  days: any[] = [];


  type = 'calendar';


  constructor(protected dataService: ReadService,
    protected http: HttpClient,
    protected log: Log,
    protected orderby: OrderbyPipe,
    private routeUtil: RouteUtilService,
    protected dateutil: DateUtilService) {
    // Add an empty item in order to display something.
    // Considering that IO operations are slow, it constructs a raw frame for the end user.
  //  this.items.push({ id: '', activity: '.....', title: '.... .... ........', date: '..-..-....' });
  this.dateutil.setLang('fr');
  }





  getDayContent(day: Date): any {
    return { date: day,
       name: this.dateutil.getDayShort(day.getDay()),
       number: day.getDate(),
       monthnumber: day.getMonth(),
       monthname: this.dateutil.getMonthName(day.getMonth()),
       items: this.items.filter(obj => this.dateMatch(obj, day))
     };
  }

  getDayLineClass(date: Date) {
    let result = date.getDay() === 0 ? 'endofweekline' : 'dayline';

    if ( this.dateutil.isWeekEndDate(date) ) {
      result += ' weekend';
    }

    return result;
  }



    /**
    * get URL for current locale.
    */
    getUrl(item): string {
      return  'detail/' + item.id;
    }


  dateMatch(obj: any, from: Date): boolean {
    let result = false;

    const date = obj.date ? new Date(obj.date) : null;
    const enddate = obj.enddate ? new Date(obj.enddate) : null;

    if (this.dateutil.dateEquals(date, from)) {
        result = true;
    } else if (this.dateutil.dateEquals(enddate, from)) {
      result = true;
    } else if (this.dateutil.dateAfter(from, date) && this.dateutil.dateBefore(from, enddate)) {
      result = true;
    }
    return result;

  }



  findEndDate(): Date {
    let date: Date = null;
    if (this.items && this.items.length > 0 && this.items[this.items.length - 1].date) {
      date = new Date(this.items[this.items.length - 1].date);
    } else {
     date = new Date();
    }
    // calculate last day of month
    date.setMonth(date.getMonth() + 1);
    date = this.dateutil.getLastDayOfMonth(date);

    return date;
  }

  getShortTitle(item: any): string {
    let result = '';
    const size = 10;
    if (item.activity) {
      result += item.activity.toUpperCase() + ' ';
    }
    if (item.title) {
    result = item.title;
    if ( result.length > size) {
      result = result.substring(0, size);
      result += '...';
    } else {
      result = result;
    }
    }
    return result;
  }

  getCellStyle(month: number) {
    return month % 2 ? 'monthCell1' : 'monthCell2';
  }

}
