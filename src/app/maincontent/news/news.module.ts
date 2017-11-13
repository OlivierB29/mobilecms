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


import { ImageModule } from 'app/maincontent/image/image.module';
import { newsRoutes } from './news.route';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ImageModule,
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
