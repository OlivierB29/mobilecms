import { Component, OnInit, Input, ContentChild, TemplateRef, Output, EventEmitter, ElementRef, Renderer2, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// From : https://medium.com/allenhwkim/simple-lazy-loading-with-angular-716dd3b174a

@Component({
    selector: 'ngui-in-view',
    template: `
      <ng-container *ngIf="inView" [ngTemplateOutlet]="template">
      </ng-container>
    `,
    styles: [':host {display: block;}']
  })
  export class NguiInViewComponent implements OnInit, OnDestroy {
    observer: IntersectionObserver;
    inView: boolean = false;
    once50PctVisible: boolean = false;
  
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    @Input() options: any = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
    @Output('inView') inView$: EventEmitter<any> = new EventEmitter();
    @Output('notInView') notInView$: EventEmitter<any> = new EventEmitter();
  
    constructor(
      public element: ElementRef,
      public renderer: Renderer2,
      @Inject(PLATFORM_ID) private platformId: any) { }
  
    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.observer.observe(this.element.nativeElement);
      }
    }
  
    ngOnDestroy(): void {
      this.observer.disconnect();
    }
  
    handleIntersect(entries, observer): void {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          this.inView = true;
          this.inView$.emit(entry);
        } else {
          this.notInView$.emit(entry);
        }
      });
    }
  }