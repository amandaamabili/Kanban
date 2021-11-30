import { Card } from './../container/column/card/card';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 import { tap, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiURL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }


  authorization: string = localStorage.getItem('auth') || '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authorization,
    })
  };


  cardsChanged = new Subject();

isLoggedIn = false;
redirectUrl: string | null = null;



  getAuthorization(login: string, senha: string) {
    const msgBody = { login: login, senha: senha };
    return this.http.post<string>(`${this.apiURL}/login/`, msgBody, this.httpOptions)
  }

  Authorization(auth: string): Observable<boolean> {
     this.authorization = 'Bearer ' + auth;
     localStorage.setItem('auth', this.authorization)
     return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );;
  }

  clearAuthorization() {
    this.authorization = '';
    localStorage.removeItem('auth');
  }


  getAll(): Observable<Card[]> {

    return this.http.get<Card[]>(`${this.apiURL}/cards`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Card[]>('getCards', []))
      );
  }



  create(payload : any,lista: string) : Observable<Card> {
    let card = new Card(payload.titulo, payload.conteudo,lista,'');
    return this.http.post<Card>(`${this.apiURL}/cards`, card, this.httpOptions).pipe(
      catchError(this.handleError<Card>('addCard'))
    );
  }

  updateCard(id: string, payload: any, lista: string) {
    let pay = new Card(payload.titulo,payload.conteudo,lista, id)
    return this.http.put<Card>(
      `${this.apiURL}/cards/${id}`,
       pay,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<any>('updateCard'))
    );

  }

  deleteCard(id: string): Observable<Card> {
    return this.http.delete<Card>(`${this.apiURL}/cards/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Card>('deleteCard')));

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };

  }
}
