import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';


import { ImageModule } from 'src/app/maincontent/image/image.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityModule } from 'src/app/maincontent/activity/activity.module';
import { ArticleModule } from 'src/app/maincontent/article/article.module';

import { calendarRoutes } from './calendar.route';


import {
  CalendarListComponent,
  CalendarEventComponent,
  CalendarActivitiesComponent,
  CalendarTimeLineComponent,
  CalendarTimeLineWeekComponent,
  CalendarTimeLineMonthComponent,
  CalendarPreviewComponent,
  CalendarFeedComponent,
  CalendarTimeLineButtonComponent

} from './';
import { GooglecalendarComponent } from './googlecalendar.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      ImageModule,
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
      CalendarTimeLineButtonComponent,
      GooglecalendarComponent,
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
