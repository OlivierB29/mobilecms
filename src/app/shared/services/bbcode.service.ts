import { Injectable } from '@angular/core';

import { BBCodeParser } from '../bbcode/bbCodeParser';
import { BBTag } from '../bbcode/bbTag';

// import from repository


/**
 * User defined tags for https://github.com/svenslaggare/BBCodeParser
 */
@Injectable()
export class BBcodeService {

  allowedTags = ['b', 'u', 'i', 'url'];

  parser = new BBCodeParser(this.customTags(), this.customOptions());

  parseString(value: string): string {
    if (value) {

        return this.parser.parseString(value);
    }
    return '';
  }

  customOptions() : any {
    return {
      escapeHTML: false,
      attrNameChars : "[a-zA-Z0-9\\.\\-_:;/]",
      attrValueChars : "[\?\=\&a-zA-Z0-9\\.\\-_:;#/\\s]"        
  };
  }

  /**
   * img not allowed : only images uploaded by the API are allowed. It is aimed to avoid very big picture in a <img> tag .
   */
  customTags(): { [key: string]: BBTag } {

    let result : { [key: string]: BBTag } = {};
    let defaultTags: { [key: string]: BBTag } = BBCodeParser.defaultTags();

    this.allowedTags.forEach((t: string) => {

        if (defaultTags[t]) {
            result[t] = defaultTags[t];
        }

    });

    return result;
}


isAllowed(tag: string): boolean {

 return this.allowedTags.includes(tag);
}


}
