import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
https://angular.io/docs/ts/latest/guide/pipes.html

Production target : This pipe filter about 10-20 items.
cf https://angular.io/guide/pipes#!#no-filter-pipe
*/

@Pipe({
    name: 'orderby'
})
@Injectable()
export class OrderbyPipe implements PipeTransform {
    transform(items: any[], arg: string, dir: string): any {
      let direction = 'asc';
      if (dir === 'asc' || dir === 'desc') {
        direction = dir;
      }

        return items.sort(function(a, b) {
          if (a[arg] && b[arg]) {
            if (direction === 'asc') {
              return (a[arg] > b[arg]) ? 1 : ((b[arg] > a[arg]) ? -1 : 0);
            } else {
              return (a[arg] < b[arg]) ? 1 : ((b[arg] < a[arg]) ? -1 : 0);
            }
          } else {
            return 0;
          }

        } );
    }

}
