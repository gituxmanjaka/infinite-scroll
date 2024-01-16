import { Component, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { DummyTextService } from './services/dummy-text.service';
import { LoadingComponent } from './components/loading/loading.component';
import { IParagraph } from './interfaces/text.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DummyTextService]
})
export class AppComponent implements OnInit {
  currentPage = 1;
  itemPerPage = 10;

  paragraphs = toSignal<IParagraph[]>(this.textService.getParagraphs(this.currentPage, this.itemPerPage));

  constructor(private textService: DummyTextService) {}

  ngOnInit() {}
}
