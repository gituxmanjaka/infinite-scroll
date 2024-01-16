import { AfterViewChecked, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription, distinctUntilChanged, filter } from 'rxjs';

@Directive({
  selector: '[appScrollNearEnd]',
  standalone: true
})
export class ScrollNearEndDirective implements AfterViewChecked, OnDestroy, OnInit {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter();

  lastChildElement$ = new BehaviorSubject<HTMLElement | null>(null);

  constructor(private elementRef: ElementRef<HTMLElement>) {}
  
  ngAfterViewChecked(): void {
    const childElements = this.elementRef.nativeElement.children;
    const theLastElement = childElements.item(childElements.length - 1) as HTMLElement;
    if (theLastElement) {
      this.lastChildElement$.next(theLastElement);
    }
  }
  
  private lastSubscription?: Subscription;
  ngOnDestroy(): void {
    this.lastSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.lastSubscription = this.lastChildElement$
    .pipe(
      distinctUntilChanged(),
      filter(element => !!element)
    ).subscribe({
      next: (lastElement) => {
        if (lastElement) {
          const elementObserver = new IntersectionObserver((entries) => {
            const intersectionObserver = entries.at(0)!;
            if (intersectionObserver.isIntersecting) {
              this.nearEnd.emit();
              elementObserver.unobserve(lastElement);
            }
          }, {
            threshold: 0,
            rootMargin: '0% 0% 10% 0%'
          });
          elementObserver.observe(lastElement);
        }
      }
    })
  }
}
