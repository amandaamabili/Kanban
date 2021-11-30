import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Card } from '../column/card/card';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: string;
  @Input() cards!: Card[];

  constructor(private api: APIService) {}

  ngOnInit(): void {
  }

  createCard() {
    this.cards.push({ titulo: '', conteudo: '', lista: this.column, id: '' });
  }

  cardChange(card: Card) {
    this.cards.forEach((card) => {
      if (card.id === card.id) {

        card.conteudo = card.conteudo;
        card.titulo = card.titulo;
        card.lista = card.lista;
      }
    })

  }


}
