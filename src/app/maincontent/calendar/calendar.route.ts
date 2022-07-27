import { Routes } from '@angular/router';

import { CalendarActivitiesComponent, CalendarEventComponent, GooglecalendarComponent } from './';



export const calendarRoutes: Routes = [

         {
           path: 'calendrier',
           component: CalendarActivitiesComponent
         },
         {
           path: 'calendrier/:activity',
           component: CalendarActivitiesComponent
         },
         {
           path: 'calendrier/detail/:id',
           component: CalendarEventComponent
         },
         {
           path: 'calendar',
           component: CalendarActivitiesComponent
         },
         {
           path: 'calendar/:activity',
           component: CalendarActivitiesComponent
         },
         {
           path: 'calendar/detail/:id',
           component: CalendarEventComponent
         },
         {
          path: 'agenda',
          component: GooglecalendarComponent
        },
];
