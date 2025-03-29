import { TestBed } from '@angular/core/testing';

import { RendezClientService } from './rendez-client.service';

describe('RendezClientService', () => {
  let service: RendezClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendezClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
