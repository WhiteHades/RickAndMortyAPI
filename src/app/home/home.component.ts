import { OnInit, Component } from '@angular/core';
import { RickAndMortyServ } from '../rick-andmorty.service';
import { Character } from '../character.model';
import { ApiResponse } from '../character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  chars: Character[] = [];
  pgApi = 1;
  pgDisplay = 1;
  pgTotalApi = 0;
  charsSearch: string = '';
  charsDisplayed: Character[] = [];
  charsPerDisplayPg = 6;

  constructor(private rickAndMortyServ: RickAndMortyServ, private router: Router) { }

  ngOnInit(): void { this.getApiPg(); }

  setDisplayedChars(display: Character[]): void {
    const startInd = (this.pgDisplay - 1) * this.charsPerDisplayPg;
    const endInd = startInd + this.charsPerDisplayPg;
    this.charsDisplayed = display.slice(startInd, endInd);
  }

  getApiPg(): void {
    this.rickAndMortyServ.getChars(this.pgApi).subscribe({
      next: (response: ApiResponse) => {
        this.chars = [...this.chars, ...response.results];
        this.pgTotalApi = response.info.pages;
        this.updateDisplayedChars(false);
      },
      error: (error: any) => console.error('Error fetching characters:', error)
    });
  }

  getVisiblePgNums(): number[] {
    const range = 5;
    let start = Math.max(1, this.pgDisplay - Math.floor(range / 2));
    let end = Math.min(start + range - 1, this.getTotalDisplayPg());

    if (end === this.getTotalDisplayPg()) { start = Math.max(1, end - range + 1); }
    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  }

  getTotalDisplayPg(): number {
    const totalCharacters = this.chars.length;
    return Math.ceil(totalCharacters / this.charsPerDisplayPg);
  }

  goToDisplayPg(page: number): void {
    if (page >= 1 && page <= this.getTotalDisplayPg()) { this.pgDisplay = page; this.updateDisplayedChars(true); }
    else console.log("Page is out of range.");
  }

  goToProfile(id: number): void { this.router.navigate(['/profile', id]).then(r => console.log("Navigation done.")); }

  filterChars(): void {
    let display = this.chars;
    if (this.charsSearch) {
      display = this.chars.filter((char) => char.name.toLowerCase().includes(this.charsSearch.toLowerCase()));
    }

    this.pgTotalApi = Math.ceil(display.length / this.charsPerDisplayPg);
    this.pgDisplay = 1;
    this.setDisplayedChars(display);
  }

  updateDisplayedChars(shouldFetchApi: boolean): void {
    const totalCharsDisplayedSoFar = (this.pgDisplay - 1) * this.charsPerDisplayPg;
    const startIndOfCurrPgWithinFetchedChars = totalCharsDisplayedSoFar % 20;
    const endIndOfCurrPgWithinFetchedChars = startIndOfCurrPgWithinFetchedChars + this.charsPerDisplayPg;

    if (shouldFetchApi && totalCharsDisplayedSoFar + this.charsPerDisplayPg > this.chars.length && this.pgApi < this.pgTotalApi) {
      this.pgApi++; this.getApiPg();
    }
    else {
      this.charsDisplayed = this.chars.slice(totalCharsDisplayedSoFar, totalCharsDisplayedSoFar + this.charsPerDisplayPg);
      if (endIndOfCurrPgWithinFetchedChars >= 20 && this.pgApi < this.pgTotalApi) {
        this.pgApi++; this.getApiPg();
      }
    }
  }

  prev(): void { if (this.pgDisplay > 1) this.goToDisplayPg(this.pgDisplay - 1); }

  next(): void { if (this.pgDisplay < this.getTotalDisplayPg()) this.goToDisplayPg(this.pgDisplay + 1); }
}
