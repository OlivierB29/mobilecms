
export class DateUtilService {
  // TODO find true library for i18n date format
  private lang = 'en';

  daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  daysOfWeekFrShort = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  daysOfWeekFrLong = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



  monthsFrShort = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aou.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
  monthsFrLong = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  public setLang(lang: string) {
    this.lang = lang;
  }

  public printDateYYYYMMDD(temp: Date): string {
        const dateStr = temp.getFullYear() + '-' + (1 + temp.getMonth()) + '-' + temp.getDate();
        return dateStr;
    }

  public printDate(temp: Date): string {
        const dateStr =  (1 + temp.getMonth()) + ' ' + temp.getDate();
        return dateStr;
    }

  public getMonthName = function(month: number): string {

      if (this.lang === 'fr') {
        return this.monthsFrLong[ month ];
      } else {
        return this.monthsLong[ month ];
      }
  }

  public getWeek = function(date: Date): number {
        const onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  }

  public addWeek = function(date: Date): number {
        const onejan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil((((date.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  }

  public getMonthNumber = function(date: Date): number {
    // sometimes I hate JS ...
      return date.getMonth() + 1;
  }
  public getDayShort = function(d: number): string {
    if (this.lang === 'fr') {
      return this.daysOfWeekFrShort[ d ];
    } else {
      return this.daysOfWeek[ d ];
    }
  }

  public isWeekEndDay(d: number): boolean {
    return d === 0 || d === 6;
  }

  public isWeekEndDate(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
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

    dateBefore(date: Date, from: Date): boolean {
      let result = false;
      if (date && from) {
        if ((from.getTime() - date.getTime()) >= 0 ) {
          result = true;
        }
      }
      return result;
    }

    dateBeforeStrict(date: Date, from: Date): boolean {
      let result = false;
      if (date && from) {
        if ((from.getTime() - date.getTime()) > 0 ) {
          result = true;
        }
      }
      return result;
    }

    dateEquals(date: Date, from: Date): boolean {
      let result = false;

      if (date && from) {

        if ( date.getMonth() === from.getMonth()
            && date.getFullYear() === from.getFullYear()
            && date.getDate() === from.getDate()) {
          result = true;
        }
      }

      return result;

    }



    getLastDayOfMonth(d: Date) {
      let date = new Date(d);
      date = new Date(date.setMonth(date.getMonth() + 1));
      date = new Date(date.setDate(1));
      date = new Date(date.setDate(date.getDate() - 1));
      return date;
    }

    getFirstDayOfMonth(d: Date) {
      let date = new Date(d);
      date = new Date(date.setDate(1));
      return date;
    }

    getFirstMondayOfMonth(d: Date) {
      let date = new Date(d);
      date = new Date(date.setDate(1));

      while (date.getDay() !== 1 ) {
        date = new Date(date.setDate(date.getDate() + 1));
      }
      return date;
    }


      isDateBetween(date: Date, begin: Date, end: Date): boolean {
        let result = false;

        if (this.dateEquals(date, begin)) {
            result = true;
        } else if (this.dateEquals(end, begin)) {
          result = true;
        } else if (this.dateAfter(begin, date) && this.dateBefore(begin, end)) {
          result = true;
        }
        return result;

      }

}
