

import { NgModule, ModuleWithProviders } from '@angular/core';
import {  BBcodePipe, OrderbyPipe, LocaleDatePipe, PropertyFilterPipe } from './pipes';
import { Log, ReadService, RouteUtilService, DateUtilService, MediaService, LayoutService, BrowserService, BBcodeService, CoordinatesService, SvgService } from './services';



@NgModule({
    imports: [

    ],
    declarations: [
      BBcodePipe,
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
      BBcodeService,
      CoordinatesService,
      SvgService,

      BBcodePipe,
      OrderbyPipe
    ],
    entryComponents: [
    ],
    exports: [
      BBcodePipe,
      OrderbyPipe,
      LocaleDatePipe,
      PropertyFilterPipe,    ],

})
export class SharedModule {
}
