import { Injectable } from '@angular/core';
//import BBCodeParser from 'bbcode-parser';
import { BBCodeParser } from '../../../../../BBCodeParser/src/bbCodeParser';
import {BBTag} from "../../../../../BBCodeParser/src/bbTag";
/**
 * User defined tags for https://github.com/svenslaggare/BBCodeParser
 */
@Injectable()
export class BBcodeService {

  allowedTags = ['b', 'u', 'i', 'url'];

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
  customTags(): Array<BBTag> {

    let result = new Array<BBTag>();
    let defaultTags: Array<BBTag> = BBCodeParser.defaultTags();

    this.allowedTags.forEach((t: string) => {

        if (defaultTags[t]) {
            result[t] = defaultTags[t];
        }

    });

    return result;
}


isAllowed(tag: string): boolean {
  console.log(tag + " " + this.allowedTags.includes(tag));
 return this.allowedTags.includes(tag);
}


}
