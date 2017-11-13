import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ImageListComponent } from './';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      LazyLoadImageModule
    ],
    declarations: [
      ImageListComponent,

    ],
    providers: [

    ],
    entryComponents: [
    ],
    exports: [
      ImageListComponent,
      LazyLoadImageModule
    ],

})
export class ImageModule {
}
