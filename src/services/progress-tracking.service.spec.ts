import { TestBed } from '@angular/core/testing';

import { ProgressTrackingService } from './progress-tracking.service';

describe('ProgressTrackingService', () => {
  let service: ProgressTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
