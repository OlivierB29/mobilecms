import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './maincontent/home/home.component';


import { CalendarEventComponent } from './maincontent/calendarevent/calendarevent.component';
import { NewsComponent } from './maincontent/news/news.component';
import { ClubListComponent } from './maincontent/clublist/clublist.component';
import { ContactComponent } from './maincontent/contact/contact.component';


import { StructureComponent } from './maincontent/items/structure/structure.component';
import { DocumentsComponent } from './maincontent/items/documents/documents.component';
import { LinksComponent } from './maincontent/items/links/links.component';
import { ReportsComponent } from './maincontent/items/reports/reports.component';
import { ClubActivitiesComponent } from './maincontent/clubactivities/clubactivities.component';
import { CalendarActivitiesComponent } from './maincontent/calendaractivities/calendaractivities.component';



@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */

       {
         path: 'structure',
         component: StructureComponent
       },
       {
         path: 'documents',
         component: DocumentsComponent
       },
       {
       path: '',
       component: HomeComponent
       },
       {
         path: 'clubs',
         component: ClubActivitiesComponent
       },
       {
         path: 'clubs/: activity',
         component: ClubActivitiesComponent
       },
  


       {
           path: 'links',
           component: LinksComponent
       },
       {
           path: 'liens',
           component: LinksComponent
       },

       {
           path: 'contact',
           component: ContactComponent
       },

       {
         path: 'reports',
         component: ReportsComponent
       },
       {
         path: 'comptesrendus',
         component: ReportsComponent
       },



       {
           path: 'links',
           component: LinksComponent
       },
       {
           path: 'liens',
           component: LinksComponent
       },


       {
         path: 'reports',
         component: ReportsComponent
       },
       {
         path: 'comptesrendus',
         component: ReportsComponent
       },


       {
         path: 'calendrier',
         component: CalendarActivitiesComponent
       },
       {
         path: 'calendrier/: activity',
         component: CalendarActivitiesComponent
       },
       {
         path: 'calendrier/detail/: id',
         component: CalendarEventComponent
       },


       // EN
       {
         path: 'news',
         component: NewsComponent
       },
       {
         path: 'news/: activity',
         component: NewsComponent
       },
       {
         path: 'news/: activity/: date',
         component: NewsComponent
       },
       // FR
       {
         path: 'actualites',
         component: NewsComponent
       },
       {
         path: 'actualites/: activity',
         component: NewsComponent
       },
       {
         path: 'actualites/: activity/: date',
         component: NewsComponent
       },
       {
         path: 'calendar',
         component: CalendarActivitiesComponent
       },
       {
         path: 'calendar/: activity',
         component: CalendarActivitiesComponent
       },
       {
         path: 'calendar/detail/: id',
         component: CalendarEventComponent
       }

    ], { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// IMPORTANT
// VERY IMPORTANT
// ### Without useHash
// links are without #, but it requires an Apache configuration !
// RouterModule.forRoot(routes);

// ### With useHash
// an URL uses #. http: // localhost/#/mycomponent
// Any request to http: // localhost/#/mycomponent queries index.html
// RouterModule.forRoot(routes, { useHash: true });
