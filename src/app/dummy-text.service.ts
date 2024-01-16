import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IParagraph } from './text.interface';

@Injectable({
  providedIn: 'root'
})
export class DummyTextService {
  private loremUrl = 'assets/lorem.txt';

  constructor(private http: HttpClient) {}

  getParagraphs(paragraphSize?: number) {
    return this.http.get(this.loremUrl, {responseType: 'text'}).pipe(
      map(text => this.splitToArray(text)),
      map(paragraphs => paragraphSize ? paragraphs.slice(0, paragraphSize) : paragraphs),
      map(arrayText => this.buildParagraphs(arrayText))
    )
  }

  private splitToArray(text: string) {
    return text.split('\r\n').filter(c => c !== "")
  }

  private buildParagraphs(paragraphs: string[]) {
    return paragraphs.map((text, index) => {
      const randomTitleSize = Math.floor(Math.random() * (100 - 35 + 1)) + 35;
      return {
        id: index,
        title: text.slice(0, randomTitleSize),
        body: text
      } as IParagraph
    })
  }
}
