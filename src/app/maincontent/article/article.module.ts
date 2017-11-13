import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ArticleComponent, ArticlePreviewComponent, ArticlelistComponent,
   AttachmentsComponent, ItemsComponent } from './';


import { ImageModule } from 'app/maincontent/image/image.module';
import { articleRoutes } from './article.route';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      ImageModule,
      SharedModule,
      RouterModule.forRoot(articleRoutes, { useHash: true })
    ],
    declarations: [
      ArticleComponent,
      ArticlePreviewComponent,
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
    ],

})
export class ArticleModule {
}
