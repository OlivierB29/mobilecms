import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleModule } from 'src/app/maincontent/article/article.module';

import {
  NewsComponent,
  NewsPreviewComponent,
  NewsDetailsComponent
} from './';


import { ImageModule } from 'src/app/maincontent/image/image.module';
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

  exports: [
    NewsComponent,
  ],

})
export class NewsModule {
}
