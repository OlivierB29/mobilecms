import { Injectable } from '@angular/core';
//import BBCodeParser from 'bbcode-parser';
import { BBCodeParser } from '../../../../../BBCodeParser/src/bbCodeParser';
/**
 * User defined tags for https://github.com/svenslaggare/BBCodeParser
 */
@Injectable()
export class BBcodeService {


  parser = new BBCodeParser(this.customTags());

  parseString(value: string): string {
    if (value) {
      console.log(value);
        console.log(this.parser.parseString(value));
        return this.parser.parseString(value);
    }
    return '';
  }

  /**
   * img not allowed : only images uploaded by the API are allowed. It is aimed to avoid very big picture in a <img> tag .
   */
  customTags(): any[] {
    let result = <any>[];
    let defaultTags: Array<any> = BBCodeParser.defaultTags();
    let allowedTags = ['b', 'u', 'i', 'url'];

    allowedTags.forEach((t: string) => {
        if (defaultTags[t]) {
            result[t] = defaultTags[t];
        }

    });

    return result;
}




}
