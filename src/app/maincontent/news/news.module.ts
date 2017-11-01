import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ArticleModule } from 'app/maincontent/article/article.module';

import {
  NewsComponent,
  NewsPreviewComponent,
  NewsDetailsComponent
} from './';


import { LazyLoadImageModule } from 'ng-lazyload-image';
import { newsRoutes } from './news.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LazyLoadImageModule,
    SharedModule,
    ArticleModule,
    RouterModule.forRoot(newsRoutes, { useHash: true })
  ],
  declarations: [
    NewsComponent,
    NewsPreviewComponent,
    NewsDetailsComponent,
  ],
  providers: [

  ],
  entryComponents: [
  ],
  exports: [
    NewsComponent,
  ],

})
export class NewsModule {
}
