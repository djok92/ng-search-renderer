import { TestBed } from '@angular/core/testing';

import { NgSearchRendererService } from './ng-search-renderer.service';

describe('NgSearchRendererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSearchRendererService = TestBed.get(NgSearchRendererService);
    expect(service).toBeTruthy();
  });
});
