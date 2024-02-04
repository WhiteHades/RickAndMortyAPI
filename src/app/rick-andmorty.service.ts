import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServ {
  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getChars(page: number = 1): Observable<{results: Character[]}> {
    return this.http.get<{results: Character[]}>(`${this.url}?page=${page}`);
  }
}
