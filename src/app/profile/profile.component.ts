import { OnInit, Component } from '@angular/core';
import { Character } from "../character.model";
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyServ } from '../rick-andmorty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements  OnInit {
  characterId: number | null = null
  character: Character | null = null

  constructor(private route: ActivatedRoute, private rickAndMortyServ: RickAndMortyServ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const id = +params.get('id');
      if (id) { this.loadCharacter(id); }
    });
  }

  loadCharacter(id: number): void {
    this.rickAndMortyServ.getChar(id).subscribe({ // Assuming the correct method name is getCharacter
      next: (character: Character) => { this.character = character; },
      error: (error) => { console.error('Error fetching character data:', error); }
    });
  }
}
