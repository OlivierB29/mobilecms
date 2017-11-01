import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CalendarModule } from 'app/maincontent/calendar/calendar.module';
import { NewsModule } from 'app/maincontent/news/news.module';
import { SidenavcontainerComponent, SidenavComponent, MenubuttonComponent, HomeComponent, BannerComponent  } from './';

import { MenuService } from './menu.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { mainRoutes } from './main.route';

@NgModule({
    imports: [
          CommonModule,
          BrowserModule,
          RouterModule,
          LazyLoadImageModule,
          SharedModule,
          CalendarModule,
          NewsModule,
      RouterModule.forRoot(mainRoutes, { useHash: true })
    ],
    declarations: [
      BannerComponent,
      HomeComponent,
      MenubuttonComponent,
      SidenavComponent,
      SidenavcontainerComponent
    ],
    providers: [
    MenuService,
    ],
    entryComponents: [
    ],
    exports: [
      HomeComponent,
      MenubuttonComponent,
      SidenavComponent,
      SidenavcontainerComponent
    ],

})
export class MainModule {
}
