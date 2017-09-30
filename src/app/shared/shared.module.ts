

import { NgModule, ModuleWithProviders } from '@angular/core';
import { ActivityFilterPipe, BrPipe, DepartmentFilterPipe, OrderbyPipe } from './filters';
import { Log, ReadService, RouteUtilService } from './services';

@NgModule({
    imports: [

    ],
    declarations: [
      ActivityFilterPipe,
      BrPipe,
      DepartmentFilterPipe,
      OrderbyPipe,
    ],
    providers: [
      Log,
      ReadService,
      RouteUtilService
    ],
    entryComponents: [
    ],
    exports: [
      ActivityFilterPipe,
      OrderbyPipe,
      DepartmentFilterPipe,
      BrPipe,
    ],

})
export class SharedModule {
}
