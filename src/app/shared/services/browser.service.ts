import { Injectable } from '@angular/core';

@Injectable()
export class BrowserService {

  constructor() {
  }

  
  isModernBrowser(): boolean {

    let result = false;

    if('IntersectionObserver' in window) {
      result = true;
    }

    return result;
  }



}
