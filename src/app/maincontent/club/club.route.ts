import { Routes } from '@angular/router';

import { ClubActivitiesComponent } from './';
import { ClubMapComponent } from './';


export const clubRoutes: Routes = [
  {
    path: 'clubs',
    component: ClubActivitiesComponent
  },
  {
    path: 'clubactivities',
    component: ClubActivitiesComponent
  },
  {
    path: 'clubmap',
    component: ClubMapComponent
  },
  {
    path: 'clubs/:activity',
    component: ClubActivitiesComponent
  }

];
