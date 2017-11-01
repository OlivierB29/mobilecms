import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SharedModule } from 'app/shared/shared.module';
import { ActivityModule } from 'app/maincontent/activity/activity.module';
import { ArticleModule } from 'app/maincontent/article/article.module';

import {
  CalendarListComponent,
  CalendarEventComponent,
  CalendarActivitiesComponent,
  CalendarTimeLineComponent,
  CalendarTimeLineWeekComponent,
  CalendarTimeLineMonthComponent,
  CalendarPreviewComponent,
  CalendarFeedComponent
} from './';

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule,
      LazyLoadImageModule,
      SharedModule,
      ArticleModule,
      ActivityModule,
    ],
    declarations: [
      CalendarListComponent,
      CalendarActivitiesComponent,
      CalendarEventComponent,
      CalendarTimeLineComponent,
      CalendarTimeLineWeekComponent,
      CalendarTimeLineMonthComponent,
      CalendarPreviewComponent,
      CalendarFeedComponent,
    ],
    providers: [

    ],
    entryComponents: [
    ],
    exports: [
      CalendarListComponent,
      CalendarActivitiesComponent,
      CalendarEventComponent,
      CalendarTimeLineComponent,
      CalendarTimeLineWeekComponent,
      CalendarTimeLineMonthComponent,
      CalendarPreviewComponent,
      CalendarFeedComponent,
    ],

})
export class CalendarModule {
}
