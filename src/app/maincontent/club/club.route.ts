import { Routes } from '@angular/router';

import { ClubActivitiesComponent } from './';


export const clubRoutes: Routes = [
  {
    path: 'clubs',
    component: ClubActivitiesComponent
  },
  {
    path: 'clubs/:activity',
    component: ClubActivitiesComponent
  }

];
