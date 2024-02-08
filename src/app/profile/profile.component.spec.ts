import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { RickAndMortyServ } from '../rick-andmorty.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import { of } from 'rxjs';

describe('2 - ProfileComponent Unit Test', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: RickAndMortyServ;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        RickAndMortyServ,
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RickAndMortyServ);
    router = TestBed.inject(Router);

    spyOn(service, 'getChar').and.returnValue(of({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: '', url: '' },
      episode: ["https://rickandmortyapi.com/api/episode/1","https://rickandmortyapi.com/api/episode/2","https://rickandmortyapi.com/api/episode/3","https://rickandmortyapi.com/api/episode/4","https://rickandmortyapi.com/api/episode/5","https://rickandmortyapi.com/api/episode/6","https://rickandmortyapi.com/api/episode/7","https://rickandmortyapi.com/api/episode/8","https://rickandmortyapi.com/api/episode/9","https://rickandmortyapi.com/api/episode/10","https://rickandmortyapi.com/api/episode/11","https://rickandmortyapi.com/api/episode/12","https://rickandmortyapi.com/api/episode/13","https://rickandmortyapi.com/api/episode/14","https://rickandmortyapi.com/api/episode/15","https://rickandmortyapi.com/api/episode/16","https://rickandmortyapi.com/api/episode/17","https://rickandmortyapi.com/api/episode/18","https://rickandmortyapi.com/api/episode/19","https://rickandmortyapi.com/api/episode/20","https://rickandmortyapi.com/api/episode/21","https://rickandmortyapi.com/api/episode/22","https://rickandmortyapi.com/api/episode/23","https://rickandmortyapi.com/api/episode/24","https://rickandmortyapi.com/api/episode/25","https://rickandmortyapi.com/api/episode/26","https://rickandmortyapi.com/api/episode/27","https://rickandmortyapi.com/api/episode/28","https://rickandmortyapi.com/api/episode/29","https://rickandmortyapi.com/api/episode/30","https://rickandmortyapi.com/api/episode/31","https://rickandmortyapi.com/api/episode/32","https://rickandmortyapi.com/api/episode/33","https://rickandmortyapi.com/api/episode/34","https://rickandmortyapi.com/api/episode/35","https://rickandmortyapi.com/api/episode/36","https://rickandmortyapi.com/api/episode/37","https://rickandmortyapi.com/api/episode/38","https://rickandmortyapi.com/api/episode/39","https://rickandmortyapi.com/api/episode/40","https://rickandmortyapi.com/api/episode/41","https://rickandmortyapi.com/api/episode/42","https://rickandmortyapi.com/api/episode/43","https://rickandmortyapi.com/api/episode/44","https://rickandmortyapi.com/api/episode/45","https://rickandmortyapi.com/api/episode/46","https://rickandmortyapi.com/api/episode/47","https://rickandmortyapi.com/api/episode/48","https://rickandmortyapi.com/api/episode/49","https://rickandmortyapi.com/api/episode/50","https://rickandmortyapi.com/api/episode/51"],
      created: '2017-11-04T18:48:46.250Z'
    }));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should load character data on initialization', () => {
    fixture.detectChanges();
    // @ts-ignore
    expect(service.getChar).toHaveBeenCalledWith(1);
    // @ts-ignore
    expect(component.character).toBeTruthy();
    // @ts-ignore
    expect(component.character.name).toEqual('Rick Sanchez');
  });
});

describe('2 - ProfileComponent Integration Test', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])], // Define routes if needed
      providers: [RickAndMortyServ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should navigate back to home on goBack()', () => {
    component.goBack();
    // @ts-ignore
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to the previous character on goPrev()', () => {
    component.characterId = 2;
    component.goPrev();
    // @ts-ignore
    expect(router.navigate).toHaveBeenCalledWith(['/profile', component.characterId - 1]);
  });

  it('should navigate to the next character on goNext()', () => {
    component.characterId = 2;
    component.goNext();
    // @ts-ignore
    expect(router.navigate).toHaveBeenCalledWith(['/profile', component.characterId + 1]);
  });
});
