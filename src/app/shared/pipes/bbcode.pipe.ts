import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import BBCodeParser from 'bbcode-parser';

@Pipe({name: 'bbcode'})
export class BBcodePipe implements PipeTransform {

    transform(value: string) {
        let parser = new BBCodeParser(BBCodeParser.defaultTags());
        return parser.parseString(value);
    }


}
