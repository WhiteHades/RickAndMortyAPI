import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Character } from './character.model';
import { ApiResponse } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServ {
  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getChars(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/?page=${page}`);
  }
}
