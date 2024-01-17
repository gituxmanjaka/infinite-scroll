import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { DummyTextService } from './services/dummy-text.service';
import { LoadingComponent } from './components/loading/loading.component';
import { ScrollNearEndDirective } from './directives/scroll-near-end.directive';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { IParagraph } from './interfaces/text.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CardComponent,
    LoadingComponent,
    ScrollNearEndDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DummyTextService]
})
export class AppComponent implements OnInit, OnDestroy {
  itemPerPage = 10;
  currentPage$ = new BehaviorSubject(1);
  paragraphs$ = new BehaviorSubject<IParagraph[]>([]);
  currentPageSub?: Subscription;

  constructor(private textService: DummyTextService) {}

  ngOnDestroy(): void {
    this.currentPageSub?.unsubscribe();
  }

  ngOnInit() {
    this.currentPageSub = this.currentPage$.pipe(
      switchMap(currentPage => this.textService.getParagraphs(currentPage, this.itemPerPage))
    ).subscribe({
      next: paragraphs => {
        const currPs = this.paragraphs$.getValue();
        this.paragraphs$.next([...currPs, ...paragraphs]);
      }
    })
  }

  chargeNextParagraphs() {
    console.log("++ near end");
    this.currentPage$.next(this.currentPage$.getValue() + 1);
  }
}
