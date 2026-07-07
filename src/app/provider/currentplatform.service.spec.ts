import { TestBed } from '@angular/core/testing';

import { CurrentplatformService } from './currentplatform.service';

describe('CurrentplatformService', () => {
  let service: CurrentplatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentplatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
