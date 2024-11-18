import { TestBed } from '@angular/core/testing';

import { RecipeFirebaseService } from './recipe-firebase.service';

describe('RecipeFirebaseService', () => {
  let service: RecipeFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
