import { Routes } from '@angular/router';

import { ClubActivitiesComponent } from './';
import { ClubMapComponent } from './';
import { ClubDetailComponent } from './';

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
    path: 'clubmap/:activity',
    component: ClubMapComponent
  },
  {
    path: 'club/:id',
    component: ClubDetailComponent
  },
  {
    path: 'clubs/:activity',
    component: ClubActivitiesComponent
  }

];
