import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '../container/column/columns';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Card } from '../container/column/card/card';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  columns = COLUMNS;


  cards: Card[] = [];
  constructor(private api: APIService) { }


  getAll(){
    this.api.getAll().subscribe((cards)=>{
      this.cards = cards;
      console.log(this.cards);
    })
  }
  ngOnInit(): void {
    this.getAll();

     this.api.cardsChanged.subscribe((card) => {
      this.getAll();
    });
  }




}
