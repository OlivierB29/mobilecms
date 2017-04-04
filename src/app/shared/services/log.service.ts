import { Injectable }    from '@angular/core';


@Injectable()
export class Log {


    debug(obj : any ) {

      console.log(obj);
    }


}
