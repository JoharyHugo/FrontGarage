import { TestBed } from '@angular/core/testing';

import { AjoutServiceService } from './ajout-service.service';

describe('AjoutServiceService', () => {
  let service: AjoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
