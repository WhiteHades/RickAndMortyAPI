import { OnInit, Component } from '@angular/core';
import { RickAndMortyServ } from '../rick-andmorty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  presentPg = 1;
  totalPg = 0;
  chars = [];
  pageNumbers: number[] = [];

  constructor(private rickAndMortyServ: RickAndMortyServ) { }

  ngOnInit(): void { this.loadChars(); }

  loadChars(): void {
    this.rickAndMortyServ.getChars(this.presentPg).subscribe(response => {
      this.chars = response.results;
      this.totalPg = response.info.pages;
      this.pageNumbers = Array.from({length: this.totalPg}, (_, i) => i + 1);
    });
  }

  next(page: number): void {
    this.presentPg = page;
    this.loadChars();
  }
}
