import { TestBed } from '@angular/core/testing';

import { OfflineRecipeDbService } from './offline-recipe-db.service';

describe('OfflineRecipeDbService', () => {
  let service: OfflineRecipeDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineRecipeDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
