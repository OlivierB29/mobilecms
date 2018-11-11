import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'src/app/maincontent/calendar/calendar.module';
import { NewsModule } from 'src/app/maincontent/news/news.module';
import { SidenavcontainerComponent, SidenavComponent, MenubuttonComponent, HomeComponent, BannerComponent  } from './';
import { FooterComponent } from './footer/footer.component';
import { FeaturedComponent } from './featured/featured.component';
import { MenuService } from './menu.service';
import { ImageModule } from 'src/app/maincontent/image/image.module';
import { VideoModule } from 'src/app/maincontent/video/video.module';
import { mainRoutes } from './main.route';

@NgModule({
    imports: [
          CommonModule,
          RouterModule,
          ImageModule,
          VideoModule,
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
      SidenavcontainerComponent,
      FooterComponent,
      FeaturedComponent,
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
