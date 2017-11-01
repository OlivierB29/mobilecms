import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SharedModule } from 'app/shared/shared.module';
import { ActivityModule } from 'app/maincontent/activity/activity.module';
import { ArticleModule } from 'app/maincontent/article/article.module';

import { calendarRoutes } from './calendar.route';


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
      RouterModule,
      LazyLoadImageModule,
      SharedModule,
      ArticleModule,
      ActivityModule,
      RouterModule.forRoot(calendarRoutes, { useHash: true })
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
      CalendarFeedComponent,
    ],

})
export class CalendarModule {
}
