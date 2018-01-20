import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
https://angular.io/docs/ts/latest/guide/pipes.html

Filter by activity
*/
@Pipe({
    name: 'propertyfilter'
})
@Injectable()
export class PropertyFilterPipe implements PipeTransform {
    transform(items: any[], arg: string, value: any): any[] {

        return items.filter(item => item[arg] && item[arg] === value);
    }
}
