import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MenuItem } from '../model/menuitem';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../environment';



@Injectable()
export class ReadService {

    constructor(private http: Http) {
    }

  private root = environment.server;


    public getMenu = (uri: string, locale: string): Observable<MenuItem[]> => {
        const url= 'i18n/'  +  uri  +  '/menu.'  +  locale  +  '.json';
        console.log('getMenu ...'  +  url);

        return this.http.get(url)
            .map((response: Response) => <MenuItem[]>response.json())
            .catch(this.handleError);

    }

    public getLocale = (uri: string, locale: string): Observable<any> => {
        const url= 'i18n/'  +  uri  +  '/'  +  locale  +  '.json';
        console.log('getLocale '  +  url);

        return this.http.get(url)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    public getAll = (type: string): Observable<any[]> => {
        const url: string = this.root  +  '/public/'  +  type  +  '/index/index.json';
        console.log('getAll '  +  url);


        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    public getAllItems = (type: string): Observable<any[]> => {
        const url: string = this.root  +  '/public/'  +  type  +  '/index/index.json';
        console.log('getAll '  +  url);


        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    public get = (type: string, id: string): Observable<any[]> => {

        const url: string = this.root  +  '/public/'  +  type  +  '/'  +  id  +  '.json';
        console.log('getAll '  +  url);


        return this.http.get(url)
            .map((response: Response) => <any[]>response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error('ReadService.handleError '  +  error.statusText);
        return Observable.throw(error.json().error || 'Server error');
    }

}
