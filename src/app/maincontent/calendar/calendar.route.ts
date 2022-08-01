import { Routes } from '@angular/router';

import { CalendarActivitiesComponent, CalendarEventComponent, GooglecalendarComponent, GooglecalendarIframeComponent } from './';



export const calendarRoutes: Routes = [

         {
           path: 'calendrierbackup',
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
           path: 'calendarbackup',
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
          path: 'googlecalendar',
          component: GooglecalendarIframeComponent
        },
         {
          path: 'calendriergoogle',
          component: GooglecalendarIframeComponent
        },
        {
         path: 'calendar',
         component: GooglecalendarIframeComponent
       },
        {
         path: 'calendrier',
         component: GooglecalendarIframeComponent
       },
];
