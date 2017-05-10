import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

/*
https://angular.io/docs/ts/latest/guide/pipes.html

*/
@Pipe({name: 'prettyurl'})
export class PrettyUrlPipe implements PipeTransform {

    transform(value: string) {
        let result = '';
        if (value) {

            result = value.replace('http: // ', '');
        }
        return result;
    }


}
