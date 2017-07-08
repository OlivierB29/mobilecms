import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MenuItem } from '../model/menuitem';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import { Log } from '../../shared/services/log.service';


@Injectable()
export class ReadService {

  private root = environment.server;

    constructor(private log: Log, private http: Http) {
    }



    public getMenu = (locale: string): Observable<MenuItem[]> => {
        const url = this.root  + '/assets/menu/menu.'  +  locale  +  '.json';
          this.log.debug('getMenu ...'  +  url);

        return this.http.get(url)
            .map((response: Response) => <MenuItem[]>response.json())
            .catch(this.handleError);

    }

    getAllPromise(type: string): Promise<any[]> {

      const url = this.root  +  '/' + environment.public + '/'  +  type  +  '/index/index.json';

      if (this.http) {
          console.log("!!!! getAllPromise 2" );
      }

          return this.http.get(url)
              .toPromise()
              .then(this.extractPromiseData)
              .catch(this.handleErrorPromise);
      }

      private extractPromiseData(res: Response) {
          console.log("!!!! getAllPromise 3" );
          const body = res.json();
          return body || [];
      }

      private handleErrorPromise(error: any) {
          console.log("!!!! getAllPromise 4" );
          // In a real world app, we might use a remote logging infrastructure
          // We'd also dig deeper into the error to get a better message
          const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          console.error(errMsg); // log to console instead
          return Promise.reject(errMsg);
      }

    public getAll = (type: string): Observable<any[]> => {
        const url = this.root  +  '/' + environment.public + '/'  +  type  +  '/index/index.json';
        this.log.debug('getAll '  +  url);


        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    public getAllItems = (type: string): Observable<any[]> => {
        const url = this.root  +  '/' + environment.public + '/'  +  type  +  '/index/index.json';
        this.log.debug('getAll '  +  url);


        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    public get = (type: string, id: string): Observable<any[]> => {

        const url = this.root  +  '/' + environment.public + '/'  +  type  +  '/'  +  id  +  '.json';
        this.log.debug('getAll '  +  url);


        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error('ReadService.handleError '  +  error.statusText);
        return Observable.throw(error.json().error || 'Server error');
    }

}
