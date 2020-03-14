import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

/*
@deprecated
https://angular.io/docs/ts/latest/guide/pipes.html

*/
@Pipe({name: 'br'})
export class BrPipe implements PipeTransform {

    transform(value: string) {
        let result = '';
        if (value) {
            result = value.replace(/\n/g, '<br/>');
        }
        return result;
    }


}
