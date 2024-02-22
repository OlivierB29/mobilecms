

import { NgModule, ModuleWithProviders } from '@angular/core';
import { OrderbyPipe, LocaleDatePipe, PropertyFilterPipe, BBcodePipe } from './pipes';
import { Log, ReadService, RouteUtilService, DateUtilService, MediaService, LayoutService, BrowserService, CoordinatesService, SvgService, BBcodeService } from './services';



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
      CoordinatesService,
      SvgService,
      OrderbyPipe,
      BBcodeService,
      BBcodePipe
    ],

    exports: [
      BBcodePipe,
      OrderbyPipe,
      LocaleDatePipe,
      PropertyFilterPipe,    ],

})
export class SharedModule {
}
