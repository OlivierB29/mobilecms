import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
https: // angular.io/docs/ts/latest/guide/pipes.html

Filter by activity
*/
@Pipe({
    name: 'activityfilter'
})
@Injectable()
export class ActivityFilterPipe implements PipeTransform {
    transform(items: any[], arg: string): any {

        return items.filter(item => item.activity.indexOf(arg) !== -1);
    }
}
