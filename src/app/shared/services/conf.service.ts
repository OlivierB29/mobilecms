import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';


@Injectable()
export class ConfService {
  private root = environment.server;
  constructor() {
  }

  getLayout(): string {
    let layout = 'desktop';

    if (window.matchMedia('(min-width: 55em)').matches) {
      layout = 'desktop';
    } else if (window.matchMedia('(min-width: 29em)').matches) {
      layout = 'medium';
    } else {
      layout = 'mobile';
    }

    return layout;
  }




}
