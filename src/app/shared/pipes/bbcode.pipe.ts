import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { BBcodeService } from '../services';

@Pipe({name: 'bbcode'})
export class BBcodePipe implements PipeTransform {

    constructor(private bbCodeService: BBcodeService) {
    }    

    transform(value: string) {
        return this.bbCodeService.parseString(value);
    }
}
