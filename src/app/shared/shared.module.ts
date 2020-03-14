

import { NgModule, ModuleWithProviders } from '@angular/core';
import {  OrderbyPipe, LocaleDatePipe, PropertyFilterPipe } from './pipes';
import { Log, ReadService, RouteUtilService, DateUtilService, MediaService, LayoutService, BrowserService } from './services';


@NgModule({
    imports: [

    ],
    declarations: [
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
      LocaleDatePipe,
      PropertyFilterPipe,    ],

})
export class SharedModule {
}
