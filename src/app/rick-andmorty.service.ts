import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ApiResponse } from './character.model';
import { CharacterDetails } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServ {
  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getChars(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.url}/?page=${page}`);
  }

  getChar(id: number): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${this.url}/${id}`);
  }
}
