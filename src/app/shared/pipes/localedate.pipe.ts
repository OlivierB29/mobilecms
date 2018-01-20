import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
https://angular.io/docs/ts/latest/guide/pipes.html

Filter by activity
*/
@Pipe({
    name: 'localedate'
})
@Injectable()
export class LocaleDatePipe implements PipeTransform {
  transform(value: string) {
      let result = '';
      if (value) {
         result = new Date(value).toLocaleDateString();
      }
      return result;
  }
}
