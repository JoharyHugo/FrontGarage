import { TestBed } from '@angular/core/testing';

import { AjoutPieceService } from './ajout-piece.service';

describe('AjoutPieceService', () => {
  let service: AjoutPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
