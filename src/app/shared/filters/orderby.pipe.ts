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
            const valueA =  Number(a[arg].replace(/[^\w\s]/gi, ''));
            const valueB =  Number(b[arg].replace(/[^\w\s]/gi, ''));

            if (valueA === valueB) {
              return 0;
            }

            if (direction === 'asc') {
              return (valueA > valueB) ? 1 : -1;
            } else {
              return (valueB > valueA) ? 1 : -1;
            }
          } else {
            return 0;
          }

        } );
    }


    private toNumber(str: string) {
      return Number(str.replace(/[^\w\s]/gi, ''));
    }

}
