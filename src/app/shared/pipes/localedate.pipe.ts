import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

/*
* https://angular.io/docs/ts/latest/guide/pipes.html
*/
@Pipe({
    name: 'localedate'
})
@Injectable()
export class LocaleDatePipe implements PipeTransform {
  transform(value: string) {
      let result = '';
      if (value) {
        // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
         result = new Date(value).toLocaleDateString(environment.locale);
      }
      return result;
  }
}
