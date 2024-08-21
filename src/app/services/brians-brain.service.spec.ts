import { TestBed } from '@angular/core/testing';
import { BriansBrainService } from './brians-brain.service';

describe('BriansBrainService', () => {
  let service: BriansBrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriansBrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
