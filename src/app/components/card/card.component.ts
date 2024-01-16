import { Component, Input } from '@angular/core';
import { IParagraph } from '../../interfaces/text.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() paragraph?: IParagraph;
}
