import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ClubListComponent, ClubDetailComponent, ClubActivitiesComponent } from './';
import { ActivityModule } from 'app/maincontent/activity/activity.module';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { clubRoutes } from './club.route';

@NgModule({
  imports: [
    CommonModule,
    //BrowserModule,
    RouterModule,
    LazyLoadImageModule,
    SharedModule,
    ActivityModule,
    RouterModule.forRoot(clubRoutes, { useHash: true })
  ],
  declarations: [
    ClubListComponent,
    ClubActivitiesComponent,
    ClubDetailComponent,
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
