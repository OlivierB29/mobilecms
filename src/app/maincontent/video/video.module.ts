import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { VideoComponent } from './video.component';
import { VideoListComponent } from './videolist.component';
import { VideoService } from './video.service';


@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
    ],
    declarations: [
      VideoComponent,
      VideoListComponent,

    ],
    providers: [
      VideoService
    ],
    entryComponents: [
    ],
    exports: [
      VideoListComponent
    ],

})
export class VideoModule {
}
