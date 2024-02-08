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
  character: CharacterDetails | null = null;
  characterId: number | null = null;

  constructor(private route: ActivatedRoute, private rickAndMortyServ: RickAndMortyServ, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const id = +params.get('id'); if (id) { this.characterId = id; this.loadCharacter(id); }
    });
  }

  loadCharacter(id: number): void {
    this.rickAndMortyServ.getChar(id).subscribe({
      next: (character: CharacterDetails) => { this.character = character; },
      error: (error) => { console.error('Error fetching character data:', error); }
    });
  }

  goBack(): void { this.router.navigate(['/home']).then(r => console.log('Navigated to home')); }

  goPrev(): void {
    if (this.characterId && this.characterId > 1) { // Assuming ID starts at 1
      this.router.navigate(['/profile', this.characterId - 1]).then(r => console.log('Navigated to prev character'));
    }
  }

  goNext(): void {
    if (this.characterId) {
      this.router.navigate(['/profile', this.characterId + 1]).then(r => console.log('Navigated to next character'));
    }
  }
}
