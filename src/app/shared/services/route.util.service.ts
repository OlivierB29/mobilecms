import { Injectable } from '@angular/core';

@Injectable()
export class RouteUtilService {

  constructor() {
  }

  /**
  * TODO : find a better way to manage routes by translating
  */
  getCalendarRoute(locale: string): string {
    let result = 'calendar';
    if ('fr' === locale) {
      result = 'calendrier';
    }

    return result;
  }

}
