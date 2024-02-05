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
  apiPage = 1;
  displayPage = 1;
  totalApiPages = 0;
  charsPerDisplayPage = 6;
  chars: Character[] = [];
  displayedChars: Character[] = [];

  constructor(private rickAndMortyServ: RickAndMortyServ, private router: Router) { }

  ngOnInit(): void { this.fetchApiPage(); }

  fetchApiPage(): void {
    this.rickAndMortyServ.getChars(this.apiPage).subscribe({
      next: (response: ApiResponse) => {
        this.chars = [...this.chars, ...response.results];
        this.totalApiPages = response.info.pages;
        this.updateDisplayedChars(false);
      },
      error: (error: any) => console.error('Error fetching characters:', error)
    });
  }

  updateDisplayedChars(shouldFetchNextApiPage: boolean): void {
    const totalCharactersDisplayedSoFar = (this.displayPage - 1) * this.charsPerDisplayPage;
    const startIndexOfCurrentPageWithinFetchedChars = totalCharactersDisplayedSoFar % 20;
    const endIndexOfCurrentPageWithinFetchedChars = startIndexOfCurrentPageWithinFetchedChars + this.charsPerDisplayPage;

    if (shouldFetchNextApiPage && totalCharactersDisplayedSoFar + this.charsPerDisplayPage > this.chars.length && this.apiPage < this.totalApiPages) {
      this.apiPage++;
      this.fetchApiPage();
    } else {
      this.displayedChars = this.chars.slice(totalCharactersDisplayedSoFar, totalCharactersDisplayedSoFar + this.charsPerDisplayPage);
      if (endIndexOfCurrentPageWithinFetchedChars >= 20 && this.apiPage < this.totalApiPages) {
        this.apiPage++;
        this.fetchApiPage();
      }
    }
  }

  getVisiblePageNumbers(): number[] {
    const range = 5;
    let start = Math.max(1, this.displayPage - Math.floor(range / 2));
    let end = Math.min(start + range - 1, this.totalDisplayPages);

    if (end === this.totalDisplayPages) {
      start = Math.max(1, end - range + 1);
    }

    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  }

  goToDisplayPage(page: number): void {
    if (page >= 1 && page <= this.totalDisplayPages) {
      this.displayPage = page;
      this.updateDisplayedChars(true);
    } else console.log("Requested page is out of range.");
  }

  goToProfile(id: number): void { this.router.navigate(['/profile', id]);   }

  get totalDisplayPages(): number {
    const totalCharacters = this.chars.length;
    return Math.ceil(totalCharacters / this.charsPerDisplayPage);
  }

  prev(): void {
    if (this.displayPage > 1) this.goToDisplayPage(this.displayPage - 1);
  }

  next(): void {
    if (this.displayPage < this.totalDisplayPages) this.goToDisplayPage(this.displayPage + 1);
  }
}
