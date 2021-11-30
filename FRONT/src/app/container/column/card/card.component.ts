import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from './card';
import { COLUMNS } from '../columns';
import { APIService } from 'src/app/services/api.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() column!: string;
  @Input() card!: Card;
  @Output() cardChanged = new EventEmitter<Card[]>();

  form!: FormGroup;
  cols = COLUMNS;
  editMode: boolean = false;
  firstColumn?: boolean;
  lastColumn?: boolean;

  id: string = '';
  title: string = '';
  description: string = '';
  lista: string = '';



  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.getCardInfo();
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+')]),
      conteudo: new FormControl('', Validators.required),
    })
  }
  get f(){
    return this.form.controls;
  }

  saveCard() {
    if (this.id) {
      this.api
        .updateCard(this.card.id,this.form.value, this.lista)
        .subscribe((card) => {
           this.card = card;
           console.log(card);
        });
    } else {
      this.api
        .create(this.form.value, this.lista)
        .subscribe((card:any) => {
          this.api.cardsChanged.next(card);
        });
    }
    this.toggleEditMode();
  }


  cancelEdition() {
    this.form.value.titulo = this.card.titulo;
    this.form.value.conteudo = this.card.conteudo;
    this.lista = this.card.lista;
    this.toggleEditMode();
  }

  deleteCard() {
    this.api.deleteCard(this.card.id).subscribe((card) => {
      this.api.cardsChanged.next(card);
    });
  }

  getCardInfo() {
    this.firstColumn = this.cols.indexOf(this.card.lista) == 0;
    this.lastColumn =
      this.cols.indexOf(this.card.lista) == this.cols.length - 1;

    this.id = this.card.id;
    this.title = this.card.titulo;
    this.description = this.card.conteudo;
    this.lista = this.card.lista;

    if (!this.id) {
      this.toggleEditMode();
    }
  }

  moveLeft() {

    const index = this.cols.indexOf(this.card.lista);
    this.card.lista = this.cols[index - 1];
    this.api
      .updateCard(
        this.card.id,this.form.value, this.card.lista
      )
      .subscribe((card) => {
        this.api.cardsChanged.next(card);
      });
      if (this.firstColumn) {
        return;
      }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  moveRight() {
    const index = this.cols.indexOf(this.card.lista);
    this.card.lista = this.cols[index + 1];


    this.api
    .updateCard(
      this.card.id, this.form.value, this.card.lista
    )
    .subscribe((card) => {
      this.api.cardsChanged.next(card);
    });
    if (!this.firstColumn) {
      return;
    }

  }



}
