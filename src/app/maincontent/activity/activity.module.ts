import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ActivityButtonComponent } from './';


import { ImageModule } from 'app/maincontent/image/image.module';

@NgModule({
    imports: [
      CommonModule,

      RouterModule,
      ImageModule,
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
