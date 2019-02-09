import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ImageListComponent } from './';
import { ImageService } from 'src/app/maincontent/image/image.service';
import { NguiInViewComponent } from './ngui-in-view';


@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
    ],
    declarations: [
      ImageListComponent,
      NguiInViewComponent
    ],
    providers: [
      ImageService
    ],
    entryComponents: [
    ],
    exports: [
      ImageListComponent,
      NguiInViewComponent
    ],

})
export class ImageModule {
}
