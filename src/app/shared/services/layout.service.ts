import { Injectable } from '@angular/core';



@Injectable()
export class LayoutService {

  getLayout(): string {
    let layout = 'mobile';

    if (window.matchMedia('(min-width: 55em)').matches) {
      layout = 'desktop';
    }

    return layout;
  }
}
