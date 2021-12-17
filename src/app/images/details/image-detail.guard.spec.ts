import { TestBed } from '@angular/core/testing';

import { ImageDetailGuard } from './image-detail.guard';

describe('ImageDetailGuard', () => {
  let guard: ImageDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ImageDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
