import { TestBed } from '@angular/core/testing';

import { LoginclientService } from './loginclient.service';

describe('LoginclientService', () => {
  let service: LoginclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
