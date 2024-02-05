import { OnInit, Component } from '@angular/core';
import { CharacterDetails } from "../character.model";
import { ActivatedRoute, Router } from '@angular/router';
import { RickAndMortyServ } from '../rick-andmorty.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements  OnInit {
  characterId: number | null = null
  character: CharacterDetails | null = null

  constructor(private route: ActivatedRoute, private rickAndMortyServ: RickAndMortyServ, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const id = +params.get('id');
      if (id) { this.loadCharacter(id); }
    });
  }

  loadCharacter(id: number): void {
    this.rickAndMortyServ.getChar(id).subscribe({
      next: (character: CharacterDetails) => { this.character = character; },
      error: (error) => { console.error('Error fetching character data:', error); }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']).then(r => console.log('Navigated to home'));
  }
}
