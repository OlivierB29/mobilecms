import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ClubListComponent, ClubDetailComponent, ClubActivitiesComponent } from './';
import { ActivityModule } from 'src/app/maincontent/activity/activity.module';

import { ImageModule } from 'src/app/maincontent/image/image.module';
import { clubRoutes } from './club.route';
import { ClubMapComponent } from './';

@NgModule({
  imports: [
    CommonModule,

    RouterModule,
    ImageModule,
    SharedModule,
    ActivityModule,
    RouterModule.forRoot(clubRoutes, { useHash: true })
  ],
  declarations: [
    ClubListComponent,
    ClubActivitiesComponent,
    ClubDetailComponent,
    ClubMapComponent
  ],
  providers: [

  ],
  entryComponents: [
  ],
  exports: [
    ClubListComponent,
    ClubActivitiesComponent,
    ClubDetailComponent,
  ],

})
export class ClubModule {
}
