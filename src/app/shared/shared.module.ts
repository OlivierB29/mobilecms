

import { NgModule, ModuleWithProviders } from '@angular/core';
import {  BrPipe, OrderbyPipe, LocaleDatePipe, PropertyFilterPipe } from './pipes';
import { Log, ReadService, RouteUtilService, DateUtilService, MediaService, LayoutService, BrowserService } from './services';


@NgModule({
    imports: [

    ],
    declarations: [
      BrPipe,

      OrderbyPipe,
      LocaleDatePipe,
      PropertyFilterPipe,
    ],
    providers: [
      Log,
      ReadService,
      DateUtilService,
      LayoutService,
      RouteUtilService,
      MediaService,
      BrowserService,
      OrderbyPipe
    ],
    entryComponents: [
    ],
    exports: [
      OrderbyPipe,
      BrPipe,
      LocaleDatePipe,
      PropertyFilterPipe,    ],

})
export class SharedModule {
}
