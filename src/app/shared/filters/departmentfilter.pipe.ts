import { Injectable, Pipe, PipeTransform } from '@angular/core';

/*
https: // angular.io/docs/ts/latest/guide/pipes.html

Filtre par regional code
*/
@Pipe({
    name: 'departmentfilter'
})
@Injectable()
export class DepartmentFilterPipe implements PipeTransform {
    transform(items: any[], arg: string): any {

        return items.filter(item => item.department.indexOf(arg) !== -1);
    }
}
