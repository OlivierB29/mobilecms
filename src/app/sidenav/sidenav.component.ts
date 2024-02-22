import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuService } from './menu.service';

// https://stackoverflow.com/questions/45784825/frompromise-does-not-exist-on-type-observable
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, filter  } from 'rxjs/operators';




import { LayoutService, Log, ReadService } from 'src/app/shared/services';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

@Component({

  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  @Input() mode = 'side';
  @Input() opened = false;

  @Input() expanded = true;

  @Input() lang: string ='';

  menuItems: any[] = <any>[];

  title = '';

  item: any;

  socialnetworks = <any>[];


  constructor(
    private menuService: MenuService,
    private meta: Meta,
    private log: Log,
  private layoutService: LayoutService,
  private readService: ReadService,
  private http: HttpClient,
  ) {
    this.setLayout();

    // https://www.learnrxjs.io/operators/creation/fromevent.html
     const $resizeEvent = fromEvent(window, 'resize');

     // map to string with given event timestamp
     const eventPipes = $resizeEvent.pipe(map(() => {
       return document.documentElement.clientWidth;
     }), debounceTime(200));

    eventPipes.subscribe(val => {
      this.log.debug('width : ' + val);
      this.setLayout();
    });

   }

   fetchData() {

    this.http.get<any>(this.readService.getUrl('description', 'head'))
              .subscribe((data: any) => {
                this.item = data;



                this.title = this.item.title;

                this.meta.addTag({ name: 'keywords', content: this.item.keywords });
                this.meta.addTag({ name: 'description', content: this.item.description });
//                this.titleService.setTitle(this.title);

                this.socialnetworks = this.item.socialnetworks;
              });


  }

  ngOnInit() {
    this.lang = environment.defaultlocale;
    this.menuService.getMenuData(this.lang)
        .subscribe((data: any[]) => {
          data.forEach(item => this.menuItems.push(item));
        });

    this.fetchData();

  }

  ngAfterViewInit() {

  }

  open() {
    this.opened = !this.opened;
  }

  setLayout() {
    const newmode = this.getMenuLayout();

    if (newmode !== this.mode) {
      if (newmode === 'over') {
        this.setOver();
      } else {
        this.setSide();
      }
    }

  }

  setOver() {

    this.opened = false;
    this.expanded = true;
    this.mode = 'over';
  }

  setSide() {

    this.mode = 'side';
    this.expanded = true;
    this.opened = true;
  }

  initLayout() {
    const layout = this.layoutService.getLayout();

    if (layout === 'desktop') {
      this.setSide();
    } else {
      this.setOver();
    }

  }

  expand() {
    this.expanded = !this.expanded;
  }

  expandMenuContent() {
    if (this.getMode() === 'side') {
      this.expanded = true;
    }
  }

  expandMenu() {
    if (this.getMode() === 'over') {
      this.open(); //
    } else {
      this.expand();
    }

  }

  getMode(): string {
    return this.mode;
  }

  isExpanded() {
    return this.expanded;
  }


  isOpen() {
    return this.opened;
  }

  isOverMenuOpened() {
    return this.mode === 'over' && this.opened;
  }


  close() {
    if (this.isOverMenuOpened()) {
      this.opened = false;
    }
  }

  expandClose() {
    if (this.isOverMenuOpened()) {
      this.opened = false;
    }
    if (!this.expanded) {
      this.expanded = true;
    }
  }

  getMenuLayout(): string {
    return this.layoutService.getLayout() === 'mobile' ? 'over' : 'side';
  }



}
