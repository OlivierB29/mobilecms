import { Injectable, Pipe, PipeTransform } from '@angular/core';


/*
https: // angular.io/docs/ts/latest/guide/pipes.html

*/

@Pipe({
    name: 'orderbydesc'
})
@Injectable()
export class OrderbyDescPipe implements PipeTransform {
    transform(items: any[], arg: string): any {

        return items.sort(function(a,b) {

          return (a[arg] < b[arg]) ? 1: ((b[arg] < a[arg]) ? -1: 0);
        } );
    }

}
