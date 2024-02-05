import { OnInit, Component } from '@angular/core';
import { RickAndMortyServ } from '../rick-andmorty.service';
import { Character } from '../character.model';
import { ApiResponse } from '../character.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  // presentPg = 1;
  // totalPg = 0;
  // chars: Character[] = [];
  // pageNumbers: number[] = [];
  // visiblePageNumbers: number[] = [];
  // displayedChars: Character[] = [];
  // charsPerPage = 6;

  apiPage = 1; // Page number for API
  displayPage = 1; // Page number for displayed characters
  totalApiPages = 0; // Total pages from API
  charsPerDisplayPage = 6; // Characters per display page
  chars: Character[] = []; // Characters from API
  displayedChars: Character[] = []; // Characters to display

  constructor(private rickAndMortyServ: RickAndMortyServ) { }

  ngOnInit(): void { this.fetchApiPage(); }

  fetchApiPage(): void {
    this.rickAndMortyServ.getChars(this.apiPage).subscribe({
      next: (response: ApiResponse) => {
        this.chars = [...this.chars, ...response.results]; // Append new results
        this.totalApiPages = response.info.pages;
        this.updateDisplayedChars(false); // Update without incrementing apiPage
      },
      error: (error: any) => console.error('Error fetching characters:', error)
    });
  }

  updateDisplayedChars(shouldFetchNextApiPage: boolean): void {
    // Calculate the start index within the overall fetched characters array
    const start = ((this.displayPage - 1) * this.charsPerDisplayPage) % 20; // Adjust for API page boundary
    const end = start + this.charsPerDisplayPage;

    // Determine if we need to fetch the next API page
    const needNextApiPage = Math.ceil(((this.displayPage - 1) * this.charsPerDisplayPage + 1) / 20) > this.apiPage;
    if (needNextApiPage) {
      this.apiPage++;
      this.fetchApiPage();
    } else {
      // Update displayed characters from the current set of fetched characters
      this.displayedChars = this.chars.slice(start + (20 * (this.apiPage - 1)), end + (20 * (this.apiPage - 1)));
    }
  }

  getVisiblePageNumbers(): number[] {
    const range = 5; // How many page numbers to show in the pagination control
    let start = Math.max(1, this.displayPage - Math.floor(range / 2));
    let end = Math.min(start + range - 1, this.totalDisplayPages);

    // Adjust start if end is at the total display limit
    if (end === this.totalDisplayPages) {
      start = Math.max(1, end - range + 1);
    }

    return Array.from({ length: (end - start) + 1 }, (_, i) => start + i);
  }

  goToDisplayPage(page: number): void {
    this.displayPage = page;
    this.updateDisplayedChars(true);
  }

  get totalDisplayPages(): number {
    return Math.ceil((this.totalApiPages * 20) / this.charsPerDisplayPage);
  }

  prev(): void {
    if (this.displayPage > 1) {
      this.goToDisplayPage(this.displayPage - 1);
    }
  }

  next(): void {
    if (this.displayPage < this.totalDisplayPages) {
      this.goToDisplayPage(this.displayPage + 1);
    }
  }
}
