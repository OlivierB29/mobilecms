import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClubListComponent, ClubActivitiesComponent } from './maincontent/club';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */

       {
         path: 'clubs',
         component: ClubActivitiesComponent
       },
       {
         path: 'clubs/:activity',
         component: ClubActivitiesComponent
       },




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
