import { Routes } from '@angular/router';

import { ItemsComponent } from './';


export const articleRoutes: Routes = [

  {
    path: 'structure',
    component: ItemsComponent, data: { type: 'structure' }
  },
  {
    path: 'organisation',
    component: ItemsComponent, data: { type: 'structure' }
  },
  {
    path: 'contact',
    component: ItemsComponent, data: { type: 'contacts' }
  },
  {
    path: 'reports',
    component: ItemsComponent, data: { type: 'reports'  }
  },
  {
    path: 'comptesrendus',
    component: ItemsComponent, data: { type: 'reports', }
  },
  {
    path: 'links',
    component: ItemsComponent, data: { type: 'links' }
  },
  {
    path: 'liens',
    component: ItemsComponent, data: { type: 'links' }
  },
  {
    path: 'documents',
    component: ItemsComponent, data: { type: 'documents' }
  }
];
