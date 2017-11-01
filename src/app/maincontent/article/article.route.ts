import { Routes } from '@angular/router';

import { ItemsComponent } from './';


export const articleRoutes: Routes = [

  {
    path: 'structure',
    component: ItemsComponent, data: { type: 'structure', orderby: 'id' }
  },
  {
    path: 'organisation',
    component: ItemsComponent, data: { type: 'structure', orderby: 'id' }
  },
  {
    path: 'contact',
    component: ItemsComponent, data: { type: 'contacts', orderby: 'id' }
  },
  {
    path: 'reports',
    component: ItemsComponent, data: { type: 'reports', orderby: 'id', direction: 'desc' }
  },
  {
    path: 'comptesrendus',
    component: ItemsComponent, data: { type: 'reports', orderby: 'id', direction: 'desc' }
  },
  {
    path: 'links',
    component: ItemsComponent, data: { type: 'links', orderby: 'id' }
  },
  {
    path: 'liens',
    component: ItemsComponent, data: { type: 'links', orderby: 'id' }
  },
  {
    path: 'documents',
    component: ItemsComponent, data: { type: 'documents', orderby: 'id' }
  }
];
