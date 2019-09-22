import { Injectable } from '@angular/core';


import { environment } from 'src/environments/environment';


@Injectable()
export class ReadService {

  private root = environment.server;

    constructor() {
    }

    public getPublicData = (file: string): string => {
     return this.root  +  '/' + environment.public + '/'  +  file;
    // return this.root  +  '/assets/'  +  file;
    }

    public getUrl = (type: string, id: string): string => {
      return this.root  +  '/' + environment.public + '/'  +  type  +  '/'  +  id  +  '.json';
    }

    public getIndexUrl = (type: string): string => {
      return this.root  +  '/' + environment.public + '/'  +  type  +  '/index/index.json';
    }






}
