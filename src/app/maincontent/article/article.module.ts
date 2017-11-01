import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ArticleComponent, ArticlePreviewComponent, ArticlelistComponent,
   AttachmentsComponent, ImageListComponent, ItemsComponent } from './';


import { LazyLoadImageModule } from 'ng-lazyload-image';
import { articleRoutes } from './article.route';

@NgModule({
    imports: [
      CommonModule,
      // //BrowserModule,
      RouterModule,
      LazyLoadImageModule,
      SharedModule,
      RouterModule.forRoot(articleRoutes, { useHash: true })
    ],
    declarations: [
      ArticleComponent,
      ArticlePreviewComponent,
      ArticlelistComponent,
      AttachmentsComponent,
      ImageListComponent,
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
