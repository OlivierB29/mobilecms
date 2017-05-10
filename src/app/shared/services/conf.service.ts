
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../environment';



@Injectable()
export class ConfService {

  private _config: any[];


  private root = environment.server;

  constructor(private http: Http) {
  }

    load() {
      this.loadFile('conf.json')
          .subscribe((data: any[]) => this._config = data,
          error => console.log('config'  +  error),
          () => console.log('config complete'  +  this._config));

    }

  public loadFile = (file: string): Observable<Object> => {

         return this.http.get(file)
             .map((response: Response) => <Object>response.json())
             .catch(this.handleErrorObservable);
  }

  getLayout(): string {

    let layout= 'desktop';





    if(window.matchMedia('(min-width: 55em)').matches) {
      layout = 'desktop';
    } else if (window.matchMedia('(min-width: 29em)').matches) {
      layout = 'medium';
    } else {
      layout = 'mobile';
    }
    return layout;
  }


  getJsonDataUrl(): string {

    return this.root  +  '/json.php?file=';
  }


    getHtmlDataUrl(): string {

      return this.root  +  '/html.php?file=';
    }

    getContext(): string {

      return this.root;
    }

    getImageService(): string {

      return  this.root  +  '/services/image.service.php';
    }


    getDefaultLocale(): string {

      let locale= 'en';
      let lang = navigator.language;

      if (lang === 'fr-FR' || lang === 'fr') {
        locale = 'fr';
      }

      return locale;
    }




    isDebug(): boolean {

      return false;
    }

    getResources(): string {
      return this.root;
    }



      getRoot(): string {
        return this.get('root');
      }

     get(key: any) {

       return this._config[key];
     }

    private handleErrorObservable(error: Response) {
      console.error('conf.handleErrorObservable');
        if(error &&  error.statusText) {
        console.error('handle conf '  +  error.statusText);
        }

         return Observable.throw('Server error');
     }

}
