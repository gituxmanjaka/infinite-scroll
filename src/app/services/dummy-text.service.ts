import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IParagraph } from '../interfaces/text.interface';

@Injectable({
  providedIn: 'root'
})
export class DummyTextService {
  private loremUrl = 'assets/lorem.txt';

  constructor(private http: HttpClient) {}

  getParagraphs(page: number = 1, itemPerPage: number = 10) {
    return this.http.get(this.loremUrl, {responseType: 'text'}).pipe(
      map(text => this.splitToArray(text)),
      map(arrayText => this.buildParagraphs(arrayText)),
      map(paragraphs => this.paginateParagraphs(paragraphs, page, itemPerPage))
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
  
  private paginateParagraphs<T>(list: T[], page: number, itemPerPage: number) {
    const start = (page - 1) * itemPerPage;
    const end = start + itemPerPage;
    return list.slice(start, end)
  }

}

