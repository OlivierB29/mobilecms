import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


enum Level {
  Fatal = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4,
  Trace = 5
}

@Injectable()
export class Log {

  level = Level.Error;

  constructor() {

    switch (environment.log) {
      case 'fatal':
        this.level = Level.Fatal;
        break;
      case 'error':
        this.level = Level.Error;
        break;
      case 'warn':
        this.level = Level.Warn;
        break;
      case 'Info':
        this.level = Level.Info;
        break;
      case 'debug':
        this.level = Level.Debug;
        break;
      case 'trace':
        this.level = Level.Trace;
        break;

      default: this.level = Level.Error;
    }


  }

  public fatal(obj: any) {
    if (this.level >= Level.Fatal) {
      console.error(obj);
    }
  }


  public error(obj: any) {
    if (this.level >= Level.Error) {
      console.error(obj);
    }
  }

  public debug(obj: any) {
    if (this.level >= Level.Debug) {
      console.log(obj);
    }
  }

  public info(obj: any) {
    if (this.level >= Level.Info) {
      console.log(obj);
    }
  }

  public warn(obj: any) {
    if (this.level >= Level.Warn) {
      console.log(obj);
    }
  }

  public trace(obj: any) {
    if (this.level >= Level.Warn) {
      console.log(obj);
    }
  }




  public isFatal(): boolean {
    return this.level >= Level.Fatal;
  }

  public isError(): boolean {
    return this.level >= Level.Error;
  }

  public isDebug(): boolean {
    return this.level >= Level.Debug;

  }

  public isInfo(): boolean {
    return this.level >= Level.Info;
  }

  public isWarn(): boolean {
    return this.level >= Level.Warn;
  }

  public isTrace(): boolean {
    return this.level >= Level.Warn;
  }


}
