import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

/*
https://angular.io/docs/ts/latest/guide/pipes.html

*/
@Pipe({name: 'prettyurl'})
export class PrettyUrlPipe implements PipeTransform {

    transform(value:string) {
        var result = '';
        if (value) {

            result = value.replace('http://', '');
        }
        return result;
    }


}
