import { TestBed } from '@angular/core/testing';

import { RickAndmortyService } from './rick-andmorty.service';

describe('RickAndmortyService', () => {
  let service: RickAndmortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickAndmortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
