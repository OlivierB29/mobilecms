import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  TemplateRef
} from '@angular/core';


/***
 * From https://github.com/allenhwkim/ngui-common
 */

import {isPlatformBrowser} from '@angular/common';

/**
* An element that listens to viewport positioning and fires inView and notInview events
* ### example
* ```ts
* <ngui-in-view [observerOptions]="myObserverOptions" (inView)="doA()" (notInview)="doB()">
*   <img *ngIf src="https://picsum.photos/800/300?image=1>
* </ngui-in-view>
* ```
*/
@Component({
selector: 'ngui-inview',
template: `
      <ng-container *ngIf="isInview" [ngTemplateOutlet]="template">
      </ng-container>
  `,
styles: [':host {display: block;}']
})
export class NguiInviewComponent implements OnInit, OnDestroy {
  /** <ng-template> reference */
  /** 2019-06-28 : Angular8 - add mandatory parameter */
@ContentChild(TemplateRef, {static: false}) template!: TemplateRef<any>;

  /** IntersectionObserver options */
@Input() observerOptions: IntersectionObserverInit = {threshold: [.1, .2, .3, .4, .5, .6, .7, .8]};
  /** Deprecated config. Use `observerOptions` instead.
   * @deprecated Use `observerOptions` instead. */
@Input() options: any;
/** Controls whether blur effect is applied to a component with less than 80% intersection ratio.
 * Only applies when there are no "inview" event handlers defined.
 **/
@Input() blurEnabled = true;

@Output() inview: EventEmitter<IntersectionObserverEntry> = new EventEmitter();
@Output() notInview: EventEmitter<IntersectionObserverEntry> = new EventEmitter();

observer!: IntersectionObserver;
  /** indicates that this element is in viewport */
isInview = false;
  /** indicates that this element is 80% in viewport. Used by the default callback */
once80PctVisible = false;

constructor(
      private element: ElementRef,
      @Inject(PLATFORM_ID) private platformId: any) {
}

  /** Starts IntersectionObserver */
ngOnInit(): void {
  if (this.options) {
    this.observerOptions = this.options;
  }
  if ('IntersectionObserver' in window) {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.observerOptions);
      this.observer.observe(this.element.nativeElement);
    }

  } else {
    console.log('Intersection Observer not supported');
  }

}

  /** stop IntersectionObserver */
ngOnDestroy(): void {
  if (this.observer) {
    this.observer.disconnect();
  }

}

  /** fires (inview) and (notInview) events when this component is visible or not visible  */
handleIntersect(entries : any[]): void {
  if (entries) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry['isIntersecting']) {
        this.isInview = true;
        this.defaultInviewHandler(entry);
        this.inview.emit(entry);
      } else {
        this.notInview.emit(entry);
      }
    });
  }

}

  /**
   * default intersection handler, which sets blur dependes on intersection ratio
   * this won't be invoked if user provides any (inview) event. e.g. (inview)="something()"
   */
defaultInviewHandler(entry: any): any {
  if (!this.blurEnabled || this.once80PctVisible || this.inview.observers.length || !entry) {
    return;
  }

  if (entry.intersectionRatio < 0.8) {
    const opacity = entry.intersectionRatio * (1 / 0.8);
    const blur = 20 - Math.floor(entry.intersectionRatio * 10) * 4;
    const filter = `blur(${blur}px)`;
    Object.assign(entry.target.style, {opacity, filter});
  } else {
    entry.target.style.opacity = 1;
    entry.target.style.filter = 'unset';

    this.once80PctVisible = true;
  }
}
}
