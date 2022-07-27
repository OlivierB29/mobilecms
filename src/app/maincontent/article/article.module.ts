import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleComponent, ArticlePreviewComponent, ArticleDetailsComponent, ArticlelistComponent,
   AttachmentsComponent, ItemsComponent } from './';


import { ImageModule } from 'src/app/maincontent/image/image.module';
import { VideoModule } from 'src/app/maincontent/video/video.module';
import { articleRoutes } from './article.route';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      ImageModule,
      VideoModule,
      SharedModule,
      RouterModule.forRoot(articleRoutes, { useHash: true })
    ],
    declarations: [
      ArticleComponent,
      ArticlePreviewComponent,
      ArticleDetailsComponent,
      ArticlelistComponent,
      AttachmentsComponent,

      ItemsComponent,
    ],
    providers: [

    ],
    entryComponents: [
    ],
    exports: [
      ArticleComponent,
      ArticlePreviewComponent,
      ArticleDetailsComponent,
      AttachmentsComponent,
    ],
    schemas: [   CUSTOM_ELEMENTS_SCHEMA ], 
})
export class ArticleModule {
}
