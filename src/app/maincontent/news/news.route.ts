import { Routes } from '@angular/router';

import { NewsDetailsComponent, NewsPreviewComponent } from './';


export const newsRoutes: Routes = [
  // EN
  {
    path: 'news',
    component: NewsPreviewComponent
  },
  {
    path: 'news/:id',
    component: NewsDetailsComponent
  },
  // FR
  {
    path: 'actualites',
    component: NewsPreviewComponent
  },
  {
    path: 'actualites/:id',
    component: NewsDetailsComponent
  }
];
