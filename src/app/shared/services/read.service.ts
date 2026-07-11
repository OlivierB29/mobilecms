import { Injectable } from '@angular/core';




@Injectable()
export class ReadService {

    constructor() {
    }

    public getPublicData = (server: string, file: string): string => {
     return server  +  '/' + 'foobar01' + '/'  +  file;
    // return this.root  +  '/assets/'  +  file;
    }

    public getUrl = (server: string, type: string, id: string): string => {
      return server  +  '/' + 'webapi/content' + '/'  +  type  +  '/'  +  id;
    }

    public getIndexUrl = (server: string, type: string): string => {
      return server  +  '/' + 'webapi/content' + '/'  +  type  ;
    }


    



}
