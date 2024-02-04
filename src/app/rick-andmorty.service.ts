import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServ {
  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getChars(page: number = 1): Observable<any> {
    return this.http.get(`${this.url}?page=${page}`).pipe(
      map(response => response)
    );
  }
}
