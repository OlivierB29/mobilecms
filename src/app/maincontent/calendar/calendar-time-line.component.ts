import { Component, AfterViewInit, Input } from '@angular/core';


import { ReadService } from '../../shared/services/read.service';
import { OrderbyPipe } from '../../shared/filters';
import { Event } from '../../shared/model/event';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Log } from '../../shared/services/log.service';
import { DateUtil } from 'app/shared/utils/date.util';


@Component({
    moduleId: module.id,
    selector: 'app-calendar-time-line',
    templateUrl: 'calendar-time-line.component.html',
    styleUrls: ['divtable.css', 'calendar-time-line.component.css']
})
export class CalendarTimeLineComponent {

  @Input() items: any[] = [];

  days: any[] = [];


  type = 'calendar';

  dateutil = new DateUtil();

  constructor(protected dataService: ReadService,
    protected http: HttpClient,
    protected log: Log,
    protected orderby: OrderbyPipe) {
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
    let result = '';
    if ('fr' === environment.defaultlocale) {
      result += '/calendrier/detail/';
    } else {
      result += '/calendar/detail/';
    }
    result += item.id;

    return result;
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

  getEndDate(start: Date): Date {
    let date = new Date(start);
    if (this.dateutil.getMonthNumber(start) >= 7 ) {
      date = new Date(date.setFullYear(date.getFullYear() + 1)); // next year
    }
    date = new Date(date.setMonth(5)); // June
    date = new Date(date.setDate(30)); // June
    return date;
  }

  findEndDate(): Date {
    let date: Date = null;
    if (this.items && this.items[this.items.length - 1].date) {
      date = new Date(this.items[this.items.length - 1].date);
      // calculate last day of month
      date = this.dateutil.getLastDayOfMonth(date);

    } else {
      date = this.getEndDate(new Date());
    }
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
