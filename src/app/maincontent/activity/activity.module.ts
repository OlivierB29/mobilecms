import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ActivityButtonComponent } from './';


import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports: [
      CommonModule,

      RouterModule,
      LazyLoadImageModule,
      SharedModule,
    ],
    declarations: [
      ActivityButtonComponent,

    ],
    providers: [

    ],
    entryComponents: [
    ],
    exports: [
      ActivityButtonComponent,
    ],

})
export class ActivityModule {
}