import { TestBed, inject } from '@angular/core/testing';

import { CountriesListService } from './countries-list.service';

describe('CountriesListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesListService]
    });
  });

  it('should be created', inject([CountriesListService], (service: CountriesListService) => {
    expect(service).toBeTruthy();
  }));
});
