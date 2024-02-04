import { OnInit, Component } from '@angular/core';
import { RickAndMortyServ } from '../rick-andmorty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  presentPg = 1;
  TotalPg = 0;
  chars = [];

  constructor(private rickAndMortyServ: RickAndMortyServ) { }

  ngOnInit(): void {
  }

}
