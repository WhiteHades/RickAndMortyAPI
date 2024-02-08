import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RickAndMortyServ } from '../rick-andmorty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HomeComponent Unit Test', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: RickAndMortyServ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [ RickAndMortyServ ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RickAndMortyServ);

    spyOn(service, 'getChars').and.returnValue(of({
      info: { count: 826, pages: 42, next: 'https://rickandmortyapi.com/api/character/?page=3', prev: 'https://rickandmortyapi.com/api/character/?page=1' },
      results: [
        { id: 21, name: 'Aqua Morty', status: 'unknown', species: 'Humanoid', type: 'Fish-Person', gender: 'Male',
          origin: { name: 'unknown', url: '' }, location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
          image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg', episode: ['https://rickandmortyapi.com/api/episode/10', 'https://rickandmortyapi.com/api/episode/22'],
          url: 'https://rickandmortyapi.com/api/character/21', created: '2017-11-04T22:39:48.055Z' },
        { id: 22, name: 'Aqua Rick', status: 'unknown', species: 'Humanoid', type: 'Fish-Person', gender: 'Male',
          origin: { name: 'unknown', url: '' }, location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
          image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg', episode: ['https://rickandmortyapi.com/api/episode/10', 'https://rickandmortyapi.com/api/episode/22', 'https://rickandmortyapi.com/api/episode/28'],
          url: 'https://rickandmortyapi.com/api/character/22', created: '2017-11-04T22:41:07.171Z' },
        { id: 23, name: 'Arcade Alien', status: 'unknown', species: 'Alien', type: '', gender: 'Male',
          origin: { name: 'unknown', url: '' }, location: { name: 'Immortality Field Resort', url: 'https://rickandmortyapi.com/api/location/7' },
          image: 'https://rickandmortyapi.com/api/character/avatar/23.jpeg', episode: ['https://rickandmortyapi.com/api/episode/13', 'https://rickandmortyapi.com/api/episode/19', 'https://rickandmortyapi.com/api/episode/21', 'https://rickandmortyapi.com/api/episode/25', 'https://rickandmortyapi.com/api/episode/26'],
          url: 'https://rickandmortyapi.com/api/character/23', created: '2017-11-05T08:43:05.095Z' }
      ]
    })); fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });

  it('should fetch characters on ngOnInit', () => {
    component.ngOnInit();
    expect(service.getChars).toHaveBeenCalled();
    expect(component.chars.length).toBeGreaterThan(0);
  });

  it('should filter characters based on search term', () => {
    const searchTerm = 'Rick';
    component.charsSearch = searchTerm;
    component.filterChars();
    expect(component.charsDisplayed.every(char => char.name.includes(searchTerm))).toBeTrue();
  });
});

describe('HomeComponent Integration Test', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: RickAndMortyServ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [RickAndMortyServ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RickAndMortyServ);

    spyOn(service, 'getChars').and.returnValue(of({
      info: { count: 826, pages: 42, next: 'https://rickandmortyapi.com/api/character/?page=3', prev: 'https://rickandmortyapi.com/api/character/?page=1' },
      results: [
        { id: 14, name: "Alien Morty", status: "unknown", species: "Alien", type: "", gender: "Male",
          origin: { name: "unknown", url: "" }, location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" }, image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
          episode: ["https://rickandmortyapi.com/api/episode/10"], url: "https://rickandmortyapi.com/api/character/14", created: "2017-11-04T20:51:31.373Z" }
      ]
    }));
  });

  it('should display characters after service data fetch', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.character-name').textContent).toContain('Alien Morty');
      expect(compiled.querySelector('.character-species').textContent).toContain('Alien');
      expect(compiled.querySelector('.character-status').textContent).toContain('unknown');
    });
  }));

  it('should correctly paginate characters', waitForAsync(async () => {
    component.next();
    await fixture.whenStable();
    expect(component.chars.length).toBeLessThanOrEqual(6);
  }));

  it('should filter characters based on search term effectively', async () => {
    component.charsSearch = 'Rick';
    component.filterChars();
    await fixture.whenStable();
    expect(component.charsDisplayed.every((char) => char.name.includes('Rick'))).toBeTrue();
  });
});
