import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { DummyTextService } from './dummy-text.service';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DummyTextService]
})
export class AppComponent implements OnInit {

  paragraphs$ = this.textService.getParagraphs(5);

  constructor(private textService: DummyTextService) {}

  ngOnInit() {}
}
