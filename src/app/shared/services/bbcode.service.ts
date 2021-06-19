import { Injectable } from '@angular/core';

// import from repository

import { BBCodeParser } from '../../../../node_modules/bbcode-parser/src/bbCodeParser';
import { BBTag } from "../../../../node_modules/bbcode-parser/src/bbTag";


// import with a local install
//import { BBCodeParser } from '../../../../../BBCodeParser/src/bbCodeParser';
//import { BBTag } from "../../../../../BBCodeParser/src/bbTag";


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

 return this.allowedTags.includes(tag);
}


}
