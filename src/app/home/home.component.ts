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
  presentPg = 1;
  totalPg = 0;
  chars: Character[] = [];
  pageNumbers: number[] = [];
  visiblePageNumbers: number[] = [];

  constructor(private rickAndMortyServ: RickAndMortyServ) { }

  ngOnInit(): void { this.loadChars(); }

  loadChars(): void {
    this.rickAndMortyServ.getChars(this.presentPg).subscribe({
      next: (response: ApiResponse) => {
        this.chars = response.results;
        this.totalPg = response.info.pages;
        this.pageNumbers = Array.from({length: this.totalPg}, (_, i) => i + 1);
        this.updateVisiblePageNumbers();
      },
      error: (error: any) => { console.error('Error fetching characters:', error); }
    });
  }

  updateVisiblePageNumbers(): void {
    const surroundingPages = 2; // Number of pages to show around the current page
    const startPage = Math.max(1, this.presentPg - surroundingPages);
    const endPage = Math.min(this.totalPg, this.presentPg + surroundingPages);
    this.visiblePageNumbers = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);
  }

  page(page: number): void { this.presentPg = page; this.loadChars(); }
  next(): void { if (this.presentPg < this.totalPg) { this.presentPg++; this.loadChars(); } }
  prev(): void { if (this.presentPg > 1) { this.presentPg--; this.loadChars(); } }
}
